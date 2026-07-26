import { Card, Button, Badge } from '../components/ui';
import { ShieldCheck, Cpu, Users } from 'lucide-react';

export default function SystemSettings() {
  const handleSaveProfile = () => alert('Organization profile saved (demo)');
  const handleAddRole = () => alert('Role added (demo)');
  const handleUpdateAI = () => alert('AI configuration updated (demo)');
  const handleTestApi = () => alert('API status OK (demo)');

  return (
    <div className="space-y-8">
      <Card className="p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="section-title">System Settings</p>
            <h1 className="font-serif text-3xl font-semibold text-primary mt-2">Admin Control Center</h1>
            <p className="mt-2 text-sm text-primary/65">Manage organization profile, security, AI configuration and system health.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => alert('Export settings (demo)')}>Export settings</Button>
            <Button variant="ghost" onClick={() => alert('Refresh status (demo)')}>Refresh</Button>
          </div>
        </div>
      </Card>

      <section className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-6 w-6 text-accent" />
            <div>
              <p className="font-semibold">Security Overview</p>
              <p className="text-sm text-primary/70 mt-2">Password policies, SSO and MFA status. Recent critical alerts and audit summaries.</p>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between"><span>SSO</span><Badge variant="success">Enabled</Badge></div>
            <div className="flex items-center justify-between"><span>MFA</span><Badge variant="accent">Optional</Badge></div>
            <div className="flex items-center justify-between"><span>Last audit</span><span className="text-primary/60">2026-07-12</span></div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3">
            <Users className="h-6 w-6 text-accent" />
            <div>
              <p className="font-semibold">User Roles</p>
              <p className="text-sm text-primary/70 mt-2">Manage RBAC roles and permissions for modules and actions.</p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between"><div><p className="font-semibold">Administrator</p><p className="text-xs text-primary/60">Full access</p></div><Button size="sm" variant="ghost" onClick={handleAddRole}>Add</Button></div>
            <div className="flex items-center justify-between"><div><p className="font-semibold">Field Engineer</p><p className="text-xs text-primary/60">Limited to work orders and docs</p></div><Button size="sm" variant="ghost" onClick={() => alert('Edit role (demo)')}>Edit</Button></div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3">
            <Cpu className="h-6 w-6 text-accent" />
            <div>
              <p className="font-semibold">AI Configuration</p>
              <p className="text-sm text-primary/70 mt-2">Control model settings, API keys and fallback behavior.</p>
            </div>
          </div>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between"><span>Gemini API</span><Badge variant="success">Configured</Badge></div>
            <div className="flex items-center justify-between"><span>Fallback</span><Badge variant="accent">Demo</Badge></div>
            <div className="mt-3 flex gap-2"><Button size="sm" variant="secondary" onClick={handleUpdateAI}>Save AI Config</Button><Button size="sm" variant="ghost" onClick={() => alert('Rotate key (demo)')}>Rotate Key</Button></div>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <p className="font-semibold">Organization Profile</p>
          <div className="mt-3 text-sm text-primary/70">Bhushancorp · Industrial Equipment & Services · Contact: ops@bhushancorp.com</div>
          <div className="mt-4"><Button variant="secondary" onClick={handleSaveProfile}>Save profile</Button></div>
        </Card>

        <Card className="p-6">
          <p className="font-semibold">Notification Preferences</p>
          <div className="mt-3 text-sm text-primary/70">Email, SMS and in-app notification controls for alerts and digests.</div>
          <div className="mt-4 flex gap-2"><Button size="sm" variant="secondary" onClick={() => alert('Save notifications (demo)')}>Save</Button></div>
        </Card>

        <Card className="p-6">
          <p className="font-semibold">Theme Settings</p>
          <div className="mt-3 text-sm text-primary/70">Light/Dark mode and accent color for the platform.</div>
          <div className="mt-4 flex gap-2"><Button size="sm" variant="secondary" onClick={() => alert('Theme saved (demo)')}>Apply</Button></div>
        </Card>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <p className="font-semibold">API Status</p>
          <div className="mt-3 text-sm text-primary/70">All internal APIs responding. External API: Gemini status OK.</div>
          <div className="mt-4"><Button size="sm" variant="ghost" onClick={handleTestApi}>Run health check</Button></div>
        </Card>

        <Card className="p-6">
          <p className="font-semibold">License Information</p>
          <div className="mt-3 text-sm text-primary/70">Enterprise license • Expires: 2027-12-31 • Seats: 150</div>
        </Card>

        <Card className="p-6">
          <p className="font-semibold">System Health</p>
          <div className="mt-3 text-sm text-primary/70">CPU: 32% · Memory: 61% · Disk: 44% · Uptime: 12 days</div>
        </Card>
      </section>

      <section className="grid gap-6">
        <Card className="p-6">
          <p className="font-semibold">Audit Log</p>
          <div className="mt-3 text-sm text-primary/70">
            <div className="py-2 border-b border-border/80">2026-07-20 · Admin · Updated AI configuration</div>
            <div className="py-2 border-b border-border/80">2026-07-18 · Service Lead · Uploaded new SOP</div>
            <div className="py-2 border-b border-border/80">2026-07-15 · Ops · Rotated API key</div>
          </div>
        </Card>
      </section>

    </div>
  );
}
