'use client';

import { useState, useEffect } from 'react';
import { User } from '@/lib/types';
import { FormModal } from '@/components/modals/FormModal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';

interface ChangeRoleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onSubmit: (userId: string, newRole: string) => void;
}

export function ChangeRoleModal({
  open,
  onOpenChange,
  user,
  onSubmit,
}: ChangeRoleModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    if (user) {
      setNewRole(user.role);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || newRole === user.role) return;
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSubmit(user.id, newRole);
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title="Change User Role"
      description={`Update role for ${user.name}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded p-3 flex gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            Changing roles will update user permissions immediately
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="change-role" className="text-slate-700">
            New Role
          </Label>
          <Select value={newRole} onValueChange={setNewRole}>
            <SelectTrigger className="border-slate-200 bg-white text-slate-900">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-slate-200 bg-white">
              <SelectItem value="user" className="text-slate-900">
                User
              </SelectItem>
              <SelectItem value="moderator" className="text-slate-900">
                Moderator
              </SelectItem>
              <SelectItem value="admin" className="text-slate-900">
                Admin
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-700 text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading || newRole === user.role}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            {isLoading ? 'Updating...' : 'Update Role'}
          </Button>
        </div>
      </form>
    </FormModal>
  );
}
