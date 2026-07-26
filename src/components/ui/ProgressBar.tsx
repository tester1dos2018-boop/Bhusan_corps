import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  label?: string;
  showValue?: boolean;
}

export function ProgressBar({ value = 0, label, showValue = false, className, ...props }: ProgressBarProps) {
  const normalizedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('w-full space-y-2', className)} {...props}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-sm font-medium text-primary/60">
          {label && <span>{label}</span>}
          {showValue && <span>{normalizedValue}%</span>}
        </div>
      )}
      <div className="h-2.5 overflow-hidden rounded-full bg-primary/10">
        <div className="h-full rounded-full bg-accent transition-all duration-300" style={{ width: `${normalizedValue}%` }} />
      </div>
    </div>
  );
}