// React import not required directly in this file (JSX transform handles it)
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, Button, Badge, StatCard } from '../components/ui';
import { useAppState } from '../context/AppContext';
import { generateAIResponse, type AIResponse } from '../lib/aiService';
import { useState } from 'react';
import { Users, Zap, Clock, Award } from 'lucide-react';

interface Engineer {
  id: string;
  name: string;
  skill: string;
  utilization: number; // percent
  todayJobs: number;
  status: 'Available' | 'Assigned' | 'On Leave';
  rating: number; // 1-5
}

const kpis = [
  { title: 'Total Engineers', value: '124', icon: Users },
  { title: 'Avg Utilization', value: '76%', icon: Zap },
  { title: 'Today Jobs', value: '312', icon: Clock },
  { title: 'Top Performer', value: 'Asha', icon: Award },
];

const topAttendance = [
  { id: 'ENG-003', name: 'Asha', attendance: '99%' },
  { id: 'ENG-001', name: 'Rajesh', attendance: '98%' },
  { id: 'ENG-007', name: 'Kiran', attendance: '98%' },
  { id: 'ENG-012', name: 'Ravi', attendance: '97%' },
  { id: 'ENG-009', name: 'Meena', attendance: '97%' },
  { id: 'ENG-005', name: 'Suresh', attendance: '96%' },
  { id: 'ENG-010', name: 'Nidhi', attendance: '96%' },
  { id: 'ENG-011', name: 'Vikram', attendance: '95%' },
  { id: 'ENG-014', name: 'Pooja', attendance: '95%' },
  { id: 'ENG-002', name: 'Naveen', attendance: '94%' },
];

const utilizationData = [
  { name: '08:00', value: 30 },
  { name: '10:00', value: 48 },
  { name: '12:00', value: 62 },
  { name: '14:00', value: 74 },
  { name: '16:00', value: 68 },
  { name: '18:00', value: 54 },
];

const engineers: Engineer[] = [
  { id: 'ENG-001', name: 'Rajesh', skill: 'Commissioning', utilization: 82, todayJobs: 5, status: 'Assigned', rating: 4.6 },
  { id: 'ENG-002', name: 'Naveen', skill: 'Pumps', utilization: 74, todayJobs: 4, status: 'Assigned', rating: 4.4 },
  { id: 'ENG-003', name: 'Asha', skill: 'Electrical', utilization: 64, todayJobs: 3, status: 'Available', rating: 4.9 },
  { id: 'ENG-004', name: 'Sunil', skill: 'Hydraulics', utilization: 58, todayJobs: 2, status: 'On Leave', rating: 4.1 },
];

const skillMatrix = [
  { skill: 'Commissioning', senior: 12, mid: 20, junior: 8 },
  { skill: 'Pumps', senior: 8, mid: 18, junior: 10 },
  { skill: 'Electrical', senior: 10, mid: 14, junior: 6 },
  { skill: 'Hydraulics', senior: 6, mid: 9, junior: 5 },
];

const currentAssignments = [
  { id: 'SC-108', site: 'ABC Cement', engineer: 'Rajesh', status: 'On site' },
  { id: 'SC-109', site: 'Tata Steel', engineer: 'Asha', status: 'Traveling' },
  { id: 'SC-110', site: 'Meridian', engineer: 'Naveen', status: 'Scheduled' },
];

