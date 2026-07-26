import { Button, Card } from '../components/ui';
import { useNavigate } from 'react-router-dom';

export default function AccessDenied({ reason }: { reason?: string }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="max-w-2xl p-8 text-center">
        <h1 className="text-6xl font-serif font-bold text-primary">403</h1>
        <h2 className="mt-3 text-2xl font-semibold text-primary">Access Restricted</h2>
        <p className="mt-4 text-sm text-primary/70">{reason ?? 'You do not have permission to view this page.'}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="secondary" onClick={() => navigate('/')}>Return to Dashboard</Button>
          <Button variant="outline" onClick={() => alert('Request access — demo')}>Request Access</Button>
        </div>
      </Card>
    </div>
  );
}
