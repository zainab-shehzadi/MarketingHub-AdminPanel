'use client';

import { AuditLog } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LOG_ACTION_CONFIG, LOG_MODULE_CONFIG } from '@/lib/constants';
import { formatDateTime } from '@/lib/formatting';
import { ActionDropdown } from '@/components/modals/ActionDropdown';

interface LogsTableProps {
  logs: AuditLog[];
  onView?: (log: AuditLog) => void;
}

export function LogsTable({ logs, onView }: LogsTableProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <Table className="min-w-[1200px]">
          <TableHeader>
            <TableRow className="border-slate-200 bg-slate-50 hover:bg-transparent">
              <TableHead className="font-semibold text-slate-700">Timestamp</TableHead>
              <TableHead className="font-semibold text-slate-700">Actor</TableHead>
              <TableHead className="font-semibold text-slate-700">Action</TableHead>
              <TableHead className="font-semibold text-slate-700">Module</TableHead>
              <TableHead className="font-semibold text-slate-700">Target Entity</TableHead>
              <TableHead className="font-semibold text-slate-700">Status</TableHead>
              <TableHead className="font-semibold text-slate-700">IP Address</TableHead>
              <TableHead className="w-[96px] text-right font-semibold text-slate-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {logs.map((log) => {
              const statusColors = {
                success: 'bg-green-100 text-green-800',
                failure: 'bg-red-100 text-red-800',
                warning: 'bg-yellow-100 text-yellow-800',
              };

              const statusLabels = {
                success: 'Success',
                failure: 'Failure',
                warning: 'Warning',
              };

              return (
                <TableRow key={log.id} className="border-slate-200 hover:bg-slate-50">
                  <TableCell className="text-sm text-slate-700">
                    {formatDateTime(log.timestamp)}
                  </TableCell>

                  <TableCell className="text-sm text-slate-700">{log.actor}</TableCell>

                  <TableCell className="text-sm text-slate-700">
                    {LOG_ACTION_CONFIG[log.action]}
                  </TableCell>

                  <TableCell className="text-sm text-slate-700">
                    {LOG_MODULE_CONFIG[log.module]}
                  </TableCell>

                  <TableCell className="text-sm text-slate-700">
                    {log.targetEntity}{' '}
                    <span className="text-slate-500">#{log.targetId}</span>
                  </TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex rounded px-2 py-1 text-xs font-medium ${statusColors[log.status]}`}
                    >
                      {statusLabels[log.status]}
                    </span>
                  </TableCell>

                  <TableCell className="font-mono text-sm text-slate-700">
                    {log.ipAddress}
                  </TableCell>

                  <TableCell className="w-[96px]">
                    <div className="flex justify-end">
                      <ActionDropdown
                        actions={[
                          {
                            label: 'View Details',
                            icon: 'view',
                            onClick: () => onView?.(log),
                          },
                        ]}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}