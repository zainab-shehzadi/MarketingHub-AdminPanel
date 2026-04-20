import { STATUS_CONFIG } from '@/lib/constants';

interface StatusBadgeProps {
  status: keyof typeof STATUS_CONFIG;
  variant?: 'badge' | 'dot';
}

export function StatusBadge({ status, variant = 'badge' }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  if (variant === 'dot') {
    return (
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${config.dotColor}`} />
        <span className="text-sm">{config.label}</span>
      </div>
    );
  }

  return <span className={`px-2 py-1 rounded text-xs font-medium ${config.color}`}>{config.label}</span>;
}
