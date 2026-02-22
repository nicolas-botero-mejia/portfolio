/**
 * Remark plugin: attach block annotations from [label]: # definitions to the next sibling.
 * The definition is consumed (removed). Supported: full-width, table, callout, filename: x, caption: x.
 */

import type { Definition, Root, Table, Paragraph, Blockquote, Code } from 'mdast';
import { visit } from 'unist-util-visit';

const BLOCK_TYPES = new Set<string>(['table', 'paragraph', 'blockquote', 'code']);

const KNOWN_KEYS = new Set<string>(['full-width', 'table', 'callout', 'filename', 'caption']);

function parseIdentifier(identifier: string): { key: string; value: string } | null {
  const trimmed = identifier.trim();
  const colonIndex = trimmed.indexOf(':');
  if (colonIndex > 0) {
    const key = trimmed.slice(0, colonIndex).trim();
    const value = trimmed.slice(colonIndex + 1).trim();
    if (KNOWN_KEYS.has(key)) return { key, value };
  }
  if (KNOWN_KEYS.has(trimmed)) return { key: trimmed, value: 'true' };
  return null;
}

function setDataProps(
  node: { data?: Record<string, unknown> },
  key: string,
  value: string
): void {
  const data = node.data ?? {};
  const hProps = (data.hProperties as Record<string, string>) ?? {};
  (node as { data: Record<string, unknown> }).data = {
    ...data,
    hProperties: { ...hProps, [`data-${key}`]: value },
  };
}

export function remarkAnnotations() {
  return (tree: Root) => {
    if (!tree || typeof tree !== 'object' || !Array.isArray(tree.children)) return;
    visit(tree, 'definition', (node: Definition, index, parent) => {
      if (typeof index !== 'number' || !parent?.children) return;

      const parsed = parseIdentifier(node.identifier || '');
      if (!parsed) return;

      const siblings = parent.children;
      const nextIndex = index + 1;
      if (nextIndex >= siblings.length) return;

      const nextNode = siblings[nextIndex];
      if (!nextNode || typeof (nextNode as { type?: string }).type !== 'string') return;
      const nextType = (nextNode as { type: string }).type;
      if (!BLOCK_TYPES.has(nextType)) return;

      // If next block is a paragraph with a single image: full-width goes on the paragraph (p component wraps);
      // caption and others go on the image so the img component receives them.
      if (nextType === 'paragraph') {
        const par = nextNode as Paragraph;
        const children = par.children;
        if (Array.isArray(children) && children.length === 1) {
          const only = children[0];
          if (only && (only as { type?: string }).type === 'image') {
            if (parsed.key === 'full-width') {
              setDataProps(nextNode as { data?: Record<string, unknown> }, parsed.key, parsed.value);
              return;
            }
            setDataProps(only as { data?: Record<string, unknown> }, parsed.key, parsed.value);
            return;
          }
        }
      }

      setDataProps(nextNode as { data?: Record<string, unknown> }, parsed.key, parsed.value);
    });
  };
}
