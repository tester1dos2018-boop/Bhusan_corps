import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface PanelProps extends HTMLAttributes<HTMLDivElement> {}

export function Panel({ children, className, ...props }: PanelProps) {
  return (
    <div className={cn('card p-6', className)} {...props}>
      {children}
    </div>
  );
}
