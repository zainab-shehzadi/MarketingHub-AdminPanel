import { BadgeCheck, Ban, CircleAlert } from 'lucide-react';

export function formatDate(value?: string | Date | null) {
  if (!value) return 'Not available';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Not available';
  }

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getStatusBadge(status?: string) {
  switch (status?.toLowerCase()) {
    case 'active':
      return {
        label: 'Active',
        className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
        icon: <BadgeCheck className="h-3.5 w-3.5" />,
      };

    case 'inactive':
      return {
        label: 'Inactive',
        className: 'border-slate-200 bg-slate-50 text-slate-700',
        icon: <CircleAlert className="h-3.5 w-3.5" />,
      };

    case 'suspended':
      return {
        label: 'Suspended',
        className: 'border-red-200 bg-red-50 text-red-700',
        icon: <Ban className="h-3.5 w-3.5" />,
      };

    default:
      return {
        label: status || 'Unknown',
        className: 'border-slate-200 bg-slate-50 text-slate-700',
        icon: <CircleAlert className="h-3.5 w-3.5" />,
      };
  }
}

export function getTypeBadge(type?: string) {
  switch (type?.toLowerCase()) {
    case 'brand':
      return 'border-blue-200 bg-blue-50 text-blue-700';

    case 'agency':
      return 'border-purple-200 bg-purple-50 text-purple-700';

    default:
      return 'border-slate-200 bg-slate-50 text-slate-700';
  }
}

export function getInitials(name?: string) {
  if (!name) return 'W';

  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();
}

export function EmptyValue() {
  return <span className="text-slate-400">Not available</span>;
}