'use client';

import { Plan } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/formatting';
import { ActionDropdown } from '@/components/modals/ActionDropdown';

interface PlansTableProps {
  plans: Plan[];
  onEdit?: (plan: Plan) => void;
  onDelete?: (id: string) => void;
}

export function PlansTable({ plans, onEdit, onDelete }: PlansTableProps) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800/50 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-700 hover:bg-transparent">
            <TableHead className="text-slate-400">Plan Name</TableHead>
            <TableHead className="text-slate-400">Monthly Price</TableHead>
            <TableHead className="text-slate-400">Yearly Price</TableHead>
            <TableHead className="text-slate-400">Features Count</TableHead>
            <TableHead className="text-slate-400">Status</TableHead>
            <TableHead className="text-slate-400">Created</TableHead>
            <TableHead className="text-slate-400 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plans.map((plan) => (
            <TableRow key={plan.id} className="border-slate-700 hover:bg-slate-700/30">
              <TableCell className="font-medium text-white capitalize">{plan.name}</TableCell>
              <TableCell className="text-slate-300">{formatCurrency(plan.monthlyPrice)}</TableCell>
              <TableCell className="text-slate-300">{formatCurrency(plan.yearlyPrice)}</TableCell>
              <TableCell className="text-slate-300">{plan.features.length} features</TableCell>
              <TableCell>
                <StatusBadge status={plan.status === 'available' ? 'active' : 'inactive'} />
              </TableCell>
              <TableCell className="text-slate-400 text-sm">{formatDate(plan.createdAt)}</TableCell>
              <TableCell className="text-right">
                <ActionDropdown
                  actions={[
                    {
                      label: 'Edit',
                      icon: 'edit',
                      onClick: () => onEdit?.(plan),
                    },
                    {
                      label: 'Delete',
                      icon: 'delete',
                      isDangerous: true,
                      onClick: () => onDelete?.(plan.id),
                    },
                  ]}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
