import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  CircleDollarSign,
  Crown,
  FileText,
  Layers3,
  PackageCheck,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';
import { Badge, Button, Card } from '../components/ui';
import { useAppState } from '../context/AppContext';
import { generateAIResponse, type AIResponse } from '../lib/aiService';
import { useAuth } from '../context/AuthContext';
import { ROLE_NAV_MAP, NAV_ITEMS } from '../config/navigationConfig';

interface MetricCard {
  label: string;
  value: string;
  trend: string;
  insight: string;
  icon: typeof CircleDollarSign;
  tone: 'accent' | 'success' | 'warning' | 'primary';
}

interface SuggestedPrompt {
  title: string;
  prompt: string;
}

interface DecisionItem {
  title: string;
  context: string;
  owner: string;
  due: string;
}

interface OpportunityItem {
  title: string;
  confidence: string;
  revenue: string;
  action: string;
  priority: string;
  icon: typeof TrendingUp;
}

interface PulseItem {
  label: string;
  value: string;
  state: string;
  tone: 'success' | 'warning' | 'accent' | 'danger';
}

const metrics: MetricCard[] = [
  { label: 'Revenue Today', value: '₹4.8 Cr', trend: '+12% vs last week', insight: 'Cement and steel clusters driving momentum', icon: CircleDollarSign, tone: 'accent' },
  { label: 'Collections', value: '₹2.1 Cr', trend: '92% on-time', insight: 'Two high-value accounts need follow-up', icon: BarChart3, tone: 'success' },
  { label: 'Pending Quotations', value: '24', trend: '6 awaiting approval', insight: 'Fastest conversion in western region', icon: Briefcase, tone: 'warning' },
  { label: 'Service Calls', value: '18', trend: '3 escalations', insight: 'Preventive maintenance backlog is down', icon: Wrench, tone: 'primary' },
  { label: 'AMC Renewals', value: '11', trend: '4 due this week', insight: 'Cross-sell window strongest in Q3', icon: ShieldAlert, tone: 'accent' },
  { label: 'Inventory Alerts', value: '5', trend: '2 critical parts', insight: 'Compressor spares require replenishment', icon: PackageCheck, tone: 'warning' },
  { label: 'Engineer Availability', value: '76%', trend: '4 slots open', insight: 'Capacity tight in Maharashtra', icon: Users, tone: 'primary' },
];

const suggestedPrompts: SuggestedPrompt[] = [
  { title: 'Summarize today’s business', prompt: 'Summarize today’s business across revenue, service, collections and inventory risks.' },
  { title: 'Weekly board report', prompt: 'Generate a concise weekly board report with top risks and growth opportunities.' },
  { title: 'Highest-risk customers', prompt: 'List the customers with the highest financial and service risk this week.' },
  { title: 'Revenue forecast', prompt: 'Create a revenue forecast for the next 14 days using current pipeline and renewal signals.' },
  { title: 'AMC renewals', prompt: 'Prioritize AMC renewals with the highest revenue and retention potential.' },
  { title: 'Pending collections', prompt: 'Highlight pending collections and suggest customer-specific outreach steps.' },
  { title: 'Cross-selling opportunities', prompt: 'Identify the highest-confidence cross-selling opportunities for existing accounts.' },
  { title: 'Engineer workload', prompt: 'Show the current engineer workload and recommend staffing adjustments.' },
];

const decisions: DecisionItem[] = [
  { title: 'Quotation Approval', context: 'Cement cluster expansion request needs approval before dispatch.', owner: 'Sales Ops', due: 'Today · 14:00' },
  { title: 'Purchase Order Approval', context: 'Critical spare parts order for compressor fleet is pending.', owner: 'Procurement', due: 'Today · 16:30' },
  { title: 'AMC Renewal', context: 'Two strategic accounts are due for renewal and require executive signals.', owner: 'Service Lead', due: 'Tomorrow · 10:00' },
  { title: 'Payment Reminder', context: 'High-value invoice reminder is ready for the finance team.', owner: 'Finance', due: 'Today · 18:00' },
  { title: 'Site Visit Approval', context: 'Regional engineer visit is pending for a delayed commissioning project.', owner: 'Operations', due: 'Tomorrow · 12:30' },
  { title: 'Service Escalation', context: 'Escalation from a steel plant requires senior intervention.', owner: 'Service Desk', due: 'Now' },
];

