type TableSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export function TableSearch({
  value,
  onChange,
  placeholder = 'Search…',
  className = '',
  disabled = false,
}: TableSearchProps) {
  return (
    <div className={`p-2 flex justify-end ${className}`}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`border rounded px-2 py-1 text-sm ${
          disabled ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      />
    </div>
  );
}
