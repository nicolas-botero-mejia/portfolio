import PageLayout from '@/components/ui/PageLayout';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';

export default function ReadingPage() {
  return (
    <PageLayout maxWidth="md">
      <PageHeader
        title="Reading"
        description="Book notes, article summaries, and reading reflections"
      />

      <EmptyState
        title="No reading content yet"
        description="Coming soon: Book notes and article summaries"
      />
    </PageLayout>
  );
}
