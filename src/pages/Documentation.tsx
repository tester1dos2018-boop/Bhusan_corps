import { useMemo, useState } from 'react';
import { Card, Button, Badge } from '../components/ui';
import { Search, Layers, Download } from 'lucide-react';
import { useAppState } from '../context/AppContext';
import { generateAIResponse, type AIResponse } from '../lib/aiService';

type DocStatus = 'Approved' | 'Draft' | 'Archived';

interface DocItem {
  id: string;
  name: string;
  category: string;
  version: string;
  lastUpdated: string;
  owner: string;
  status: DocStatus;
  content: string;
  type: 'pdf' | 'docx' | 'xlsx';
}

const categories = [
  'All','SOP','Installation','Service','AMC','Equipment','Compliance','Safety','Warranty','Technical Drawings'
];

const demoDocs: DocItem[] = [
  { id: 'D-1001', name: 'Air Compressor Installation Manual', category: 'Installation', version: 'v2.1', lastUpdated: '2026-07-20', owner: 'Engineering', status: 'Approved', type: 'pdf', content: `Air Compressor Installation Manual\n\nPurpose:\nTo provide step-by-step instructions for safe installation of ELGi compressors.\n\nInstallation Procedure:\n1. Unpack and inspect\n2. Position baseplate and level\n3. Align coupling\n4. Fill oil and test-run\n\nCommissioning Checklist:\n- Electrical connection verified\n- Vibration within limits\n\nMaintenance Schedule:\nMonthly inspections, quarterly oil analysis.` },
  { id: 'D-1002', name: 'Preventive Maintenance Checklist', category: 'Service', version: 'v1.4', lastUpdated: '2026-07-18', owner: 'Service', status: 'Approved', type: 'xlsx', content: `Preventive Maintenance Checklist\n\n• Oil Level\n• Filter Condition\n• Motor Temperature\n• Bearing Noise\n• Belt Tension\n• Pressure Reading\n• Leak Inspection\n• Final Engineer Sign-off` },
  { id: 'D-1003', name: 'Annual AMC Contract', category: 'AMC', version: 'v3.0', lastUpdated: '2026-06-30', owner: 'Legal', status: 'Approved', type: 'pdf', content: `Annual AMC Contract\n\nTerms and conditions, SLA, payment schedule and termination clauses.` },
  { id: 'D-1004', name: 'HVAC Commissioning Guide', category: 'Installation', version: 'v1.2', lastUpdated: '2026-07-01', owner: 'Engineering', status: 'Draft', type: 'pdf', content: `HVAC Commissioning Guide\n\nSystem checklists and performance tests.` },
  { id: 'D-1005', name: 'Generator Service SOP', category: 'SOP', version: 'v2.0', lastUpdated: '2026-05-20', owner: 'Service', status: 'Approved', type: 'docx', content: `Generator Service SOP\n\nSafety, inspection, load testing and handover.` },
  { id: 'D-1006', name: 'Pump Installation Procedure', category: 'Installation', version: 'v1.0', lastUpdated: '2026-03-10', owner: 'Engineering', status: 'Approved', type: 'pdf', content: `Pump Installation Procedure\n\nAlignment, coupling, piping and checks.` },
  { id: 'D-1007', name: 'Cooling Tower Inspection Checklist', category: 'Service', version: 'v1.1', lastUpdated: '2026-04-22', owner: 'Service', status: 'Approved', type: 'xlsx', content: `Cooling Tower Inspection\n• Drift eliminators\n• Water chemistry\n• Fan drive` },
  { id: 'D-1008', name: 'Fire Safety Compliance Manual', category: 'Compliance', version: 'v4.0', lastUpdated: '2026-02-11', owner: 'HSE', status: 'Approved', type: 'pdf', content: `Fire Safety Compliance Manual\nProcedures, drills and responsibilities.` },
  { id: 'D-1009', name: 'Customer Handover Checklist', category: 'Service', version: 'v1.3', lastUpdated: '2026-07-10', owner: 'Service', status: 'Approved', type: 'docx', content: `Customer Handover Checklist\nSignoffs, manuals and spare lists.` },
  { id: 'D-1010', name: 'Equipment Warranty Policy', category: 'Warranty', version: 'v2.2', lastUpdated: '2026-01-05', owner: 'Support', status: 'Approved', type: 'pdf', content: `Warranty Policy\nCoverage, claim process, exclusions.` },
  { id: 'D-1011', name: 'Transformer Preventive Maintenance', category: 'Service', version: 'v1.0', lastUpdated: '2026-06-18', owner: 'Service', status: 'Draft', type: 'pdf', content: `Transformer PM\nInsulation, oil tests and tap-changer checks.` },
  { id: 'D-1012', name: 'Electrical Panel Testing Procedure', category: 'Technical Drawings', version: 'v1.5', lastUpdated: '2026-03-30', owner: 'Engineering', status: 'Approved', type: 'pdf', content: `Electrical Panel Testing\nProtection tests and functional tests.` },
  { id: 'D-1013', name: 'Site Readiness Checklist', category: 'Installation', version: 'v2.0', lastUpdated: '2026-07-15', owner: 'Projects', status: 'Approved', type: 'xlsx', content: `Site Readiness\nFoundation, utilities, access, storage.` },
  { id: 'D-1014', name: 'Engineer Visit Report Template', category: 'Service', version: 'v1.0', lastUpdated: '2026-06-01', owner: 'Service', status: 'Approved', type: 'docx', content: `Engineer Visit Report\nCustomer, Observations, Actions, Parts` },
  { id: 'D-1015', name: 'ISO 9001 Quality Manual', category: 'Compliance', version: 'v5.0', lastUpdated: '2026-05-05', owner: 'Quality', status: 'Approved', type: 'pdf', content: `ISO 9001 Quality Manual\nManagement system overview.` },
  { id: 'D-1016', name: 'Pressure Vessel Inspection Report', category: 'Compliance', version: 'v1.2', lastUpdated: '2026-04-12', owner: 'Inspection', status: 'Approved', type: 'pdf', content: `Pressure Vessel Inspection\nFindings and recommendations.` },
  { id: 'D-1017', name: 'Calibration Certificate', category: 'Compliance', version: 'v2026', lastUpdated: '2026-07-02', owner: 'Calibration', status: 'Approved', type: 'pdf', content: `Calibration Certificate\nInstrument, date, results.` },
  { id: 'D-1018', name: 'Spare Parts Catalogue', category: 'Equipment', version: 'v3.1', lastUpdated: '2026-06-15', owner: 'Logistics', status: 'Approved', type: 'pdf', content: `Spare Parts Catalogue\nPart numbers and lead times.` },
  { id: 'D-1019', name: 'Emergency Shutdown SOP', category: 'Safety', version: 'v2.3', lastUpdated: '2026-07-19', owner: 'HSE', status: 'Approved', type: 'pdf', content: `Emergency Shutdown SOP\nSteps and responsibilities.` },
  { id: 'D-1020', name: 'Root Cause Analysis Template', category: 'Service', version: 'v1.0', lastUpdated: '2026-06-20', owner: 'Quality', status: 'Draft', type: 'docx', content: `Root Cause Analysis\nProblem, Investigation, Actions.` },
];

