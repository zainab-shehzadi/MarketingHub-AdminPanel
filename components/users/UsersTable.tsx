'use client';

import { useRouter } from 'next/navigation';
import { User } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { USER_ROLES } from '@/lib/constants';
import { formatDateTime, formatDate } from '@/lib/formatting';
import { ActionDropdown } from '@/components/modals/ActionDropdown';

interface UsersTableProps {
  users: User[];
  onChangeRole?: (user: User) => void;
  onResetPassword?: (user: User) => void;
  onDelete?: (id: string) => void;
}

export function UsersTable({ users, onChangeRole, onResetPassword, onDelete }: UsersTableProps) {
  const router = useRouter();
  return (
    <div className="rounded-lg border border-slate-200 bg-white overflow-x-auto shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-200 hover:bg-transparent bg-slate-50">
            <TableHead className="text-slate-700 font-semibold">Name</TableHead>
            <TableHead className="text-slate-700 font-semibold">Email</TableHead>
            <TableHead className="text-slate-700 font-semibold">Role</TableHead>
            <TableHead className="text-slate-700 font-semibold">Status</TableHead>
            <TableHead className="text-slate-700 font-semibold">Last Login</TableHead>
            <TableHead className="text-slate-700 font-semibold">Created</TableHead>
            <TableHead className="text-slate-700 font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="border-slate-200 hover:bg-slate-50">
              <TableCell className="font-medium text-slate-900">{user.name}</TableCell>
              <TableCell className="text-slate-700 text-sm">{user.email}</TableCell>
              <TableCell className="text-slate-700">{USER_ROLES[user.role]}</TableCell>
              <TableCell>
                <StatusBadge status="active" />
              </TableCell>
              <TableCell className="text-slate-700 text-sm">
                {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
              </TableCell>
              <TableCell className="text-slate-700 text-sm">{formatDate(user.createdAt)}</TableCell>
              <TableCell className="text-right">
                <ActionDropdown
                  actions={[
                    {
                      label: 'View Details',
                      icon: 'view',
                      onClick: () => router.push(`/users/${user.id}`),
                    },
                    {
                      label: 'Change Role',
                      icon: 'edit',
                      onClick: () => onChangeRole?.(user),
                    },
                    {
                      label: 'Reset Password',
                      icon: 'edit',
                      onClick: () => onResetPassword?.(user),
                    },
                    {
                      label: 'Delete',
                      icon: 'delete',
                      isDangerous: true,
                      onClick: () => onDelete?.(user.id),
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
