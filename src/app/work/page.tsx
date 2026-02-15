import WorkClient from '@/components/work/WorkClient';
import PageLayout from '@/components/ui/PageLayout';
import { getAllWork } from '@/lib/mdx';

export default function WorkPage() {
  const allWork = getAllWork();
  return (
    <PageLayout maxWidth="lg">
      <WorkClient allWork={allWork} />
    </PageLayout>
  );
}
