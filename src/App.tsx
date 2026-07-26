import { Navigate, Route, Routes } from 'react-router-dom';
import { GlobalLayout } from './components/layout/GlobalLayout';
import { navigationItems } from './config/navigation';
import Login from './pages/Login';
import AccessDenied from './pages/AccessDenied';
import { ROLE_NAV_MAP } from './config/navigationConfig';
import { useAuth } from './context/AuthContext';
import Customers from './pages/Customers';
import BoardSnapshot from './pages/BoardSnapshot';
import Dashboard from './pages/Dashboard';
import ExecutiveAssistant from './pages/ExecutiveAssistant';
import Inventory from './pages/Inventory';
import Installations from './pages/Installations';
import Workforce from './pages/Workforce';
import Documentation from './pages/Documentation';
import SystemSettings from './pages/SystemSettings';
import ModulePage from './pages/ModulePage';
import Reports from './pages/Reports';
import SalesPlaceholder from './pages/SalesPlaceholder';
import ServicePlaceholder from './pages/ServicePlaceholder';
import MyDay from './pages/MyDay';
import './index.css';

function App() {
  const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const auth = useAuth();
    if (!auth.isAuthenticated) return <Navigate to="/login" replace />;
    return <>{children}</>;
  };
  const RequireRole = ({ id, children }: { id: string; children: React.ReactNode }) => {
    const auth = useAuth();
    const role = auth.currentUser?.role;
    const allowed = role ? (ROLE_NAV_MAP[role as keyof typeof ROLE_NAV_MAP] ?? []) : [];
    if (!role) return <Navigate to="/login" replace />;
    if (!allowed.includes(id)) return <AccessDenied reason={`Your role (${role}) cannot access this module.`} />;
    return <>{children}</>;
  };
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RequireAuth><GlobalLayout /></RequireAuth>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="my-day" element={<RequireRole id="my-day"><MyDay /></RequireRole>} />
        <Route path="board-snapshot" element={<RequireRole id="board-snapshot"><BoardSnapshot /></RequireRole>} />
        <Route path="customers" element={<RequireRole id="customers"><Customers /></RequireRole>} />
        <Route path="sales" element={<RequireRole id="sales"><SalesPlaceholder /></RequireRole>} />
        <Route path="service" element={<RequireRole id="service"><ServicePlaceholder /></RequireRole>} />
        <Route path="executive-assistant" element={<RequireRole id="executive-assistant"><ExecutiveAssistant /></RequireRole>} />
        <Route path="inventory" element={<RequireRole id="inventory"><Inventory /></RequireRole>} />
        <Route path="installations" element={<RequireRole id="installations"><Installations /></RequireRole>} />
        <Route path="workforce" element={<RequireRole id="workforce"><Workforce /></RequireRole>} />
        <Route path="documents" element={<RequireRole id="documents"><Documentation /></RequireRole>} />
        <Route path="settings" element={<RequireRole id="settings"><SystemSettings /></RequireRole>} />
        <Route path="reports" element={<Reports />} />
        {navigationItems
          .filter((item) => !['/dashboard', '/customers', '/sales', '/service', '/executive-assistant'].includes(item.path))
          .map((item) => (
            <Route
              key={item.path}
              path={item.path.replace('/', '')}
              element={<ModulePage title={item.label} description={item.description} />}
            />
          ))}
        <Route path="*" element={
          <div className="flex h-[60vh] flex-col items-center justify-center text-primary/40 dark:text-white/40">
            <h2 className="mb-2 text-2xl font-bold">Coming Soon</h2>
            <p>This module is under development.</p>
          </div>
        } />
      </Route>
    </Routes>
  );
}

export default App;
