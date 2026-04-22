'use client';

import { AuditLog } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDateTime } from '@/lib/formatting';
import { LOG_ACTION_CONFIG, LOG_MODULE_CONFIG } from '@/lib/constants';

interface LogDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  log: AuditLog | null;
}

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  success: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
  failure: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
  warning: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
};

export function LogDetailModal({ open, onOpenChange, log }: LogDetailModalProps) {
  if (!log) return null;

  const statusConfig = STATUS_COLORS[log.status] || STATUS_COLORS.success;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-slate-200 bg-white shadow-lg max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-slate-900">Audit Log Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-600 mb-1">Timestamp</p>
              <p className="text-sm text-slate-900">{formatDateTime(log.timestamp)}</p>
            </Card>

            <Card className="border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-600 mb-1">Status</p>
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
              </span>
            </Card>

            <Card className="border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-600 mb-1">Actor</p>
              <p className="text-sm text-slate-900">{log.actor}</p>
            </Card>

            <Card className="border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-600 mb-1">Action</p>
              <p className="text-sm text-slate-900">{LOG_ACTION_CONFIG[log.action]}</p>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-600 mb-1">Module</p>
              <p className="text-sm text-slate-900">{LOG_MODULE_CONFIG[log.module]}</p>
            </Card>

            <Card className="border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-600 mb-1">Entity</p>
              <p className="text-sm text-slate-900">
                {log.targetEntity} <span className="text-slate-500">#{log.targetId}</span>
              </p>
            </Card>
          </div>

          {log.details && (
            <Card className="border-slate-200 bg-slate-50 p-4">
              <p className="text-xs text-slate-600 mb-2 font-semibold">Details</p>
              <p className="text-sm text-slate-700 break-words whitespace-pre-wrap font-mono">
                {log.details}
              </p>
            </Card>
          )}

          <Card className="border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-600 mb-1">IP Address</p>
            <p className="text-sm text-slate-900 font-mono">{log.ipAddress}</p>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
