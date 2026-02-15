import PageLayout from '@/components/ui/PageLayout';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';

export default function WritingPage() {
  return (
    <PageLayout maxWidth="md">
      <PageHeader
        title="Writing"
        description="Articles, thoughts, and curated quotes with personal reflections"
      />

      <EmptyState
        title="No writing content yet"
        description="Coming soon: Blog posts, thoughts, and curated quotes"
      />
    </PageLayout>
  );
}
