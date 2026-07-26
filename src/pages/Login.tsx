import { useState, useEffect } from 'react';
import { useAuth, type Role } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface RoleCard {
  role: Role;
  name: string;
  dept: string;
  initials: string;
  email: string;
  badgeStyle: string;
}

const roleCards: RoleCard[] = [
  { role: 'Founder', name: 'Bhushan Kumar', dept: 'Executive oversight', initials: 'BK', email: 'bhushan.kumar@bhushancorp.com', badgeStyle: 'bg-[#14213D] text-white font-medium' },
  { role: 'Operations Manager', name: 'Anjali Mehta', dept: 'Operations & logistics', initials: 'AM', email: 'anjali.mehta@bhushancorp.com', badgeStyle: 'bg-amber-100 text-amber-900 border border-amber-200/80 font-medium' },
  { role: 'Sales Manager', name: 'Rajat Singh', dept: 'Commercial & accounts', initials: 'RS', email: 'rajat.singh@sales.bhushancorp.com', badgeStyle: 'bg-blue-50 text-blue-900 border border-blue-200/80 font-medium' },
  { role: 'Service Manager', name: 'Meera Shah', dept: 'Service & maintenance', initials: 'MS', email: 'meera.shah@service.bhushancorp.com', badgeStyle: 'bg-emerald-50 text-emerald-900 border border-emerald-200/80 font-medium' },
  { role: 'Field Engineer', name: 'Vikram Patel', dept: 'On-site deployments', initials: 'VP', email: 'vikram.patel@field.bhushancorp.com', badgeStyle: 'bg-orange-50 text-orange-900 border border-orange-200/80 font-medium' },
  { role: 'System Administrator', name: 'Nilesh Borkar', dept: 'IT & infrastructure', initials: 'NB', email: 'nilesh.borkar@it.bhushancorp.com', badgeStyle: 'bg-slate-100 text-slate-800 border border-slate-200/80 font-medium' },
];

const features = [
  {
    title: 'Executive AI',
    desc: 'Cited answers over your enterprise data; board-ready operational insights and real-time alerts.',
    icon: (
      <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
  },
  {
    title: 'Installation Intelligence',
    desc: 'Project readiness signals, milestone tracking, and automated deployment verification.',
    icon: (
      <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: 'Predictive Maintenance',
    desc: 'Risk-based maintenance schedules, IoT sensor telemetry, and automated spare parts planning.',
    icon: (
      <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: 'Enterprise Documentation',
    desc: 'Controlled manuals, DPDP-aligned audit trails, and instant compliance library retrieval.',
    icon: (
      <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
];

export default function Login() {
  const { login, loginAsRole, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSignIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const ok = await login(email.trim(), password);
      setStatus(ok ? 'Signed in successfully.' : 'Invalid email or password. Use demo123');
      if (ok) {
        try {
          localStorage.setItem('bhusan_last_notification', JSON.stringify({ message: 'Welcome back to Bhushancorp AIOS', time: Date.now() }));
        } catch {}
      }
    } catch (e) {
      setStatus('Sign-in failed (demo).');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#FAF9F6]">
      
      {/* Left Column: Dark Brand & Features Panel */}
      <div className="hidden lg:flex lg:w-[46%] xl:w-[44%] bg-[#0B1528] text-white p-12 xl:p-16 flex-col justify-between relative overflow-hidden">
        
        {/* Top Brand Logo */}
        <div className="flex items-center gap-3 z-10">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-md font-serif font-bold text-lg text-white">
            B
          </div>
          <div>
            <div className="font-serif text-lg font-semibold tracking-wide text-white leading-tight">
              Bhushancorp
            </div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-amber-400/80 font-medium">
              BY ARAVYA
            </div>
          </div>
        </div>

        {/* Center Content: Headline & Vertical Feature List */}
        <div className="my-auto py-12 max-w-lg z-10">
          <h1 className="font-serif text-4xl xl:text-[42px] font-normal tracking-tight text-[#F3EFEA] leading-[1.2]">
            Run your entire operations with confidence.
          </h1>
          <p className="mt-4 text-sm text-slate-300/80 leading-relaxed font-normal">
            Every installation, sensor reading, maintenance log, and document in one secure place — with AI that finds answers in your files, predicts failures before they happen, and automates field workflows.
          </p>

          <div className="mt-10 space-y-6">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4 group">
                <div className="mt-0.5 h-10 w-10 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-all">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-wide">{f.title}</h3>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="text-xs text-slate-500 z-10 flex justify-between items-center border-t border-white/10 pt-6">
          <span>© {new Date().getFullYear()} Bhushancorp AIOS. All rights reserved.</span>
          <span>Enterprise v2.4</span>
        </div>
      </div>

      {/* Right Column: Authentication & One-Click Demo Roles */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 md:p-16 overflow-y-auto">
        <div className="w-full max-w-[440px] my-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-normal text-[#14213D] tracking-tight">
              Sign in to Bhushancorp AIOS
            </h2>
            <p className="mt-1.5 text-xs text-[#14213D]/60">
              Use a demo account below, or sign in with credentials.
            </p>
          </div>

          {/* Traditional Login Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#14213D] mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#14213D] placeholder:text-slate-400 focus:border-[#B4833E] focus:outline-none focus:ring-1 focus:ring-[#B4833E] transition-all shadow-2xs"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-[#14213D]">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); setStatus('Demo password is: demo123'); }} className="text-xs text-[#B4833E] hover:underline font-medium">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#14213D] placeholder:text-slate-400 focus:border-[#B4833E] focus:outline-none focus:ring-1 focus:ring-[#B4833E] transition-all shadow-2xs"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-lg bg-[#B4833E] hover:bg-[#9C7032] text-white py-2.5 text-sm font-medium shadow-sm transition-all flex items-center justify-center gap-2 group cursor-pointer border-0"
            >
              <span>{loading ? 'Signing in…' : 'Sign in'}</span>
              {!loading && (
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              )}
            </button>

            {status && (
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200/60 text-xs text-center font-medium text-amber-900">
                {status}
              </div>
            )}
          </form>

          {/* Section Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]">
              <span className="bg-[#FAF9F6] px-3 text-slate-400 font-semibold">
                ONE-CLICK DEMO ROLES
              </span>
            </div>
          </div>

          {/* Vertical Stack of Clickable Role Rows */}
          <div className="space-y-2.5">
            {roleCards.map((r) => (
              <button
                key={r.role}
                type="button"
                onClick={() => loginAsRole(r.role)}
                className="w-full text-left p-3 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200/60 flex items-center justify-center text-xs font-bold text-slate-700 shrink-0 group-hover:bg-[#14213D] group-hover:text-white transition-colors">
                    {r.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-[#14213D] truncate group-hover:text-[#B4833E] transition-colors">
                      {r.name}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {r.dept} · <span className="text-slate-400">{r.email}</span>
                    </div>
                  </div>
                </div>

                <div className={`px-2.5 py-1 rounded-full text-[11px] shrink-0 ${r.badgeStyle}`}>
                  {r.role === 'Founder' ? 'Founder' : r.role.split(' ')[0]}
                </div>
              </button>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}