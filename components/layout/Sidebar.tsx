'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIDEBAR_ROUTES } from '@/lib/constants';
import { useAuth } from '@/lib/auth-context';
import * as Icons from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const visibleRoutes = SIDEBAR_ROUTES.filter((route) => route.roles.includes(user?.role || 'support'));

  return (
    <aside className="hidden md:fixed md:left-0 md:top-0 md:h-screen md:w-64 md:border-r md:border-slate-700 md:bg-slate-800 md:flex md:flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            MH
          </div>
          <span className="font-bold text-white">Marketing Hub</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {visibleRoutes.map((route) => {
          const IconComponent = (Icons as any)[route.icon];
          const isActive = pathname.startsWith(route.href);
          return (
            <Link key={route.href} href={route.href}>
              <div
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/50'
                    : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-300'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="text-sm font-medium">{route.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-slate-700">
        <div className="text-xs text-slate-400">
          <p className="font-medium text-slate-300 mb-1">{user?.name}</p>
          <p className="truncate">{user?.email}</p>
        </div>
      </div>
    </aside>
  );
}
