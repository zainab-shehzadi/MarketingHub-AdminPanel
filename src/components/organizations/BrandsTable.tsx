'use client';

import { useRouter } from 'next/navigation';
import { Brand } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PlanBadge } from '@/components/shared/PlanBadge';
import { ActionDropdown } from '@/components/modals/ActionDropdown';
import { BanToggle } from './BanToggle';

interface BrandsTableProps {
  brands: Brand[];
  onView?: (brand: Brand) => void;
  onEdit?: (brand: Brand) => void;
  onDelete?: (id: string) => void;
  onToggleBan?: (id: string) => void;
}

export function BrandsTable({
  brands,
  onView,
  onEdit,
  onDelete,
  onToggleBan,
}: BrandsTableProps) {
  const router = useRouter();

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200 bg-slate-50 hover:bg-transparent">
              <TableHead className="font-semibold text-slate-700">Name</TableHead>
              <TableHead className="font-semibold text-slate-700">Website</TableHead>
              <TableHead className="font-semibold text-slate-700">Owner Email</TableHead>
              <TableHead className="font-semibold text-slate-700">Plan</TableHead>
              <TableHead className="font-semibold text-slate-700">Status</TableHead>
              <TableHead className="font-semibold text-slate-700">Seats</TableHead>
              <TableHead className="text-right font-semibold text-slate-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {brands.map((brand) => (
              <TableRow key={brand.id} className="border-slate-200 hover:bg-slate-50">
                <TableCell className="font-medium text-slate-900">
                  {brand.name}
                </TableCell>

                <TableCell className="text-slate-700">{brand.website}</TableCell>

                <TableCell className="text-sm text-slate-600">
                  {brand.ownerEmail}
                </TableCell>

                <TableCell>
                  <PlanBadge plan={brand.plan} />
                </TableCell>

                <TableCell>
                  <BanToggle
                    status={brand.status}
                    onToggle={() => onToggleBan?.(brand.id)}
                  />
                </TableCell>

                <TableCell className="text-sm text-slate-700">
                  {brand.seatsUsed}/{brand.seatsLimit}
                </TableCell>

                <TableCell className="flex justify-end">
                  <ActionDropdown
                    actions={[
                      {
                        label: 'View Details',
                        icon: 'view',
                        onClick: () =>
                          onView ? onView(brand) : router.push(`/organizations/brands/${brand.id}`),
                      },
                      {
                        label: 'Edit',
                        icon: 'edit',
                        onClick: () => onEdit?.(brand),
                      },
                      {
                        label: brand.status === 'banned' ? 'Unban Brand' : 'Ban Brand',
                        icon: 'delete',
                        isDangerous: brand.status !== 'banned',
                        onClick: () => onToggleBan?.(brand.id),
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
    </div>
  );
}