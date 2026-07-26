import { ArrowRight, ShieldCheck, Wrench } from 'lucide-react';
import { Badge, Button, Card } from '../components/ui';
import { useAppState } from '../context/AppContext';

export default function ServicePlaceholder() {
  const { selectedCustomer, selectedServiceCall, selectedAction, currentAIContext, businessState, scheduleServiceVisit } = useAppState();

  return (
    <div className="space-y-8">
      <Card className="p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-accent/10 p-3 text-accent"><Wrench className="h-6 w-6" /></div>
            <div>
              <p className="section-title">Service Intelligence</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-primary">Field service operations with real scheduling flow</h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="accent">SLA live</Badge>
            <Badge variant="warning">Installations active</Badge>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[16px] border border-border/80 bg-background/70 p-5">
            <p className="text-sm font-semibold text-primary">Incoming context</p>
            <div className="mt-4 space-y-3 text-sm text-primary/65">
              <div className="flex items-center justify-between"><span>Customer</span><span className="font-semibold text-primary">{selectedCustomer?.name ?? 'Not selected'}</span></div>
              <div className="flex items-center justify-between"><span>Service call</span><span className="font-semibold text-primary">{selectedServiceCall ?? 'SC-108'}</span></div>
              <div className="flex items-center justify-between"><span>Action</span><span className="font-semibold text-primary">{selectedAction ?? 'Review'}</span></div>
            </div>
          </div>

          <div className="rounded-[16px] border border-border/80 bg-background/70 p-5">
            <p className="text-sm font-semibold text-primary">AI recommendation</p>
            <p className="mt-3 text-sm leading-7 text-primary/65">{currentAIContext ?? 'A proactive service handoff is prepared for the next operating review.'}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge variant="accent">Escalation review</Badge>
              <Badge variant="warning">Field priority</Badge>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.95fr]">
          <div className="space-y-6">
            <div className="rounded-[16px] border border-border/80 bg-background/70 p-5">
              <p className="text-sm font-semibold text-primary">Today’s Service Schedule</p>
              <div className="mt-4 space-y-3">
                {businessState.serviceVisits.map((visit) => (
                  <div key={visit.id} className="rounded-[12px] border border-border/80 bg-white p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-primary">{visit.customerName}</p>
                        <p className="mt-1 text-xs text-primary/50">{visit.ticket} • {visit.scheduledAt}</p>
                      </div>
                      <Badge variant={visit.status === 'Completed' ? 'success' : 'accent'}>{visit.status}</Badge>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-primary/50">
                      <span>{visit.engineer}</span>
                      <span>SLA {visit.sla}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[16px] border border-border/80 bg-background/70 p-5">
              <p className="text-sm font-semibold text-primary">AMC Renewals</p>
              <div className="mt-4 space-y-3">
                {businessState.amcs.map((amc) => (
                  <div key={amc.id} className="flex flex-wrap items-center justify-between gap-3 rounded-[12px] border border-border/80 bg-white p-3">
                    <div>
                      <p className="text-sm font-semibold text-primary">{amc.customerName}</p>
                      <p className="mt-1 text-xs text-primary/50">{amc.renewalDue} • {amc.amount}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={amc.status === 'Active' ? 'success' : 'warning'}>{amc.status}</Badge>
                      {amc.status !== 'Active' ? <Button size="sm" variant="secondary" onClick={() => { /* placeholder */ }}>Approve AMC</Button> : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[16px] border border-border/80 bg-background/70 p-5">
              <p className="text-sm font-semibold text-primary">Engineer Assignment</p>
              <div className="mt-4 rounded-[12px] border border-border/80 bg-white p-4">
                <p className="text-sm text-primary/65">Recommended engineer for the active visit</p>
                <p className="mt-2 font-serif text-xl font-semibold text-primary">Vikram</p>
                <p className="mt-2 text-sm text-primary/55">Assigned to the latest service request and flagged for dispatch.</p>
              </div>
            </div>

            <div className="rounded-[16px] border border-border/80 bg-background/70 p-5">
              <p className="text-sm font-semibold text-primary">Quick Actions</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="secondary" className="gap-2" onClick={() => scheduleServiceVisit(selectedCustomer?.id ?? 'CUS-1001', selectedCustomer?.name ?? 'ABC Cement', 'Rajesh', selectedServiceCall ?? 'SC-108')}><ShieldCheck className="h-4 w-4" /> Schedule visit</Button>
                <Button variant="outline" className="gap-2">Open service timeline <ArrowRight className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
