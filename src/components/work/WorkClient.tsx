'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { getRoute, getCompanyName, getWorkTypeLabel, CONTENT_SLUGS } from '@/data';

interface WorkItem {
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    role: string;
    year: string;
    type: string;
    subtitle?: string;
    company: string;
    tags?: string[];
    date?: string;
  };
}

interface WorkClientProps {
  allWork: WorkItem[];
}

export default function WorkClient({ allWork }: WorkClientProps) {
  const handleWorkCardClick = (slug: string, title: string, position: number) => {
    trackEvent({
      name: 'work_card_click',
      properties: { slug, title, position },
    });
  };

  return (
    <div className="bg-white">
      <section className="px-8 py-16 lg:px-16 lg:py-24">
        <div className="max-w-5xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Work</h1>
            <p className="text-lg text-gray-600">
              Case studies, product features, and projects with measurable impact
            </p>
          </div>

          {/* Filters/Tabs - Phase 2 */}
          {/* TODO: Add filtering by type (all, case-studies, features, side-projects) */}
          {/* TODO: Add "Load More" or pagination when you have 10+ items */}

          {/* Content Grid */}
          <div className="space-y-8">
            {allWork.length === 0 ? (
              <p className="text-gray-500">No work items found.</p>
            ) : (
              allWork.map((item, index) => (
                <Link
                  key={item.slug}
                  href={getRoute(CONTENT_SLUGS.WORK, undefined, item.slug)}
                  className="group block border-b border-gray-200 pb-8 transition-all hover:border-gray-400"
                  onClick={() => handleWorkCardClick(item.slug, item.frontmatter.title, index)}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      {/* Type / Subtitle Badge */}
                      <div className="mb-2">
                        <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                          {item.frontmatter.subtitle ?? getWorkTypeLabel(item.frontmatter.type)}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
                        {item.frontmatter.title}
                      </h2>

                      {/* Description */}
                      <p className="text-gray-600 mb-4">
                        {item.frontmatter.description}
                      </p>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                        <span className="font-medium text-gray-700">{getCompanyName(item.frontmatter.company)}</span>
                        <span>•</span>
                        <span>{item.frontmatter.role}</span>
                        <span>•</span>
                        <span>{item.frontmatter.year}</span>
                      </div>

                      {/* Tags */}
                      {item.frontmatter.tags && item.frontmatter.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.frontmatter.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-gray-500"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Arrow */}
                    <div className="text-gray-400 group-hover:text-gray-600 transition-colors text-2xl">
                      →
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
