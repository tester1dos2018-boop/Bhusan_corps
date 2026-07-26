import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white shadow-soft hover:shadow-lg active:scale-[0.98]',
  secondary: 'bg-accent text-white shadow-soft hover:shadow-lg active:scale-[0.98]',
  ghost: 'text-primary/70 hover:bg-primary/5 hover:text-primary active:scale-[0.98]',
  outline: 'border border-border bg-white text-primary shadow-sm hover:border-accent/40 hover:bg-accent/5 active:scale-[0.98]',
  danger: 'bg-danger text-white shadow-soft hover:bg-danger/95 active:scale-[0.98]',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs tracking-wide',
  md: 'h-10 px-5 text-sm tracking-wide',
  lg: 'h-12 px-8 text-sm uppercase tracking-[0.1em]',
  icon: 'h-10 w-10 p-0',
};

export function Button({ className, variant = 'primary', size = 'md', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-[12px] font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