const opportunities: OpportunityItem[] = [
  { title: 'Cross-selling', confidence: '94%', revenue: '₹36L', action: 'Offer AMC bundle to top 5 accounts', priority: 'High', icon: TrendingUp },
  { title: 'Upselling', confidence: '88%', revenue: '₹22L', action: 'Present premium service add-on', priority: 'Medium', icon: Sparkles },
  { title: 'Preventive Maintenance', confidence: '91%', revenue: '₹18L', action: 'Schedule quarterly maintenance plan', priority: 'High', icon: Wrench },
  { title: 'Predictive Service', confidence: '86%', revenue: '₹14L', action: 'Trigger remote monitoring package', priority: 'Medium', icon: Zap },
  { title: 'Revenue Opportunity', confidence: '90%', revenue: '₹41L', action: 'Prioritize renewal-led expansion', priority: 'Critical', icon: CircleDollarSign },
];

const recentActions = [
  { title: 'Generated executive report', detail: 'Board-ready summary prepared for the MD and finance leadership.', time: '12 mins ago' },
  { title: 'Prepared quotation', detail: 'Renewal bundle drafted for a high-value cement account.', time: '38 mins ago' },
  { title: 'Identified inventory shortage', detail: 'Critical compressor spares flagged for immediate replenishment.', time: '1 hr ago' },
  { title: 'Recommended customer follow-up', detail: 'Two strategic accounts were highlighted for payment and service recovery.', time: '2 hrs ago' },
  { title: 'Generated weekly sales summary', detail: 'Regional sales momentum was summarized with conversion insights.', time: 'Today, 08:10' },
];

const pulseItems: PulseItem[] = [
  { label: 'Sales', value: 'Healthy', state: 'Momentum accelerating', tone: 'success' },
  { label: 'Service', value: 'Stable', state: 'Escalations contained', tone: 'accent' },
  { label: 'Collections', value: 'Watch', state: 'Two accounts need nudges', tone: 'warning' },
  { label: 'Inventory', value: 'At risk', state: 'Spare parts low', tone: 'danger' },
  { label: 'Customer Satisfaction', value: 'Excellent', state: 'CSAT above target', tone: 'success' },
  { label: 'Engineering', value: 'Tight', state: 'Capacity near ceiling', tone: 'warning' },
];

const toneClasses: Record<PulseItem['tone'], string> = {
  success: 'border-success/20 bg-success/10 text-success',
  warning: 'border-warning/20 bg-warning/10 text-warning',
  accent: 'border-accent/20 bg-accent/10 text-accent',
  danger: 'border-danger/20 bg-danger/10 text-danger',
};

