import {
  ClipboardList,
  Cpu,
  FileText,
  LayoutDashboard,
  Settings,
  TrendingUp,
  Truck,
  Users,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

export interface NavigationItem {
  label: string;
  path: string;
  icon: LucideIcon;
  description: string;
}

export const navigationItems: NavigationItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, description: 'Executive overview and operating signals.' },
  { label: 'Board Snapshot', path: '/board-snapshot', icon: FileText, description: 'Executive board snapshot and AI brief.' },
  { label: 'Sales and Pipelines', path: '/sales', icon: TrendingUp, description: 'Revenue pipeline and commercial performance.' },
  { label: 'My Day', path: '/my-day', icon: Users, description: 'Your assigned field visits and tasks.' },
  { label: 'Customer Accounts', path: '/customers', icon: Users, description: 'Customer relationships and account intelligence.' },
  { label: 'Service Operations', path: '/service', icon: Wrench, description: 'Field service, support, and maintenance operations.' },
  { label: 'Equipment and Spares', path: '/inventory', icon: Truck, description: 'Inventory, spare parts, and logistics.' },
  { label: 'Installations', path: '/installations', icon: ClipboardList, description: 'Installation projects and site readiness.' },
  { label: 'Workforce', path: '/workforce', icon: Users, description: 'Field engineer operations and optimization.' },
  { label: 'AI Operating System', path: '/executive-assistant', icon: Cpu, description: 'AI-assisted workflows and operational copilots.' },
  { label: 'Documentation', path: '/documents', icon: FileText, description: 'Enterprise documents and controlled records.' },
  { label: 'System Settings', path: '/settings', icon: Settings, description: 'Platform preferences, access, and configuration.' },
];

export const getNavigationItemByPath = (pathname: string) =>
  navigationItems.find((item) => item.path === pathname) ?? navigationItems[0];