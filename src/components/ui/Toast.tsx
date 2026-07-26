import { useEffect, useState } from 'react';

export function Toast({ message }: { message: string | null }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 3500);
    return () => clearTimeout(t);
  }, []);

  if (!visible || !message) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-lg bg-primary/95 px-4 py-3 text-white shadow-lg">
      {message}
    </div>
  );
}
