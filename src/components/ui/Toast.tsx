export function Toast({ message }: { message: string | null }) {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-[14px] border border-accent/20 bg-primary px-4 py-3 text-sm font-semibold text-white shadow-soft">
      {message}
    </div>
  );
}
