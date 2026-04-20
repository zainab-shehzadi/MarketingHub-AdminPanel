'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ReactNode } from 'react';

interface FormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
}

export function FormModal({
  open,
  onOpenChange,
  title,
  description,
  children,
}: FormModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-slate-700 bg-slate-900 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-slate-100">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-slate-400">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
