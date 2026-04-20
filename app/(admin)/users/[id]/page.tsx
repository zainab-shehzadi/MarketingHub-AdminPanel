'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockUsers } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ConfirmationDialog } from '@/components/modals/ConfirmationDialog';
import { ChangeRoleModal } from '@/components/users/ChangeRoleModal';
import { ResetPasswordModal } from '@/components/users/ResetPasswordModal';
import { Edit, Trash2, Key, Home } from 'lucide-react';
import { formatDateTime } from '@/lib/formatting';

interface UserDetailPageProps {
  params: {
    id: string;
  };
}

const ROLE_COLORS: Record<string, { bg: string; text: string }> = {
  admin: { bg: 'bg-purple-900/30', text: 'text-purple-300' },
  moderator: { bg: 'bg-blue-900/30', text: 'text-blue-300' },
  user: { bg: 'bg-slate-700', text: 'text-slate-300' },
};

export default function UserDetailPage({ params }: UserDetailPageProps) {
  const router = useRouter();
  const user = mockUsers.find((u) => u.id === params.id);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [changeRoleModalOpen, setChangeRoleModalOpen] = useState(false);
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!user) {
    return (
      <div className="space-y-6">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard" className="text-blue-400 hover:text-blue-300">
              <Home className="w-4 h-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-slate-600" />
          <BreadcrumbItem>
            <BreadcrumbLink href="/users" className="text-blue-400 hover:text-blue-300">
              Users
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-slate-600" />
          <BreadcrumbItem className="text-slate-400">Not Found</BreadcrumbItem>
        </Breadcrumb>
        <div className="text-center py-12">
          <p className="text-slate-400 mb-4">User not found</p>
          <Button
            onClick={() => router.push('/users')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Back to Users
          </Button>
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push('/users');
    } finally {
      setIsDeleting(false);
    }
  };

  const roleConfig = ROLE_COLORS[user.role];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard" className="text-blue-400 hover:text-blue-300">
                <Home className="w-4 h-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-slate-600" />
            <BreadcrumbItem>
              <BreadcrumbLink href="/users" className="text-blue-400 hover:text-blue-300">
                Users
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-slate-600" />
            <BreadcrumbItem className="text-slate-400">{user.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setChangeRoleModalOpen(true)}
            className="border-slate-700 text-slate-300 hover:bg-slate-700"
          >
            <Edit className="w-4 h-4 mr-2" />
            Change Role
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setResetPasswordModalOpen(true)}
            className="border-slate-700 text-slate-300 hover:bg-slate-700"
          >
            <Key className="w-4 h-4 mr-2" />
            Reset Password
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleteDialogOpen(true)}
            className="border-red-700 text-red-400 hover:bg-red-900/20"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-slate-700 bg-slate-800 p-6">
          <p className="text-slate-400 text-sm mb-2">Name</p>
          <p className="text-slate-100 text-lg font-semibold">{user.name}</p>
        </Card>

        <Card className="border-slate-700 bg-slate-800 p-6">
          <p className="text-slate-400 text-sm mb-2">Email</p>
          <p className="text-slate-100 text-sm font-semibold break-all">{user.email}</p>
        </Card>

        <Card className="border-slate-700 bg-slate-800 p-6">
          <p className="text-slate-400 text-sm mb-2">Role</p>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${roleConfig.bg} ${roleConfig.text}`}>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </span>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-slate-700 bg-slate-800 p-6 space-y-4">
          <h3 className="text-slate-100 font-semibold">Account Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Status:</span>
              <span className="text-green-400 font-semibold">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Created:</span>
              <span className="text-slate-200 text-sm">{formatDateTime(user.createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Last Login:</span>
              <span className="text-slate-200 text-sm">{formatDateTime(user.lastLogin)}</span>
            </div>
          </div>
        </Card>

        <Card className="border-slate-700 bg-slate-800 p-6 space-y-4">
          <h3 className="text-slate-100 font-semibold">Quick Actions</h3>
          <div className="space-y-2">
            <Button
              onClick={() => setChangeRoleModalOpen(true)}
              variant="outline"
              className="w-full border-slate-700 text-slate-300 hover:bg-slate-700 justify-start"
            >
              <Edit className="w-4 h-4 mr-2" />
              Change Role
            </Button>
            <Button
              onClick={() => setResetPasswordModalOpen(true)}
              variant="outline"
              className="w-full border-slate-700 text-slate-300 hover:bg-slate-700 justify-start"
            >
              <Key className="w-4 h-4 mr-2" />
              Reset Password
            </Button>
            <Button
              onClick={() => setDeleteDialogOpen(true)}
              variant="outline"
              className="w-full border-red-700 text-red-400 hover:bg-red-900/20 justify-start"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </Card>
      </div>

      <ChangeRoleModal
        open={changeRoleModalOpen}
        onOpenChange={setChangeRoleModalOpen}
        user={user}
        onSubmit={(userId, newRole) => {
          console.log('Changing role for user:', userId, 'to:', newRole);
          setChangeRoleModalOpen(false);
        }}
      />

      <ResetPasswordModal
        open={resetPasswordModalOpen}
        onOpenChange={setResetPasswordModalOpen}
        user={user}
        onConfirm={(userId) => {
          console.log('Resetting password for user:', userId);
          setResetPasswordModalOpen(false);
        }}
      />

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete User"
        description={`Are you sure you want to delete "${user.name}"? This action cannot be undone.`}
        actionLabel="Delete"
        isDangerous
        isLoading={isDeleting}
        onConfirm={handleDelete}
      />
    </div>
  );
}
