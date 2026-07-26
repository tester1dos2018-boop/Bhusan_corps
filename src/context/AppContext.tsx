import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { createInitialBusinessState, createWorkflowTimestamp, type BusinessState, type NotificationItem, type TimelineEvent } from '../lib/businessData';

export type ModuleKey = 'dashboard' | 'customers' | 'sales' | 'service' | 'executive-assistant' | 'inventory' | 'projects' | 'amc' | 'employees' | 'documents' | 'settings';

export interface DemoCustomer {
  id: string;
  name: string;
  industry: string;
  city: string;
  outstanding: string;
  status: string;
}

interface AppContextValue {
  selectedCustomer: DemoCustomer | null;
  selectedModule: ModuleKey;
  selectedAction: string | null;
  selectedQuotation: string | null;
  selectedServiceCall: string | null;
  currentAIContext: string | null;
  currentToast: string | null;
  isTransitioning: boolean;
  businessState: BusinessState;
  setSelectedCustomer: (customer: DemoCustomer | null) => void;
  setSelectedModule: (module: ModuleKey) => void;
  setSelectedAction: (action: string | null) => void;
  setSelectedQuotation: (quotation: string | null) => void;
  setSelectedServiceCall: (serviceCall: string | null) => void;
  setCurrentAIContext: (context: string | null) => void;
  approveQuotation: (quotationId: string) => void;
  scheduleServiceVisit: (customerId: string, customerName: string, engineer: string, ticket: string) => void;
  renewAMC: (amcId: string) => void;
  addNotification: (notification: NotificationItem) => void;
  addTimelineEvent: (event: TimelineEvent) => void;
  navigateWithContext: (path: string, options?: {
    customer?: DemoCustomer | null;
    module?: ModuleKey;
    action?: string | null;
    quotation?: string | null;
    serviceCall?: string | null;
    aiContext?: string | null;
    toast?: string;
  }) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const getModuleFromPath = (path: string): ModuleKey => {
  if (path.includes('sales')) return 'sales';
  if (path.includes('service')) return 'service';
  if (path.includes('executive-assistant')) return 'executive-assistant';
  if (path.includes('customers')) return 'customers';
  if (path.includes('inventory')) return 'inventory';
  if (path.includes('projects')) return 'projects';
  if (path.includes('amc')) return 'amc';
  if (path.includes('employees')) return 'employees';
  if (path.includes('documents')) return 'documents';
  if (path.includes('settings')) return 'settings';
  return 'dashboard';
};

export function AppProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState<DemoCustomer | null>(null);
  const [selectedModule, setSelectedModule] = useState<ModuleKey>('dashboard');
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [selectedQuotation, setSelectedQuotation] = useState<string | null>(null);
  const [selectedServiceCall, setSelectedServiceCall] = useState<string | null>(null);
  const [currentAIContext, setCurrentAIContext] = useState<string | null>(null);
  const [currentToast, setCurrentToast] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [businessState, setBusinessState] = useState<BusinessState>(createInitialBusinessState);

  const navigateWithContext = useCallback((path: string, options = {}) => {
    const {
      customer,
      module,
      action,
      quotation,
      serviceCall,
      aiContext,
      toast = 'Opening module...',
    } = options as {
      customer?: DemoCustomer | null;
      module?: ModuleKey;
      action?: string | null;
      quotation?: string | null;
      serviceCall?: string | null;
      aiContext?: string | null;
      toast?: string;
    };

    if (customer !== undefined) {
      setSelectedCustomer(customer);
    }

    const nextModule = module ?? getModuleFromPath(path);
    setSelectedModule(nextModule);

    if (action !== undefined) {
      setSelectedAction(action);
    }

    if (quotation !== undefined) {
      setSelectedQuotation(quotation);
    }

    if (serviceCall !== undefined) {
      setSelectedServiceCall(serviceCall);
    }

    if (aiContext !== undefined) {
      setCurrentAIContext(aiContext);
    }

    setCurrentToast(toast);
    setIsTransitioning(true);

    window.setTimeout(() => {
      setIsTransitioning(false);
      window.setTimeout(() => setCurrentToast(null), 1800);
    }, 450);

    navigate(path);
  }, [navigate]);

