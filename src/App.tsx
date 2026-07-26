import { Navigate, Route, Routes } from 'react-router-dom';
import { GlobalLayout } from './components/layout/GlobalLayout';
import { navigationItems } from './config/navigation';
import Customers from './pages/Customers';
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
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<GlobalLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="customers" element={<Customers />} />
        <Route path="sales" element={<SalesPlaceholder />} />
        <Route path="service" element={<ServicePlaceholder />} />
        <Route path="executive-assistant" element={<ExecutiveAssistant />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="installations" element={<Installations />} />
        <Route path="workforce" element={<Workforce />} />
        <Route path="documents" element={<Documentation />} />
        <Route path="settings" element={<SystemSettings />} />
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
