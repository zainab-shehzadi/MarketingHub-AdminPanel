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
    <div className="rounded-lg border border-slate-200 bg-white overflow-x-auto shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-200 hover:bg-transparent bg-slate-50">
            <TableHead className="text-slate-700 font-semibold">Plan Name</TableHead>
            <TableHead className="text-slate-700 font-semibold">Monthly Price</TableHead>
            <TableHead className="text-slate-700 font-semibold">Yearly Price</TableHead>
            <TableHead className="text-slate-700 font-semibold">Features Count</TableHead>
            <TableHead className="text-slate-700 font-semibold">Status</TableHead>
            <TableHead className="text-slate-700 font-semibold">Created</TableHead>
            <TableHead className="text-slate-700 font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plans.map((plan) => (
            <TableRow key={plan.id} className="border-slate-200 hover:bg-slate-50">
              <TableCell className="font-medium text-slate-900 capitalize">{plan.name}</TableCell>
              <TableCell className="text-slate-700">{formatCurrency(plan.monthlyPrice)}</TableCell>
              <TableCell className="text-slate-700">{formatCurrency(plan.yearlyPrice)}</TableCell>
              <TableCell className="text-slate-700">{plan.features.length} features</TableCell>
              <TableCell>
                <StatusBadge status={plan.status === 'available' ? 'active' : 'inactive'} />
              </TableCell>
              <TableCell className="text-slate-700 text-sm">{formatDate(plan.createdAt)}</TableCell>
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
