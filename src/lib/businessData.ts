export interface Quotation {
  id: string;
  customerId: string;
  customerName: string;
  amount: string;
  status: 'Draft' | 'Pending' | 'Approved' | 'Rejected';
  stage: 'Lead' | 'Site Visit' | 'Quotation' | 'Negotiation' | 'Won' | 'Delivered';
  createdAt: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface ServiceVisit {
  id: string;
  customerId: string;
  customerName: string;
  engineer: string;
  status: 'Scheduled' | 'Assigned' | 'Completed';
  scheduledAt: string;
  ticket: string;
  sla: string;
}

export interface AMCRecord {
  id: string;
  customerId: string;
  customerName: string;
  status: 'Active' | 'Renewal Due' | 'Expired';
  renewalDue: string;
  amount: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  detail: string;
  tone: 'accent' | 'success' | 'warning' | 'danger' | 'primary';
  time: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  detail: string;
  time: string;
}

export interface BusinessState {
  quotations: Quotation[];
  serviceVisits: ServiceVisit[];
  amcs: AMCRecord[];
  notifications: NotificationItem[];
  timeline: TimelineEvent[];
}

const now = new Date();
const formatTime = (date: Date) => new Intl.DateTimeFormat('en-IN', {
  hour: '2-digit',
  minute: '2-digit',
}).format(date);

export const createInitialBusinessState = (): BusinessState => ({
  quotations: [
    { id: 'Q-2410', customerId: 'CUS-1001', customerName: 'ABC Cement', amount: '₹24.8L', status: 'Pending', stage: 'Quotation', createdAt: 'Today', priority: 'High' },
    { id: 'Q-2411', customerId: 'CUS-1002', customerName: 'Meridian Industries', amount: '₹18.4L', status: 'Approved', stage: 'Negotiation', createdAt: 'Yesterday', priority: 'Medium' },
    { id: 'Q-2412', customerId: 'CUS-1003', customerName: 'Bihar Food Corp', amount: '₹12.2L', status: 'Pending', stage: 'Site Visit', createdAt: 'Today', priority: 'High' },
  ],
  serviceVisits: [
    { id: 'SC-108', customerId: 'CUS-1001', customerName: 'ABC Cement', engineer: 'Rajesh', status: 'Scheduled', scheduledAt: '26 Jul', ticket: 'SR-108', sla: '4 hrs' },
    { id: 'SC-109', customerId: 'CUS-1004', customerName: 'Tata Steel', engineer: 'Asha', status: 'Assigned', scheduledAt: '28 Jul', ticket: 'SR-109', sla: '6 hrs' },
    { id: 'SC-110', customerId: 'CUS-1005', customerName: 'Indian Oil', engineer: 'Naveen', status: 'Completed', scheduledAt: '24 Jul', ticket: 'SR-110', sla: '2 hrs' },
  ],
  amcs: [
    { id: 'AMC-301', customerId: 'CUS-1002', customerName: 'Meridian Industries', status: 'Renewal Due', renewalDue: 'Today', amount: '₹6.4L' },
    { id: 'AMC-302', customerId: 'CUS-1003', customerName: 'Bihar Food Corp', status: 'Active', renewalDue: 'Sep 2026', amount: '₹4.8L' },
    { id: 'AMC-303', customerId: 'CUS-1006', customerName: 'Ashok Leyland', status: 'Expired', renewalDue: 'Overdue', amount: '₹3.2L' },
  ],
  notifications: [
    { id: 'n1', title: 'Quotation Approved', detail: 'Q-2411 approved and routed to delivery.', tone: 'success', time: '09:24' },
    { id: 'n2', title: 'Service Scheduled', detail: 'Site visit for ABC Cement has been assigned.', tone: 'accent', time: '09:30' },
    { id: 'n3', title: 'Engineer Assigned', detail: 'Rajesh is now assigned to the latest service call.', tone: 'primary', time: '09:42' },
  ],
  timeline: [
    { id: 't1', title: 'Executive AI generated report', detail: 'Board-ready summary prepared for the leadership review.', time: '09:20' },
    { id: 't2', title: 'Quotation approved', detail: 'Meridian Industries quotation moved to approved.', time: '09:24' },
    { id: 't3', title: 'Engineer assigned', detail: 'Rajesh assigned to ABC Cement service visit.', time: '09:30' },
    { id: 't4', title: 'Customer follow-up scheduled', detail: 'Follow-up task captured for Bihar Food Corp.', time: '09:42' },
  ],
});

export const createWorkflowTimestamp = (date = now) => formatTime(date);
