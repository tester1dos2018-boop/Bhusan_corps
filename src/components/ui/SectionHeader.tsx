import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function SectionHeader({ eyebrow, title, description, action, className, ...props }: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', className)} {...props}>
      <div>
        {eyebrow && <p className="section-title mb-2">{eyebrow}</p>}
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-primary">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-primary/60">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}