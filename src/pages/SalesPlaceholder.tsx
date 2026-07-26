import { FileText, Sparkles, TrendingUp } from 'lucide-react';
import { Badge, Button, Card } from '../components/ui';
import { useAppState } from '../context/AppContext';

export default function SalesPlaceholder() {
  const { selectedCustomer, selectedQuotation, selectedAction, currentAIContext, businessState, approveQuotation, navigateWithContext } = useAppState();

  const activeQuotation = businessState.quotations.find((quotation) => quotation.id === (selectedQuotation ?? businessState.quotations[0].id));

  return (
    <div className="space-y-8">
      <Card className="p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-accent/10 p-3 text-accent"><TrendingUp className="h-6 w-6" /></div>
            <div>
              <p className="section-title">Sales Intelligence</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-primary">Commercial workflow with approval and forecasting</h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="accent">Revenue forecast live</Badge>
            <Badge variant="warning">Approval queue active</Badge>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[16px] border border-border/80 bg-background/70 p-5">
            <p className="text-sm font-semibold text-primary">Incoming context</p>
            <div className="mt-4 space-y-3 text-sm text-primary/65">
              <div className="flex items-center justify-between"><span>Customer</span><span className="font-semibold text-primary">{selectedCustomer?.name ?? 'Not selected'}</span></div>
              <div className="flex items-center justify-between"><span>Quotation</span><span className="font-semibold text-primary">{selectedQuotation ?? 'Q-2410'}</span></div>
              <div className="flex items-center justify-between"><span>Action</span><span className="font-semibold text-primary">{selectedAction ?? 'Review'}</span></div>
            </div>
          </div>

          <div className="rounded-[16px] border border-border/80 bg-background/70 p-5">
            <p className="text-sm font-semibold text-primary">AI recommendation</p>
            <p className="mt-3 text-sm leading-7 text-primary/65">{currentAIContext ?? 'The operating system is preparing a focused commercial recommendation.'}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge variant="accent">Renewal focus</Badge>
              <Badge variant="warning">Approval pending</Badge>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.95fr]">
          <div className="space-y-6">
            <div className="rounded-[16px] border border-border/80 bg-background/70 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-primary">Sales Pipeline</p>
                <Badge variant="success">+14% momentum</Badge>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {['Lead', 'Site Visit', 'Quotation'].map((stage) => (
                  <div key={stage} className="rounded-[12px] border border-border/80 bg-white p-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-primary/40">{stage}</p>
                    <p className="mt-2 font-serif text-xl font-semibold text-primary">{stage === 'Lead' ? '32' : stage === 'Site Visit' ? '18' : '14'}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[16px] border border-border/80 bg-background/70 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-primary">Quotation Queue</p>
                <Badge variant="accent">{businessState.quotations.filter((q) => q.status === 'Pending').length} pending</Badge>
              </div>
              <div className="mt-4 space-y-3">
                {businessState.quotations.map((quotation) => (
                  <div key={quotation.id} className="flex flex-wrap items-center justify-between gap-3 rounded-[12px] border border-border/80 bg-white p-3">
                    <div>
                      <p className="text-sm font-semibold text-primary">{quotation.id} • {quotation.customerName}</p>
                      <p className="mt-1 text-xs text-primary/50">{quotation.amount} • {quotation.stage}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={quotation.status === 'Approved' ? 'success' : 'warning'}>{quotation.status}</Badge>
                      {quotation.status === 'Pending' ? <Button size="sm" variant="secondary" onClick={() => approveQuotation(quotation.id)}>Approve</Button> : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[16px] border border-border/80 bg-background/70 p-5">
              <p className="text-sm font-semibold text-primary">Revenue Forecast</p>
              <div className="mt-4 rounded-[12px] border border-border/80 bg-white p-4">
                <p className="text-sm text-primary/65">Next 90 days forecast</p>
                <p className="mt-2 font-serif text-2xl font-semibold text-primary">₹46.8L</p>
                <p className="mt-2 text-sm text-success">Momentum supported by current approvals and renewal activity.</p>
              </div>
            </div>

            <div className="rounded-[16px] border border-border/80 bg-background/70 p-5">
              <p className="text-sm font-semibold text-primary">Quick Actions</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="secondary" className="gap-2" onClick={() => approveQuotation(activeQuotation?.id ?? 'Q-2410')}><Sparkles className="h-4 w-4" /> Approve current quote</Button>
                <Button variant="outline" className="gap-2" onClick={() => navigateWithContext('/executive-assistant', { module: 'executive-assistant', action: 'Generate board report', toast: 'Opening Executive AI...' })}><FileText className="h-4 w-4" /> Open board brief</Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
