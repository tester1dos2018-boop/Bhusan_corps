import type { InputHTMLAttributes } from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
}

export function SearchBar({ className, wrapperClassName, placeholder = 'Search', ...props }: SearchBarProps) {
  return (
    <div
      className={cn(
        'flex items-center rounded-full border border-border/80 bg-primary/5 px-4 py-2.5 shadow-sm transition-all focus-within:border-accent/40 focus-within:bg-white focus-within:ring-2 focus-within:ring-accent/10',
        wrapperClassName
      )}
    >
      <Search className="h-4 w-4 text-primary/40" />
      <input
        type="search"
        placeholder={placeholder}
        className={cn('ml-3 w-full border-none bg-transparent text-sm text-primary outline-none placeholder:text-primary/30', className)}
        {...props}
      />
    </div>
  );
}