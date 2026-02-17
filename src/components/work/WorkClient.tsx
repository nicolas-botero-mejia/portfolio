'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { getRoute, getCompanyName, getWorkTypeLabel, CONTENT_SLUGS } from '@/data';
import type { WorkItem } from '@/lib/mdx';
import { getWorkThumbnailPath, type WorkSubType } from '@/lib/contentPaths';
import {
  Badge,
  Card,
  EmptyState,
  PageHeader,
  ScrollPrompt,
} from '@/components/ui';

// How many cards show before scrolling; how many we add when the scroll prompt is triggered. Tune here or expose as props for per-page control.
const INITIAL_VISIBLE = 4;
const LOAD_MORE_STEP = 4;

interface WorkClientProps {
  allWork: WorkItem[];
  title: string;
  description: string;
}

// 2-col grid for landscape cards (reference: 2x2)
const GRID_LAYOUT = 'grid grid-cols-1 sm:grid-cols-2 gap-6';

// Overlay card: 16:9, image at back + gradient, text overlaid; text gains opacity on hover
const CARD_ASPECT = 'aspect-video';
const CARD_GRADIENT =
  'absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent pointer-events-none';
const CARD_CATEGORY = 'text-xs text-white/80';
const CARD_LINK_HINT =
  'flex items-center gap-1.5 text-xs text-white/80 group-hover:text-white transition-colors';
const BADGE_OVERLAY = 'rounded-full border-0 px-3 py-1 bg-white/20 text-white';
const CARD_TITLE_OVERLAY =
  'font-[Georgia,"Times New Roman",serif] text-2xl md:text-3xl text-white opacity-90 group-hover:opacity-100 transition-opacity';
const CARD_META_OVERLAY = 'text-xs text-white/80';
const TAG_OVERLAY = 'text-xs text-white/70';

export default function WorkClient({ allWork, title, description }: WorkClientProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const visibleWork = allWork.slice(0, visibleCount);
  const hasMore = visibleCount < allWork.length;

  const handleWorkCardClick = (slug: string, title: string, position: number) => {
    trackEvent({
      name: 'work_card_click',
      properties: { slug, title, position },
    });
  };

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_STEP, allWork.length));
  };

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        variant="serif"
      />

      {allWork.length === 0 ? (
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
                className="block"
                onClick={() =>
                  handleWorkCardClick(item.slug, item.frontmatter.title, index)
                }
              >
                <Card
                  as="div"
                  className={`group relative overflow-hidden rounded-lg ${CARD_ASPECT}`}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={getWorkThumbnailPath(item.subType as WorkSubType, item.slug)}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className={CARD_GRADIENT} />
                  <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className={CARD_CATEGORY}>
                        Work · {getWorkTypeLabel(item.frontmatter.type)}
                      </span>
                      <div className={CARD_LINK_HINT}>
                        <span>Work — {item.frontmatter.title}</span>
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
                    <div className="space-y-2">
                      <Badge variant="neutral" className={BADGE_OVERLAY}>
                        {item.frontmatter.subtitle ??
                          getWorkTypeLabel(item.frontmatter.type)}
                      </Badge>
                      <h2 className={`${CARD_TITLE_OVERLAY} leading-tight`}>
                        {item.frontmatter.title}
                      </h2>
                      <p className={CARD_META_OVERLAY}>
                        {[
                          item.frontmatter.company && getCompanyName(item.frontmatter.company),
                          item.frontmatter.role,
                          item.frontmatter.year,
                        ].filter(Boolean).join(' · ')}
                      </p>
                      {item.frontmatter.tags &&
                        item.frontmatter.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {item.frontmatter.tags.map((tag) => (
                              <span key={tag} className={TAG_OVERLAY}>
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
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
