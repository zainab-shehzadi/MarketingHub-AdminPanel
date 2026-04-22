'use client';

import { useMemo, useState } from 'react';
import { Brand } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type AgencyStatus = 'active' | 'inactive' | 'suspended';

interface AddAgencyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brands: Brand[];
  onSubmit: (payload: {
    name: string;
    description: string;
    status: AgencyStatus;
    brandIds: string[];
  }) => void;
}

export function AddAgencyModal({
  open,
  onOpenChange,
  brands,
  onSubmit,
}: AddAgencyModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<AgencyStatus>('active');
  const [selectedBrandIds, setSelectedBrandIds] = useState<string[]>([]);
  const [brandsPopoverOpen, setBrandsPopoverOpen] = useState(false);

  const selectedBrands = useMemo(
    () => brands.filter((brand) => selectedBrandIds.includes(brand.id)),
    [brands, selectedBrandIds],
  );

  const toggleBrand = (brandId: string) => {
    setSelectedBrandIds((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId],
    );
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setStatus('active');
    setSelectedBrandIds([]);
  };

  const handleSubmit = () => {
    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      status,
      brandIds: selectedBrandIds,
    });

    resetForm();
    onOpenChange(false);
  };

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) resetForm();
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[640px] rounded-2xl border-slate-200 p-0 overflow-hidden">
        <DialogHeader className="border-b border-slate-200 bg-gradient-to-r from-[#FFF7F4] to-white px-6 py-5">
          <DialogTitle className="text-xl font-semibold text-slate-900">
            Add Agency
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            Create a new agency and assign one or more existing brands to it.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 px-6 py-5">
          <div className="space-y-2">
            <Label htmlFor="agency-name">Agency Name</Label>
            <Input
              id="agency-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter agency name"
              className="h-11 rounded-xl border-slate-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agency-description">Description</Label>
            <Textarea
              id="agency-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short description"
              className="min-h-[110px] rounded-xl border-slate-200"
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {(['active', 'inactive', 'suspended'] as AgencyStatus[]).map((item) => {
                const isActive = status === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setStatus(item)}
                    className={cn(
                      'rounded-xl border px-4 py-3 text-sm font-medium capitalize transition',
                      isActive
                        ? 'border-[#DE5A3F] bg-[#FFF4F1] text-[#DE5A3F]'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300',
                    )}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Assign Brands</Label>

            <Popover open={brandsPopoverOpen} onOpenChange={setBrandsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 w-full justify-between rounded-xl border-slate-200 font-normal text-slate-700"
                >
                  {selectedBrandIds.length > 0
                    ? `${selectedBrandIds.length} brand${selectedBrandIds.length > 1 ? 's' : ''} selected`
                    : 'Select brands'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search brands..." />
                  <CommandEmpty>No brand found.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-auto">
                    {brands.map((brand) => {
                      const checked = selectedBrandIds.includes(brand.id);

                      return (
                        <CommandItem
                          key={brand.id}
                          value={`${brand.name} ${brand.ownerEmail} ${brand.website}`}
                          onSelect={() => toggleBrand(brand.id)}
                          className="flex items-center justify-between"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-slate-900">
                              {brand.name}
                            </p>
                            <p className="truncate text-xs text-slate-500">
                              {brand.ownerEmail}
                            </p>
                          </div>

                          <Check
                            className={cn(
                              'ml-3 h-4 w-4',
                              checked ? 'opacity-100 text-[#DE5A3F]' : 'opacity-0',
                            )}
                          />
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            {selectedBrands.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedBrands.map((brand) => (
                  <Badge
                    key={brand.id}
                    variant="secondary"
                    className="rounded-full bg-[#FFF4F1] px-3 py-1 text-[#DE5A3F]"
                  >
                    {brand.name}
                    <button
                      type="button"
                      onClick={() => toggleBrand(brand.id)}
                      className="ml-2 inline-flex"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="border-t border-slate-200 px-6 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleClose(false)}
            className="rounded-xl"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="rounded-xl bg-[#DE5A3F] text-white hover:bg-[#c94d34]"
          >
            Create Agency
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}