'use client';

import { useState } from 'react';
import { ConfirmationDialog } from '@/components/modals/ConfirmationDialog';
import { AdminUser } from '@/types/user';

interface ResetPasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: AdminUser | null;
  onConfirm: (userId: string) => void;
}

export function ResetPasswordModal({
  open,
  onOpenChange,
  user,
  onConfirm,
}: ResetPasswordModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onConfirm(user._id);
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <ConfirmationDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Reset Password"
      description={`Send a password reset email to ${user.email}? They will receive instructions to set a new password.`}
      actionLabel="Send Reset Email"
      onConfirm={handleConfirm}
      isLoading={isLoading}
    />
  );
}
