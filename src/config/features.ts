/**
 * Feature flags — single source of truth for toggling features on/off.
 * Edit this file to enable/disable features across the project.
 *
 * Section and subType slugs match contentTypes.ts exactly (kebab-case).
 * See CLAUDE.md "Feature Flags" section for usage guide.
 */

interface SectionFlag {
  enabled: boolean;
  subTypes?: Record<string, boolean>;
}

export const features = {
  /** Content sections — controls navigation visibility, route access, and SEO indexing. */
  sections: {
    work: {
      enabled: true,
      subTypes: {
        products: true,
        features: true,
        'side-projects': true,
        transformations: true,
      },
    },
    experiments: {
      enabled: true,
      subTypes: {
        design: true,
        code: true,
        prototypes: true,
      },
    },
    reading: {
      enabled: true,
      subTypes: {
        books: true,
        articles: true,
      },
    },
    writing: {
      enabled: true,
      subTypes: {
        posts: true,
        thoughts: true,
        quotes: true,
      },
    },
    about: { enabled: true },
    now: { enabled: true },
    uses: { enabled: true },
    colophon: { enabled: true },
  } satisfies Record<string, SectionFlag>,

  /** Analytics providers */
  analytics: {
    googleAnalytics: true,
    amplitude: true,
  },

  /** Password protection for locked work items */
  passwordProtection: true,

  /** Dark mode / theme switching */
  darkMode: true,

  /** Sidebar contact section elements */
  contact: {
    email: true,
    linkedin: true,
    location: true,
    availability: true,
  },

  /** SEO features */
  seo: {
    sitemap: true,
    openGraph: true,
    twitterCards: true,
    schemaOrg: true,
  },
} as const;

/** Check if a section is enabled. */
export function isSectionEnabled(sectionSlug: string): boolean {
  const section = features.sections[sectionSlug as keyof typeof features.sections];
  return section?.enabled ?? true;
}

/** Check if a specific subType within a section is enabled.
 *  Returns false if the parent section is disabled.
 *  Slugs match contentTypes.ts exactly — no mapping needed. */
export function isSubTypeEnabled(sectionSlug: string, subTypeSlug: string): boolean {
  if (!isSectionEnabled(sectionSlug)) return false;
  const section = features.sections[sectionSlug as keyof typeof features.sections] as SectionFlag | undefined;
  return section?.subTypes?.[subTypeSlug] ?? true;
}
