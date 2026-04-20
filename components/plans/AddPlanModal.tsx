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

interface AddPlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PlanFormData) => void;
}

export interface PlanFormData {
  name: string;
  description: string;
  price: number;
  maxUsers: number;
  maxBrands: number;
}

export function AddPlanModal({ open, onOpenChange, onSubmit }: AddPlanModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<PlanFormData>({
    name: '',
    description: '',
    price: 0,
    maxUsers: 1,
    maxBrands: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSubmit(formData);
      setFormData({
        name: '',
        description: '',
        price: 0,
        maxUsers: 1,
        maxBrands: 1,
      });
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
          <Label htmlFor="plan-name" className="text-slate-300">
            Plan Name
          </Label>
          <Input
            id="plan-name"
            placeholder="e.g., Professional"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="plan-desc" className="text-slate-300">
            Description
          </Label>
          <Input
            id="plan-desc"
            placeholder="Plan description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="plan-price" className="text-slate-300">
              Monthly Price ($)
            </Label>
            <Input
              id="plan-price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="border-slate-700 bg-slate-800 text-slate-100"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-users" className="text-slate-300">
              Max Users
            </Label>
            <Input
              id="max-users"
              type="number"
              min="1"
              value={formData.maxUsers}
              onChange={(e) => setFormData({ ...formData, maxUsers: parseInt(e.target.value, 10) })}
              className="border-slate-700 bg-slate-800 text-slate-100"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="max-brands" className="text-slate-300">
            Max Brands
          </Label>
          <Input
            id="max-brands"
            type="number"
            min="1"
            value={formData.maxBrands}
            onChange={(e) => setFormData({ ...formData, maxBrands: parseInt(e.target.value, 10) })}
            className="border-slate-700 bg-slate-800 text-slate-100"
            required
          />
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
            disabled={isLoading || !formData.name}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? 'Creating...' : 'Create Plan'}
          </Button>
        </div>
      </form>
    </FormModal>
  );
}
