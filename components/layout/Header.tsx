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
import { Menu, LogOut, Settings, Bell, ShieldCheck, ChevronDown } from 'lucide-react';

type HeaderProps = {
  onMenuClick?: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const initials =
    user?.name
      ?.split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'SA';

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-white/90 backdrop-blur-xl">
      <div className="flex min-h-[76px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 sm:gap-4">
          {onMenuClick && (
            <button
              type="button"
              onClick={onMenuClick}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-[#242C2F] shadow-sm transition hover:bg-[#FFF4F1] hover:text-[#DE5A3F] md:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          {/* <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#DE5A3F] to-[#c94d34] text-white shadow-[0_10px_30px_rgba(222,90,63,0.28)]">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#DE5A3F]">
                Marketing Hub
              </span>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-semibold text-[#242C2F] sm:text-lg">
                  Super Admin
                </h1>
                <span className="hidden rounded-full bg-[#FFF2EE] px-2.5 py-1 text-[11px] font-medium text-[#DE5A3F] sm:inline-flex">
                  Control Panel
                </span>
              </div>
            </div>
          </div> */}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 rounded-xl border border-border bg-white text-[#242C2F] shadow-sm transition hover:bg-[#FFF4F1] hover:text-[#DE5A3F]"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#DE5A3F]" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-3 rounded-2xl border border-border bg-white px-2.5 py-2 shadow-sm transition hover:border-[#DE5A3F]/30 hover:bg-[#FFF8F6]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#DE5A3F] to-[#c94d34] text-sm font-semibold text-white shadow-sm">
                  {initials}
                </div>

                <div className="hidden min-w-0 text-left sm:block">
                  <p className="truncate text-sm font-semibold text-[#242C2F]">
                    {user?.name || 'Super Admin'}
                  </p>
                  <p className="truncate text-xs text-[#6B7280]">
                    {user?.email || 'admin@example.com'}
                  </p>
                </div>

                <ChevronDown className="hidden h-4 w-4 text-[#6B7280] sm:block" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-64 rounded-2xl border border-border bg-white p-2 shadow-xl"
            >
              <DropdownMenuLabel className="px-2 py-2">
                <div className="font-semibold text-[#242C2F]">
                  {user?.name || 'Super Admin'}
                </div>
                <div className="text-xs font-normal text-[#6B7280]">
                  {user?.email || 'admin@example.com'}
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => router.push('/settings')}
                className="cursor-pointer rounded-xl text-[#242C2F] focus:bg-[#FFF4F1] focus:text-[#DE5A3F]"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer rounded-xl text-[#242C2F] focus:bg-[#FFF4F1] focus:text-[#DE5A3F]"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}