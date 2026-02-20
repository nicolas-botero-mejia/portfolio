'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from '@/components/ui/Link';
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics';
import { getRoute, getCompanyName, getWorkTypeLabel, CONTENT_SLUGS } from '@/data';
import { useFilteredContent } from '@/lib/useFilteredContent';
import type { WorkItem } from '@/lib/mdx';
import { getWorkThumbnailPath, type WorkSubType } from '@/lib/contentPaths';
import {
  Badge,
  Card,
  EmptyState,
  PageHeader,
  ScrollPrompt,
} from '@/components/ui';
import { H2 } from '@/components/ui/Typography';

// How many cards show before scrolling; how many we add when the scroll prompt is triggered. Tune here or expose as props for per-page control.
const INITIAL_VISIBLE = 4;
const LOAD_MORE_STEP = 4;

interface WorkClientProps {
  allWork: WorkItem[];
  title: string;
  description: string;
}

// 2-col grid for landscape cards (reference: 2x2)
const GRID_LAYOUT = 'grid grid-cols-1 sm:grid-cols-2 gap-2';

// Card: light gray bg with image bottom-center at 80% width; text on top
const CARD_ASPECT = 'aspect-video';
const CARD_CATEGORY = 'text-sm text-content-muted/60';
const CARD_LINK_HINT =
  'flex items-center gap-1.5 text-xs text-content-muted group-hover:text-content-primary transition-colors';
const CARD_META_OVERLAY = 'opacity-75';

export default function WorkClient({ allWork, title, description }: WorkClientProps) {
  const filteredWork = useFilteredContent(CONTENT_SLUGS.WORK, allWork);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const visibleWork = filteredWork.slice(0, visibleCount);
  const hasMore = visibleCount < filteredWork.length;

  const handleWorkCardClick = (slug: string, title: string, position: number) => {
    trackEvent({
      name: ANALYTICS_EVENTS.WORK_CARD_CLICK,
      properties: { slug, title, position },
    });
  };

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_STEP, filteredWork.length));
  };

  return (
    <>
      <PageHeader
        title={title}
        description={description}
      />

      {filteredWork.length === 0 ? (
        <EmptyState
          title="No work samples yet"
          description="Work samples will appear here when added"
        />
      ) : (
        <>
          <div className={GRID_LAYOUT}>
            {visibleWork.map((item, index) => (
              <Link
                key={item.slug}
                href={getRoute(CONTENT_SLUGS.WORK, item.subType, item.slug)}
                block
                className="group no-underline"
                onClick={() =>
                  handleWorkCardClick(item.slug, item.frontmatter.title, index)
                }
              >
                <Card
                  as="div"
                  className={`relative isolate overflow-hidden shadow-none rounded-lg border-none bg-background-muted hover:bg-background-subtle transition-colors ${CARD_ASPECT}`}
                >
                  {/* Image: only absolute element; -z-10 keeps it behind content, z-10 on hover surfaces it */}
                  <div className="absolute bottom-0 left-[10%] right-[10%] top-0 -z-10 group-hover:z-10">
                    <div className="h-full w-full transition-transform duration-200 group-hover:scale-105">
                      <Image
                        src={getWorkThumbnailPath(item.subType as WorkSubType, item.slug)}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 80vw, 40vw"
                        className="object-contain object-bottom drop-shadow-sm transition-[filter] duration-200 group-hover:drop-shadow-lg"
                      />
                    </div>
                  </div>

                  {/* Content: normal flow column fills card height; naturally above -z-10 image */}
                  <div className="flex h-full flex-col justify-between bg-linear-to-t from-background-muted/90 to-transparent">
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className={CARD_CATEGORY}>
                        {getWorkTypeLabel(item.frontmatter.type)} · {item.frontmatter.subtitle}
                      </span>
                      <div className={CARD_LINK_HINT}>
                        <svg
                          className="h-3.5 w-3.5 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 17L17 7M17 7H7M17 7v10"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Bottom text: gradient baked in; fades on hover/focus so image takes over */}
                    <div className="flex flex-col items-start gap-1 px-4 py-3 transition-opacity duration-200 group-hover:opacity-10 group-focus-within:opacity-0">
                      <Badge variant="success" className={CARD_META_OVERLAY}>
                        {[
                          item.frontmatter.company && getCompanyName(item.frontmatter.company),
                          // item.frontmatter.role,
                          item.frontmatter.year,
                        ].filter(Boolean).join(' · ')}
                      </Badge>
                      <H2 className="mt-0 mb-0">
                        {item.frontmatter.title}
                      </H2>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {hasMore && (
            <ScrollPrompt
              label="Scroll for more"
              onVisible={loadMore}
              once={false}
            />
          )}
        </>
      )}
    </>
  );
}