export default function Documentation() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [preview, setPreview] = useState<DocItem | null>(null);
  const { selectedCustomer, currentAIContext, businessState } = useAppState();
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const docs = useMemo(() => demoDocs.filter(d => (filter === 'All' || d.category === filter) && (d.name.toLowerCase().includes(query.toLowerCase()) || d.owner.toLowerCase().includes(query.toLowerCase()))), [query, filter]);

  const handlePreview = (doc: DocItem) => setPreview(doc);

  const handleDownload = (doc: DocItem) => {
    if (doc.type === 'pdf') {
      // generate a simple PDF using pdf-lib for reliable PDF files
      import('pdf-lib').then(({ PDFDocument, StandardFonts }) => {
        (async () => {
          const pdfDoc = await PDFDocument.create();
          const page = pdfDoc.addPage([612, 792]);
          const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
          const { height } = page.getSize();
          const fontSize = 12;
          page.drawText(doc.name, { x: 50, y: height - 50, size: 16, font });
          const lines = doc.content.split('\n').slice(0, 40);
          let y = height - 80;
          for (const line of lines) {
            page.drawText(line, { x: 50, y, size: fontSize, font });
            y -= fontSize + 4;
            if (y < 60) break;
          }
          const pdfBytes = await pdfDoc.save();
          // pdfBytes is a Uint8Array; cast to any for Blob to avoid TS lib incompatibilities in some environments
          const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${doc.name.replace(/\s+/g, '_')}.pdf`;
          a.click();
          URL.revokeObjectURL(url);
        })();
      });
      return;
    }

    const mime = doc.type === 'docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : doc.type === 'xlsx' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'text/plain';
    const blob = new Blob([doc.content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.name.replace(/\s+/g, '_')}.${doc.type}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const runAiAssistant = async (prompt: string) => {
    setAiLoading(true);
    setAiResponse(null);
    try {
      const resp = await generateAIResponse(prompt, {
        selectedCustomer: selectedCustomer?.name ?? null,
        selectedModule: 'documentation',
        selectedAction: 'AI doc assistant',
        selectedQuotation: null,
        selectedServiceCall: null,
        currentAIContext,
        businessState,
      });
      setAiResponse(resp);
    } catch (e) {
      console.error(e);
      alert('AI request failed (demo)');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="section-title">Documentation Center</p>
            <h1 className="font-serif text-3xl font-semibold text-primary mt-2">Enterprise Knowledge & Document Management</h1>
            <p className="mt-2 text-sm text-primary/65">SOPs, manuals, compliance and technical documentation for field teams and operations.</p>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary/60" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search SOPs, Manuals, Compliance Documents..." className="w-full bg-background/50 p-3 rounded-md" />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map(c => (
                <button key={c} onClick={() => setFilter(c)} className={`rounded-full px-3 py-1 text-sm ${filter === c ? 'bg-accent/10 text-accent' : 'bg-white border border-border text-primary/70'}`}>{c}</button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <div>
          <h2 className="font-semibold text-primary mb-3">Document Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['Installation Manuals','Service SOPs','Preventive Maintenance','AMC Documentation','Equipment Datasheets','Compliance Certificates','Safety Guidelines','Customer Documentation','Technical Drawings','Warranty Documents'].map((cat) => (
              <Card key={cat} className="p-4 flex items-center gap-3 hover:shadow-soft transition">
                <Layers className="h-6 w-6 text-accent" />
                <div>
                  <p className="font-semibold">{cat}</p>
                  <p className="text-xs text-primary/60">{Math.floor(Math.random()*120)+8} documents</p>
                </div>
              </Card>
            ))}
          </div>

          <h2 className="font-semibold text-primary mt-6 mb-3">Recent Documents</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-primary/60 text-left">
                  <th className="pb-3">Document Name</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Version</th>
                  <th className="pb-3">Last Updated</th>
                  <th className="pb-3">Owner</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {docs.slice(0,12).map(d => (
                  <tr key={d.id} className="text-primary/80 hover:bg-background/50">
                    <td className="py-3"><div className="font-semibold">{d.name}</div><div className="text-xs text-primary/50">{d.id}</div></td>
                    <td className="py-3">{d.category}</td>
                    <td className="py-3">{d.version}</td>
                    <td className="py-3">{d.lastUpdated}</td>
                    <td className="py-3">{d.owner}</td>
                    <td className="py-3"><Badge variant={d.status === 'Approved' ? 'success' : d.status === 'Draft' ? 'accent' : 'muted'}>{d.status}</Badge></td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handlePreview(d)}>Preview</Button>
                        <Button size="sm" variant="outline" onClick={() => handleDownload(d)}><Download className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => alert('More actions (demo)')}>More</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="font-semibold text-primary mt-6 mb-3">Pinned Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Commissioning Checklist','Emergency Shutdown SOP','Annual Maintenance Guide','Installation Quality Checklist','Electrical Safety Manual'].map((title) => (
              <Card key={title} className="p-4 hover:shadow-soft transition">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="text-xs text-primary/60">Owner: Engineering · Updated: 2026-07-20</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="accent">Pinned</Badge>
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => alert('Preview pinned doc (demo)')}>Preview</Button>
                      <Button size="sm" variant="secondary" onClick={() => alert('Download pinned doc (demo)')}>Download</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <aside>
          <Card className="p-4 mb-4">
            <p className="font-semibold text-primary">AI Document Assistant</p>
            <div className="mt-3 space-y-2">
              {['Show compressor installation manual','Open preventive maintenance checklist','Find warranty document for ABC Industries','Show electrical safety SOP'].map(s => (
                <button key={s} className="w-full text-left rounded px-3 py-2 hover:bg-primary/5" onClick={() => runAiAssistant(s)}>{s}</button>
              ))}
            </div>
            {aiLoading && <p className="mt-3 text-sm text-primary/60">AI is processing…</p>}
            {aiResponse ? (
              <div className="mt-3 rounded-[10px] p-3 border border-border/80 bg-background/70">
                <p className="font-semibold">AI Summary</p>
                <p className="text-sm text-primary/70 mt-2">{aiResponse.summary}</p>
                <p className="font-semibold mt-3">Recommendation</p>
                <div className="text-sm text-primary/70 mt-2">{aiResponse.recommendation}</div>
              </div>
            ) : null}
          </Card>

          <Card className="p-4">
            <p className="font-semibold text-primary">Compliance Library</p>
            <div className="mt-3 space-y-2 text-sm">
              {['ISO 9001 Quality Manual','ISO 14001 Environmental Compliance','ISO 45001 Occupational Safety','Factory Acceptance Test Checklist','Site Acceptance Test Report','Pressure Vessel Inspection Certificate','Calibration Certificates','Electrical Inspection Reports'].map(d => (
                <div key={d} className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-primary">{d}</p>
                    <p className="text-xs text-primary/60">Updated: 2026-06</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => alert(`Preview ${d} (demo)`) }>Preview</Button>
                    <Button size="sm" variant="outline" onClick={() => alert(`Download ${d} (demo)`) }>Download</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </section>

      {/* Preview modal */}
      {preview ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[90%] max-w-4xl bg-white rounded-lg p-6 overflow-auto">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-serif text-xl font-semibold">{preview.name}</h3>
                <p className="text-xs text-primary/60">Version: {preview.version} · {preview.lastUpdated} · {preview.owner}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => handleDownload(preview)}>Download</Button>
                <Button size="sm" variant="outline" onClick={() => setPreview(null)}>Close</Button>
              </div>
            </div>
            <hr className="my-4" />
            <div className="prose max-w-none">
              {preview.content.split('\n').map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      ) : null}

    </div>
  );
}
