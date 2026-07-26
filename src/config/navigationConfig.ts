import { RoleKey } from './roles';

export interface NavItemConfig {
  id: string;
  label: string;
  path: string;
}

export const NAV_ITEMS: NavItemConfig[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  { id: 'executive-assistant', label: 'AI Operating System', path: '/executive-assistant' },
  { id: 'board-snapshot', label: 'Board Snapshot', path: '/board-snapshot' },
  { id: 'sales', label: 'Sales', path: '/sales' },
  { id: 'my-day', label: 'My Day', path: '/my-day' },
  { id: 'customers', label: 'Customers', path: '/customers' },
  { id: 'service', label: 'Service', path: '/service' },
  { id: 'workforce', label: 'Workforce', path: '/workforce' },
  { id: 'inventory', label: 'Inventory', path: '/inventory' },
  { id: 'installations', label: 'Installations', path: '/installations' },
  { id: 'documents', label: 'Documentation', path: '/documents' },
  { id: 'settings', label: 'Settings', path: '/settings' },
];

export const ROLE_NAV_MAP: Record<RoleKey, string[]> = {
  // Founder should see almost all modules except personal 'My Day' which is for field engineers
  Founder: NAV_ITEMS.map((n) => n.id).filter((id) => id !== 'my-day'),
  'Operations Manager': ['dashboard', 'service', 'installations', 'inventory', 'documents','workforce'],
  'Sales Manager': ['dashboard', 'sales', 'customers', 'documents'],
  'Service Manager': ['dashboard','service', 'installations', 'documents'],
  'Field Engineer': ['dashboard', 'service', 'documents', 'my-day'],
  'System Administrator': ['settings', 'documents', 'dashboard'],
};

export default NAV_ITEMS;
