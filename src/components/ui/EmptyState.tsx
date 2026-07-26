import type { HTMLAttributes, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';
import { cn } from '../../lib/utils';

interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon = Inbox, title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex min-h-[320px] flex-col items-center justify-center rounded-[16px] border border-dashed border-border/60 bg-white/40 p-8 text-center backdrop-blur-sm',
        className
      )}
      {...props}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-[16px] bg-primary/5 text-primary/40 border border-primary/5">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mt-6 font-serif text-2xl font-semibold text-primary">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm leading-relaxed text-primary/50">{description}</p>}
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
