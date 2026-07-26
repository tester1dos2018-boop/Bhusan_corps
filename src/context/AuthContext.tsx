import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Role =
  | 'Founder'
  | 'Operations Manager'
  | 'Sales Manager'
  | 'Service Manager'
  | 'Field Engineer'
  | 'System Administrator';

export interface Permission {
  key: string;
  description?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  permissions: Permission[];
}

interface AuthContextValue {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginAsRole: (role: Role) => void;
  logout: () => void;
}

const STORAGE_KEY = 'bhusan_auth_demo_v1';

// Demo users — all use password 'demo123'
const demoUsers: (User & { password: string })[] = [
  { id: 'U-1', name: 'Bhushan Kumar', email: 'bhushan.kumar@bhushancorp.com', role: 'Founder', permissions: [{ key: 'all' }], password: 'demo123' },
  { id: 'U-2', name: 'Anjali Mehta', email: 'anjali.mehta@bhushancorp.com', role: 'Operations Manager', permissions: [{ key: 'ops:view' }, { key: 'ops:edit' }], password: 'demo123' },
  { id: 'U-3', name: 'Rajat Singh', email: 'rajat.singh@sales.bhushancorp.com', role: 'Sales Manager', permissions: [{ key: 'sales:view' }, { key: 'sales:quote' }], password: 'demo123' },
  { id: 'U-4', name: 'Meera Shah', email: 'meera.shah@service.bhushancorp.com', role: 'Service Manager', permissions: [{ key: 'service:view' }, { key: 'service:schedule' }], password: 'demo123' },
  { id: 'U-5', name: 'Vikram Patel', email: 'vikram.patel@field.bhushancorp.com', role: 'Field Engineer', permissions: [{ key: 'field:work' }], password: 'demo123' },
  { id: 'U-6', name: 'Nilesh Borkar', email: 'nilesh.borkar@it.bhushancorp.com', role: 'System Administrator', permissions: [{ key: 'admin:settings' }, { key: 'admin:users' }], password: 'demo123' },
];

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { userId: string };
        const found = demoUsers.find((u) => u.id === parsed.userId);
        if (found) setCurrentUser({ id: found.id, name: found.name, email: found.email, role: found.role, permissions: found.permissions });
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // remember last email for quick re-login demo
  useEffect(() => {
    try {
      const last = localStorage.getItem('bhusan_last_user');
      if (!last && demoUsers[0]) localStorage.setItem('bhusan_last_user', demoUsers[0].email);
    } catch {}
  }, []);

  const persist = useCallback((user: User | null) => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ userId: user.id }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // simulate async
    await new Promise((r) => setTimeout(r, 250));
    const found = demoUsers.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) return false;
    try { localStorage.setItem('bhusan_last_user', found.email); } catch {}
    const user: User = { id: found.id, name: found.name, email: found.email, role: found.role, permissions: found.permissions };
    setCurrentUser(user);
    persist(user);
    return true;
  }, [persist]);

  const loginAsRole = useCallback((role: Role) => {
    const found = demoUsers.find((u) => u.role === role);
    if (!found) return;
    const user: User = { id: found.id, name: found.name, email: found.email, role: found.role, permissions: found.permissions };
    setCurrentUser(user);
    persist(user);
  }, [persist]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    persist(null);
  }, [persist]);

  const value = useMemo<AuthContextValue>(() => ({
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    loginAsRole,
    logout,
  }), [currentUser, login, loginAsRole, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