export default function ExecutiveAssistant() {
  const {
    selectedCustomer,
    selectedModule,
    selectedAction,
    selectedQuotation,
    selectedServiceCall,
    currentAIContext,
    businessState, // Include businessState from AppContext
  } = useAppState();
  const { currentUser } = useAuth();

  const role = currentUser?.role;
  const allowedIdsForRole = role ? (ROLE_NAV_MAP[role as keyof typeof ROLE_NAV_MAP] ?? []) : [];
  const allowedModuleLabels = NAV_ITEMS.filter((n) => allowedIdsForRole.includes(n.id)).map((n) => n.label);
  const [input, setInput] = useState('Summarize today’s business across revenue, service, collections and inventory risks.');
  const [activeResponse, setActiveResponse] = useState<AIResponse | null>(null);
  const [reportStatus, setReportStatus] = useState<string | null>(null);

  const contextSummary = useMemo(() => {
    const details = [
      selectedCustomer ? `Customer: ${selectedCustomer.name}` : null,
      `Module: ${selectedModule}`,
      selectedAction ? `Action: ${selectedAction}` : null,
      selectedQuotation ? `Quotation: ${selectedQuotation}` : null,
      selectedServiceCall ? `Service call: ${selectedServiceCall}` : null,
      currentAIContext ? `Context: ${currentAIContext}` : null,
    ].filter(Boolean);

    return details.length > 0 ? details.join(' • ') : 'No active workflow context';
  }, [selectedCustomer, selectedModule, selectedAction, selectedQuotation, selectedServiceCall, currentAIContext]);

  const handleGenerate = async (promptValue: string = input) => {
    const basePrompt = promptValue.trim() || 'Summarize today’s business across revenue, service, collections and inventory risks.';
    // Add role-aware context so the AI focuses only on modules available to the current user
    const roleContext = role ? `User role: ${role}. Available modules: ${allowedModuleLabels.length > 0 ? allowedModuleLabels.join(', ') : 'None'}.` : '';
    const prompt = `${roleContext} ${basePrompt}`.trim();

    setReportStatus('Generating AI insight...');

    const response = await generateAIResponse(prompt, {
      selectedCustomer: selectedCustomer?.name ?? null,
      selectedModule,
      selectedAction,
      selectedQuotation,
      selectedServiceCall,
      currentAIContext,
      businessState, // Pass the current businessState from AppContext
    });

    setActiveResponse(response);
    setInput(basePrompt);
    setReportStatus(response.source === 'gemini' ? 'AI insight generated by Aravya.' : 'AI insight prepared with the demo fallback.');
  };

  const handleSuggestedPrompt = (prompt: SuggestedPrompt) => {
    setInput(prompt.prompt);
    handleGenerate(prompt.prompt);
  };

  const handleCopySummary = async () => {
    if (!activeResponse) return;

    try {
      await navigator.clipboard.writeText(`${activeResponse.summary}\n\nRecommendation: ${activeResponse.recommendation}`);
      setReportStatus('Summary copied to clipboard.');
    } catch {
      setReportStatus('Copy is unavailable in this browser.');
    }
  };

  const handleQuickAction = (label: string) => {
    setReportStatus(`${label} simulated for this demo workflow.`);
  };

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden border-border/80 bg-gradient-to-br from-white via-white to-accent/5 p-8 shadow-soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-title mb-2">Executive AI Copilot</p>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-primary">Aravya AIOS</h1>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-primary/65">
              A premium decision-support layer for revenue, service, collections, approvals and operations across Bhushancorp.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" className="gap-2" onClick={() => handleGenerate('Generate a concise board brief covering revenue, risks and the next 24 hours of action.')}> <Sparkles className="h-4 w-4" /> Run board brief</Button>
            <Button variant="outline" className="gap-2" onClick={() => handleGenerate('Draft a leadership report with revenue outlook, service risk and renewal priorities.')}> <FileText className="h-4 w-4" /> Draft report</Button>
          </div>
        </div>
      </Card>

      <section className="grid gap-4 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const iconClasses = metric.tone === 'accent'
            ? 'bg-accent/10 text-accent'
            : metric.tone === 'success'
              ? 'bg-success/10 text-success'
              : metric.tone === 'warning'
                ? 'bg-warning/10 text-warning'
                : 'bg-primary/10 text-primary';

          return (
            <Card key={metric.label} className="p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/40">{metric.label}</p>
                  <p className="mt-3 font-serif text-2xl font-semibold text-primary">{metric.value}</p>
                </div>
                <div className={`rounded-2xl p-3 ${iconClasses}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-sm font-semibold text-primary">{metric.trend}</p>
              <p className="mt-1 text-sm leading-6 text-primary/55">{metric.insight}</p>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-accent/10 p-3 text-accent"><Crown className="h-6 w-6" /></div>
            <div>
              <p className="section-title">Executive AI Summary</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-primary">Today’s operating posture is strong, but a few high-velocity decisions need executive attention.</h2>
            </div>
          </div>
          <p className="mt-6 text-sm leading-8 text-primary/65">
            Revenue momentum is improving across the cement, steel and infrastructure portfolios, with conversion quality stronger than last week. Collections are recovering, though two strategic accounts still carry elevated delay risk and require direct executive outreach. Pending quotations are concentrated in the western region where engineering bandwidth is approaching saturation. The AI signal also highlights a valuable window for AMC renewals, preventive maintenance upsell and spare-part replenishment before the next quarter planning freeze.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['Revenue trend positive', 'Collections improving', 'AMC expansion window', 'Engineering capacity tight'].map((item) => (
              <Badge key={item} variant="accent">{item}</Badge>
            ))}
          </div>
        </Card>

        <Card className="overflow-hidden border-accent/20 bg-gradient-to-br from-primary via-primary to-primary/90 p-8 text-white">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-accent/15 p-3 text-accent"><Sparkles className="h-6 w-6" /></div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">AI recommendation</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold">Focus on the next 24 hours</h3>
              <p className="mt-4 text-sm leading-7 text-white/75">
                Close the highest-value quotation approvals, unlock service capacity for the delayed site visits and prepare a renewal bundle for the top ten accounts with upcoming AMC deadlines.
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="p-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-accent/10 p-3 text-accent"><Sparkles className="h-6 w-6" /></div>
            <div>
              <p className="section-title">Ask Aravya AI</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-primary">Prompt the operating system</h2>
            </div>
          </div>

          <div className="mt-6 rounded-[16px] border border-border bg-background/70 p-4">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask for a summary, forecast, risk review, or renewal plan..."
              className="min-h-[120px] w-full resize-none bg-transparent text-sm leading-7 text-primary outline-none placeholder:text-primary/40"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt.title}
                onClick={() => handleSuggestedPrompt(prompt)}
                className="rounded-full border border-border bg-white px-3 py-2 text-sm text-primary/70 transition-all duration-300 hover:border-accent/30 hover:text-primary"
              >
                {prompt.title}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-[14px] border border-border/80 bg-background/70 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/40">Active workflow</p>
            <p className="mt-2 text-sm leading-7 text-primary/65">{contextSummary}</p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[14px] border border-border/80 bg-background/70 p-4">
            <div>
              <p className="text-sm font-semibold text-primary">Prepared output</p>
              <p className="mt-1 text-sm text-primary/55">Board-ready insight with confidence, next steps and decision framing.</p>
            </div>
            <Button className="gap-2" onClick={() => handleGenerate(input)}>Generate <ArrowRight className="h-4 w-4" /></Button>
          </div>

                    {activeResponse ? (
                      <div className="mt-4 rounded-[16px] border border-accent/20 bg-gradient-to-br from-white to-accent/5 p-5">
                        <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={activeResponse.source === "gemini" ? "success" : "warning"}
            >
              {activeResponse.source === "gemini"
                ? "✨ Aravya AI"
                : "⚡ Demo AI"}
            </Badge>

            <Badge variant="muted">
              {selectedCustomer?.name ?? "No customer selected"}
            </Badge>

        <Badge variant="muted">
              {selectedModule}
            </Badge>
          </div>
              <p className="mt-4 text-sm leading-8 text-primary/70">{activeResponse.summary}</p>
              <div className="mt-4 rounded-[12px] border border-border/80 bg-background/70 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/40">Recommended next step</p>
                <p className="mt-2 text-sm font-semibold text-primary">{activeResponse.recommendation}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={handleCopySummary}>Copy summary</Button>
                <Button size="sm" variant="ghost" onClick={() => handleQuickAction('Print brief')}>Print brief</Button>
                <Button size="sm" variant="secondary" onClick={() => handleQuickAction('Export PDF')}>Export PDF</Button>
              </div>
              {reportStatus ? <p className="mt-3 text-sm text-success">{reportStatus}</p> : null}
            </div>
          ) : null}
        </Card>

        <Card className="p-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary"><Layers3 className="h-6 w-6" /></div>
            <div>
              <p className="section-title">Decision Center</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-primary">Executive actions</h2>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {decisions.map((decision) => (
              <div key={decision.title} className="rounded-[14px] border border-border/80 bg-background/70 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-primary">{decision.title}</p>
                    <p className="mt-1 text-sm leading-6 text-primary/55">{decision.context}</p>
                  </div>
                  <Badge variant="accent">{decision.due}</Badge>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" variant="secondary">Approve</Button>
                  <Button size="sm" variant="outline">Review</Button>
                  <Button size="sm" variant="ghost">Escalate</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="p-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-accent/10 p-3 text-accent"><TrendingUp className="h-6 w-6" /></div>
            <div>
              <p className="section-title">Opportunity Engine</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-primary">AI-generated expansion paths</h2>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {opportunities.map((opportunity) => {
              const Icon = opportunity.icon;
              return (
                <div key={opportunity.title} className="rounded-[16px] border border-border/80 bg-background/70 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-primary/10 p-2 text-primary"><Icon className="h-4 w-4" /></div>
                      <div>
                        <p className="font-semibold text-primary">{opportunity.title}</p>
                        <p className="mt-1 text-sm text-primary/55">{opportunity.action}</p>
                      </div>
                    </div>
                    <Badge variant="success">{opportunity.confidence}</Badge>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-primary/55">Estimated revenue</span>
                    <span className="font-semibold text-primary">{opportunity.revenue}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-primary/55">Priority</span>
                    <span className="font-semibold text-primary">{opportunity.priority}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary"><BarChart3 className="h-6 w-6" /></div>
            <div>
              <p className="section-title">Business Pulse</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-primary">Health overview</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {pulseItems.map((item) => (
              <div key={item.label} className={`rounded-[14px] border p-4 ${toneClasses[item.tone]}`}>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">{item.label}</p>
                  <Badge variant={item.tone === 'success' ? 'success' : item.tone === 'warning' ? 'warning' : item.tone === 'accent' ? 'accent' : 'danger'}>{item.value}</Badge>
                </div>
                <p className="mt-3 text-sm leading-6">{item.state}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-accent/10 p-3 text-accent"><Sparkles className="h-6 w-6" /></div>
            <div>
              <p className="section-title">Recent AI Actions</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-primary">The system’s recent operating decisions</h2>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {recentActions.map((action, index) => (
              <div key={action.title} className="flex gap-3 rounded-[14px] border border-border/80 bg-background/70 p-4">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-primary">{action.title}</p>
                    <span className="text-xs text-primary/45">{action.time}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-primary/55">{action.detail}</p>
                  {index < recentActions.length - 1 ? <div className="mt-4 h-px bg-border" /> : null}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="overflow-hidden border-accent/20 bg-gradient-to-br from-primary via-primary to-primary/90 p-8 text-white">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-accent/15 p-3 text-accent"><BarChart3 className="h-6 w-6" /></div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">AI operating rhythm</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold">A system designed for executive pace</h3>
              <p className="mt-4 text-sm leading-7 text-white/75">
                Aravya continuously turns transactions, service events and account signals into executive-ready actions so leadership can steer the business with confidence rather than reconcile it after the fact.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}



