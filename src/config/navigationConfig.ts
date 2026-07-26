import { RoleKey } from './roles';

export interface NavItemConfig {
  id: string;
  label: string;
  path: string;
}

export const NAV_ITEMS: NavItemConfig[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  { id: 'executive-assistant', label: 'AI Operating System', path: '/executive-assistant' },
  { id: 'sales', label: 'Sales', path: '/sales' },
  { id: 'customers', label: 'Customers', path: '/customers' },
  { id: 'service', label: 'Service', path: '/service' },
  { id: 'workforce', label: 'Workforce', path: '/workforce' },
  { id: 'inventory', label: 'Inventory', path: '/inventory' },
  { id: 'installations', label: 'Installations', path: '/installations' },
  { id: 'documents', label: 'Documentation', path: '/documents' },
  { id: 'settings', label: 'Settings', path: '/settings' },
];

export const ROLE_NAV_MAP: Record<RoleKey, string[]> = {
  Founder: NAV_ITEMS.map((n) => n.id),
  'Operations Manager': ['dashboard', 'service', 'installations', 'inventory', 'documents'],
  'Sales Manager': ['dashboard', 'sales', 'customers', 'documents'],
  'Service Manager': ['service', 'installations', 'documents'],
  'Field Engineer': ['service', 'documents'],
  'System Administrator': ['settings', 'documents', 'dashboard'],
};

export default NAV_ITEMS;
