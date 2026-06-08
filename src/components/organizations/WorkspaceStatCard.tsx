interface WorkspaceStatCardProps {
  label: string;
  value: string | number;
}

export function WorkspaceStatCard({ label, value }: WorkspaceStatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}