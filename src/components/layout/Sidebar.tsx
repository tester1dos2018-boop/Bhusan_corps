import { ChevronRight, LogOut, X } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { navigationItems, type NavigationItem } from '../../config/navigation';
import { ROLE_NAV_MAP } from '../../config/navigationConfig';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

interface SidebarItemProps {
  item: NavigationItem;
  isCollapsed: boolean;
  onNavigate?: () => void;
}

const SidebarItem = ({ item, isCollapsed, onNavigate }: SidebarItemProps) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      onClick={onNavigate}
      title={isCollapsed ? item.label : undefined}
      className={({ isActive }) =>
        cn(
          'group flex items-center rounded-2xl px-4 py-3 transition-all duration-200',
          isCollapsed ? 'justify-center' : 'justify-between',
          isActive
            ? 'bg-accent/10 text-accent shadow-sm dark:bg-accent/15'
            : 'text-primary/70 hover:bg-primary/5 hover:text-primary dark:text-white/65 dark:hover:bg-white/10 dark:hover:text-white'
        )
      }
    >
      <span className={cn('flex min-w-0 items-center gap-3', isCollapsed && 'justify-center')}>
        <Icon className="h-5 w-5 shrink-0" />
        {!isCollapsed && <span className="truncate text-sm font-medium">{item.label}</span>}
      </span>
      {!isCollapsed && <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />}
    </NavLink>
  );
};

const LogoutButton = ({ isCollapsed, onCloseMobile }: { isCollapsed: boolean; onCloseMobile?: () => void }) => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
    if (onCloseMobile) onCloseMobile();
    navigate('/login');
  };

  return (
    <button
      className={cn(
        'mt-3 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-danger transition-all duration-200 hover:bg-danger/5',
        isCollapsed && 'justify-center px-0'
      )}
      onClick={handleLogout}
    >
      <LogOut className="h-5 w-5" />
      {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
    </button>
  );
};

export const Sidebar = ({ isCollapsed, isMobileOpen, onCloseMobile }: SidebarProps) => {
  const auth = useAuth();

  const sidebarContent = (isMobile = false) => {
    const role = auth.currentUser?.role;
    const allowedIds = role ? (ROLE_NAV_MAP[role as keyof typeof ROLE_NAV_MAP] ?? navigationItems.map((i) => i.path.replace('/', ''))) : navigationItems.map((i) => i.path.replace('/', ''));

    return (
    <>
      <div className={cn('flex items-start gap-3', isCollapsed && !isMobile ? 'justify-center' : 'justify-between')}>
        <div className={cn('rounded-[16px] border border-border/80 bg-primary px-5 py-5 text-white shadow-soft dark:border-white/10', isCollapsed && !isMobile && 'px-3')}>
          <p className={cn('text-[10px] uppercase tracking-[0.3em] text-white/70', isCollapsed && !isMobile && 'sr-only')}>Bhushancorp Group</p>
          <h1 className={cn('mt-3 font-serif text-xl font-semibold tracking-tight', isCollapsed && !isMobile && 'mt-0 text-center text-lg')}>
            {isCollapsed && !isMobile ? 'BA' : (
              <>BHUSHANCORP <span className="text-accent italic">AIOS</span></>
            )}
          </h1>
          {(!isCollapsed || isMobile) && <p className="mt-2 text-[11px] text-white/50 uppercase tracking-widest">Industrial Intelligence</p>}
        </div>
        {isMobile && (
          <button className="rounded-full p-2 text-primary/70 hover:bg-primary/5 dark:text-white/70 dark:hover:bg-white/10" onClick={onCloseMobile} aria-label="Close sidebar">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="mt-6 flex-1 space-y-1 overflow-y-auto pr-1">
        {(!isCollapsed || isMobile) && <div className="section-title mb-2 mt-4 px-2">Workspace</div>}
        <div className="space-y-1">
          {navigationItems
            .filter((item) => allowedIds.includes(item.path.replace('/', '')))
            .map((item) => (
              <SidebarItem key={item.path} item={item} isCollapsed={isCollapsed && !isMobile} onNavigate={isMobile ? onCloseMobile : undefined} />
            ))}
        </div>
      </nav>

      <div className={cn('mt-4 rounded-[16px] border border-border bg-background/70 p-4 dark:border-white/10 dark:bg-white/5', isCollapsed && !isMobile && 'p-2')}>
        <div className={cn('flex items-center gap-3', isCollapsed && !isMobile && 'justify-center')}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary dark:bg-white/10 dark:text-white">
            {(auth.currentUser?.name ?? 'PK').split(' ').map(n => n[0]).slice(0,2).join('')}
          </div>
          {(!isCollapsed || isMobile) && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-primary dark:text-white">{auth.currentUser?.name ?? 'BhushanCorps'}</p>
              <p className="truncate text-xs text-primary/45 dark:text-white/45">{auth.currentUser?.role ?? 'Executive admin'}</p>
            </div>
          )}
        </div>
      </div>

      <LogoutButton isCollapsed={isCollapsed && !isMobile} onCloseMobile={isMobile ? onCloseMobile : undefined} />
    </>
  );
  };

  return (
    <>
      <aside
        className={cn(
          'sticky top-0 hidden h-screen flex-col border-r border-border/80 bg-white/75 px-5 py-6 backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-primary/80 lg:flex',
          isCollapsed ? 'w-24' : 'w-72'
        )}
      >
        {sidebarContent(false)}
      </aside>

      {isMobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={onCloseMobile} aria-label="Close sidebar overlay" />
          <aside className="relative z-10 flex h-full w-80 max-w-[86vw] flex-col border-r border-border bg-white px-5 py-6 shadow-soft dark:border-white/10 dark:bg-primary">
            {sidebarContent(true)}
          </aside>
        </div>
      )}
    </>
  );
};
