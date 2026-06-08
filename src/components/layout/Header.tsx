"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Settings,
  X,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";

type HeaderProps = {
  onMenuClick?: () => void;
};

const notifications = [
  {
    id: 1,
    title: "New subscription created",
    description: "Digital Marketing Pro upgraded to Professional plan.",
    time: "2 min ago",
  },
  {
    id: 2,
    title: "User role updated",
    description: "Moderator role was assigned to a user.",
    time: "15 min ago",
  },
  {
    id: 3,
    title: "Agency added",
    description: "A new agency has been added successfully.",
    time: "1 hour ago",
  },
  {
    id: 4,
    title: "Plan deprecated",
    description: "Starter legacy plan was marked deprecated.",
    time: "3 hours ago",
  },
];

export function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const profileRef = useRef<HTMLDivElement | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);
const user = useAuthStore((state) => state.user);
const hydrateAuth = useAuthStore((state) => state.hydrateAuth);

useEffect(() => {
  hydrateAuth();
}, [hydrateAuth]);

const displayName = user?.name || 'Admin User';
const displayEmail = user?.email || 'No email available';
  const visibleNotifications = useMemo(
    () => (showAll ? notifications : notifications.slice(0, 3)),
    [showAll]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="flex min-h-[76px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#242C2F] shadow-sm transition hover:bg-[#FFF4F1] hover:text-[#DE5A3F] lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="ml-auto flex items-center gap-3">
        
          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setProfileOpen((prev) => !prev);
                setNotificationOpen(false);
              }}
              className="flex items-center gap-3 rounded-xl bg-white px-2.5 py-2 shadow-sm transition hover:bg-[#FFF8F6]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#DE5A3F] to-[#c94d34] text-sm font-semibold text-white shadow-sm">
                SA
              </div>

              <div className="hidden min-w-0 text-left sm:block">
                <p className="truncate text-sm font-semibold text-[#242C2F]">
                  {displayName}
                </p>
                <p className="truncate text-xs text-[#6B7280]">
                  {displayEmail}
                </p>
              </div>

              <ChevronDown className="hidden h-4 w-4 text-[#6B7280] sm:block" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full z-[999] mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                <div className="px-3 py-2">
                  <div className="font-semibold text-[#242C2F]">
                    {displayName}
                  </div>
                  <div className="text-xs text-[#6B7280]">
                    {displayEmail}
                  </div>
                </div>

                <div className="my-2 h-px bg-slate-100" />

               
                <div className="my-2 h-px bg-slate-100" />

                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}