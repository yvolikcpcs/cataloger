type ErrorAlertProps = { message: string; onRetry?: () => void };

export function ErrorAlert({ message, onRetry }: ErrorAlertProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
      <span className="mt-0.5">⚠️</span>
      <div className="flex-1">
        <div className="font-medium">Data managing error</div>
        <div className="text-red-700/90">{message}</div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-2 rounded-md border border-red-300 bg-white px-2 py-1 text-red-700 hover:bg-red-100"
        >
          Retry
        </button>
      )}
    </div>
  );
}
