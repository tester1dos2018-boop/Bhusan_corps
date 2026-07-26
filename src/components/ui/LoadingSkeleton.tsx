import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export function LoadingSkeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-[12px] bg-primary/[0.08] dark:bg-white/5', className)} {...props} />;
}

export function CardSkeleton() {
  return (
    <div className="rounded-[16px] border border-border bg-white/50 p-6 shadow-soft backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center justify-between gap-4">
        <LoadingSkeleton className="h-10 w-10 rounded-[12px]" />
        <LoadingSkeleton className="h-6 w-16" />
      </div>
      <LoadingSkeleton className="mt-8 h-3 w-20" />
      <LoadingSkeleton className="mt-3 h-10 w-40" />
      <div className="mt-6 space-y-2">
        <LoadingSkeleton className="h-2 w-full" />
        <LoadingSkeleton className="h-2 w-[80%]" />
      </div>
    </div>
  );
}
