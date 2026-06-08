import { PLAN_DETAILS } from '@/lib/constants';
import { PlanName } from '@/lib/types';

interface PlanBadgeProps {
  plan: PlanName;
  variant?: 'badge' | 'text';
}

export function PlanBadge({ plan, variant = 'badge' }: PlanBadgeProps) {
  const details = PLAN_DETAILS[plan];

  if (variant === 'text') {
    return <span className="text-sm font-medium">{details.name}</span>;
  }

  return <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${details.color}`}>{details.name}</span>;
}
