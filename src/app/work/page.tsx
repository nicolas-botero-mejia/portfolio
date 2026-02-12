import WorkClient from '@/components/work/WorkClient';
import { getAllWork } from '@/lib/mdx';

export default function WorkPage() {
  const allWork = getAllWork();
  return <WorkClient allWork={allWork} />;
}
