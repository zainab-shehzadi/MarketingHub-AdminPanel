'use client';

import { useState } from 'react';
import type { PlanName } from '@/lib/types';
import { FormModal } from '@/components/modals/FormModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddPlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PlanFormData) => void;
}

export interface PlanFormData {
  name: PlanName;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  status: 'available' | 'deprecated';
}

const initialFormData: PlanFormData = {
  name: 'starter',
  monthlyPrice: 29,
  yearlyPrice: 290,
  features: [],
  status: 'available',
};

export function AddPlanModal({
  open,
  onOpenChange,
  onSubmit,
}: AddPlanModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [featuresInput, setFeaturesInput] = useState('');
  const [formData, setFormData] = useState<PlanFormData>(initialFormData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const payload: PlanFormData = {
        ...formData,
        features: featuresInput
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
      };

      await new Promise((resolve) => setTimeout(resolve, 500));

      onSubmit(payload);
      setFormData(initialFormData);
      setFeaturesInput('');
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title="Add New Plan"
      description="Create a new pricing plan"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="plan-name" className="text-slate-700">
            Plan Name
          </Label>

          <select
            id="plan-name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value as PlanName,
              })
            }
            className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900"
            required
          >
            <option value="free">Free</option>
            <option value="starter">Starter</option>
            <option value="professional">Professional</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="monthly-price" className="text-slate-700">
              Monthly Price ($)
            </Label>

            <Input
              id="monthly-price"
              type="number"
              min="0"
              step="0.01"
              value={formData.monthlyPrice}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  monthlyPrice: Number(e.target.value),
                })
              }
              className="border-slate-200 bg-white text-slate-900"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="yearly-price" className="text-slate-700">
              Yearly Price ($)
            </Label>

            <Input
              id="yearly-price"
              type="number"
              min="0"
              step="0.01"
              value={formData.yearlyPrice}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  yearlyPrice: Number(e.target.value),
                })
              }
              className="border-slate-200 bg-white text-slate-900"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="features" className="text-slate-700">
            Features
          </Label>

          <Input
            id="features"
            placeholder="Up to 3 brands, 5 team members, Basic analytics"
            value={featuresInput}
            onChange={(e) => setFeaturesInput(e.target.value)}
            className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="plan-status" className="text-slate-700">
            Status
          </Label>

          <select
            id="plan-status"
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value as PlanFormData['status'],
              })
            }
            className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900"
            required
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
            className="border-slate-700 text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
            className="bg-orange-600 text-white hover:bg-orange-700"
          >
            {isLoading ? 'Creating...' : 'Create Plan'}
          </Button>
        </div>
      </form>
    </FormModal>
  );
}