import type { ReactNode } from 'react';
import {
  CalendarDays,
  FolderKanban,
  ShieldCheck,
  Users,
} from 'lucide-react';

import type { Workspace } from '@/types/workspace';
import { formatDate } from './helpers';

type WorkspaceSummaryGridProps = {
  workspace: Workspace;
  membersCount: number;
  projectsCount: number;
  seatsLimit: number;
};

export function WorkspaceSummaryGrid({
  workspace,
  membersCount,
  projectsCount,
  seatsLimit,
}: WorkspaceSummaryGridProps) {
  return (
    <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
      <SummaryItem
        label="Members"
        value={membersCount}
        icon={<Users className="h-5 w-5" />}
      />

      <SummaryItem
        label="Projects"
        value={projectsCount}
        icon={<FolderKanban className="h-5 w-5" />}
      />

      <SummaryItem
        label="Seats Limit"
        value={seatsLimit}
        icon={<ShieldCheck className="h-5 w-5" />}
      />

      <SummaryItem
        label="Created"
        value={formatDate(workspace.createdAt)}
        icon={<CalendarDays className="h-5 w-5" />}
      />
    </div>
  );
}

function SummaryItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: ReactNode;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#DE5A3F] shadow-sm">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-semibold capitalize text-slate-900">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}