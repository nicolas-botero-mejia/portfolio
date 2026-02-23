/**
 * Feature flags — single source of truth for toggling features on/off.
 * Edit this file to enable/disable features across the project.
 *
 * Every toggleable item carries a `label` used by the DevToolsPanel
 * so that display text is defined here, not scattered in UI code.
 *
 * Section and subType slugs match contentTypes.ts exactly (kebab-case).
 * See CLAUDE.md "Feature Flags" section for usage guide.
 */

/** Individual toggle flag with a human-readable label. */
export interface FlagItem {
  label: string;
  enabled: boolean;
}

/** Section flag with optional sub-types. */
export interface SectionFlag {
  label: string;
  enabled: boolean;
  subTypes?: Record<string, FlagItem>;
}

/** Appearance options — key is the mode value, value is the display label. Single source of truth. */
export const APPEARANCE_OPTIONS = {
  auto: 'Auto',
  light: 'Light',
  dark: 'Dark',
} as const;

/** Appearance mode — derived from APPEARANCE_OPTIONS keys. */
export type AppearanceMode = keyof typeof APPEARANCE_OPTIONS;

/** Display group labels for the dev tools panel. */
export const featureGroups = {
  sections: 'Sections',
  analytics: 'Analytics',
  appearance: 'Appearance',
  other: 'Other',
  contact: 'Contact',
  seo: 'SEO',
} as const;

export const features = {
  /** Content sections — controls navigation visibility, route access, and SEO indexing. */
  /** Appearance mode — 'auto' follows system, 'light'/'dark' force the theme. */
  appearance: 'auto' satisfies AppearanceMode,

  sections: {
    work: {
      label: 'Work',
      enabled: true,
      subTypes: {
        products: { label: 'Products', enabled: true },
        features: { label: 'Features', enabled: true },
        'side-projects': { label: 'Side Projects', enabled: true },
        transformations: { label: 'Transformations', enabled: true },
      },
    },
    experiments: {
      label: 'Experiments',
      enabled: false,
      subTypes: {
        design: { label: 'Design', enabled: true },
        code: { label: 'Code', enabled: true },
        prototypes: { label: 'Prototypes', enabled: true },
      },
    },
    reading: {
      label: 'Reading',
      enabled: false,
      subTypes: {
        books: { label: 'Books', enabled: true },
        articles: { label: 'Articles', enabled: true },
      },
    },
    writing: {
      label: 'Writing',
      enabled: false,
      subTypes: {
        posts: { label: 'Posts', enabled: true },
        thoughts: { label: 'Thoughts', enabled: true },
        quotes: { label: 'Quotes', enabled: true },
      },
    },
    about: { label: 'About', enabled: true },
    now: { label: 'Now', enabled: true },
    uses: { label: 'Uses', enabled: true },
    colophon: { label: 'Colophon', enabled: true },
  } satisfies Record<string, SectionFlag>,

  /** Sidebar contact section elements */
  contact: {
    email: { label: 'Email', enabled: true },
    linkedin: { label: 'LinkedIn', enabled: true },
    location: { label: 'Location', enabled: true },
    availability: { label: 'Availability', enabled: true },
  },

  /** Analytics providers */
  analytics: {
    googleAnalytics: { label: 'Google Analytics', enabled: true },
    amplitude: { label: 'Amplitude', enabled: true },
  },

  /** Password protection for locked work items */
  passwordProtection: { label: 'Password Protection', enabled: true },

  /** SEO features */
  seo: {
    sitemap: { label: 'Sitemap', enabled: true },
    openGraph: { label: 'Open Graph', enabled: true },
    twitterCards: { label: 'Twitter Cards', enabled: true },
    schemaOrg: { label: 'Schema.org', enabled: true },
  },
};

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
  return section?.subTypes?.[subTypeSlug]?.enabled ?? true;
}
