import type { ButtonHTMLAttributes } from 'react';
import { Bell } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NotificationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hasUnread?: boolean;
}

export function NotificationButton({ className, hasUnread = false, type = 'button', ...props }: NotificationButtonProps) {
  return (
    <button
      type={type}
      aria-label="Notifications"
      className={cn(
        'relative rounded-full p-2 text-primary/70 transition-colors hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30',
        className
      )}
      {...props}
    >
      <Bell className="h-5 w-5" />
      {hasUnread && <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-danger" />}
    </button>
  );
}