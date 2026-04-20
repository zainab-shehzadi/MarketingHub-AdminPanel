'use client';

import { AuditLog } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LOG_ACTION_CONFIG, LOG_MODULE_CONFIG } from '@/lib/constants';
import { formatDateTime } from '@/lib/formatting';
import { ActionDropdown } from '@/components/modals/ActionDropdown';

interface LogsTableProps {
  logs: AuditLog[];
  onView?: (log: AuditLog) => void;
}

export function LogsTable({ logs, onView }: LogsTableProps) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800/50 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-700 hover:bg-transparent">
            <TableHead className="text-slate-400">Timestamp</TableHead>
            <TableHead className="text-slate-400">Actor</TableHead>
            <TableHead className="text-slate-400">Action</TableHead>
            <TableHead className="text-slate-400">Module</TableHead>
            <TableHead className="text-slate-400">Target Entity</TableHead>
            <TableHead className="text-slate-400">Status</TableHead>
            <TableHead className="text-slate-400">IP Address</TableHead>
            <TableHead className="text-slate-400 text-right">Actions</TableHead>
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
              <TableRow key={log.id} className="border-slate-700 hover:bg-slate-700/30">
                <TableCell className="text-slate-400 text-sm">{formatDateTime(log.timestamp)}</TableCell>
                <TableCell className="text-slate-300 text-sm">{log.actor}</TableCell>
                <TableCell className="text-slate-300 text-sm">{LOG_ACTION_CONFIG[log.action]}</TableCell>
                <TableCell className="text-slate-300 text-sm">{LOG_MODULE_CONFIG[log.module]}</TableCell>
                <TableCell className="text-slate-300 text-sm">
                  {log.targetEntity} <span className="text-slate-500">#{log.targetId}</span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[log.status]}`}>
                    {statusLabels[log.status]}
                  </span>
                </TableCell>
                <TableCell className="text-slate-400 text-sm font-mono">{log.ipAddress}</TableCell>
                <TableCell className="text-right">
                  <ActionDropdown
                    actions={[
                      {
                        label: 'View Details',
                        icon: 'view',
                        onClick: () => onView?.(log),
                      },
                    ]}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
