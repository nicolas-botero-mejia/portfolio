import WorkClient from '@/components/work/WorkClient';
import { getCaseStudies, getFeatures } from '@/lib/mdx';

export default function WorkPage() {
  const caseStudies = getCaseStudies();
  const features = getFeatures();
  const allWork = [...caseStudies, ...features].sort((a, b) => {
    const dateA = a.frontmatter.date || a.frontmatter.year;
    const dateB = b.frontmatter.date || b.frontmatter.year;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  return <WorkClient allWork={allWork} />;
}
