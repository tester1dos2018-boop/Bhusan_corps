import { useState } from 'react';
import { Sparkles, FileText } from 'lucide-react';
import { Card, Button, StatCard } from '../components/ui';
import { useAppState } from '../context/AppContext';
import { generateAIResponse, type AIResponse } from '../lib/aiService';
import { useAuth } from '../context/AuthContext';

export default function BoardSnapshot() {
  const { businessState, setCurrentAIContext, selectedCustomer, selectedModule, selectedAction, selectedQuotation, selectedServiceCall, currentAIContext } = useAppState();
  const { currentUser } = useAuth();
  const [ai, setAi] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setAi(null);
    setCurrentAIContext('Board snapshot requested');
    const roleContext = `Role: ${currentUser?.role ?? 'Unknown'}`;
    const prompt = `${roleContext} Generate a concise board snapshot highlighting top revenue signals, service risks and 24h actions.`;
    const resp = await generateAIResponse(prompt, {
      selectedCustomer: selectedCustomer?.name ?? null,
      selectedModule: selectedModule ?? 'dashboard',
      selectedAction: selectedAction ?? null,
      selectedQuotation: selectedQuotation ?? null,
      selectedServiceCall: selectedServiceCall ?? null,
      currentAIContext: currentAIContext ?? null,
      businessSnapshot: 'board_snapshot',
      businessState,
    });
    setAi(resp);
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="section-title">Board Snapshot</p>
          <h1 className="font-serif text-3xl font-semibold text-primary">Executive brief</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleGenerate} disabled={loading}><Sparkles className="h-4 w-4" /> Generate brief</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Revenue (MTD)" value="₹4.8 Cr" trend="+12%" icon={FileText} />
        <StatCard title="Collections" value="₹2.1 Cr" trend="92%" icon={FileText} />
        <StatCard title="Service Risk" value="2 escalations" trend="-" icon={FileText} />
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-primary">AI Brief</h3>
        <div className="mt-3">
          {loading ? <p className="text-sm text-primary/60">Generating…</p> : ai ? (
            <>
              <p className="text-sm text-primary/70">{ai.summary}</p>
              <div className="mt-3 font-semibold">Recommendation</div>
              <p className="text-sm text-primary/70">{ai.recommendation}</p>
            </>
          ) : (
            <p className="text-sm text-primary/60">No AI brief generated yet. Click Generate brief to create a board-ready summary.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
