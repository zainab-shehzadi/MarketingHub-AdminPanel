'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { LogsTable } from '@/components/logs/LogsTable';
import { LogDetailModal } from '@/components/logs/LogDetailModal';
import { mockLogs } from '@/lib/mock-data';
import { AuditLog } from '@/lib/types';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { LOG_ACTION_CONFIG, LOG_MODULE_CONFIG } from '@/lib/constants';

export default function LogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedModule, setSelectedModule] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [logDetailModalOpen, setLogDetailModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  let filteredLogs = mockLogs;

  if (searchTerm) {
    filteredLogs = filteredLogs.filter(
      (l) =>
        l.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.targetEntity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.ipAddress.includes(searchTerm)
    );
  }

  if (selectedAction !== 'all') {
    filteredLogs = filteredLogs.filter((l) => l.action === selectedAction);
  }

  if (selectedModule !== 'all') {
    filteredLogs = filteredLogs.filter((l) => l.module === selectedModule);
  }

  if (selectedStatus !== 'all') {
    filteredLogs = filteredLogs.filter((l) => l.status === selectedStatus);
  }

  const handleViewLog = (log: AuditLog) => {
    setSelectedLog(log);
    setLogDetailModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Logs"
        description="Track system activity and user actions"
      />

      <div className="flex flex-col gap-3 md:flex-row md:items-center flex-wrap">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            placeholder="Search by actor, entity, or IP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
          />
        </div>

        <Select value={selectedAction} onValueChange={setSelectedAction}>
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white w-full md:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-700 border-slate-600">
            <SelectItem value="all">All Actions</SelectItem>
            {Object.entries(LOG_ACTION_CONFIG).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedModule} onValueChange={setSelectedModule}>
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white w-full md:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-700 border-slate-600">
            <SelectItem value="all">All Modules</SelectItem>
            {Object.entries(LOG_MODULE_CONFIG).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white w-full md:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-700 border-slate-600">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="failure">Failure</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <LogsTable logs={filteredLogs} onView={handleViewLog} />

      <LogDetailModal
        open={logDetailModalOpen}
        onOpenChange={setLogDetailModalOpen}
        log={selectedLog}
      />
    </div>
  );
}
