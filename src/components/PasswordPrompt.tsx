'use client';

import { useState, FormEvent } from 'react';

interface PasswordPromptProps {
  onSubmit: (password: string) => void;
  error?: string;
  caseStudyTitle: string;
}

export default function PasswordPrompt({ onSubmit, error, caseStudyTitle }: PasswordPromptProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          {/* Lock Icon */}
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-gray-100 p-3">
              <svg
                className="h-8 w-8 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">
            Password Protected
          </h2>
          <p className="mb-6 text-center text-gray-600">
            This case study requires a password to view
          </p>

          {/* Case Study Name */}
          <div className="mb-6 rounded-md bg-gray-50 px-4 py-3">
            <p className="text-sm font-medium text-gray-900">{caseStudyTitle}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                placeholder="Enter password"
                autoFocus
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 rounded-md bg-red-50 px-4 py-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
            >
              Unlock Case Study
            </button>
          </form>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <a
              href="/#work"
              className="text-sm text-gray-600 transition-colors hover:text-gray-900"
            >
              ← Back to portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
