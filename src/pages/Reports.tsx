import { FileText, Sparkles } from 'lucide-react';
import { Badge, Button, Card } from '../components/ui';

const reports = [
  { title: 'Board Report', detail: 'Executive summary covering revenue, service, renewal and risk posture.', action: 'Preview' },
  { title: 'Revenue Report', detail: 'Commercial forecast and quotation movement for the next quarter.', action: 'Preview' },
  { title: 'Customer Report', detail: 'Account health, payment behaviour and service sentiment.', action: 'Preview' },
  { title: 'Service Report', detail: 'Installations, SLA health and engineer utilization summary.', action: 'Preview' },
];

export default function Reports() {
  return (
    <div className="space-y-8">
      <Card className="p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-accent/10 p-3 text-accent"><FileText className="h-6 w-6" /></div>
            <div>
              <p className="section-title">Executive Reports</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-primary">Lightweight reporting module for board and operations review</h2>
            </div>
          </div>
          <Badge variant="accent">Mock PDF export</Badge>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {reports.map((report) => (
            <div key={report.title} className="rounded-[16px] border border-border/80 bg-background/70 p-5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <p className="text-sm font-semibold text-primary">{report.title}</p>
              </div>
              <p className="mt-3 text-sm leading-7 text-primary/65">{report.detail}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant="secondary">Preview</Button>
                <Button size="sm" variant="outline">Download PDF</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
