import TopNav from '@/components/layout/TopNav';
import Sidebar from '@/components/layout/Sidebar';

interface SplitLayoutProps {
  children: React.ReactNode;
}

const MAIN_CONTENT_ID = 'main-content';

export default function SplitLayout({ children }: SplitLayoutProps): React.ReactElement {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Panel - Fixed on Desktop */}
      <aside className="lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-[400px] lg:overflow-y-auto bg-background-muted border-b lg:border-r border-border-default">
        <Sidebar />
      </aside>

      {/* Right Panel - Scrollable Content Area */}
      <main id={MAIN_CONTENT_ID} className="flex-1 overflow-x-hidden lg:ml-[400px] lg:h-screen lg:overflow-y-auto">
        <TopNav scrollContainerId={MAIN_CONTENT_ID} />
        <div className="min-h-screen">{children}</div>
      </main>
    </div>
  );
}
