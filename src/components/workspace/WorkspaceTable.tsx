'use client';

import { Eye, MoreHorizontal } from 'lucide-react';
import { formatDate } from '@/lib/formatting';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Workspace } from '@/types/workspace';

type WorkspaceTableProps = {
  workspaces: Workspace[];
  onView?: (workspace: Workspace) => void;
};

function safeFormatDate(date?: string | Date | null) {
  if (!date) return '-';

  const parsedDate = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return '-';
  }

  return formatDate(parsedDate);
}

function formatLabel(value?: string) {
  if (!value) return '-';

  return value
    .split('_')
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(' ');
}

function getStatusClass(status?: string) {
  switch (status) {
    case 'active':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    case 'inactive':
      return 'border-slate-200 bg-slate-50 text-slate-700';
    case 'suspended':
      return 'border-red-200 bg-red-50 text-red-700';
    default:
      return 'border-slate-200 bg-slate-50 text-slate-700';
  }
}



export function WorkspaceTable({ workspaces, onView }: WorkspaceTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl p-4 border border-slate-200 bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-200 bg-slate-50 hover:bg-slate-50">
            <TableHead className="min-w-[220px] font-semibold text-slate-700">
              Workspace
            </TableHead>
<TableHead className="min-w-[220px] font-semibold text-slate-700">
              Type
            </TableHead>
            <TableHead className="min-w-[220px] font-semibold text-slate-700">
              Created By
            </TableHead>
            <TableHead className="min-w-[120px] font-semibold text-slate-700">
              Members
            </TableHead>
            <TableHead className="min-w-[120px] font-semibold text-slate-700">
              Projects
            </TableHead>
            <TableHead className="min-w-[120px] font-semibold text-slate-700">
              Seats
            </TableHead>
            <TableHead className="min-w-[120px] font-semibold text-slate-700">
              Status
            </TableHead>

            <TableHead className="min-w-[90px] text-right font-semibold text-slate-700">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {workspaces.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={9}
                className="h-32 text-center text-sm text-slate-500"
              >
                No workspaces found
              </TableCell>
            </TableRow>
          ) : (
            workspaces.map((workspace) => {
              const owner = workspace.createdBy;
              const membersCount = workspace.members?.length ?? 0;
              const projectsCount = workspace.projects?.length ?? 0;

              return (
                <TableRow
                  key={workspace._id}
                  className="border-slate-200 hover:bg-slate-50/80"
                >
                  <TableCell>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {workspace.name || '-'}
                      </p>

                    </div>
                  </TableCell>

 <TableCell>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {workspace.workspaceType|| '-'}
                      </p>

                    </div>
                  </TableCell>

                  <TableCell>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {owner?.name || owner?.email || '-'}
                      </p>
                      {owner?.name && (
                        <p className="mt-1 text-xs text-slate-500">
                          {owner.email}
                        </p>
                      )}
                      {owner?.role && (
                        <p className="mt-1 text-xs text-slate-500">
                          {formatLabel(owner.role)}
                        </p>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="text-sm text-slate-700">
                    {membersCount}
                  </TableCell>

                  <TableCell className="text-sm text-slate-700">
                    {projectsCount}
                  </TableCell>

                  <TableCell className="text-sm text-slate-700">
                    {membersCount}/{workspace.seatsLimit ?? 0}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                        workspace.status
                      )}`}
                    >
                      {formatLabel(workspace.status)}
                    </span>
                  </TableCell>



                  <TableCell>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => onView?.(workspace)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                        aria-label="View workspace"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}