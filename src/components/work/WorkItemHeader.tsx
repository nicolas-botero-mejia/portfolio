import Link from '@/components/ui/Link';
import { H1 } from '@/components/ui/Typography';
import type { WorkItemFrontmatter } from '@/lib/mdx';

interface WorkItemHeaderProps {
  frontmatter: WorkItemFrontmatter;
}

export default function WorkItemHeader({ frontmatter }: WorkItemHeaderProps) {
  const hasMeta =
    frontmatter.role ||
    frontmatter.duration ||
    frontmatter.year ||
    frontmatter.location ||
    frontmatter.teamLocation ||
    frontmatter.teamSize ||
    frontmatter.devices?.length ||
    frontmatter.websiteUrl;

  return (
    <header className="mb-12">
      <H1 className="mb-4">{frontmatter.title}</H1>

      <p className="mb-6 text-lg text-content-muted leading-relaxed">
        {frontmatter.description}
      </p>

      {hasMeta && (
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-content-muted border-t border-b border-border-default py-4">
          {frontmatter.role && (
            <div>
              <span className="font-medium text-content-primary">Role:</span> {frontmatter.role}
            </div>
          )}
          {frontmatter.duration && (
            <div>
              <span className="font-medium text-content-primary">Duration:</span> {frontmatter.duration}
            </div>
          )}
          {frontmatter.year && (
            <div>
              <span className="font-medium text-content-primary">Year:</span> {frontmatter.year}
            </div>
          )}
          {frontmatter.location && (
            <div>
              <span className="font-medium text-content-primary">Location:</span> {frontmatter.location}
            </div>
          )}
          {frontmatter.teamLocation && (
            <div>
              <span className="font-medium text-content-primary">Team location:</span> {frontmatter.teamLocation}
            </div>
          )}
          {frontmatter.teamSize && (
            <div>
              <span className="font-medium text-content-primary">Team size:</span> {frontmatter.teamSize}
            </div>
          )}
          {frontmatter.devices && frontmatter.devices.length > 0 && (
            <div>
              <span className="font-medium text-content-primary">Devices:</span> {frontmatter.devices.join(', ')}
            </div>
          )}
          {frontmatter.websiteUrl && (
            <div>
              <span className="font-medium text-content-primary">Website:</span>{' '}
              <Link
                href={frontmatter.websiteUrl}
                external
                className="text-content-muted hover:text-content-primary transition-colors underline underline-offset-2"
              >
                {frontmatter.websiteDomain ?? frontmatter.websiteUrl}
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
