/**
 * Parses bio text containing {{slug}} tokens and returns React nodes
 * (plain strings and Link elements for company slugs).
 */

import React, { type ReactNode } from 'react';
import Link from '@/components/ui/Link';
import { getCompany } from '@/data';

const TOKEN_REGEX = /\{\{([^}]+)\}\}/g;

export function parseBioTokens(
  text: string,
  onExternalLinkClick: (url: string, label: string) => void
): ReactNode[] {
  const segments: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const re = new RegExp(TOKEN_REGEX.source, 'g');
  while ((match = re.exec(text)) !== null) {
    const [fullMatch, slug] = match;
    const rawSlug = slug.trim();
    if (lastIndex < match.index) {
      segments.push(text.slice(lastIndex, match.index));
    }
    const company = getCompany(rawSlug);
    if (company) {
      segments.push(
        React.createElement(Link, {
          key: `${company.slug}-${match.index}`,
          href: company.url,
          external: true,
          className: 'hover:text-content-primary transition-colors',
          onClick: () => onExternalLinkClick(company.url, company.name),
          children: company.name,
        })
      );
    } else {
      segments.push(rawSlug);
    }
    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < text.length) {
    segments.push(text.slice(lastIndex));
  }

  return segments.length > 0 ? segments : [text];
}
