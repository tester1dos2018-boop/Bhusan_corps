import { useMemo, useState } from 'react';
import {
  Bot,
  Building2,
  CalendarClock,
  Download,
  FileText,
  Plus,
  Search,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { Badge, Button, Card, ProgressBar } from '../components/ui';
import { useAppState } from '../context/AppContext';

type CustomerStatus = 'Healthy' | 'Needs Attention' | 'Critical';

type CustomerFilter = 'All' | CustomerStatus;

interface Customer {
  id: string;
  name: string;
  industry: string;
  city: string;
  since: string;
  status: CustomerStatus;
  healthScore: number;
  outstanding: string;
  amcStatus: string;
  installedMachines: number;
  openQuotations: number;
  contact: string;
  salesManager: string;
  creditTerms: string;
  annualRevenue: string;
  paymentBehavior: string;
  equipment: Equipment[];
  commercial: CommercialSummary;
  projects: Project[];
  serviceHistory: ServiceHistory;
  documents: DocumentRecord[];
  aiSummary: string;
}

interface Equipment {
  name: string;
  installationDate: string;
  warranty: string;
  amc: string;
  health: number;
  nextService: string;
  runningStatus: string;
}

interface CommercialSummary {
  totalPurchases: string;
  outstandingPayments: string;
  openQuotations: string;
  amcValue: string;
  averagePaymentDelay: string;
  lastPurchase: string;
}

interface Project {
  name: string;
  status: string;
  site: string;
  engineer: string;
  expectedCompletion: string;
}

interface ServiceHistory {
  totalVisits: number;
  breakdowns: number;
  preventiveMaintenance: number;
  lastVisit: string;
  averageResolutionTime: string;
  customerSatisfaction: string;
}

interface DocumentRecord {
  name: string;
  type: string;
  updated: string;
}

const customers: Customer[] = [
  {
    id: 'CUS-1001',
    name: 'ABC Cement',
    industry: 'Cement manufacturing',
    city: 'Ranchi, Jharkhand',
    since: '2018',
    status: 'Healthy',
    healthScore: 92,
    outstanding: '₹18.4L',
    amcStatus: 'Renewal due in 45 days',
    installedMachines: 8,
    openQuotations: 2,
    contact: 'Amit Kumar',
    salesManager: 'Ravi Menon',
    creditTerms: 'Net 30',
    annualRevenue: '₹2.8 Cr',
    paymentBehavior: 'Healthy • 6 day average delay',
    equipment: [
      { name: 'ELGi EG75 Screw Compressor', installationDate: '12 Feb 2024', warranty: '24 months', amc: 'Active', health: 92, nextService: '18 Aug 2026', runningStatus: 'Stable' },
      { name: 'KSB Pump 150', installationDate: '09 Oct 2023', warranty: '18 months', amc: 'Active', health: 88, nextService: '14 Aug 2026', runningStatus: 'Stable' },
    ],
    commercial: {
      totalPurchases: '₹3.2 Cr',
      outstandingPayments: '₹18.4L',
      openQuotations: '2',
      amcValue: '₹26L',
      averagePaymentDelay: '6 days',
      lastPurchase: '12 Jul 2026',
    },
    projects: [
      { name: 'Quotation', status: 'Approved', site: 'Plant A', engineer: 'Rajesh', expectedCompletion: '22 Jul 2026' },
      { name: 'Purchase Order', status: 'Dispatch', site: 'Plant B', engineer: 'Naveen', expectedCompletion: '25 Jul 2026' },
      { name: 'Installation', status: 'Scheduled', site: 'Plant C', engineer: 'Asha', expectedCompletion: '28 Jul 2026' },
    ],
    serviceHistory: { totalVisits: 14, breakdowns: 2, preventiveMaintenance: 6, lastVisit: '10 Jul 2026', averageResolutionTime: '4.2 hrs', customerSatisfaction: '4.8/5' },
    documents: [
      { name: 'Quotation', type: 'Commercial', updated: '14 Jul 2026' },
      { name: 'Invoice', type: 'Billing', updated: '09 Jul 2026' },
      { name: 'AMC Contract', type: 'Service', updated: '02 Jul 2026' },
    ],
    aiSummary: 'ABC Cement has been a customer since 2018. Their installed compressor fleet consists of eight ELGi screw compressors and two KSB pumps. Annual business value is approximately ₹2.8 Cr. Payment behaviour is healthy with an average delay of six days. AMC renewal is due within 45 days. Production expansion suggests a strong opportunity to recommend an additional ELGi EG Series compressor. Overall relationship health is Excellent.',
  },
  {
    id: 'CUS-1002',
    name: 'Tata Steel',
    industry: 'Steel manufacturing',
    city: 'Jamshedpur, Jharkhand',
    since: '2016',
    status: 'Needs Attention',
    healthScore: 76,
    outstanding: '₹42.8L',
    amcStatus: 'Service escalation open',
    installedMachines: 12,
    openQuotations: 4,
    contact: 'Niraj Singh',
    salesManager: 'Sanjay Rao',
    creditTerms: 'Net 45',
    annualRevenue: '₹5.6 Cr',
    paymentBehavior: 'Delayed • 14 day average delay',
    equipment: [
      { name: 'ELGi EN Series', installationDate: '03 May 2023', warranty: '36 months', amc: 'Active', health: 81, nextService: '22 Aug 2026', runningStatus: 'Monitor' },
      { name: 'ATS Two Post Lift', installationDate: '12 Jan 2025', warranty: '12 months', amc: 'Pending', health: 74, nextService: '31 Jul 2026', runningStatus: 'Service required' },
    ],
    commercial: {
      totalPurchases: '₹6.8 Cr',
      outstandingPayments: '₹42.8L',
      openQuotations: '4',
      amcValue: '₹38L',
      averagePaymentDelay: '14 days',
      lastPurchase: '08 Jul 2026',
    },
    projects: [
      { name: 'Quotation', status: 'Pending', site: 'Plant D', engineer: 'Ramesh', expectedCompletion: '20 Jul 2026' },
      { name: 'Dispatch', status: 'In Transit', site: 'Plant E', engineer: 'Asha', expectedCompletion: '24 Jul 2026' },
      { name: 'Commissioning', status: 'In Progress', site: 'Plant F', engineer: 'Kiran', expectedCompletion: '26 Jul 2026' },
    ],
    serviceHistory: { totalVisits: 27, breakdowns: 5, preventiveMaintenance: 9, lastVisit: '12 Jul 2026', averageResolutionTime: '6.1 hrs', customerSatisfaction: '4.2/5' },
    documents: [
      { name: 'Quotation', type: 'Commercial', updated: '06 Jul 2026' },
      { name: 'Warranty', type: 'Equipment', updated: '03 May 2023' },
      { name: 'Installation Report', type: 'Operations', updated: '05 May 2023' },
    ],
    aiSummary: 'Tata Steel remains a strategic industrial account with a high volume of recurring service needs. Several installations require closer coordination around dispatch and commissioning. An AMC expansion and predictive service plan would improve retention and reduce downtime.',
  },
  {
    id: 'CUS-1003',
    name: 'Bihar Food Corporation',
    industry: 'Food processing',
    city: 'Patna, Bihar',
    since: '2021',
    status: 'Healthy',
    healthScore: 88,
    outstanding: '₹10.6L',
    amcStatus: 'AMC active',
    installedMachines: 5,
    openQuotations: 1,
    contact: 'Saurav Jha',
    salesManager: 'Ankita Das',
    creditTerms: 'Net 15',
    annualRevenue: '₹1.1 Cr',
    paymentBehavior: 'Healthy • 3 day average delay',
    equipment: [
      { name: 'ELGi EN Series', installationDate: '18 Mar 2024', warranty: '24 months', amc: 'Active', health: 90, nextService: '09 Aug 2026', runningStatus: 'Stable' },
      { name: 'ATS Two Post Lift', installationDate: '20 Nov 2024', warranty: '12 months', amc: 'Active', health: 85, nextService: '21 Aug 2026', runningStatus: 'Stable' },
    ],
    commercial: {
      totalPurchases: '₹1.4 Cr',
      outstandingPayments: '₹10.6L',
      openQuotations: '1',
      amcValue: '₹14L',
      averagePaymentDelay: '3 days',
      lastPurchase: '04 Jul 2026',
    },
    projects: [
      { name: 'Installation', status: 'Completed', site: 'Patna Plant', engineer: 'Rajesh', expectedCompletion: 'Completed' },
      { name: 'Commissioning', status: 'Completed', site: 'Patna Plant', engineer: 'Asha', expectedCompletion: 'Completed' },
    ],
    serviceHistory: { totalVisits: 8, breakdowns: 1, preventiveMaintenance: 4, lastVisit: '08 Jul 2026', averageResolutionTime: '3.1 hrs', customerSatisfaction: '4.9/5' },
    documents: [
      { name: 'Installation Report', type: 'Operations', updated: '15 Mar 2024' },
      { name: 'Manuals', type: 'Equipment', updated: '18 Mar 2024' },
      { name: 'AMC Contract', type: 'Service', updated: '18 Mar 2024' },
    ],
    aiSummary: 'Bihar Food Corporation is a fast-growing processing customer with strong service satisfaction and healthy financial behavior. A follow-up recommendation for a spare parts bundle and preventive maintenance plan would deepen the relationship.',
  },
  {
    id: 'CUS-1004',
    name: 'Meridian Industries',
    industry: 'Manufacturing',
    city: 'Ahmedabad, Gujarat',
    since: '2022',
    status: 'Critical',
    healthScore: 61,
    outstanding: '₹67.2L',
    amcStatus: 'Overdue renewal',
    installedMachines: 7,
    openQuotations: 3,
    contact: 'Deepak Parekh',
    salesManager: 'Meera Shah',
    creditTerms: 'Net 60',
    annualRevenue: '₹1.9 Cr',
    paymentBehavior: 'Critical • 23 day average delay',
    equipment: [
      { name: 'ELGi EG75 Screw Compressor', installationDate: '07 Nov 2022', warranty: '24 months', amc: 'Expired', health: 68, nextService: 'Urgent', runningStatus: 'At risk' },
      { name: 'KSB Pump 150', installationDate: '11 Mar 2023', warranty: '18 months', amc: 'Expired', health: 63, nextService: 'Urgent', runningStatus: 'At risk' },
    ],
    commercial: {
      totalPurchases: '₹2.4 Cr',
      outstandingPayments: '₹67.2L',
      openQuotations: '3',
      amcValue: '₹21L',
      averagePaymentDelay: '23 days',
      lastPurchase: '01 Jul 2026',
    },
    projects: [
      { name: 'Quotation', status: 'Needs Review', site: 'Ahmedabad Plant', engineer: 'Vinod', expectedCompletion: '18 Jul 2026' },
      { name: 'Dispatch', status: 'Delayed', site: 'Ahmedabad Plant', engineer: 'Naveen', expectedCompletion: '21 Jul 2026' },
      { name: 'Installation', status: 'Pending', site: 'Ahmedabad Plant', engineer: 'Rajesh', expectedCompletion: '30 Jul 2026' },
    ],
    serviceHistory: { totalVisits: 11, breakdowns: 4, preventiveMaintenance: 3, lastVisit: '05 Jul 2026', averageResolutionTime: '7.6 hrs', customerSatisfaction: '3.7/5' },
    documents: [
      { name: 'Invoice', type: 'Billing', updated: '01 Jul 2026' },
      { name: 'Warranty', type: 'Equipment', updated: '07 Nov 2022' },
      { name: 'AMC Contract', type: 'Service', updated: '11 Mar 2023' },
    ],
    aiSummary: 'Meridian Industries is a high-value account with rising operational risk. Outstanding payments are elevated and AMC coverage has lapsed. A recovery action plan involving credit review, service restoration, and renewal conversation should be prioritized immediately.',
  },
  {
    id: 'CUS-1005',
    name: 'UltraTech Cement',
    industry: 'Cement manufacturing',
    city: 'Kotputli, Rajasthan',
    since: '2019',
    status: 'Healthy',
    healthScore: 90,
    outstanding: '₹12.1L',
    amcStatus: 'AMC active',
    installedMachines: 9,
    openQuotations: 1,
    contact: 'Prakash Verma',
    salesManager: 'Lalit Bhatia',
    creditTerms: 'Net 30',
    annualRevenue: '₹3.3 Cr',
    paymentBehavior: 'Healthy • 5 day average delay',
    equipment: [
      { name: 'ELGi EG75 Screw Compressor', installationDate: '01 Mar 2022', warranty: '24 months', amc: 'Active', health: 94, nextService: '12 Aug 2026', runningStatus: 'Stable' },
      { name: 'KSB Pump 150', installationDate: '14 Jun 2024', warranty: '18 months', amc: 'Active', health: 89, nextService: '16 Aug 2026', runningStatus: 'Stable' },
    ],
    commercial: {
      totalPurchases: '₹3.7 Cr',
      outstandingPayments: '₹12.1L',
      openQuotations: '1',
      amcValue: '₹29L',
      averagePaymentDelay: '5 days',
      lastPurchase: '11 Jul 2026',
    },
    projects: [
      { name: 'Quotation', status: 'Approved', site: 'Unit 2', engineer: 'Vinod', expectedCompletion: '19 Jul 2026' },
      { name: 'Installation', status: 'Scheduled', site: 'Unit 2', engineer: 'Rajesh', expectedCompletion: '27 Jul 2026' },
    ],
    serviceHistory: { totalVisits: 18, breakdowns: 2, preventiveMaintenance: 7, lastVisit: '11 Jul 2026', averageResolutionTime: '3.8 hrs', customerSatisfaction: '4.7/5' },
    documents: [
      { name: 'Quotation', type: 'Commercial', updated: '08 Jul 2026' },
      { name: 'Manuals', type: 'Equipment', updated: '01 Mar 2022' },
      { name: 'AMC Contract', type: 'Service', updated: '01 Mar 2022' },
    ],
    aiSummary: 'UltraTech Cement continues to be a high-value account with strong equipment uptime and healthy renewals. A targeted expansion proposal around additional compressors would likely convert well in the next quarter.',
  },
  {
    id: 'CUS-1006',
    name: 'Larsen & Toubro',
    industry: 'Infrastructure',
    city: 'Mumbai, Maharashtra',
    since: '2020',
    status: 'Needs Attention',
    healthScore: 72,
    outstanding: '₹29.7L',
    amcStatus: 'Renewal pending',
    installedMachines: 6,
    openQuotations: 2,
    contact: 'Madhav Kulkarni',
    salesManager: 'Nilesh Borkar',
    creditTerms: 'Net 45',
    annualRevenue: '₹2.1 Cr',
    paymentBehavior: 'Moderate • 11 day average delay',
    equipment: [
      { name: 'ELGi EN Series', installationDate: '14 Sep 2023', warranty: '24 months', amc: 'Pending', health: 78, nextService: '26 Aug 2026', runningStatus: 'Monitor' },
      { name: 'ATS Two Post Lift', installationDate: '06 Feb 2024', warranty: '12 months', amc: 'Pending', health: 76, nextService: '01 Aug 2026', runningStatus: 'Monitor' },
    ],
    commercial: {
      totalPurchases: '₹2.5 Cr',
      outstandingPayments: '₹29.7L',
      openQuotations: '2',
      amcValue: '₹24L',
      averagePaymentDelay: '11 days',
      lastPurchase: '06 Jul 2026',
    },
    projects: [
      { name: 'Quotation', status: 'Pending', site: 'Mumbai Yard', engineer: 'Kiran', expectedCompletion: '23 Jul 2026' },
      { name: 'Purchase Order', status: 'Approved', site: 'Mumbai Yard', engineer: 'Ramesh', expectedCompletion: '24 Jul 2026' },
    ],
    serviceHistory: { totalVisits: 13, breakdowns: 3, preventiveMaintenance: 5, lastVisit: '07 Jul 2026', averageResolutionTime: '5.4 hrs', customerSatisfaction: '4.1/5' },
    documents: [
      { name: 'Quotation', type: 'Commercial', updated: '05 Jul 2026' },
      { name: 'Invoice', type: 'Billing', updated: '06 Jul 2026' },
      { name: 'Warranty', type: 'Equipment', updated: '14 Sep 2023' },
    ],
    aiSummary: 'Larsen & Toubro’s account is active but renewal follow-up is overdue. Strong opportunity exists to expand service coverage and improve payment cadence through a proactive account review.',
  },
  {
    id: 'CUS-1007',
    name: 'Indian Oil Corporation',
    industry: 'Energy & utilities',
    city: 'Vadodara, Gujarat',
    since: '2017',
    status: 'Healthy',
    healthScore: 87,
    outstanding: '₹15.9L',
    amcStatus: 'AMC active',
    installedMachines: 10,
    openQuotations: 1,
    contact: 'Harsh Vora',
    salesManager: 'Dipti Nair',
    creditTerms: 'Net 30',
    annualRevenue: '₹4.1 Cr',
    paymentBehavior: 'Healthy • 7 day average delay',
    equipment: [
      { name: 'ELGi EG75 Screw Compressor', installationDate: '19 Apr 2021', warranty: '24 months', amc: 'Active', health: 91, nextService: '15 Aug 2026', runningStatus: 'Stable' },
      { name: 'KSB Pump 150', installationDate: '04 Jul 2023', warranty: '18 months', amc: 'Active', health: 84, nextService: '20 Aug 2026', runningStatus: 'Stable' },
    ],
    commercial: {
      totalPurchases: '₹4.8 Cr',
      outstandingPayments: '₹15.9L',
      openQuotations: '1',
      amcValue: '₹31L',
      averagePaymentDelay: '7 days',
      lastPurchase: '13 Jul 2026',
    },
    projects: [
      { name: 'Commissioning', status: 'Completed', site: 'Vadodara Terminal', engineer: 'Vinod', expectedCompletion: 'Completed' },
      { name: 'Maintenance', status: 'Scheduled', site: 'Vadodara Terminal', engineer: 'Asha', expectedCompletion: '29 Jul 2026' },
    ],
    serviceHistory: { totalVisits: 22, breakdowns: 3, preventiveMaintenance: 8, lastVisit: '13 Jul 2026', averageResolutionTime: '4.4 hrs', customerSatisfaction: '4.6/5' },
    documents: [
      { name: 'Quotation', type: 'Commercial', updated: '10 Jul 2026' },
      { name: 'Invoice', type: 'Billing', updated: '13 Jul 2026' },
      { name: 'Manuals', type: 'Equipment', updated: '19 Apr 2021' },
    ],
    aiSummary: 'Indian Oil Corporation remains a valuable long-term customer with steady account health and strong renewals. The service team should continue to deepen the preventive maintenance program to preserve uptime at critical sites.',
  },
];

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30">
      <h3 className="font-serif text-lg font-semibold text-primary">{title}</h3>
      <div className="mt-5">{children}</div>
    </Card>
  );
}

