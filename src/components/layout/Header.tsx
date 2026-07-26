import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, Menu, Moon, PanelLeftClose, PanelLeftOpen, Search, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { getNavigationItemByPath } from '../../config/navigation';
import { cn } from '../../lib/utils';
import { Avatar, AvatarFallback, NotificationButton, SearchBar, Button } from '../ui';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../config/roles';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onOpenMobileSidebar: () => void;
}

export const Header = ({ isSidebarCollapsed, onToggleSidebar, onOpenMobileSidebar }: HeaderProps) => {
  const location = useLocation();
  const activeItem = useMemo(() => getNavigationItemByPath(location.pathname), [location.pathname]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { currentUser, logout, loginAsRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-white/80 px-4 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-primary/80 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <button
            className="rounded-full p-2 text-primary/70 transition-colors hover:bg-primary/5 hover:text-primary dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white lg:hidden"
            onClick={onOpenMobileSidebar}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <button
            className="hidden rounded-full p-2 text-primary/70 transition-colors hover:bg-primary/5 hover:text-primary dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white lg:inline-flex"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            {isSidebarCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          </button>

          <div className="min-w-0">
            <nav className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-primary/40 dark:text-white/40" aria-label="Breadcrumb">
              <Link to="/dashboard" className="transition-colors hover:text-accent dark:hover:text-accent">Bhushancorp AIOS</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="truncate text-primary/60 dark:text-white/60">{activeItem.label}</span>
            </nav>
            <h2 className="mt-1 truncate font-serif text-xl font-semibold text-primary dark:text-white">{activeItem.label}</h2>
          </div>
        </div>

        <div className="hidden flex-1 justify-center px-4 md:flex">
          <SearchBar placeholder="Search sales, customers, projects, documents..." wrapperClassName="w-full max-w-xl dark:border-white/10 dark:bg-white/10" />
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button className="rounded-full p-2 text-primary/70 transition-colors hover:bg-primary/5 hover:text-primary dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white md:hidden" aria-label="Search">
            <Search className="h-5 w-5" />
          </button>
          <NotificationButton hasUnread className="dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white" />
          <button
            className="rounded-full p-2 text-primary/70 transition-colors hover:bg-primary/5 hover:text-primary dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
            onClick={() => setIsDarkMode((value) => !value)}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <div className="relative">
            <button
              className="ml-1 flex items-center gap-2 rounded-full border border-border bg-white px-2 py-1.5 shadow-sm transition-colors hover:bg-primary/5 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
              onClick={() => setIsProfileOpen((value) => !value)}
              aria-expanded={isProfileOpen}
              aria-label="Open profile menu"
            >
              <Avatar size="sm">
                <AvatarFallback className="bg-accent/10 text-accent">{(currentUser?.name ?? 'PK').split(' ').map(n => n[0]).slice(0,2).join('')}</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-semibold text-primary dark:text-white sm:inline">{currentUser?.name ?? 'BhushanCorps'}</span>
              <ChevronDown className={cn('hidden h-4 w-4 text-primary/45 transition-transform dark:text-white/45 sm:inline', isProfileOpen && 'rotate-180')} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-[16px] border border-border bg-white p-2 shadow-soft dark:border-white/10 dark:bg-primary">
                <div className="border-b border-border/80 px-3 py-3 dark:border-white/10">
                  <p className="text-sm font-semibold text-primary dark:text-white">{currentUser?.name ?? 'Bhushan Corps'}</p>
                  <p className="text-xs text-primary/45 dark:text-white/45">{currentUser?.role ?? 'Executive administrator'}</p>
                </div>
                <div className="p-2">
                  <Button size="sm" variant="ghost" onClick={() => alert('Open profile (demo)')} className="w-full">Profile</Button>
                  <div className="mt-2">
                    <p className="text-xs text-primary/60 px-2">Switch role</p>
                    <div className="mt-2 space-y-2">
                      {Object.keys(ROLES).map((r) => (
                        <Button key={r} size="sm" variant="outline" onClick={() => { loginAsRole(r as any); setIsProfileOpen(false); navigate('/'); }} className="w-full text-left">{r}</Button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button size="sm" variant="secondary" onClick={() => { logout(); navigate('/login'); }} className="w-full">Logout</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 md:hidden">
        <SearchBar placeholder="Search workspace..." wrapperClassName="dark:border-white/10 dark:bg-white/10" />
      </div>
    </header>
  );
};
