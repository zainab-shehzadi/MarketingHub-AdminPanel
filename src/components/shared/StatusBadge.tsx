

type StatusBadgeProps = {
  status?: boolean | string;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const isActive =
    typeof status === 'boolean'
      ? status
      : String(status).toLowerCase() === 'active';

  const label = isActive ? 'Active' : 'Inactive';

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
        isActive
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-red-200 bg-red-50 text-red-700'
      }`}
    >
      {label}
    </span>
  );
}