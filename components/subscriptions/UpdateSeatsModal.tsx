'use client';

import { useState, useEffect } from 'react';
import { Subscription } from '@/lib/types';
import { FormModal } from '@/components/modals/FormModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface UpdateSeatsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription: Subscription | null;
  onSubmit: (subscriptionId: string, newSeats: number) => void;
}

export function UpdateSeatsModal({
  open,
  onOpenChange,
  subscription,
  onSubmit,
}: UpdateSeatsModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [seatsValue, setSeatsValue] = useState('');

  useEffect(() => {
    if (subscription) {
      setSeatsValue(subscription.seatsLimit.toString());
    }
  }, [subscription]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscription) return;
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSubmit(subscription.id, parseInt(seatsValue, 10));
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!subscription) return null;

  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title="Update Seat Limit"
      description={`Update seats for ${subscription.organizationName}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="seats" className="text-slate-300">
            New Seat Limit
          </Label>
          <Input
            id="seats"
            type="number"
            min="1"
            max="1000"
            value={seatsValue}
            onChange={(e) => setSeatsValue(e.target.value)}
            className="border-slate-700 bg-slate-800 text-slate-100"
            required
          />
          <p className="text-xs text-slate-400">
            Currently using {subscription.seatsUsed} seats
          </p>
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
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? 'Updating...' : 'Update Seats'}
          </Button>
        </div>
      </form>
    </FormModal>
  );
}
