'use client';

import { useState, useEffect } from 'react';
import { Brand } from '@/lib/types';
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

interface EditBrandModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brand: Brand | null;
  onSubmit: (id: string, data: Partial<Brand>) => void;
}

export function EditBrandModal({
  open,
  onOpenChange,
  brand,
  onSubmit,
}: EditBrandModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Brand>>({});

  useEffect(() => {
    if (brand) {
      setFormData({
        name: brand.name,
        website: brand.website,
        ownerEmail: brand.ownerEmail,
        plan: brand.plan,
        visibility: brand.visibility,
      });
    }
  }, [brand]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand) return;
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSubmit(brand.id, formData);
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!brand) return null;

  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Brand"
      description={`Updating ${brand.name}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="edit-brand-name" className="text-slate-700">
            Brand Name
          </Label>
          <Input
            id="edit-brand-name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border-slate-200 bg-white text-slate-900 focus:border-orange-600 focus:ring-orange-600"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-website" className="text-slate-700">
            Website
          </Label>
          <Input
            id="edit-website"
            value={formData.website || ''}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="border-slate-200 bg-white text-slate-900 focus:border-orange-600 focus:ring-orange-600"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-owner-email" className="text-slate-700">
            Owner Email
          </Label>
          <Input
            id="edit-owner-email"
            type="email"
            value={formData.ownerEmail || ''}
            onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
            className="border-slate-200 bg-white text-slate-900 focus:border-orange-600 focus:ring-orange-600"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-plan" className="text-slate-700">
            Plan
          </Label>
          <Select value={formData.plan || 'starter'} onValueChange={(value: any) => setFormData({ ...formData, plan: value })}>
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
          <Label htmlFor="edit-visibility" className="text-slate-700">
            Visibility
          </Label>
          <Select value={formData.visibility || 'public'} onValueChange={(value: any) => setFormData({ ...formData, visibility: value })}>
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
            disabled={isLoading}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </FormModal>
  );
}
