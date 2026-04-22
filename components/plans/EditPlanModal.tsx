'use client';

import { useEffect, useState } from 'react';
import { FormModal } from '@/components/modals/FormModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Plan } from '@/lib/types';
import type { PlanFormData } from './AddPlanModal';

type PlanName = 'starter' | 'professional' | 'enterprise';

interface EditPlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: Plan | null;
  onSubmit: (id: string, data: PlanFormData) => void;
}

export function EditPlanModal({
  open,
  onOpenChange,
  plan,
  onSubmit,
}: EditPlanModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [featuresInput, setFeaturesInput] = useState('');

  const [formData, setFormData] = useState<PlanFormData>({
    name: 'starter',
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [],
    status: 'available',
  });

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name as PlanName,
        monthlyPrice: plan.monthlyPrice,
        yearlyPrice: plan.yearlyPrice,
        features: plan.features,
        status: plan.status,
      });
      setFeaturesInput(plan.features.join(', '));
    }
  }, [plan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plan) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const features = featuresInput
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

      onSubmit(plan.id, {
        ...formData,
        features,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Plan"
      description="Update plan pricing, features, and status."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="edit-plan-name" className="text-slate-700">
            Plan Name
          </Label>
          <select
            id="edit-plan-name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value as PlanName })
            }
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none"
          >
            <option value="starter">Starter</option>
            <option value="professional">Professional</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="edit-monthly-price" className="text-slate-700">
              Monthly Price ($)
            </Label>
            <Input
              id="edit-monthly-price"
              type="number"
              min="0"
              step="0.01"
              value={formData.monthlyPrice}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  monthlyPrice: Number.parseFloat(e.target.value) || 0,
                })
              }
              className="border-slate-200 bg-white text-slate-900"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-yearly-price" className="text-slate-700">
              Yearly Price ($)
            </Label>
            <Input
              id="edit-yearly-price"
              type="number"
              min="0"
              step="0.01"
              value={formData.yearlyPrice}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  yearlyPrice: Number.parseFloat(e.target.value) || 0,
                })
              }
              className="border-slate-200 bg-white text-slate-900"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-plan-features" className="text-slate-700">
            Features
          </Label>
          <Input
            id="edit-plan-features"
            placeholder="Comma separated features"
            value={featuresInput}
            onChange={(e) => setFeaturesInput(e.target.value)}
            className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-plan-status" className="text-slate-700">
            Status
          </Label>
          <select
            id="edit-plan-status"
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value as 'available' | 'deprecated',
              })
            }
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none"
          >
            <option value="available">Available</option>
            <option value="deprecated">Deprecated</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isLoading || !plan}
            className="bg-orange-600 text-white hover:bg-orange-700"
          >
            {isLoading ? 'Updating...' : 'Update Plan'}
          </Button>
        </div>
      </form>
    </FormModal>
  );
}