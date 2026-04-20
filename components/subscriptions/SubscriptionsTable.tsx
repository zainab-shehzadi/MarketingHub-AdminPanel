'use client';

import { useRouter } from 'next/navigation';
import { Subscription } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { BILLING_STATUS_CONFIG } from '@/lib/constants';
import { formatDate } from '@/lib/formatting';
import { ActionDropdown } from '@/components/modals/ActionDropdown';

interface SubscriptionsTableProps {
  subscriptions: Subscription[];
  onUpdateSeats?: (subscription: Subscription) => void;
  onCancel?: (id: string) => void;
}

export function SubscriptionsTable({ subscriptions, onUpdateSeats, onCancel }: SubscriptionsTableProps) {
  const router = useRouter();
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800/50 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-700 hover:bg-transparent">
            <TableHead className="text-slate-400">Organization</TableHead>
            <TableHead className="text-slate-400">Type</TableHead>
            <TableHead className="text-slate-400">Plan</TableHead>
            <TableHead className="text-slate-400">Billing Status</TableHead>
            <TableHead className="text-slate-400">Seats</TableHead>
            <TableHead className="text-slate-400">Billing Cycle</TableHead>
            <TableHead className="text-slate-400">Renewal Date</TableHead>
            <TableHead className="text-slate-400">Status</TableHead>
            <TableHead className="text-slate-400 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map((sub) => {
            const billingConfig = BILLING_STATUS_CONFIG[sub.billingStatus];
            return (
              <TableRow key={sub.id} className="border-slate-700 hover:bg-slate-700/30">
                <TableCell className="font-medium text-white">{sub.organizationName}</TableCell>
                <TableCell className="text-slate-300 capitalize text-sm">{sub.organizationType}</TableCell>
                <TableCell className="text-slate-300 capitalize">{sub.currentPlan}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${billingConfig.color}`}>
                    {billingConfig.label}
                  </span>
                </TableCell>
                <TableCell className="text-slate-300 text-sm">
                  {sub.seatsUsed}/{sub.seatsLimit}
                </TableCell>
                <TableCell className="text-slate-300 capitalize text-sm">{sub.billingCycle}</TableCell>
                <TableCell className="text-slate-400 text-sm">{formatDate(sub.renewalDate)}</TableCell>
                <TableCell>
                  <StatusBadge status={sub.status} />
                </TableCell>
                <TableCell className="text-right">
                  <ActionDropdown
                    actions={[
                      {
                        label: 'View Details',
                        icon: 'view',
                        onClick: () => router.push(`/subscriptions/${sub.id}`),
                      },
                      {
                        label: 'Update Seats',
                        icon: 'edit',
                        onClick: () => onUpdateSeats?.(sub),
                      },
                      {
                        label: 'Cancel Subscription',
                        icon: 'delete',
                        isDangerous: true,
                        onClick: () => onCancel?.(sub.id),
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
