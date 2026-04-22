'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIDEBAR_ROUTES, FOOTER_LINKS } from '@/lib/constants';
import { useAuth } from '@/lib/auth-context';
import * as Icons from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const visibleRoutes = SIDEBAR_ROUTES.filter((route) => route.roles.includes(user?.role || 'support'));

  return (
    <aside className="hidden md:fixed md:left-0 md:top-0 md:h-screen md:w-72 md:border-r md:border-slate-200 md:bg-white md:flex md:flex-col md:shadow-lg">
      {/* Header Section with Gradient */}
      <div className="px-6 py-8 border-b border-slate-200 bg-gradient-to-br from-orange-50 to-white">
        <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center text-white font-bold text-lg shadow-md">
            MH
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-lg ">Marketing Hub</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 mb-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Menu</p>
        </div>
        {visibleRoutes.map((route) => {
          const IconComponent = (Icons as any)[route.icon];
          const isActive = pathname.startsWith(route.href);
          return (
            <Link key={route.href} href={route.href}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-600 shadow-sm border-l-4 border-orange-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <IconComponent className={`w-5 h-5 transition-colors ${
                  isActive 
                    ? 'text-orange-600' 
                    : 'text-slate-400 group-hover:text-slate-700'
                }`} />
                <span className={`text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-orange-600'
                    : 'text-slate-700 group-hover:text-slate-900'
                }`}>
                  {route.label}
                </span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-orange-600"></div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Gradient Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

      {/* Footer Links */}
      <div className="px-3 py-4">
        <p className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Resources
        </p>
        <div className="space-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <div className="flex items-center gap-2 px-4 py-2 text-xs text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer group">
                <div className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-orange-600 transition-colors"></div>
                {link.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* User Profile Card */}
      <div className="px-3 py-4 border-t border-slate-200 bg-gradient-to-t from-slate-50 to-white">
        <div className="px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 hover:border-orange-200 hover:bg-orange-50 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-slate-900 truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate">{user?.role}</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 break-words">{user?.email}</p>
        </div>
      </div>
    </aside>
  );
}
