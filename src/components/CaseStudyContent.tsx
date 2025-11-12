'use client';

import { useState, useEffect } from 'react';
import type { CaseStudy } from '@/lib/mdx';
import PasswordPrompt from './PasswordPrompt';
import {
  isCaseStudyLocked,
  isCaseStudyUnlocked,
  validatePassword,
  unlockCaseStudy,
} from '@/lib/passwordAuth';

interface CaseStudyContentProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyContent({ caseStudy }: CaseStudyContentProps) {
  const { frontmatter, content, slug } = caseStudy;
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Check if case study is unlocked on mount
  useEffect(() => {
    if (!isCaseStudyLocked(caseStudy)) {
      setIsUnlocked(true);
      setIsLoading(false);
    } else if (isCaseStudyUnlocked(slug)) {
      setIsUnlocked(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [caseStudy, slug]);

  const handlePasswordSubmit = (password: string) => {
    if (validatePassword(caseStudy, password)) {
      unlockCaseStudy(slug);
      setIsUnlocked(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  // Show loading state briefly to prevent flash
  if (isLoading) {
    return null;
  }

  // Show password prompt if locked and not unlocked
  if (isCaseStudyLocked(caseStudy) && !isUnlocked) {
    return (
      <PasswordPrompt
        onSubmit={handlePasswordSubmit}
        error={passwordError}
        caseStudyTitle={frontmatter.title}
      />
    );
  }

  // Show case study content
  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-12">
        <div className="mb-4 flex flex-wrap gap-2">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {frontmatter.title}
        </h1>

        <p className="mb-6 text-xl text-gray-600">
          {frontmatter.description}
        </p>

        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
          <div>
            <span className="font-semibold text-gray-900">Role:</span> {frontmatter.role}
          </div>
          <div>
            <span className="font-semibold text-gray-900">Duration:</span> {frontmatter.duration}
          </div>
          <div>
            <span className="font-semibold text-gray-900">Year:</span> {frontmatter.year}
          </div>
        </div>
      </header>

      {/* Hero Image Placeholder */}
      <div className="mb-12 aspect-video w-full rounded-lg bg-gray-200">
        <div className="flex h-full items-center justify-center text-gray-400">
          Hero Image: {frontmatter.heroImage}
        </div>
      </div>

      {/* Content */}
      <div
        className="prose prose-gray prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 pt-8">
        <div className="flex items-center justify-between">
          <a
            href="/#work"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            ← Back to portfolio
          </a>
          <div className="text-sm text-gray-500">
            {frontmatter.company} · {frontmatter.year}
          </div>
        </div>
      </footer>
    </article>
  );
}
