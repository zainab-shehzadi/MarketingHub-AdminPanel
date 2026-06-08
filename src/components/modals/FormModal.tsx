'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface FormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  className = '',
}: FormModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
     
              <DialogContent className="!w-[500px] !max-w-[50vw] rounded-2xl border border-slate-200 bg-white shadow-lg">

        <div className="overflow-hidden rounded-2xl">
          <div className="border-b border-slate-100 bg-gradient-to-r from-orange-50 via-white to-white px-6 py-5">
            <DialogHeader className="space-y-2 text-left">
              <DialogTitle className="text-xl font-bold text-slate-900">
                {title}
              </DialogTitle>

              {description && (
                <DialogDescription className="text-sm leading-6 text-slate-600">
                  {description}
                </DialogDescription>
              )}
            </DialogHeader>
          </div>

          <div className="max-h-[75vh] overflow-y-auto px-6 py-6">
            {children}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}