import { PermissionKey } from './permissions';

export type RoleKey =
  | 'Founder'
  | 'Operations Manager'
  | 'Sales Manager'
  | 'Service Manager'
  | 'Field Engineer'
  | 'System Administrator';

export interface RoleConfig {
  key: RoleKey;
  allowedModules: string[];
  dashboardWidgets: string[];
  aiPermissions: PermissionKey[];
  systemPermissions: PermissionKey[];
  documentationPermissions: PermissionKey[];
}

export const ROLES: Record<RoleKey, RoleConfig> = {
  Founder: {
    key: 'Founder',
    allowedModules: ['dashboard', 'customers', 'executive-assistant', 'documents', 'settings'],
    dashboardWidgets: ['executive_summary', 'revenue_trend'],
    aiPermissions: ['all'],
    systemPermissions: ['admin:settings', 'admin:users'],
    documentationPermissions: ['all'],
  },
  'Operations Manager': {
    key: 'Operations Manager',
    allowedModules: ['dashboard', 'service', 'installations', 'inventory', 'documents'],
    dashboardWidgets: ['ops_overview', 'engineer_status'],
    aiPermissions: ['ops:view'],
    systemPermissions: [],
    documentationPermissions: ['service', 'installation'],
  },
  'Sales Manager': {
    key: 'Sales Manager',
    allowedModules: ['dashboard', 'sales', 'customers', 'documents'],
    dashboardWidgets: ['sales_pipeline', 'quota_status'],
    aiPermissions: ['sales:view'],
    systemPermissions: [],
    documentationPermissions: ['commercial'],
  },
  'Service Manager': {
    key: 'Service Manager',
    allowedModules: ['service', 'installations', 'documents'],
    dashboardWidgets: ['service_queue', 'sla_health'],
    aiPermissions: ['service:view'],
    systemPermissions: [],
    documentationPermissions: ['service', 'sop'],
  },
  'Field Engineer': {
    key: 'Field Engineer',
    allowedModules: ['service', 'documents'],
    dashboardWidgets: ['assigned_jobs'],
    aiPermissions: ['field:work'],
    systemPermissions: [],
    documentationPermissions: ['work_instructions'],
  },
  'System Administrator': {
    key: 'System Administrator',
    allowedModules: ['settings', 'documents', 'dashboard'],
    dashboardWidgets: ['system_health'],
    aiPermissions: ['all'],
    systemPermissions: ['admin:settings', 'admin:users'],
    documentationPermissions: ['all'],
  },
};

export default ROLES;
