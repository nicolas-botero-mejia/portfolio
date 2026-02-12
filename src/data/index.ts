// Config - structure, taxonomy, site configuration
export { companies, getCompany, getCompanyName } from './config/companies';
export type { Company } from './config/companies';
export { contentTypes, getContentType, getContentSubType, getBreadcrumbLabel } from './config/contentTypes';
export { navigation } from './config/navigation';
export type { NavItem } from './config/navigation';
export { routes, getRoute } from './config/routes';
export type { RouteKey } from './config/routes';
export { readingStatuses, getReadingStatus } from './config/readingStatuses';
export type { ReadingStatus } from './config/readingStatuses';
export { workTypes, getWorkTypeLabel } from './config/workTypes';
export type { WorkType } from './config/workTypes';
export { site } from './config/site';
export { tagGroups, allTags, isValidTag } from './config/tags';
export { colors, semanticColors, spacing, typography, radii, border, getTokensForFigma } from './config/tokens';
export type { TokenCollection } from './config/tokens';
export type { TagGroup } from './config/tags';

// Content - profile, experience, workflow (editorial content)
export { profile } from './content/profile';
export type { ProfileData } from './content/profile';
export { experience } from './content/experience';
export type { ExperienceItem } from './content/experience';
export { workflowPhases, designPrinciples } from './content/workflow';
export type { WorkflowPhase, DesignPrinciple } from './content/workflow';
