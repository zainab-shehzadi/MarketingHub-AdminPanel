"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SIDEBAR_ROUTES, FOOTER_LINKS } from "@/lib/constants";
import * as Icons from "lucide-react";
import { LogOut, X } from "lucide-react";
import { ConfirmationDialog } from "@/components/modals/ConfirmationDialog";
import { useAuthStore } from "@/store/auth.store";

type SidebarProps = {
  open?: boolean;
  onClose?: () => void;
};

export function Sidebar({ open = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogoutClick = () => {
    onClose?.();
    setLogoutDialogOpen(true);
  }


  const handleConfirmLogout = () => {
    setLogoutDialogOpen(false);
    logout();

    router.push("/login");
  };

  const SidebarContent = (
    <aside className="flex h-full w-72  flex-col border-r border-slate-200 bg-white shadow-lg">
      <div className="border-b border-slate-200 bg-white px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="group flex items-center transition-transform duration-200 hover:scale-[1.01]"
          >
            <div className="flex min-h-[52px] w-[210px] items-center rounded-2xl bg-gradient-to-br from-[#242C2F] via-[#1F292C] to-[#111827] px-4 shadow-[0_10px_24px_rgba(15,23,42,0.18)] ring-1 ring-white/10">
              <img
                src="/images/logo/logo.svg"
                alt="FetchFocus logo"
                className="h-9 w-auto object-contain"
              />
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
        <div className="mb-4 px-3 py-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Menu
          </p>
        </div>

        {SIDEBAR_ROUTES.map((route) => {
          const IconComponent = (Icons as any)[route.icon];
          const isActive =
            pathname === route.href || pathname.startsWith(`${route.href}/`);

          return (
            <Link key={route.href} href={route.href} onClick={onClose}>
              <div
                className={`group flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${isActive
                  ? "border-l-4 border-orange-600 bg-gradient-to-r from-orange-50 to-orange-100 text-orange-600 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
              >
                {IconComponent && (
                  <IconComponent
                    className={`h-5 w-5 ${isActive
                      ? "text-orange-600"
                      : "text-slate-400 group-hover:text-slate-700"
                      }`}
                  />
                )}

                <span
                  className={`text-sm font-medium ${isActive
                    ? "text-orange-600"
                    : "text-slate-700 group-hover:text-slate-900"
                    }`}
                >
                  {route.label}
                </span>

                {isActive && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-orange-600" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="px-3 py-4">
        <p className="mb-3 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Resources
        </p>

        <div className="space-y-2">
          {FOOTER_LINKS.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link key={link.href} href={link.href} onClick={onClose}>
                <div
                  className={`group flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${isActive
                    ? "border-l-4 border-orange-600 bg-gradient-to-r from-orange-50 to-orange-100 text-orange-600 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  <div
                    className={`h-2 w-2 rounded-full ${isActive
                      ? "bg-orange-600"
                      : "bg-slate-400 group-hover:bg-slate-700"
                      }`}
                  />

                  <span
                    className={`text-sm font-medium ${isActive
                      ? "text-orange-600"
                      : "text-slate-700 group-hover:text-slate-900"
                      }`}
                  >
                    {link.label}
                  </span>

                  {isActive && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-orange-600" />
                  )}
                </div>
              </Link>
            );
          })}

          <button
            type="button"
            onClick={handleLogoutClick}
            className="group flex w-full cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:z-50 lg:block lg:h-screen">
        {SidebarContent}
      </div>

      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"
          }`}
      >
        <div
          onClick={onClose}
          className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"
            }`}
        />

        <div
          className={`relative h-full w-72 max-w-[85vw] transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {SidebarContent}
        </div>
      </div>

      <ConfirmationDialog
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
        title="Logout"
        description="Are you sure you want to logout from your account?"
        actionLabel="Logout"
        cancelLabel="Cancel"
        isDangerous
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}