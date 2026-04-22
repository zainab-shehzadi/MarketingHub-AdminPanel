'use client';

import type { Plan } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PlanFeaturesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: Plan | null;
}

export function PlanFeaturesModal({
  open,
  onOpenChange,
  plan,
}: PlanFeaturesModalProps) {
  if (!plan) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[560px] rounded-2xl border-slate-200 bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-900 capitalize">
            {plan.name} Plan Features
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Full feature list included in this subscription plan.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-3">
          {plan.features.map((feature, index) => (
            <div
              key={`${feature}-${index}`}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
            >
              {feature}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}