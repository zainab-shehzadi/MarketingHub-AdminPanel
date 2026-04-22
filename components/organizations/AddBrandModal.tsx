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

interface AddBrandModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: BrandFormData) => void;
}

export interface BrandFormData {
  name: string;
  website: string;
  ownerEmail: string;
  plan: 'starter' | 'professional' | 'enterprise';
  visibility: 'public' | 'private';
}

export function AddBrandModal({ open, onOpenChange, onSubmit }: AddBrandModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<BrandFormData>({
    name: '',
    website: '',
    ownerEmail: '',
    plan: 'starter',
    visibility: 'public',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSubmit(formData);
      setFormData({ name: '', website: '', ownerEmail: '', plan: 'starter', visibility: 'public' });
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title="Add New Brand"
      description="Create a new brand in the system"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="brand-name" className="text-slate-700">
            Brand Name
          </Label>
          <Input
            id="brand-name"
            placeholder="e.g., My Brand"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-500 focus:border-orange-600 focus:ring-orange-600"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website" className="text-slate-700">
            Website
          </Label>
          <Input
            id="website"
            placeholder="e.g., example.com"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-500 focus:border-orange-600 focus:ring-orange-600"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="owner-email" className="text-slate-700">
            Owner Email
          </Label>
          <Input
            id="owner-email"
            type="email"
            placeholder="owner@example.com"
            value={formData.ownerEmail}
            onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
            className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-500 focus:border-orange-600 focus:ring-orange-600"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="plan" className="text-slate-700">
            Plan
          </Label>
          <Select value={formData.plan} onValueChange={(value: any) => setFormData({ ...formData, plan: value })}>
            <SelectTrigger className="border-slate-200 bg-white text-slate-900 focus:border-orange-600 focus:ring-orange-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-slate-200 bg-white">
              <SelectItem value="starter" className="text-slate-900">
                Starter
              </SelectItem>
              <SelectItem value="professional" className="text-slate-900">
                Professional
              </SelectItem>
              <SelectItem value="enterprise" className="text-slate-900">
                Enterprise
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="visibility" className="text-slate-700">
            Visibility
          </Label>
          <Select value={formData.visibility} onValueChange={(value: any) => setFormData({ ...formData, visibility: value })}>
            <SelectTrigger className="border-slate-200 bg-white text-slate-900 focus:border-orange-600 focus:ring-orange-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-slate-200 bg-white">
              <SelectItem value="public" className="text-slate-900">
                Public
              </SelectItem>
              <SelectItem value="private" className="text-slate-900">
                Private
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-200 text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading || !formData.name}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            {isLoading ? 'Creating...' : 'Create Brand'}
          </Button>
        </div>
      </form>
    </FormModal>
  );
}