export default function Workforce() {
  const { selectedCustomer, selectedQuotation, selectedServiceCall, currentAIContext, businessState } = useAppState();
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);

  const handleExport = () => alert('Exported workforce snapshot (demo)');
  const handleRefresh = () => alert('Refreshed workforce data (demo)');

  const handleOptimize = async () => {
    setAiLoading(true);
    setAiResponse(null);
    try {
      const prompt = 'Optimize workforce assignments to improve utilization, reduce travel time and prioritize high-skill tasks. Provide a short plan and concrete next steps.';
      const response = await generateAIResponse(prompt, {
        selectedCustomer: selectedCustomer?.name ?? null,
        selectedModule: 'workforce',
        selectedAction: 'Optimize workforce',
        selectedQuotation: selectedQuotation ?? null,
        selectedServiceCall: selectedServiceCall ?? null,
        currentAIContext,
        businessState,
      });

      setAiResponse(response);
    } catch (err) {
      alert('AI request failed — see console.');
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="section-title">Workforce Operations</p>
            <h1 className="font-serif text-3xl font-semibold text-primary mt-2">Field Engineer Operations</h1>
            <p className="mt-2 text-sm text-primary/65">Operational view for engineer utilization, skills and daily workload.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={handleExport}>Export</Button>
            <Button variant="ghost" onClick={handleRefresh}>Refresh</Button>
          </div>
        </div>
      </Card>

      <section className="grid gap-4 md:grid-cols-4">
        {kpis.map(k => (
          <StatCard key={k.title} title={k.title} value={k.value} icon={k.icon} />
        ))}
      </section>

      

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <Card className="p-6">
          <p className="font-semibold text-primary">Engineer Utilization (today)</p>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={utilizationData} margin={{ left: -12, right: 8 }}>
                <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#14213D" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <p className="font-semibold text-primary">AI Workforce Optimization</p>
          <p className="mt-3 text-sm text-primary/70">Optimize assignments to improve utilization and reduce travel time.</p>
          <div className="mt-4 flex gap-2">
            <Button variant="secondary" onClick={handleOptimize} disabled={aiLoading}>{aiLoading ? 'Running…' : 'Run Optimization'}</Button>
            <Button variant="ghost" onClick={() => alert('Saved optimization plan (demo)')}>Save plan</Button>
          </div>
          {aiLoading && <p className="mt-3 text-sm text-primary/60">AI is generating an optimization plan…</p>}
          {aiResponse ? (
            <div className="mt-4 rounded-[12px] border border-border/80 bg-background/70 p-4">
              <p className="font-semibold text-primary">AI Summary</p>
              <p className="mt-2 text-sm text-primary/75">{aiResponse.summary}</p>
              <p className="mt-3 font-semibold text-primary">Recommendation</p>
              <div className="mt-2 text-sm text-primary/75">
                {aiResponse.recommendation.split('\n').map((line, idx) => (
                  <div key={idx} className="mt-1">{line}</div>
                ))}
              </div>
            </div>
          ) : null}
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-primary">Daily Workload</p>
            <div className="text-sm text-primary/60">Today · {new Date().toLocaleDateString()}</div>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-primary/60 text-left">
                  <th className="pb-3">Engineer</th>
                  <th className="pb-3">Skill</th>
                  <th className="pb-3">Utilization</th>
                  <th className="pb-3">Today Jobs</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {engineers.map(e => (
                  <tr key={e.id} className="text-primary/80 hover:bg-background/50">
                    <td className="py-3">{e.name}<div className="text-xs text-primary/50">{e.id}</div></td>
                    <td className="py-3">{e.skill}</td>
                    <td className="py-3">{e.utilization}%</td>
                    <td className="py-3">{e.todayJobs}</td>
                    <td className="py-3"><Badge variant={e.status === 'Available' ? 'success' : e.status === 'Assigned' ? 'accent' : 'muted'}>{e.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <p className="font-semibold text-primary">Skill Matrix</p>
            <div className="mt-4 text-sm">
              {skillMatrix.map(s => (
                <div key={s.skill} className="flex items-center justify-between py-2 border-b border-border/80">
                  <div>
                    <p className="font-semibold">{s.skill}</p>
                    <p className="text-xs text-primary/60">Senior {s.senior} · Mid {s.mid} · Junior {s.junior}</p>
                  </div>
                  <Badge variant="accent">{s.senior + s.mid + s.junior} engineers</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <p className="font-semibold text-primary">Performance Leaderboard</p>
            <div className="mt-4 space-y-3">
              {engineers.sort((a,b) => b.rating - a.rating).map(e => (
                <div key={e.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-primary">{e.name}</p>
                    <p className="text-xs text-primary/60">Rating: {e.rating}</p>
                  </div>
                  <Badge variant="accent">{e.rating}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-6">
        <Card className="p-6">
          <p className="font-semibold text-primary">Current Assignments</p>
          <div className="mt-4 space-y-3">
            {currentAssignments.map(c => (
              <div key={c.id} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-primary">{c.site}</p>
                  <p className="text-xs text-primary/60">{c.id} · {c.engineer}</p>
                </div>
                <Badge variant={c.status === 'On site' ? 'success' : c.status === 'Traveling' ? 'accent' : 'muted'}>{c.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Additional demo sections: HR & Attendance, Project & Task Tracking */}
      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-primary">Employee, HR & Attendance</p>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => alert('Open HR dashboard (demo)')}>Open HR</Button>
              <Button size="sm" variant="outline" onClick={() => alert('Download attendance CSV (demo)')}>Export</Button>
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Today's Attendance</p>
                <p className="text-xs text-primary/60">Present: 116 · Absent: 6 · On Leave: 2</p>
              </div>
              <Badge variant="success">Good</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Avg Time On Site</p>
                <p className="text-xs text-primary/60">7h 24m</p>
              </div>
              <Badge variant="accent">Stable</Badge>
            </div>
          </div>
        </Card>



        <Card className="p-6">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-primary">Project & Task Tracking</p>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => alert('Open task board (demo)')}>Board</Button>
            </div>
          </div>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Critical Tasks</p>
                <p className="text-xs text-primary/60">12 overdue · 5 high priority</p>
              </div>
              <Button size="sm" variant="secondary" onClick={() => alert('Assign tasks (demo)')}>Assign</Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Upcoming Milestones</p>
                <p className="text-xs text-primary/60">3 this week</p>
              </div>
              <Badge variant="accent">Monitor</Badge>
            </div>
          </div>
        </Card>

                <Card className="p-6">
          <p className="font-semibold text-primary">Top Attendance (Last 30 days)</p>
          <div className="mt-4 grid gap-2">
            {topAttendance.map((e, idx) => (
              <div key={e.id} className="flex items-center justify-between rounded-[10px] border border-border/80 p-3">
                <div>
                  <p className="font-semibold text-primary">{idx + 1}. {e.name}</p>
                  <p className="text-xs text-primary/60">{e.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{e.attendance}</p>
                  <Button size="sm" variant="ghost" onClick={() => alert(`Open attendance record for ${e.name} (demo)`)}>Open</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
