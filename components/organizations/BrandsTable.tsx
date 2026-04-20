'use client';

import { useRouter } from 'next/navigation';
import { Brand } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { PlanBadge } from '@/components/shared/PlanBadge';
import { ActionDropdown } from '@/components/modals/ActionDropdown';

interface BrandsTableProps {
  brands: Brand[];
  onEdit?: (brand: Brand) => void;
  onDelete?: (id: string) => void;
}

export function BrandsTable({ brands, onEdit, onDelete }: BrandsTableProps) {
  const router = useRouter();

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800/50 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-700 hover:bg-transparent">
            <TableHead className="text-slate-400">Name</TableHead>
            <TableHead className="text-slate-400">Website</TableHead>
            <TableHead className="text-slate-400">Owner Email</TableHead>
            <TableHead className="text-slate-400">Plan</TableHead>
            <TableHead className="text-slate-400">Status</TableHead>
            <TableHead className="text-slate-400">Seats</TableHead>
            <TableHead className="text-slate-400 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brands.map((brand) => (
            <TableRow key={brand.id} className="border-slate-700 hover:bg-slate-700/30">
              <TableCell className="font-medium text-white">{brand.name}</TableCell>
              <TableCell className="text-slate-300">{brand.website}</TableCell>
              <TableCell className="text-slate-400 text-sm">{brand.ownerEmail}</TableCell>
              <TableCell>
                <PlanBadge plan={brand.plan} />
              </TableCell>
              <TableCell>
                <StatusBadge status={brand.status} />
              </TableCell>
              <TableCell className="text-slate-300 text-sm">
                {brand.seatsUsed}/{brand.seatsLimit}
              </TableCell>
              <TableCell className="text-right">
                <ActionDropdown
                  actions={[
                    {
                      label: 'View Details',
                      icon: 'view',
                      onClick: () => router.push(`/organizations/brands/${brand.id}`),
                    },
                    {
                      label: 'Edit',
                      icon: 'edit',
                      onClick: () => onEdit?.(brand),
                    },
                    {
                      label: 'Delete',
                      icon: 'delete',
                      isDangerous: true,
                      onClick: () => onDelete?.(brand.id),
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
