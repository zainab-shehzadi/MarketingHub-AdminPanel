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
    <div className="rounded-lg border border-slate-700 bg-slate-800/50 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-700 hover:bg-transparent">
            <TableHead className="text-slate-400">Name</TableHead>
            <TableHead className="text-slate-400">Email</TableHead>
            <TableHead className="text-slate-400">Role</TableHead>
            <TableHead className="text-slate-400">Status</TableHead>
            <TableHead className="text-slate-400">Last Login</TableHead>
            <TableHead className="text-slate-400">Created</TableHead>
            <TableHead className="text-slate-400 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="border-slate-700 hover:bg-slate-700/30">
              <TableCell className="font-medium text-white">{user.name}</TableCell>
              <TableCell className="text-slate-300 text-sm">{user.email}</TableCell>
              <TableCell className="text-slate-300">{USER_ROLES[user.role]}</TableCell>
              <TableCell>
                <StatusBadge status="active" />
              </TableCell>
              <TableCell className="text-slate-400 text-sm">
                {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
              </TableCell>
              <TableCell className="text-slate-400 text-sm">{formatDate(user.createdAt)}</TableCell>
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
