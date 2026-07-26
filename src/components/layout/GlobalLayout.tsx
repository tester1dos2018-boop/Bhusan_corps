import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';
import { Toast } from '../ui/Toast';
import { useAppState } from '../../context/AppContext';
import { Badge, Card } from '../ui';

export const GlobalLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { currentToast, isTransitioning, businessState } = useAppState();

  return (
    <div className="min-h-screen bg-background text-primary dark:bg-primary dark:text-white">
      <div className="flex min-h-screen">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />
        <div className="flex min-h-screen flex-1 flex-col min-w-0">
          <Header
            isSidebarCollapsed={isSidebarCollapsed}
            onToggleSidebar={() => setIsSidebarCollapsed((value) => !value)}
            onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          />
          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
              {isTransitioning ? (
                <div className="rounded-[16px] border border-border/80 bg-white/80 p-4 text-sm text-primary/65 shadow-sm">
                  Loading workflow context...
                </div>
              ) : null}
              <Card className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-primary">Notification Center</p>
                    <p className="text-sm text-primary/55">{businessState.notifications[0]?.title ?? 'No recent activity'}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {businessState.notifications.slice(0, 3).map((notification) => (
                      <Badge key={notification.id} variant={notification.tone === 'success' ? 'success' : notification.tone === 'accent' ? 'accent' : notification.tone === 'warning' ? 'warning' : 'muted'}>{notification.title}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      <Toast message={currentToast} />
    </div>
  );
};
