import PageLayout from '@/components/ui/PageLayout';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';

export default function ExperimentsPage() {
  return (
    <PageLayout maxWidth="md">
      <PageHeader
        title="Experiments"
        description="Design explorations, code experiments, and interactive prototypes"
      />

      <EmptyState
        title="No experiments yet"
        description="Coming soon: Design explorations, code experiments, and prototypes"
      />
    </PageLayout>
  );
}
