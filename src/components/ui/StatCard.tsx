import type { HTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from './Badge';
import { Card } from './Card';

interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string;
  icon?: LucideIcon;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  description?: string;
}

export function StatCard({ title, value, icon: Icon, trend, trendDirection = 'neutral', description, className, ...props }: StatCardProps) {
  const TrendIcon = trendDirection === 'down' ? ArrowDownRight : ArrowUpRight;
  const trendVariant = trendDirection === 'down' ? 'danger' : trendDirection === 'up' ? 'success' : 'muted';

  return (
    <Card className={cn('p-6 group hover:border-accent/30 transition-colors duration-500', className)} {...props}>
      <div className="mb-5 flex items-center justify-between gap-4">
        {Icon && (
          <div className="rounded-[12px] bg-primary/5 p-2.5 group-hover:bg-accent/10 transition-colors">
            <Icon className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
          </div>
        )}
        {trend && (
          <Badge variant={trendVariant} className="ml-auto gap-1 font-bold">
            {trendDirection !== 'neutral' && <TrendIcon className="h-3.5 w-3.5" />}
            {trend}
          </Badge>
        )}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40">{title}</p>
      <p className="mt-2 font-serif text-3xl font-semibold text-primary tracking-tight">{value}</p>
      {description && <p className="mt-3 text-xs leading-5 text-primary/50">{description}</p>}
    </Card>
  );
}