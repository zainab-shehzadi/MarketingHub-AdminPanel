
'use client';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { StatusBadge } from '@/components/shared/StatusBadge';
import { ActionDropdown } from '@/components/modals/ActionDropdown';
import { formatDate } from '@/lib/formatting';
import { AdminUser } from '@/types/user';

interface UsersTableProps {
  users: AdminUser[];
  onChangeRole?: (user: AdminUser) => void;
  onResetPassword?: (user: AdminUser) => void;
  onDelete?: (id: string) => void;
}

function formatRole(role: string) {
  return role
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function UsersTable({
  users,
  onDelete,
}: UsersTableProps) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto p-4 rounded-lg border border-slate-200 bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-200 bg-slate-50 hover:bg-slate-50">
            <TableHead className="min-w-[160px] font-semibold text-slate-700">
              Name
            </TableHead>
            <TableHead className="min-w-[240px] font-semibold text-slate-700">
              Email
            </TableHead>
            <TableHead className="min-w-[120px] font-semibold text-slate-700">
              Role
            </TableHead>
            <TableHead className="min-w-[160px] font-semibold text-slate-700">
              Organization Type
            </TableHead>
            <TableHead className="min-w-[180px] font-semibold text-slate-700">
              Designation
            </TableHead>
            <TableHead className="min-w-[130px] font-semibold text-slate-700">
              Status
            </TableHead>
            <TableHead className="min-w-[130px] font-semibold text-slate-700">
              Created
            </TableHead>
            <TableHead className="min-w-[100px] text-right font-semibold text-slate-700">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="h-28 text-center text-sm text-slate-500"
              >
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow
                key={user._id}
                className="border-slate-200 hover:bg-slate-50"
              >
                <TableCell className="font-medium text-slate-900">
                  {user.name || '-'}
                </TableCell>

                <TableCell className="text-sm text-slate-700">
                  {user.email || '-'}
                </TableCell>

                <TableCell className="text-sm text-slate-700">
                  {formatRole(user.role)}
                </TableCell>

                <TableCell className="text-sm text-slate-700">
                  {user.organizationType || '-'}
                </TableCell>

                <TableCell className="text-sm text-slate-700">
                  {user.employeeDesignation || '-'}
                </TableCell>

                <TableCell>
  <StatusBadge status={user.active ?? true} />
</TableCell>

                <TableCell className="text-sm text-slate-700">
                  {user.createdAt ? formatDate(new Date(user.createdAt)) : '-'}
                </TableCell>

                <TableCell>
                  <div className="flex justify-end">
                    <ActionDropdown
                      actions={[
                        {
                          label: 'View Details',
                          icon: 'view',
                          onClick: () => router.push(`/users/${user._id}`),
                        },
                       
                        {
                          label: 'Delete',
                          icon: 'delete',
                          isDangerous: true,
                          onClick: () => onDelete?.(user._id),
                        },
                      ]}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}