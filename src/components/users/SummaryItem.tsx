import type { ReactNode } from 'react';

type SummaryItemProps = {
  label: string;
  value: ReactNode;
  icon: ReactNode;
  className?: string;
  iconClassName?: string;
};

export function SummaryItem({
  label,
  value,
  icon,
  className = '',
  iconClassName = '',
}: SummaryItemProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-slate-50/70 p-4 ${className}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#DE5A3F] shadow-sm ${iconClassName}`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-semibold capitalize text-slate-900">
            {value || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
}