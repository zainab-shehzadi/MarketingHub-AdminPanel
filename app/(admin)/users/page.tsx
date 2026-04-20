'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { UsersTable } from '@/components/users/UsersTable';
import { AddUserModal } from '@/components/users/AddUserModal';
import { ChangeRoleModal } from '@/components/users/ChangeRoleModal';
import { ResetPasswordModal } from '@/components/users/ResetPasswordModal';
import { ConfirmationDialog } from '@/components/modals/ConfirmationDialog';
import { mockUsers } from '@/lib/mock-data';
import { User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search } from 'lucide-react';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  
  // Modal states
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [changeRoleModalOpen, setChangeRoleModalOpen] = useState(false);
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  let filteredUsers = mockUsers;

  if (searchTerm) {
    filteredUsers = filteredUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (selectedRole !== 'all') {
    filteredUsers = filteredUsers.filter((u) => u.role === selectedRole);
  }

  const handleAddUser = (data: any) => {
    console.log('Adding user:', data);
    setAddUserModalOpen(false);
  };

  const handleChangeRole = (user: User) => {
    setSelectedUser(user);
    setChangeRoleModalOpen(true);
  };

  const handleResetPassword = (user: User) => {
    setSelectedUser(user);
    setResetPasswordModalOpen(true);
  };

  const handleDeleteUser = (id: string) => {
    setUserToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    console.log('Deleting user:', userToDelete);
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Manage admin users and their permissions"
        action={
          <Button onClick={() => setAddUserModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        }
      />

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
          />
        </div>

        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white w-full md:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-700 border-slate-600">
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Administrator</SelectItem>
            <SelectItem value="moderator">Moderator</SelectItem>
            <SelectItem value="support">Support Agent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <UsersTable 
        users={filteredUsers}
        onChangeRole={handleChangeRole}
        onResetPassword={handleResetPassword}
        onDelete={handleDeleteUser}
      />

      <AddUserModal
        open={addUserModalOpen}
        onOpenChange={setAddUserModalOpen}
        onSubmit={handleAddUser}
      />

      <ChangeRoleModal
        open={changeRoleModalOpen}
        onOpenChange={setChangeRoleModalOpen}
        user={selectedUser}
        onSubmit={(userId, newRole) => {
          console.log('Changing role for user:', userId, 'to:', newRole);
          setChangeRoleModalOpen(false);
          setSelectedUser(null);
        }}
      />

      <ResetPasswordModal
        open={resetPasswordModalOpen}
        onOpenChange={setResetPasswordModalOpen}
        user={selectedUser}
        onConfirm={(userId) => {
          console.log('Resetting password for user:', userId);
          setResetPasswordModalOpen(false);
          setSelectedUser(null);
        }}
      />

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        actionLabel="Delete"
        isDangerous
        onConfirm={confirmDelete}
      />
    </div>
  );
}
