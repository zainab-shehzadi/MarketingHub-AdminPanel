'use client';

import { cn } from '@/lib/utils';
import type { BrandStatus } from '@/lib/types';

interface BanToggleProps {
  status: BrandStatus;
  onToggle: () => void;
  disabled?: boolean;
}

export function BanToggle({ status, onToggle, disabled }: BanToggleProps) {
  const isBanned = status === 'banned';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isBanned}
      onClick={onToggle}
      disabled={disabled}
      className={cn(
        'group inline-flex items-center gap-3',
        
      )}
    >
      <span
        className={cn(
          'relative flex h-6 w-11 items-center rounded-full transition-colors duration-200',
          isBanned ? 'bg-red-500' : 'bg-emerald-500'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200',
            isBanned ? 'translate-x-5' : 'translate-x-0.5'
          )}
        />
      </span>

    </button>
  );
}