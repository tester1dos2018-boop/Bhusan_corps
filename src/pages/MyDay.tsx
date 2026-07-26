import { Card, Button } from '../components/ui';
import { useAppState } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function MyDay() {
  const { businessState, navigateWithContext } = useAppState();
  const { currentUser } = useAuth();

  const myTasks = businessState.serviceVisits.filter((v) => v.engineer === currentUser?.name).slice(0, 6);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <p className="section-title">Field Operations</p>
          <h1 className="font-serif text-2xl font-semibold text-primary">My Day</h1>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {myTasks.map((t) => (
          <Card key={t.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-primary">{t.customerName}</p>
                <p className="text-xs text-primary/60">{t.ticket} · {t.scheduledAt}</p>
              </div>
              <div>
                <Button size="sm" variant="ghost" onClick={() => navigateWithContext('/service', { module: 'service', action: 'Open job', serviceCall: t.id })}>Open</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
