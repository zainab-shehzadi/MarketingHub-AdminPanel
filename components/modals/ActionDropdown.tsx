'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, Edit, Trash2, Copy } from 'lucide-react';

export interface ActionItem {
  label: string;
  icon: 'view' | 'edit' | 'delete' | 'copy' | 'custom';
  onClick: () => void;
  isDangerous?: boolean;
  disabled?: boolean;
  iconComponent?: React.ReactNode;
}

interface ActionDropdownProps {
  actions: ActionItem[];
}

export function ActionDropdown({ actions }: ActionDropdownProps) {
  const getIcon = (type: ActionItem['icon']) => {
    switch (type) {
      case 'view':
        return <Eye className="w-4 h-4" />;
      case 'edit':
        return <Edit className="w-4 h-4" />;
      case 'delete':
        return <Trash2 className="w-4 h-4" />;
      case 'copy':
        return <Copy className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-slate-700"
        >
          <MoreHorizontal className="w-4 h-4 text-slate-400" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 border-slate-700 bg-slate-800">
        {actions.map((action, index) => (
          <div key={index}>
            <DropdownMenuItem
              onClick={action.onClick}
              disabled={action.disabled}
              className={`cursor-pointer ${
                action.isDangerous
                  ? 'text-red-400 focus:bg-red-900/50 focus:text-red-300'
                  : 'text-slate-300 focus:bg-slate-700 focus:text-slate-100'
              }`}
            >
              {action.iconComponent || getIcon(action.icon)}
              <span className="ml-2">{action.label}</span>
            </DropdownMenuItem>
            {index < actions.length - 1 && (
              <DropdownMenuSeparator className="bg-slate-700" />
            )}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
