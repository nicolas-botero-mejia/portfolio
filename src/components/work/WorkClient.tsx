'use client';

import Image from 'next/image';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { getRoute, getCompanyName, getWorkTypeLabel, CONTENT_SLUGS } from '@/data';
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardMeta,
  CardTitle,
} from '@/components/ui';

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
    heroImage: string;
    tags?: string[];
    date?: string;
  };
}

interface WorkClientProps {
  allWork: WorkItem[];
}

// Page layout — primitive scale
const PAGE_LAYOUT = 'bg-background-surface';
const SECTION_LAYOUT = 'px-8 py-16 lg:px-16 lg:py-24';
const HEADER_LAYOUT = 'mb-12';
const TITLE_LAYOUT = 'text-4xl font-bold mb-4 text-content-primary';
const SUBTITLE_LAYOUT = 'text-lg text-content-muted';
const EMPTY_STATE = 'text-content-muted';

// Grid layout
const GRID_LAYOUT = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';

// Card content — badge pill variant
const BADGE_STYLES = 'rounded-full border-0 px-3 py-1';
const CARD_TITLE_STYLES = 'text-2xl group-hover:text-content-muted transition-colors';
const ARROW_STYLES = 'text-content-muted group-hover:text-content-secondary transition-colors text-2xl';
const TAG_STYLES = 'text-xs text-content-muted';

export default function WorkClient({ allWork }: WorkClientProps) {
  const handleWorkCardClick = (slug: string, title: string, position: number) => {
    trackEvent({
      name: 'work_card_click',
      properties: { slug, title, position },
    });
  };

  return (
    <div className={PAGE_LAYOUT}>
      <section className={SECTION_LAYOUT}>
        <div className="max-w-6xl">
          <div className={HEADER_LAYOUT}>
            <h1 className={TITLE_LAYOUT}>Work</h1>
            <p className={SUBTITLE_LAYOUT}>
              Case studies, product features, and projects with measurable impact
            </p>
          </div>

          {allWork.length === 0 ? (
            <p className={EMPTY_STATE}>No work items found.</p>
          ) : (
            <div className={GRID_LAYOUT}>
              {allWork.map((item, index) => (
                <Link
                  key={item.slug}
                  href={getRoute(CONTENT_SLUGS.WORK, undefined, item.slug)}
                  className="block"
                  onClick={() => handleWorkCardClick(item.slug, item.frontmatter.title, index)}
                >
                  <Card as="div" className="group flex flex-col overflow-hidden h-full">
                  {/* Hero image */}
                  <div className="relative w-full aspect-video overflow-hidden rounded-t-lg">
                    <Image
                      src={item.frontmatter.heroImage}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  <CardContent className="flex flex-1 flex-col">
                    <div className="mb-3">
                      <Badge variant="neutral" className={BADGE_STYLES}>
                        {item.frontmatter.subtitle ?? getWorkTypeLabel(item.frontmatter.type)}
                      </Badge>
                    </div>

                    <CardTitle as="h2" className={`${CARD_TITLE_STYLES} mb-2`}>
                      {item.frontmatter.title}
                    </CardTitle>

                    <CardDescription className="mb-4 flex-1">
                      {item.frontmatter.description}
                    </CardDescription>

                    <CardMeta className="flex flex-wrap gap-x-2 gap-y-0">
                      <span className="font-medium text-content-secondary">
                        {getCompanyName(item.frontmatter.company)}
                      </span>
                      <span aria-hidden>•</span>
                      <span>{item.frontmatter.role}</span>
                      <span aria-hidden>•</span>
                      <span>{item.frontmatter.year}</span>
                    </CardMeta>

                    {item.frontmatter.tags && item.frontmatter.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.frontmatter.tags.map((tag) => (
                          <span key={tag} className={TAG_STYLES}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className={`mt-4 flex justify-end ${ARROW_STYLES}`}>→</div>
                  </CardContent>
                </Card>
              </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
