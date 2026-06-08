
'use client';

import { useEffect, useMemo, useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { UsersTable } from '@/components/users/UsersTable';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useUserStore } from '@/store/user.store';
import { AdminUser } from '@/types/user';
import { RouteLoader } from '@/components/shared/RouteLoader';
import { Pagination } from '@/components/shared/Pagination';

export default function UsersPage() {
  const { users, pagination, isLoading, error, getUsers } = useUserStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('employee');
  const [page, setPage] = useState(1);

  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const limit = 10;

  useEffect(() => {
    getUsers({
      page,
      limit,
      role: selectedRole === 'all' ? undefined : selectedRole,
    });
  }, [getUsers, page, selectedRole]);

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;

    const value = searchTerm.toLowerCase();

    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(value) ||
        user.email?.toLowerCase().includes(value) ||
        user.employeeDesignation?.toLowerCase().includes(value) ||
        user.organizationType?.toLowerCase().includes(value)
    );
  }, [users, searchTerm]);

 



  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Manage admin users and their permissions"

      />

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

          <Input
            placeholder="Search users by name, email, designation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-slate-200 bg-white pl-10 text-slate-900 placeholder:text-slate-500 focus:border-orange-600 focus:ring-orange-600"
          />
        </div>

        <Select value={selectedRole} onValueChange={handleRoleChange}>
          <SelectTrigger className="w-full border-slate-200 bg-white text-slate-900 focus:border-orange-600 focus:ring-orange-600 md:w-48">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>

          <SelectContent className="border-slate-200 bg-white">
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Administrator</SelectItem>
            <SelectItem value="employee">Employee</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}
      <>
        <RouteLoader
          show={isLoading}
        />

        {!isLoading && (
          <UsersTable
            users={filteredUsers}
          />
        )}
      </>
      <Pagination
        pagination={pagination}
        isLoading={isLoading}
        itemLabel="users"
        onPageChange={setPage}
      />

  
    </div>
  );
}