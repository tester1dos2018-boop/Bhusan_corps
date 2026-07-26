import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Badge, Card, SectionHeader } from '../components/ui';
import { useAppState } from '../context/AppContext';

interface ModulePageProps {
  title: string;
  description: string;
}

export default function ModulePage({ title, description }: ModulePageProps) {
  const { selectedCustomer, selectedAction, selectedQuotation, selectedServiceCall, currentAIContext } = useAppState();

  return (
    <div className="space-y-8">
      <Card className="rounded-[24px] bg-white/75 p-8 dark:bg-white/5">
        <SectionHeader
          eyebrow="Enterprise module"
          title={title}
          description={description}
          action={<Badge variant="accent">Intelligent module</Badge>}
        />
      </Card>

      <Card className="p-8">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-accent/10 p-3 text-accent"><Sparkles className="h-5 w-5" /></div>
          <div>
            <p className="section-title">Incoming workflow context</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-primary">The module is now connected to the operating system</h2>
            <p className="mt-3 text-sm leading-7 text-primary/65">
              {currentAIContext ?? 'This placeholder is receiving context from the shared demo state so future work can expand without breaking the current experience.'}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[16px] border border-border/80 bg-background/70 p-5">
            <p className="text-sm font-semibold text-primary">Context summary</p>
            <div className="mt-4 space-y-3 text-sm text-primary/65">
              <div className="flex items-center justify-between"><span>Customer</span><span className="font-semibold text-primary">{selectedCustomer?.name ?? 'No customer selected'}</span></div>
              <div className="flex items-center justify-between"><span>Action</span><span className="font-semibold text-primary">{selectedAction ?? 'Executive review'}</span></div>
              <div className="flex items-center justify-between"><span>Quotation</span><span className="font-semibold text-primary">{selectedQuotation ?? 'No quotation selected'}</span></div>
              <div className="flex items-center justify-between"><span>Service call</span><span className="font-semibold text-primary">{selectedServiceCall ?? 'No service call selected'}</span></div>
            </div>
          </div>

          <div className="rounded-[16px] border border-border/80 bg-background/70 p-5">
            <p className="text-sm font-semibold text-primary">Next step</p>
            <p className="mt-3 text-sm leading-7 text-primary/65">
              Keep the current page open to review the incoming decision context. The shared state will continue to pass customer, action and AI recommendations as the demo expands.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm font-semibold text-primary">
              Connected workflow
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}