export default function Customers() {
  const { navigateWithContext, setCurrentAIContext } = useAppState();
  const [query, setQuery] = useState('');
  const [status] = useState<CustomerFilter>('All');
  const [industry, setIndustry] = useState('All');
  const [city, setCity] = useState('All');
  const [amcFilter, setAmcFilter] = useState('All');
  const [selectedId, setSelectedId] = useState(customers[0].id);
  const selectedCustomer = customers.find((customer) => customer.id === selectedId) ?? customers[0];

  const filteredCustomers = useMemo(() => customers.filter((customer) => {
    const matchesQuery = [customer.name, customer.industry, customer.city, customer.contact].join(' ').toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === 'All' || customer.status === status;
    const matchesIndustry = industry === 'All' || customer.industry === industry;
    const matchesCity = city === 'All' || customer.city === city;
    const matchesAmc = amcFilter === 'All' || customer.amcStatus.toLowerCase().includes(amcFilter.toLowerCase());
    return matchesQuery && matchesStatus && matchesIndustry && matchesCity && matchesAmc;
  }), [query, status, industry, city, amcFilter]);

  const industries = ['All', ...Array.from(new Set(customers.map((customer) => customer.industry)))];
  const cities = ['All', ...Array.from(new Set(customers.map((customer) => customer.city)))];

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden border-border/80 bg-gradient-to-br from-white via-white to-accent/5 p-8 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-title mb-2">Customer Intelligence Platform</p>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-primary">Bhushancorp Customer Intelligence</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-primary/65">
              An enterprise-grade industrial customer workspace for service, sales, equipment, and commercial relationship management.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" className="gap-2"><Plus className="h-4 w-4" /> Create Quotation</Button>
            <Button variant="outline" className="gap-2"><CalendarClock className="h-4 w-4" /> Schedule Site Visit</Button>
            <Button variant="ghost" className="gap-2" onClick={() => navigateWithContext('/service', {
              customer: {
                id: selectedCustomer.id,
                name: selectedCustomer.name,
                industry: selectedCustomer.industry,
                city: selectedCustomer.city,
                outstanding: selectedCustomer.outstanding,
                status: selectedCustomer.status,
              },
              module: 'service',
              action: 'Book service',
              serviceCall: `SC-${selectedCustomer.id}`,
              toast: 'Opening Service module...',
            })}><Wrench className="h-4 w-4" /> Book Service</Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.45fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="section-title">Customer Directory</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-primary">Industrial account list</h2>
            </div>
            <Badge variant="accent">{filteredCustomers.length} accounts</Badge>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center rounded-[14px] border border-border bg-background/70 px-4 py-3">
              <Search className="h-4 w-4 text-primary/40" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search customers" className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-primary/35" />
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
              <select value={industry} onChange={(event) => setIndustry(event.target.value)} className="rounded-[12px] border border-border bg-white px-3 py-2.5 text-sm outline-none">
                {industries.map((item) => <option key={item} value={item}>{item === 'All' ? 'Industry filter' : item}</option>)}
              </select>
              <select value={city} onChange={(event) => setCity(event.target.value)} className="rounded-[12px] border border-border bg-white px-3 py-2.5 text-sm outline-none">
                {cities.map((item) => <option key={item} value={item}>{item === 'All' ? 'City filter' : item}</option>)}
              </select>
              <select value={amcFilter} onChange={(event) => setAmcFilter(event.target.value)} className="rounded-[12px] border border-border bg-white px-3 py-2.5 text-sm outline-none">
                <option value="All">AMC status filter</option>
                <option value="renewal">Renewal</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {filteredCustomers.map((customer) => {
              const healthClasses = customer.status === 'Healthy' ? 'border-success/20 bg-success/5 text-success' : customer.status === 'Needs Attention' ? 'border-warning/20 bg-warning/5 text-warning' : 'border-danger/20 bg-danger/5 text-danger';
              return (
                <button key={customer.id} onClick={() => setSelectedId(customer.id)} className={`w-full rounded-[16px] border p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 ${selectedId === customer.id ? 'border-accent/40 bg-accent/5 shadow-sm' : 'border-border bg-white'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-primary">{customer.name}</p>
                      <p className="mt-1 text-sm text-primary/55">{customer.industry}</p>
                    </div>
                    <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${healthClasses}`}>{customer.status}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-primary/55">
                    <span className="rounded-full bg-background px-2.5 py-1">{customer.city}</span>
                    <span className="rounded-full bg-background px-2.5 py-1">Since {customer.since}</span>
                    <span className="rounded-full bg-background px-2.5 py-1">AMC {customer.amcStatus}</span>
                  </div>
                  <div className="mt-4 grid gap-2 text-sm text-primary/65 sm:grid-cols-2">
                    <div className="rounded-[12px] border border-border/80 bg-background/70 p-3">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">Health score</p>
                      <p className="mt-1 font-semibold text-primary">{customer.healthScore}/100</p>
                    </div>
                    <div className="rounded-[12px] border border-border/80 bg-background/70 p-3">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">Outstanding</p>
                      <p className="mt-1 font-semibold text-primary">{customer.outstanding}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-primary/50">
                    <span>{customer.installedMachines} installed machines</span>
                    <span>{customer.openQuotations} open quotations</span>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-primary/5 text-primary">
                  <Building2 className="h-7 w-7" />
                </div>
                <div>
                  <p className="section-title">Company Overview</p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold text-primary">{selectedCustomer.name}</h2>
                  <p className="mt-1 text-sm text-primary/60">{selectedCustomer.industry} • {selectedCustomer.city}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" className="gap-2" onClick={() => {
                  setCurrentAIContext(`Customer intelligence summary for ${selectedCustomer.name}. Focus on payment behaviour, AMC renewal and service risk.`);
                  navigateWithContext('/executive-assistant', {
                    customer: {
                      id: selectedCustomer.id,
                      name: selectedCustomer.name,
                      industry: selectedCustomer.industry,
                      city: selectedCustomer.city,
                      outstanding: selectedCustomer.outstanding,
                      status: selectedCustomer.status,
                    },
                    module: 'executive-assistant',
                    action: 'Generate customer AI report',
                    toast: 'Generating AI Summary...',
                  });
                }}><Sparkles className="h-4 w-4" /> Generate AI Report</Button>
                <Button variant="outline" className="gap-2" onClick={() => navigateWithContext('/sales', {
                  customer: {
                    id: selectedCustomer.id,
                    name: selectedCustomer.name,
                    industry: selectedCustomer.industry,
                    city: selectedCustomer.city,
                    outstanding: selectedCustomer.outstanding,
                    status: selectedCustomer.status,
                  },
                  module: 'sales',
                  action: 'Create quotation',
                  quotation: `Q-${selectedCustomer.id}`,
                  toast: 'Preparing Quotation...',
                })}><Download className="h-4 w-4" /> Create Quotation</Button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">Relationship since</p>
                <p className="mt-2 font-semibold text-primary">{selectedCustomer.since}</p>
              </div>
              <div className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">Primary contact</p>
                <p className="mt-2 font-semibold text-primary">{selectedCustomer.contact}</p>
              </div>
              <div className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">Sales manager</p>
                <p className="mt-2 font-semibold text-primary">{selectedCustomer.salesManager}</p>
              </div>
              <div className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">Credit terms</p>
                <p className="mt-2 font-semibold text-primary">{selectedCustomer.creditTerms}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">Annual revenue</p>
                <p className="mt-2 font-semibold text-primary">{selectedCustomer.annualRevenue}</p>
              </div>
              <div className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">Payment behaviour</p>
                <p className="mt-2 font-semibold text-primary">{selectedCustomer.paymentBehavior}</p>
              </div>
              <div className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">Health score</p>
                <p className="mt-2 font-semibold text-primary">{selectedCustomer.healthScore}/100</p>
              </div>
              <div className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">AMC status</p>
                <p className="mt-2 font-semibold text-primary">{selectedCustomer.amcStatus}</p>
              </div>
            </div>
          </Card>

          <div className="grid gap-6 xl:grid-cols-2">
            <DetailSection title="Installed Equipment">
              <div className="space-y-4">
                {selectedCustomer.equipment.map((item) => (
                  <div key={item.name} className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-primary">{item.name}</p>
                        <p className="mt-1 text-xs text-primary/50">Installed {item.installationDate}</p>
                      </div>
                      <Badge variant="accent">{item.runningStatus}</Badge>
                    </div>
                    <div className="mt-4 grid gap-3 text-sm text-primary/60 sm:grid-cols-2">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">Warranty</p>
                        <p className="mt-1 font-semibold text-primary">{item.warranty}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">AMC</p>
                        <p className="mt-1 font-semibold text-primary">{item.amc}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">Machine health</p>
                      <ProgressBar className="mt-2" value={item.health} showValue />
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs text-primary/50">
                      <span>Next service • {item.nextService}</span>
                      <span>{item.runningStatus}</span>
                    </div>
                  </div>
                ))}
              </div>
            </DetailSection>

            <DetailSection title="Commercial Summary">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">Total purchases</p>
                  <p className="mt-2 font-semibold text-primary">{selectedCustomer.commercial.totalPurchases}</p>
                </div>
                <div className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">Outstanding payments</p>
                  <p className="mt-2 font-semibold text-primary">{selectedCustomer.commercial.outstandingPayments}</p>
                </div>
                <div className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">Open quotations</p>
                  <p className="mt-2 font-semibold text-primary">{selectedCustomer.commercial.openQuotations}</p>
                </div>
                <div className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">AMC value</p>
                  <p className="mt-2 font-semibold text-primary">{selectedCustomer.commercial.amcValue}</p>
                </div>
                <div className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">Average payment delay</p>
                  <p className="mt-2 font-semibold text-primary">{selectedCustomer.commercial.averagePaymentDelay}</p>
                </div>
                <div className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">Last purchase</p>
                  <p className="mt-2 font-semibold text-primary">{selectedCustomer.commercial.lastPurchase}</p>
                </div>
              </div>
            </DetailSection>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <DetailSection title="Projects">
              <div className="space-y-3">
                {selectedCustomer.projects.map((project) => (
                  <div key={project.name} className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-primary">{project.name}</p>
                        <p className="mt-1 text-xs text-primary/50">{project.site}</p>
                      </div>
                      <Badge variant="accent">{project.status}</Badge>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-primary/50">
                      <span>Engineer • {project.engineer}</span>
                      <span>Expected • {project.expectedCompletion}</span>
                    </div>
                  </div>
                ))}
              </div>
            </DetailSection>

            <DetailSection title="Service History">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">Total service visits</p>
                  <p className="mt-2 font-semibold text-primary">{selectedCustomer.serviceHistory.totalVisits}</p>
                </div>
                <div className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">Breakdowns</p>
                  <p className="mt-2 font-semibold text-primary">{selectedCustomer.serviceHistory.breakdowns}</p>
                </div>
                <div className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">Preventive maintenance</p>
                  <p className="mt-2 font-semibold text-primary">{selectedCustomer.serviceHistory.preventiveMaintenance}</p>
                </div>
                <div className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">Last visit</p>
                  <p className="mt-2 font-semibold text-primary">{selectedCustomer.serviceHistory.lastVisit}</p>
                </div>
                <div className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">Average resolution</p>
                  <p className="mt-2 font-semibold text-primary">{selectedCustomer.serviceHistory.averageResolutionTime}</p>
                </div>
                <div className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">Customer satisfaction</p>
                  <p className="mt-2 font-semibold text-primary">{selectedCustomer.serviceHistory.customerSatisfaction}</p>
                </div>
              </div>
            </DetailSection>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <DetailSection title="Documents">
              <div className="space-y-3">
                {selectedCustomer.documents.map((document) => (
                  <div key={document.name} className="flex items-start gap-3 rounded-[14px] border border-border/80 bg-background/70 p-4">
                    <div className="rounded-full bg-primary/5 p-2 text-primary">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">{document.name}</p>
                      <p className="mt-1 text-xs text-primary/50">{document.type} • Updated {document.updated}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DetailSection>

            <Card className="overflow-hidden border-accent/20 bg-gradient-to-br from-primary via-primary to-primary/90 p-6 text-white shadow-soft">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-accent/15 p-3 text-accent">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">AI Customer Intelligence</p>
                  <h3 className="mt-2 font-serif text-2xl font-semibold">Customer Intelligence</h3>
                  <p className="mt-4 text-sm leading-7 text-white/75">{selectedCustomer.aiSummary}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}