"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Hash,
  Mail,
  ShieldCheck,
  User2,
  Users,
  CircleAlert,
} from "lucide-react";

import type { AdminUser, UserRole } from "@/types/user";
import { useUserStore } from "@/store/user.store";
import { SummaryItem } from "./SummaryItem";
import { DetailCard } from "./DetailCard";
import { ConfirmationDialog } from "../modals/ConfirmationDialog";

type UserDetailPageProps = {
  userId: string;
};

function formatDate(value?: string | Date | null) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getRoleBadge(role?: UserRole | string) {
  switch (role?.toLowerCase()) {
    case "admin":
      return "border-red-200 bg-red-50 text-red-700";
    case "employee":
      return "border-blue-200 bg-blue-50 text-blue-700";
    case "agency":
      return "border-purple-200 bg-purple-50 text-purple-700";
    case "brand":
      return "border-orange-200 bg-orange-50 text-orange-700";
    case "user":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    default:
      return "border-slate-200 bg-slate-50 text-slate-700";
  }
}

function getInitials(name?: string, email?: string) {
  const fallback = email?.charAt(0) || "U";

  if (!name) return fallback.toUpperCase();

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

function EmptyValue() {
  return <span className="text-slate-400">Not available</span>;
}

export function UserDetailPage({ userId }: UserDetailPageProps) {
  const router = useRouter();

  const getUserById = useUserStore((state) => state.getUserById);
  const [isLoading, setIsLoading] = useState(false);

  const user = useMemo(() => {
    return getUserById(userId);
  }, [getUserById, userId]);

  const handleBack = () => {
    router.push("/users");
  };


  const blockUnblockUser = useUserStore((state) => state.blockUnblockUser);
  const isActionLoading = useUserStore((state) => state.isActionLoading);

  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleOpenBlockDialog = (userData: AdminUser) => {
    setSelectedUser(userData);
    setConfirmOpen(true);
  };

  const handleBlockUnblockUser = async () => {
    if (!selectedUser) return;

    const nextBlockedStatus = !Boolean(selectedUser.blocked);

    const success = await blockUnblockUser(selectedUser._id, nextBlockedStatus);

    if (success) {
      setConfirmOpen(false);
      setSelectedUser(null);
    }
  };


  if (!user) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <button
          type="button"
          onClick={handleBack}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-amber-700 transition hover:text-amber-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to users
        </button>

        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <CircleAlert className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-amber-900">
              User detail not available
            </h2>
          </div>
        </div>
      </div>
    );
  }

  const displayName = user.name || "User";
  const displayEmail = user.email || "";
  const roleBadgeClass = getRoleBadge(user.role);

  return (
    <>
      <div className="space-y-6">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to users
        </button>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-gradient-to-br from-[#DE5A3F]/10 via-white to-slate-50 px-5 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-[#DE5A3F] text-2xl font-bold text-white shadow-sm">
                  {getInitials(displayName, displayEmail)}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="break-words text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                      {displayName}
                    </h1>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${roleBadgeClass}`}
                    >
                      <BadgeCheck className="h-3.5 w-3.5" />
                      {user.role}
                    </span>

                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${user.blocked
                          ? "border-red-200 bg-red-50 text-red-700"
                          : "border-emerald-200 bg-emerald-50 text-emerald-700"
                        }`}
                    >
                      {user.blocked ? "Blocked" : "Active"}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:flex-wrap sm:items-center">
                    <span className="inline-flex min-w-0 items-center gap-2">
                      <Mail className="h-4 w-4 shrink-0" />
                      <span className="break-all">
                        {displayEmail || "No email available"}
                      </span>
                    </span>

                    <span className="hidden text-slate-300 sm:inline">•</span>

                    <span className="inline-flex items-center gap-2">
                      <Hash className="h-4 w-4 shrink-0" />
                      <span className="break-all">{user._id}</span>
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize ${roleBadgeClass}`}
                    >
                      {user.role}
                    </span>

                    {user.organizationType ? (
                      <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold capitalize text-slate-700">
                        {user.organizationType}
                      </span>
                    ) : null}

                    {user.employeeDesignation ? (
                      <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold capitalize text-slate-700">
                        {user.employeeDesignation}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenBlockDialog(user)}
                disabled={isActionLoading}
                className={`inline-flex h-11 w-full items-center justify-center rounded-xl px-5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto ${user.blocked
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-red-600 hover:bg-red-700"
                  }`}
              >
                {user.blocked ? "Unblock User" : "Block User"}
              </button>
            </div>
          </div>

          <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
            <SummaryItem
              label="Role"
              value={user.role}
              icon={<ShieldCheck className="h-5 w-5" />}
            />

            <SummaryItem
              label="Organization"
              value={user.organizationType || "N/A"}
              icon={<Building2 className="h-5 w-5" />}
            />

            <SummaryItem
              label="Designation"
              value={user.employeeDesignation || "N/A"}
              icon={<BriefcaseBusiness className="h-5 w-5" />}
            />

            <SummaryItem
              label="Created"
              value={formatDate(user.createdAt)}
              icon={<CalendarDays className="h-5 w-5" />}
            />
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-2">
          <DetailCard
            title="Profile Information"
            description="Basic account and contact details."
            items={[
              {
                icon: <User2 className="h-4 w-4" />,
                label: "Full Name",
                value: displayName || <EmptyValue />,
              },
              {
                icon: <Mail className="h-4 w-4" />,
                label: "Email Address",
                value: displayEmail ? (
                  <span className="break-all normal-case">{displayEmail}</span>
                ) : (
                  <EmptyValue />
                ),
              },
              {
                icon: <ShieldCheck className="h-4 w-4" />,
                label: "Role",
                value: (
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize ${roleBadgeClass}`}
                  >
                    {user.role}
                  </span>
                ),
              },
              {
                icon: <Hash className="h-4 w-4" />,
                label: "User ID",
                value: <span className="break-all normal-case">{user._id}</span>,
              },
            ]}
          />

          <DetailCard
            title="Organization Information"
            description="User organization and employee details."
            items={[
              {
                icon: <Building2 className="h-4 w-4" />,
                label: "Organization Type",
                value: user.organizationType || <EmptyValue />,
              },
              {
                icon: <BriefcaseBusiness className="h-4 w-4" />,
                label: "Employee Designation",
                value: user.employeeDesignation || <EmptyValue />,
              },
              {
                icon: <Users className="h-4 w-4" />,
                label: "Account Type",
                value: user.role || <EmptyValue />,
              },
            ]}
          />
        </div>
      </div>

      <ConfirmationDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={selectedUser?.blocked ? "Unblock User" : "Block User"}
        description={
          selectedUser?.blocked
            ? `Are you sure you want to unblock ${selectedUser?.name || "this user"
            }? This user will be able to access the platform again.`
            : `Are you sure you want to block ${selectedUser?.name || "this user"
            }? This user will no longer be able to access the platform.`
        }
        actionLabel={selectedUser?.blocked ? "Unblock User" : "Block User"}
        cancelLabel="Cancel"
        isDangerous={!selectedUser?.blocked}
        isLoading={isActionLoading}
        onConfirm={handleBlockUnblockUser}
      />
    </>
  );
}