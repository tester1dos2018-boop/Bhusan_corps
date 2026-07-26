import {
  BatteryCharging,
  Bot,
  CalendarDays,
  ClipboardList,
  Clock3,
  FileText,
  IndianRupee,
  Package,
  PhoneCall,
  Plus,
  RefreshCw,
  Sparkles,
  Truck,
  Users,
  Wrench,
} from 'lucide-react';
import { useAppState } from '../context/AppContext';
import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Badge, Button, Card, StatCard } from '../components/ui';

const today = new Intl.DateTimeFormat('en-IN', {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
}).format(new Date());

const greeting = new Date().getHours() < 12 ? 'Good Morning' : new Date().getHours() < 18 ? 'Good Afternoon' : 'Good Evening';

const kpiData = [
  { title: 'Machines Sold This Month', value: '184', trend: '+14%', description: 'ELGi and KSB demand remains strong', icon: BatteryCharging },
  { title: 'Pending Quotations', value: '27', trend: '+6%', description: 'High-value industrial proposals in review', icon: FileText },
  { title: 'Installation Projects', value: '13', trend: '+3%', description: 'Three critical sites due this week', icon: Truck },
  { title: 'AMC Renewals', value: '18', trend: '+8%', description: 'Renewal pipeline worth ₹32L', icon: RefreshCw },
  { title: 'Today\'s Service Calls', value: '09', trend: '-2%', description: 'Two urgent field service escalations', icon: PhoneCall },
  { title: 'Pending Collections', value: '₹24.8L', trend: '+4%', description: 'Focus on overdue industrial accounts', icon: IndianRupee },
  { title: 'Inventory Value', value: '₹4.2Cr', trend: '+2%', description: 'Spare parts stock remains healthy', icon: Package },
  { title: 'Engineer Utilization', value: '86%', trend: '+5%', description: 'Service team workload is balanced', icon: Users },
];

const revenueBreakdown = [
  { name: 'Jan', 'Machine Sales': 36, AMC: 12, 'Spare Parts': 8, 'Service Revenue': 7 },
  { name: 'Feb', 'Machine Sales': 42, AMC: 14, 'Spare Parts': 9, 'Service Revenue': 8 },
  { name: 'Mar', 'Machine Sales': 48, AMC: 16, 'Spare Parts': 10, 'Service Revenue': 9 },
  { name: 'Apr', 'Machine Sales': 44, AMC: 15, 'Spare Parts': 9, 'Service Revenue': 8 },
  { name: 'May', 'Machine Sales': 56, AMC: 18, 'Spare Parts': 11, 'Service Revenue': 10 },
  { name: 'Jun', 'Machine Sales': 62, AMC: 20, 'Spare Parts': 12, 'Service Revenue': 11 },
];

const pipelineStages = [
  { stage: 'Lead', count: 32 },
  { stage: 'Site Visit', count: 18 },
  { stage: 'Quotation', count: 14 },
  { stage: 'Negotiation', count: 9 },
  { stage: 'Won', count: 7 },
  { stage: 'Delivered', count: 5 },
];

const installationProgress = [
  { name: 'Pending', value: 16 },
  { name: 'In Progress', value: 11 },
  { name: 'Commissioning', value: 7 },
  { name: 'Completed', value: 23 },
];

const engineerWorkload = [
  { name: 'Rajesh', jobs: 4, completion: 92, focus: 'Meridian Industries' },
  { name: 'Naveen', jobs: 3, completion: 84, focus: 'KSB pump installations' },
  { name: 'Asha', jobs: 5, completion: 76, focus: 'AMC field service' },
];

const insights = [
  'Revenue increased by 14% compared to last month.',
  'Three quotations above ₹20 lakh require approval.',
  'AMC renewal opportunities worth ₹32 lakh are due this month.',
  'Inventory for ELGi air filters is below reorder threshold.',
  'ABC Cement has generated three service tickets this month.',
];

const upcomingInstallations = [
  { customer: 'ABC Cement', machine: 'ELGi EG75', engineer: 'Rajesh', date: '26 Jul', status: 'Scheduled' },
  { customer: 'Meridian Industries', machine: 'KSB Pump 150', engineer: 'Naveen', date: '28 Jul', status: 'In Progress' },
  { customer: 'Bihar Food Corp', machine: 'ATS Garage Bay', engineer: 'Asha', date: '30 Jul', status: 'Commissioning' },
];

const criticalAlerts = [
  'Delayed project at Angul site',
  'Pending approvals for two quotations',
  'Low inventory for air filters',
  'Overdue collection from three clients',
];

function MiniSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30">
      <h3 className="font-serif text-lg font-semibold text-primary">{title}</h3>
      <div className="mt-5">{children}</div>
    </Card>
  );
}

export default function Dashboard() {
  const { navigateWithContext, setCurrentAIContext, businessState } = useAppState();
  const { currentUser } = useAuth();

  const role = currentUser?.role;
  const isFounder = role === 'Founder';
  const isOps = role === 'Operations Manager';
  const isSales = role === 'Sales Manager';
  const isService = role === 'Service Manager';
  const isEngineer = role === 'Field Engineer';
  const isAdmin = role === 'System Administrator';

  const dashboardKpis = useMemo(() => {
    const pendingQuotations = businessState.quotations.filter((quotation) => quotation.status === 'Pending').length;
    const serviceVisits = businessState.serviceVisits.filter((visit) => visit.status === 'Scheduled').length;
    const activeAmcs = businessState.amcs.filter((amc) => amc.status === 'Active' || amc.status === 'Renewal Due').length;
    return [
      { title: 'Pending Quotations', value: `${pendingQuotations}`, trend: '+6%', description: 'High-value industrial proposals in review', icon: FileText },
      { title: 'Today\'s Service Calls', value: `${serviceVisits}`, trend: '-2%', description: 'Two urgent field service escalations', icon: PhoneCall },
      { title: 'AMC Renewals', value: `${activeAmcs}`, trend: '+8%', description: 'Renewal pipeline worth ₹32L', icon: RefreshCw },
    ];
  }, [businessState]);

  const handleExecutiveReport = () => {
    setCurrentAIContext('Prepare an executive board brief with customer, revenue and service signals.');
    navigateWithContext('/executive-assistant', {
      module: 'executive-assistant',
      action: 'Generate executive report',
      toast: 'Preparing Executive Report...',
    });
  };

  const handleCreateQuotation = () => {
    navigateWithContext('/sales', {
      module: 'sales',
      action: 'Create quotation',
      quotation: 'Q-2410',
      customer: {
        id: 'CUS-1001',
        name: 'ABC Cement',
        industry: 'Cement manufacturing',
        city: 'Ranchi, Jharkhand',
        outstanding: '₹18.4L',
        status: 'Healthy',
      },
      toast: 'Opening Sales module...',
    });
  };

  const handleViewServiceSchedule = () => {
    navigateWithContext('/service', {
      module: 'service',
      action: 'Review service schedule',
      serviceCall: 'SC-108',
      customer: {
        id: 'CUS-1001',
        name: 'ABC Cement',
        industry: 'Cement manufacturing',
        city: 'Ranchi, Jharkhand',
        outstanding: '₹18.4L',
        status: 'Healthy',
      },
      toast: 'Opening Service module...',
    });
  };

  return (
    <div className="space-y-8">
      <div className="animate-fade-in-up">
        {role && (
          <div className="rounded-[12px] border border-border/80 bg-background/70 p-3 text-sm text-primary/70">Welcome back, <strong className="text-primary">{currentUser?.name}</strong> — {role === 'Founder' ? 'Executive summary' : role === 'Operations Manager' ? 'Operational KPIs' : role === 'Sales Manager' ? 'Pipeline KPIs' : role === 'Service Manager' ? 'SLA KPIs' : role === 'Field Engineer' ? "Today's assignments" : role === 'System Administrator' ? 'System health' : ''}.</div>
        )}
      </div>
      <Card className="overflow-hidden border-border/80 bg-gradient-to-br from-white via-white to-accent/5 p-8 shadow-soft">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="section-title mb-3">Executive Operations Center</p>
            <h1 className="font-serif text-4xl font-semibold tracking-tight text-primary">Executive Operations Center</h1>
            <p className="mt-3 text-base leading-7 text-primary/65">
              Monitor sales, installations, service operations, customer relationships and AI-powered business insights from a single workspace.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-medium text-primary/60">
              <div className="flex items-center gap-2 rounded-full border border-border bg-white/80 px-3 py-2 shadow-sm">
                <CalendarDays className="h-4 w-4" />
                {today}
              </div>
              <div className="rounded-full bg-accent/10 px-3 py-2 text-accent">{greeting} • Bhushancorp operations</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" className="gap-2" onClick={handleExecutiveReport}><Sparkles className="h-4 w-4" /> Generate Executive Report</Button>
            <Button variant="outline" className="gap-2" onClick={handleCreateQuotation}><Plus className="h-4 w-4" /> Create Quotation</Button>
            <Button variant="ghost" className="gap-2" onClick={handleViewServiceSchedule}><ClipboardList className="h-4 w-4" /> View Service Schedule</Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpiData.map(({ title, value, trend, description, icon: Icon }) => {
          const syncedValue = title === 'Pending Quotations'
            ? dashboardKpis[0].value
            : title === 'Today\'s Service Calls'
              ? dashboardKpis[1].value
              : title === 'AMC Renewals'
                ? dashboardKpis[2].value
                : value;

          return (
            <StatCard
              key={title}
              title={title}
              value={syncedValue}
              trend={trend}
              trendDirection="up"
              description={description}
              icon={Icon}
              className="transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
            />
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        {(isFounder || isSales) && (
          <MiniSection title="Industrial Revenue Breakdown">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueBreakdown} margin={{ left: -8, right: 8, top: 10 }}>
                  <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="Machine Sales" stackId="a" fill="#14213D" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="AMC" stackId="a" fill="#C58A2A" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Spare Parts" stackId="a" fill="#7C8DA8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Service Revenue" stackId="a" fill="#16A34A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </MiniSection>
        )}

        {isFounder && (
          <MiniSection title="Executive AI Insights">
            <div className="space-y-3">
              {insights.map((item) => (
                <div key={item} className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                  <div className="flex items-start gap-2">
                    <Bot className="mt-0.5 h-4 w-4 text-accent" />
                    <p className="text-sm leading-6 text-primary/70">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </MiniSection>
        )}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {(isFounder || isSales) && (
          <MiniSection title="Sales Pipeline">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineStages} margin={{ left: -8, right: 8 }}>
                <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="stage" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#14213D" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          </MiniSection>
        )}

        {(isFounder || isOps || isService || isEngineer) && (
          <MiniSection title="Installation Progress">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={installationProgress} margin={{ left: -8, right: 8 }}>
                <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#C58A2A" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          </MiniSection>
        )}

        {(isFounder || isOps || isService || isEngineer) && (
          <MiniSection title="Engineer Workload">
          <div className="space-y-4">
            {engineerWorkload.map((engineer) => (
              <div key={engineer.name} className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-primary">{engineer.name}</p>
                    <p className="mt-1 text-xs text-primary/50">{engineer.focus}</p>
                  </div>
                  <Badge variant="accent">{engineer.jobs} jobs</Badge>
                </div>
                <div className="mt-3 h-2 rounded-full bg-border">
                  <div className="h-2 rounded-full bg-accent" style={{ width: `${engineer.completion}%` }} />
                </div>
                <p className="mt-2 text-xs font-semibold text-primary/55">{engineer.completion}% completion</p>
              </div>
            ))}
          </div>
          </MiniSection>
        )}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <MiniSection title="Recent Activity">
          <div className="space-y-4">
            {businessState.timeline.slice(0, 5).map((event) => (
              <div key={event.id} className="flex items-start gap-3 rounded-[14px] border border-border/80 bg-background/70 p-4">
                <div className="mt-1 rounded-full bg-accent/10 p-2 text-accent">
                  <Wrench className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-primary">{event.title}</p>
                  <p className="mt-1 text-sm text-primary/55">{event.detail}</p>
                </div>
                <span className="text-xs text-primary/40">{event.time}</span>
              </div>
            ))}
          </div>
        </MiniSection>

        {(isFounder || isOps || isService || isEngineer) && (
          <div className="space-y-6">
            <MiniSection title="Upcoming Installations">
            <div className="space-y-3">
              {upcomingInstallations.map((job) => (
                <div key={job.customer} className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-primary">{job.customer}</p>
                      <p className="mt-1 text-xs text-primary/50">{job.machine}</p>
                    </div>
                    <Badge variant="accent">{job.status}</Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-primary/50">
                    <span>{job.engineer}</span>
                    <span>{job.date}</span>
                  </div>
                </div>
              ))}
            </div>
            </MiniSection>

            <MiniSection title="Critical Alerts">
            <div className="space-y-3">
              {criticalAlerts.map((alert) => (
                <div key={alert} className="flex items-start gap-2 rounded-[14px] border border-danger/20 bg-danger/5 p-4 text-sm text-danger">
                  <Clock3 className="mt-0.5 h-4 w-4" />
                  <span>{alert}</span>
                </div>
              ))}
            </div>
          </MiniSection>
          </div>
        )}

        {(isFounder || isAdmin) && (
          <MiniSection title="System Health">
            <div className="space-y-3 text-sm text-primary/70">
              <div className="rounded-[12px] border border-border/80 bg-background/70 p-3">CPU: 32% · Memory: 61% · Disk: 44%</div>
              <div className="rounded-[12px] border border-border/80 bg-background/70 p-3">Uptime: 12 days · Last backup: 2 days ago</div>
            </div>
          </MiniSection>
        )}
        </div>
      </div>
    </div>
  );
}