import {
  BriefcaseBusiness,
  Hash,
} from 'lucide-react';

import type { Workspace } from '@/types/workspace';
import { getInitials, getStatusBadge, getTypeBadge } from './helpers';

type WorkspaceHeroProps = {
  workspace: Workspace;
  usedSeats: number;
  seatsLimit: number;
};

export function WorkspaceHero({
  workspace,
  usedSeats,
  seatsLimit,
}: WorkspaceHeroProps) {
  const statusBadge = getStatusBadge(workspace.status);

  return (
    <div className="border-b border-slate-100 bg-gradient-to-br from-[#DE5A3F]/10 via-white to-slate-50 px-5 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-[#DE5A3F] text-2xl font-bold text-white shadow-sm">
            {getInitials(workspace.name)}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="break-words text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                {workspace.name}
              </h1>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${statusBadge.className}`}
              >
                {statusBadge.icon}
                {statusBadge.label}
              </span>
            </div>

            <div className="mt-2 flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:flex-wrap sm:items-center">
              <span className="inline-flex items-center gap-2">
                <BriefcaseBusiness className="h-4 w-4 shrink-0" />
                <span className="capitalize">{workspace.workspaceType}</span>
              </span>

              <span className="hidden text-slate-300 sm:inline">•</span>

              <span className="inline-flex items-center gap-2">
                <Hash className="h-4 w-4 shrink-0" />
                <span className="break-all">{workspace._id}</span>
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getTypeBadge(
                  workspace.workspaceType
                )}`}
              >
                {workspace.workspaceType}
              </span>

              <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                {usedSeats}/{seatsLimit} seats used
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}