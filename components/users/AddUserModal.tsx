'use client';

import { useState } from 'react';
import { FormModal } from '@/components/modals/FormModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AddUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UserFormData) => void;
}

export interface UserFormData {
  email: string;
  name: string;
  role: 'admin' | 'moderator' | 'user';
}

export function AddUserModal({ open, onOpenChange, onSubmit }: AddUserModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    name: '',
    role: 'user',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSubmit(formData);
      setFormData({ email: '', name: '', role: 'user' });
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title="Add New User"
      description="Create a new user account in the system"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="user-name" className="text-slate-300">
            Full Name
          </Label>
          <Input
            id="user-name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="user-email" className="text-slate-300">
            Email Address
          </Label>
          <Input
            id="user-email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="user-role" className="text-slate-300">
            Role
          </Label>
          <Select value={formData.role} onValueChange={(value: any) => setFormData({ ...formData, role: value })}>
            <SelectTrigger className="border-slate-700 bg-slate-800 text-slate-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-slate-700 bg-slate-800">
              <SelectItem value="user" className="text-slate-100">
                User
              </SelectItem>
              <SelectItem value="moderator" className="text-slate-100">
                Moderator
              </SelectItem>
              <SelectItem value="admin" className="text-slate-100">
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
            className="border-slate-700 text-slate-300 hover:bg-slate-700"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading || !formData.name || !formData.email}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? 'Creating...' : 'Create User'}
          </Button>
        </div>
      </form>
    </FormModal>
  );
}
