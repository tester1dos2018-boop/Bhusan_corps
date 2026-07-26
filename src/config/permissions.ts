export type PermissionKey = string;

export interface PermissionDef {
  key: PermissionKey;
  description: string;
}

export const PERMISSIONS: Record<string, PermissionDef> = {
  all: { key: 'all', description: 'All permissions (demo only)' },
  'ops:view': { key: 'ops:view', description: 'View operations dashboards' },
  'ops:edit': { key: 'ops:edit', description: 'Edit operations settings' },
  'sales:view': { key: 'sales:view', description: 'View sales data' },
  'sales:quote': { key: 'sales:quote', description: 'Create and manage quotations' },
  'service:view': { key: 'service:view', description: 'View service workflows' },
  'service:schedule': { key: 'service:schedule', description: 'Schedule service visits' },
  'field:work': { key: 'field:work', description: 'Access field engineer tasks and checklists' },
  'admin:settings': { key: 'admin:settings', description: 'Manage system settings' },
  'admin:users': { key: 'admin:users', description: 'Manage users and roles' },
};

export default PERMISSIONS;
