'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, LogOut, Settings } from 'lucide-react';

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="md:ml-64 border-b border-slate-700 bg-slate-800">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          {onMenuClick && (
            <button onClick={onMenuClick} className="md:hidden text-slate-400 hover:text-slate-300">
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="hidden md:flex relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full bg-slate-700 hover:bg-slate-600">
                <div className="w-full h-full flex items-center justify-center text-sm font-medium text-white">
                  {user?.name?.charAt(0) || 'A'}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700">
              <DropdownMenuLabel className="text-slate-300">
                <div className="font-medium">{user?.name}</div>
                <div className="text-xs text-slate-500">{user?.email}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem className="text-slate-300 focus:bg-slate-700 focus:text-slate-100 cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-slate-300 focus:bg-slate-700 focus:text-slate-100 cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