  const approveQuotation = useCallback((quotationId: string) => {
    setBusinessState((previous) => ({
      ...previous,
      quotations: previous.quotations.map((quotation) => quotation.id === quotationId ? { ...quotation, status: 'Approved', stage: 'Negotiation' } : quotation),
      notifications: [
        {
          id: `n-${Date.now()}`,
          title: 'Quotation Approved',
          detail: `${quotationId} is now approved and routed for follow-up.`,
          tone: 'success',
          time: createWorkflowTimestamp(),
        },
        ...previous.notifications,
      ].slice(0, 6),
      timeline: [
        {
          id: `t-${Date.now()}`,
          title: 'Quotation approved',
          detail: `${quotationId} changed to approved status.`,
          time: createWorkflowTimestamp(),
        },
        ...previous.timeline,
      ].slice(0, 8),
    } as BusinessState));
    setCurrentToast('Quotation approved successfully.');
    setIsTransitioning(true);
    window.setTimeout(() => {
      setIsTransitioning(false);
      window.setTimeout(() => setCurrentToast(null), 1800);
    }, 450);
  }, []);

  const scheduleServiceVisit = useCallback((customerId: string, customerName: string, engineer: string, ticket: string) => {
    setBusinessState((previous) => ({
      ...previous,
      serviceVisits: [
        {
          id: ticket,
          customerId,
          customerName,
          engineer,
          status: 'Scheduled',
          scheduledAt: 'Today',
          ticket,
          sla: '4 hrs',
        },
        ...previous.serviceVisits,
      ].slice(0, 6),
      notifications: [
        {
          id: `n-${Date.now()}`,
          title: 'Service Scheduled',
          detail: `${customerName} visit is now scheduled with ${engineer}.`,
          tone: 'accent',
          time: createWorkflowTimestamp(),
        },
        ...previous.notifications,
      ].slice(0, 6),
      timeline: [
        {
          id: `t-${Date.now()}`,
          title: 'Service visit scheduled',
          detail: `${customerName} visit scheduled with ${engineer}.`,
          time: createWorkflowTimestamp(),
        },
        ...previous.timeline,
      ].slice(0, 8),
    } as BusinessState));
    setCurrentToast('Service visit scheduled.');
    setIsTransitioning(true);
    window.setTimeout(() => {
      setIsTransitioning(false);
      window.setTimeout(() => setCurrentToast(null), 1800);
    }, 450);
  }, []);

  const renewAMC = useCallback((amcId: string) => {
    setBusinessState((previous) => ({
      ...previous,
      amcs: previous.amcs.map((amc) => amc.id === amcId ? { ...amc, status: 'Active', renewalDue: 'Next quarter' } : amc),
      notifications: [
        {
          id: `n-${Date.now()}`,
          title: 'AMC Renewed',
          detail: `${amcId} moved to active status.`,
          tone: 'warning',
          time: createWorkflowTimestamp(),
        },
        ...previous.notifications,
      ].slice(0, 6),
      timeline: [
        {
          id: `t-${Date.now()}`,
          title: 'AMC renewed',
          detail: `${amcId} was renewed successfully.`,
          time: createWorkflowTimestamp(),
        },
        ...previous.timeline,
      ].slice(0, 8),
    } as BusinessState));
    setCurrentToast('AMC renewed successfully.');
    setIsTransitioning(true);
    window.setTimeout(() => {
      setIsTransitioning(false);
      window.setTimeout(() => setCurrentToast(null), 1800);
    }, 450);
  }, []);

  const addNotification = useCallback((notification: NotificationItem) => {
    setBusinessState((previous) => ({
      ...previous,
      notifications: [notification, ...previous.notifications].slice(0, 8),
    } as BusinessState));
  }, []);

  const addTimelineEvent = useCallback((event: TimelineEvent) => {
    setBusinessState((previous) => ({
      ...previous,
      timeline: [event, ...previous.timeline].slice(0, 8),
    } as BusinessState));
  }, []);

  const value = useMemo<AppContextValue>(() => ({
    selectedCustomer,
    selectedModule,
    selectedAction,
    selectedQuotation,
    selectedServiceCall,
    currentAIContext,
    currentToast,
    isTransitioning,
    businessState,
    setSelectedCustomer,
    setSelectedModule,
    setSelectedAction,
    setSelectedQuotation,
    setSelectedServiceCall,
    setCurrentAIContext,
    approveQuotation,
    scheduleServiceVisit,
    renewAMC,
    addNotification,
    addTimelineEvent,
    navigateWithContext,
  }), [selectedCustomer, selectedModule, selectedAction, selectedQuotation, selectedServiceCall, currentAIContext, currentToast, isTransitioning, businessState, approveQuotation, scheduleServiceVisit, renewAMC, addNotification, addTimelineEvent, navigateWithContext]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within AppProvider');
  }
  return context;
}
