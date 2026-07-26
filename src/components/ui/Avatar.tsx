import type { HTMLAttributes, ImgHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize;
}

const sizes: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
};

export function Avatar({ className, size = 'md', ...props }: AvatarProps) {
  return <div className={cn('relative flex shrink-0 overflow-hidden rounded-full bg-primary/10 text-primary', sizes[size], className)} {...props} />;
}

export function AvatarImage({ className, alt = '', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return <img alt={alt} className={cn('aspect-square h-full w-full object-cover', className)} {...props} />;
}

export function AvatarFallback({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex h-full w-full items-center justify-center font-semibold', className)} {...props} />;
}