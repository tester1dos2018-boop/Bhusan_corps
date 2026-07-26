import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, Button, Badge, StatCard } from '../components/ui';
import { MapPin, CalendarDays, Users, Truck } from 'lucide-react';
interface Project {
  id: string;
  name: string;
  customer: string;
  siteReadiness: number; // percent
  engineersAllocated: number;
  progress: number; // percent
  nextMilestone: string;
  deploymentDate: string;
}

const kpis = [
  { title: 'Active Projects', value: '26', icon: MapPin },
  { title: 'On-track', value: '22', icon: CalendarDays },
  { title: 'Engineers Deployed', value: '84', icon: Users },
  { title: 'Deployments This Month', value: '9', icon: Truck },
];

const statusData = [
  { name: 'On Track', value: 22 },
  { name: 'At Risk', value: 3 },
  { name: 'Delayed', value: 1 },
];

const projects: Project[] = [
  { id: 'P-9001', name: 'Angul Cement Plant', customer: 'ABC Cement', siteReadiness: 92, engineersAllocated: 8, progress: 78, nextMilestone: 'Commissioning', deploymentDate: '2026-08-12' },
  { id: 'P-9002', name: 'Meridian Pump Station', customer: 'Meridian Industries', siteReadiness: 64, engineersAllocated: 5, progress: 45, nextMilestone: 'Site Acceptance', deploymentDate: '2026-09-03' },
  { id: 'P-9003', name: 'Bihar Food Plant', customer: 'Bihar Food Corp', siteReadiness: 85, engineersAllocated: 6, progress: 61, nextMilestone: 'Final Testing', deploymentDate: '2026-08-30' },
];

// recentTimeline intentionally unused in demo — kept for future enhancement

export default function Installations() {
  const handleExport = () => alert('Exported project dashboard (demo)');
  const handleRefresh = () => alert('Refreshed project data (demo)');
  const handleAllocate = (projectId: string) => alert(`Allocated engineers to ${projectId} (demo)`);
  const handleViewPlan = (projectId: string) => alert(`Viewing plan for ${projectId} (demo)`);

  return (
    <div className="space-y-8">
      <Card className="p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="section-title">Installation Command Center</p>
            <h1 className="font-serif text-3xl font-semibold text-primary mt-2">Enterprise Project Dashboard</h1>
            <p className="mt-2 text-sm text-primary/65">Operational view of active installations, engineer allocation and project risks.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={handleExport}>Export</Button>
            <Button variant="ghost" onClick={handleRefresh}>Refresh</Button>
          </div>
        </div>
      </Card>

      <section className="grid gap-4 md:grid-cols-4">
        {kpis.map((kpi) => (
          <StatCard key={kpi.title} title={kpi.title} value={kpi.value} icon={kpi.icon} className="transition-all duration-300 hover:-translate-y-1" />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <Card className="p-6">
          <p className="font-semibold text-primary">Project Status</p>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData} margin={{ left: -12, right: 8 }}>
                <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#14213D" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 text-sm text-primary/70">
            <div>On Track: 22</div>
            <div>At Risk: 3</div>
            <div>Delayed: 1</div>
          </div>
        </Card>

        <Card className="p-6">
          <p className="font-semibold text-primary">AI Project Risk</p>
          <p className="mt-3 text-sm text-primary/80">Risk signals indicate engineer shortages and spare-part lead times for pumps.</p>
          <div className="mt-4">
            <Badge variant="warning">Spare lead time high</Badge>
            <div className="mt-3 text-sm text-primary/70">Recommend sourcing alternate vendors for critical SKUs.</div>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-primary">Project Timeline & Site Readiness</p>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => alert('Timeline filter (demo)')}>Filter</Button>
              <Button size="sm" variant="outline" onClick={() => alert('New milestone (demo)')}>New milestone</Button>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            {projects.map((p) => (
              <div key={p.id} className="rounded-[12px] border border-border/80 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-primary">{p.name} <span className="text-xs text-primary/50">{p.id}</span></p>
                    <p className="text-sm text-primary/60">{p.customer}</p>
                    <div className="mt-2 text-sm text-primary/70">Next: {p.nextMilestone} · Deploy {p.deploymentDate}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-primary/60">Readiness</div>
                    <div className="font-semibold">{p.siteReadiness}%</div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => handleAllocate(p.id)}>Allocate</Button>
                      <Button size="sm" variant="ghost" onClick={() => handleViewPlan(p.id)}>View</Button>
                    </div>
                  </div>
                </div>
                <div className="mt-3 h-2 rounded-full bg-border">
                  <div className="h-2 rounded-full bg-accent" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <p className="font-semibold text-primary">Engineer Allocation</p>
            <div className="mt-3 text-sm text-primary/70">84 engineers deployed across sites. 6 on standby.</div>
            <div className="mt-4 grid gap-3">
              {projects.map((p) => (
                <div key={p.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-primary">{p.name}</p>
                    <p className="text-xs text-primary/60">{p.engineersAllocated} engineers</p>
                  </div>
                  <Badge variant={p.engineersAllocated > 6 ? 'success' : 'accent'}>{p.engineersAllocated}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <p className="font-semibold text-primary">Upcoming Deployments</p>
            <div className="mt-4 space-y-3 text-sm">
              {projects.map((p) => (
                <div key={p.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-primary">{p.name}</p>
                    <p className="text-xs text-primary/60">{p.deploymentDate}</p>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => alert(`Open deployment plan for ${p.id} (demo)`)}>Plan</Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
