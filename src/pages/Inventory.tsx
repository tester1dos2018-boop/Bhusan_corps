import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Badge, Button, Card, StatCard } from '../components/ui';
import { Wrench, PackageCheck, Truck, Zap } from 'lucide-react';

interface EquipmentRow {
  id: string;
  equipment: string;
  model: string;
  customer: string;
  warranty: string;
  condition: 'New' | 'Good' | 'Fair' | 'Critical';
  spareAvailability: string;
  nextMaintenance: string;
}

const kpis = [
  { title: 'Total Equipment', value: '1,248', icon: Truck },
  { title: 'Running Assets', value: '1,072', icon: Zap },
  { title: 'Critical Spare Alerts', value: '18', icon: PackageCheck },
  { title: 'Inventory Health Score', value: '84%', icon: Wrench },
];

const healthData = [
  { name: 'Availability', value: 78 },
  { name: 'Coverage', value: 88 },
  { name: 'Obsolescence', value: 12 },
  { name: 'Fill Rate', value: 92 },
];

const equipmentRows: EquipmentRow[] = [
  { id: 'E-1001', equipment: 'ELGi Compressor', model: 'EG75', customer: 'ABC Cement', warranty: 'Expires Sep 2026', condition: 'Good', spareAvailability: '7/10', nextMaintenance: '2026-08-12' },
  { id: 'E-1002', equipment: 'KSB Pump', model: 'KSB-150', customer: 'Meridian Industries', warranty: 'Expired', condition: 'Fair', spareAvailability: '3/10', nextMaintenance: '2026-07-28' },
  { id: 'E-1003', equipment: 'ATS Garage Bay', model: 'ATS-G2', customer: 'Bihar Food Corp', warranty: 'Active', condition: 'New', spareAvailability: '10/10', nextMaintenance: '2026-09-05' },
  { id: 'E-1004', equipment: 'Hydraulic Press', model: 'HP-400', customer: 'Tata Steel', warranty: 'Active', condition: 'Critical', spareAvailability: '0/6', nextMaintenance: '2026-07-26' },
];

const criticalAlerts = [
  'Low oil filters for ELGi Compressor (ABC Cement)',
  'Spare impeller shortage for KSB Pump (Meridian Industries)',
  'Overdue gasket set for Hydraulic Press (Tata Steel)',
];

const aiRecommendation = {
  summary: 'Prioritize replenishment for pumps and hydraulic press parts. Consolidate orders to unlock freight savings and improve fill-rate to 95% for critical SKUs.',
  actions: [
    'Raise purchase for KSB impellers (Qty 10)',
    'Expedite gasket sets for Hydraulic Press - route to procurement',
    'Create a 30-day safety stock plan for air filters',
  ],
};

const recentActivity = [
  { id: 't1', title: 'Spare parts consumed: ELGi Compressor', time: '12 mins ago' },
  { id: 't2', title: 'Maintenance completed: ATS Garage Bay', time: '38 mins ago' },
  { id: 't3', title: 'Stock alert: KSB Pump impeller', time: '1 hr ago' },
  { id: 't4', title: 'Audit: Inventory cycle count', time: 'Today, 08:10' },
];

export default function Inventory() {
  // demo handlers - show simple alerts for interactive demo
  const handleExport = () => alert('Exported inventory report (demo)');
  const handleRefresh = () => alert('Refreshed inventory data (demo)');
  const handleFilter = () => alert('Filter panel opened (demo)');
  const handleAddEquipment = () => alert('Add equipment flow (demo)');
  const handleApplyRecommendations = () => alert('Recommendations applied (demo)');
  const handleSavePlan = () => alert('Recommendation plan saved (demo)');

  return (
    <div className="space-y-8">
      <Card className="p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="section-title">Inventory Intelligence</p>
            <h1 className="font-serif text-3xl font-semibold text-primary mt-2">Enterprise Equipment and Spares</h1>
            <p className="mt-2 text-sm text-primary/65">A premium operations view combining asset status, spare health and AI-driven recommendations.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={handleExport}>Export report</Button>
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
          <p className="font-semibold text-primary">Inventory Health</p>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={healthData} margin={{ left: -12, right: 8 }}>
                <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#14213D" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-primary/70">
            <div>Availability: 78%</div>
            <div>Fill Rate: 92%</div>
            <div>Coverage: 88%</div>
            <div>Obsolescence: 12%</div>
          </div>
        </Card>

        <Card className="p-6">
          <p className="font-semibold text-primary">Critical Spare Alerts</p>
          <div className="mt-4 space-y-3">
            {criticalAlerts.map((a) => (
              <div key={a} className="rounded-[12px] border border-danger/20 bg-danger/5 p-3 text-sm text-danger flex items-center justify-between">
                <span>{a}</span>
                <Badge variant="warning">Action required</Badge>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-primary">Equipment</p>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={handleFilter}>Filter</Button>
              <Button size="sm" variant="outline" onClick={handleAddEquipment}>Add equipment</Button>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-primary/60 text-left">
                  <th className="pb-3">Equipment</th>
                  <th className="pb-3">Model</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Warranty</th>
                  <th className="pb-3">Condition</th>
                  <th className="pb-3">Spare Availability</th>
                  <th className="pb-3">Next Maintenance</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {equipmentRows.map((row) => (
                  <tr key={row.id} className="text-primary/80 hover:bg-background/50">
                    <td className="py-3">
                      <div className="font-semibold">{row.equipment}</div>
                      <div className="text-xs text-primary/50">{row.id}</div>
                    </td>
                    <td className="py-3">{row.model}</td>
                    <td className="py-3">{row.customer}</td>
                    <td className="py-3">{row.warranty}</td>
                    <td className="py-3"><Badge variant={row.condition === 'Critical' ? 'danger' : row.condition === 'New' ? 'success' : 'accent'}>{row.condition}</Badge></td>
                    <td className="py-3">{row.spareAvailability}</td>
                    <td className="py-3">{row.nextMaintenance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <p className="font-semibold text-primary">AI Inventory Recommendation</p>
            <p className="mt-2 text-sm text-primary/65">Summary</p>
            <div className="mt-3 text-sm text-primary/80">{aiRecommendation.summary}</div>
            <ul className="mt-3 ml-4 list-disc text-sm text-primary/80">
              {aiRecommendation.actions.map((a) => (<li key={a}>{a}</li>))}
            </ul>
            <div className="mt-4 flex gap-2">
              <Button variant="secondary" onClick={handleApplyRecommendations}>Apply Recommendations</Button>
              <Button variant="ghost" onClick={handleSavePlan}>Save plan</Button>
            </div>
          </Card>

          <Card className="p-6">
            <p className="font-semibold text-primary">Recent Equipment Activity</p>
            <div className="mt-4 space-y-3 text-sm">
              {recentActivity.map((r) => (
                <div key={r.id} className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-primary">{r.title}</p>
                    <p className="text-primary/60 text-xs">{r.time}</p>
                  </div>
                  <Badge variant="muted">Log</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
