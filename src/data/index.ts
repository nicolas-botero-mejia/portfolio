// Sources - raw reference data (no logic)
export { companies, COMPANY_SLUGS } from './sources/companies';
export type { Company } from './sources/companies';
export { contentTypes } from './sources/contentTypes';
export type { ContentType, ContentSubType } from './sources/contentTypes';
export { readingStatuses, READING_STATUS_SLUGS } from './sources/readingStatuses';
export type { ReadingStatus } from './sources/readingStatuses';
export { workTypes, WORK_TYPE_SLUGS } from './sources/workTypes';
export type { WorkType } from './sources/workTypes';
export { site } from './sources/site';
export { tagGroups } from './sources/tags';
export type { TagGroup } from './sources/tags';
export {
  colors,
  semanticColors,
  themes,
  spacing,
  typography,
  radii,
  border,
} from './sources/tokens';
export type { TokenCollection, SemanticTheme } from './sources/tokens';

// Resolvers - lookup and transformation logic
export { getCompany, getCompanyName } from './resolvers/companies';
export {
  getContentType,
  getContentSubType,
  getBreadcrumbLabel,
  CONTENT_SLUGS,
} from './resolvers/contentTypes';
export { getReadingStatus } from './resolvers/readingStatuses';
export { getWorkTypeLabel } from './resolvers/workTypes';
export { allTags, isValidTag } from './resolvers/tags';
export { getTokensForFigma, getTokensForCSS } from './resolvers/tokens';
export type { CSSTokens, CSSThemeOutput } from './resolvers/tokens';

// Derived - computed from sources
export { navigation } from './derived/navigation';
export type { NavItem } from './derived/navigation';
export { routes, getRoute } from './derived/routes';
export type { RouteKey } from './derived/routes';

// Content - editorial content (unchanged)
export { profile } from './content/profile';
export type { ProfileData } from './content/profile';
export { experience } from './content/experience';
export type { ExperienceItem } from './content/experience';
export { workflowPhases, designPrinciples } from './content/workflow';
export type { WorkflowPhase, DesignPrinciple } from './content/workflow';
