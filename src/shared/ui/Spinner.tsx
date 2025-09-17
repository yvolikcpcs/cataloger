type SpinnerProps = { className?: string; label?: string };

export function Spinner({ className = '', label }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center py-8">
      <div
        className={`h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-transparent mr-2 ${className}`}
        aria-label={label ?? 'Loading'}
      />
      {label && <span className="text-sm text-gray-600">{label}</span>}
    </div>
  );
}
