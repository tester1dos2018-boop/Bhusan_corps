import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'danger' | 'muted' | 'outline' | 'ghost' | 'secondary';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-primary text-white',
  accent: 'bg-accent/10 text-accent border border-accent/20',
  success: 'bg-success/10 text-success border border-success/20',
  warning: 'bg-warning/10 text-warning border border-warning/20',
  danger: 'bg-danger/10 text-danger border border-danger/20',
  muted: 'bg-primary/5 text-primary/40 border border-primary/10',
  outline: 'bg-transparent text-primary border border-border',
  ghost: 'bg-transparent text-primary/70',
  secondary: 'bg-secondary/10 text-secondary border border-secondary/20',
};

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn('inline-flex items-center rounded-[6px] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]', variants[variant], className)}
      {...props}
    />
  );
}
