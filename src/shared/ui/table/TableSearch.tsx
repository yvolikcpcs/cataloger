type TableSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function TableSearch({
  value,
  onChange,
  placeholder = "Search…",
  className = "",
}: TableSearchProps) {
  return (
    <div className={`p-2 flex justify-end ${className}`}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border rounded px-2 py-1 text-sm"
      />
    </div>
  );
}
