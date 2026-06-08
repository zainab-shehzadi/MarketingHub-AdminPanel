'use client';

import type { ReactNode } from 'react';
import {
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Copy,
  Ban,
  RotateCcw,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface ActionItem {
  label: string;
  icon: 'view' | 'edit' | 'delete' | 'copy' | 'ban' | 'unban' | 'custom';
  onClick: () => void;
  isDangerous?: boolean;
  disabled?: boolean;
  iconComponent?: ReactNode;
}

interface ActionDropdownProps {
  actions: ActionItem[];
}

export function ActionDropdown({ actions }: ActionDropdownProps) {
  const getIcon = (type: ActionItem['icon']) => {
    switch (type) {
      case 'view':
        return <Eye className="h-4 w-4" />;
      case 'edit':
        return <Pencil className="h-4 w-4" />;
      case 'delete':
        return <Trash2 className="h-4 w-4" />;
      case 'copy':
        return <Copy className="h-4 w-4" />;
      case 'ban':
        return <Ban className="h-4 w-4" />;
      case 'unban':
        return <RotateCcw className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border shadow-none ring-0 transition-all bg-white text-slate-600 shadow-sm transition hover:border-[#DE5A3F]/30 hover:bg-[#FFF8F6] hover:text-[#DE5A3F]"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open actions</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="z-50 w-56 rounded-2xl border border-slate-200  shadow-none ring-0 transition-all bg-white p-2 shadow-xl"
      >
        {actions.map((action, index) => (
          <div key={`${action.label}-${index}`}>
            <DropdownMenuItem
              onClick={action.onClick}
              disabled={action.disabled}
              className={`cursor-pointer rounded-xl ${
                action.isDangerous
                  ? 'text-red-600 focus:bg-red-50 focus:text-red-700'
                  : 'text-[#242C2F] focus:bg-[#FFF4F1] focus:text-[#DE5A3F]'
              }`}
            >
              {action.iconComponent || getIcon(action.icon)}
              <span className="ml-2">{action.label}</span>
            </DropdownMenuItem>

            {index < actions.length - 1 && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}