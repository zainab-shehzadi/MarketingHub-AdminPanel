"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Layers,
  Package,
  ShieldCheck,
  User,
  Wallet,
  XCircle,
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { usePaymentStore } from "@/store/payment.store";

interface SubscriptionDetailPageProps {
  userId: string;
}

function formatDate(date?: string | null) {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "N/A";

  return parsedDate.toLocaleDateString();
}

function formatText(value?: string | null) {
  if (!value) return "N/A";

  return value.replaceAll("_", " ");
}

function formatCurrency(amount?: number) {
  if (typeof amount !== "number") return "$0";

  return `$${amount.toLocaleString()}`;
}

function formatBoolean(value?: boolean) {
  if (typeof value !== "boolean") return "N/A";

  return value ? "Yes" : "No";
}

function getStatusClasses(status?: string | null) {
  switch (status) {
    case "active":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "free":
      return "border-blue-200 bg-blue-50 text-blue-700";
    case "cancelled":
      return "border-red-200 bg-red-50 text-red-700";
    case "past_due":
    case "suspended":
      return "border-amber-200 bg-amber-50 text-amber-700";
    default:
      return "border-slate-200 bg-slate-50 text-slate-700";
  }
}

function StatusBadge({ status }: { status?: string | null }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getStatusClasses(
        status
      )}`}
    >
      {formatText(status)}
    </span>
  );
}

function InfoCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          {icon}
        </div>

        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      </div>

      <div className="space-y-3">{children}</div>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-right text-sm font-medium capitalize text-slate-900">
        {value}
      </span>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  helper,
}: {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  helper?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">{value}</h3>
          {helper ? <p className="mt-1 text-xs text-slate-500">{helper}</p> : null}
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          {icon}
        </div>
      </div>
    </div>
  );
}

function UsageBar({
  label,
  used = 0,
  total = 0,
}: {
  label: string;
  used?: number;
  total?: number;
}) {
  const percentage = total > 0 ? Math.min((used / total) * 100, 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">
          {used}/{total}
        </span>
      </div>

      <div className="h-2 rounded-full bg-slate-100">
        <div
          className="h-2 rounded-full bg-orange-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function SubscriptionDetailPage({ userId }: SubscriptionDetailPageProps) {
  const router = useRouter();

  const {
    subscriberDetail,
    subscriberHistory,
    getSubscriberHistory,
    isHistoryLoading,
    error,
    clearHistory,
  } = usePaymentStore();

  useEffect(() => {
    if (!userId) return;

    getSubscriberHistory(userId, {
      page: 1,
      limit: 10,
    });

    return () => {
      clearHistory();
    };
  }, [userId, getSubscriberHistory, clearHistory]);

  const user = subscriberDetail?.user;
  const subscription = subscriberDetail?.subscription;
  const billing = subscriberDetail?.billing;
  const plan = billing?.plan;
  const entitlements = billing?.entitlements;
  const limits = billing?.limits;
  const usage = billing?.usage;
  const paymentSummary = subscriberDetail?.paymentSummary;

  return (
    <div className="space-y-6">
      <Button
        type="button"
        variant="ghost"
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to subscriptions
      </Button>

      <PageHeader
        title="Subscription Detail"
        description="Complete billing, plan, usage, and payment overview"
      />

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {isHistoryLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center text-sm text-slate-500">
          Loading subscription detail...
        </div>
      ) : !subscriberDetail ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center text-sm text-slate-500">
          No subscription detail found.
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-slate-900 to-slate-700 p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-xl font-bold text-white ring-1 ring-white/20">
                    {user?.email?.charAt(0).toUpperCase() || "U"}
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {user?.email || "N/A"}
                    </h2>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium capitalize text-white ring-1 ring-white/20">
                        {formatText(user?.organizationType)}
                      </span>

                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium capitalize text-white ring-1 ring-white/20">
                        {formatText(user?.role)}
                      </span>

                      <StatusBadge status={user?.billingStatus} />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/20">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-200">
                    Current Plan
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    {plan?.name || "No Plan"}
                  </h3>
                  <p className="mt-1 text-sm text-slate-200">
                    {formatCurrency(
                      typeof plan?.price?.monthly === "number"
                        ? plan.price.monthly / 100
                        : 0
                    )}
                    /month
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Paid"
              value={formatCurrency(paymentSummary?.totalPaidFormatted)}
              icon={<Wallet className="h-5 w-5" />}
              helper="Lifetime successful amount"
            />

            <StatCard
              title="Total Payments"
              value={paymentSummary?.totalPayments ?? 0}
              icon={<CreditCard className="h-5 w-5" />}
              helper={`${paymentSummary?.succeededCount ?? 0} succeeded`}
            />

            <StatCard
              title="Workspaces"
              value={`${usage?.workspaces ?? 0}/${limits?.maxWorkspaces ?? 0}`}
              icon={<Layers className="h-5 w-5" />}
              helper="Used workspace limit"
            />

            <StatCard
              title="Projects"
              value={`${usage?.projects ?? 0}/${limits?.maxProjects ?? 0}`}
              icon={<Package className="h-5 w-5" />}
              helper="Used project limit"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <InfoCard title="User Information" icon={<User className="h-5 w-5" />}>
              <InfoRow label="Email" value={user?.email || "N/A"} />
              <InfoRow label="Role" value={formatText(user?.role)} />
              <InfoRow
                label="Organization Type"
                value={formatText(user?.organizationType)}
              />
              <InfoRow
                label="Billing Status"
                value={<StatusBadge status={user?.billingStatus} />}
              />
              <InfoRow label="Active" value={formatBoolean(user?.active)} />
              <InfoRow label="Created At" value={formatDate(user?.createdAt)} />
            </InfoCard>

            <InfoCard title="Plan Details" icon={<Package className="h-5 w-5" />}>
              <InfoRow label="Plan Name" value={plan?.name || "N/A"} />
              <InfoRow label="Plan Key" value={formatText(plan?.key)} />
              <InfoRow label="Audience" value={plan?.audience || "N/A"} />
              <InfoRow label="Free Plan" value={formatBoolean(plan?.isFree)} />
              <InfoRow
                label="Monthly Price"
                value={formatCurrency(
                  typeof plan?.price?.monthly === "number"
                    ? plan.price.monthly / 100
                    : 0
                )}
              />
              <InfoRow
                label="Extra Seat Price"
                value={formatCurrency(
                  typeof plan?.price?.extraSeatMonthly === "number"
                    ? plan.price.extraSeatMonthly / 100
                    : 0
                )}
              />
            </InfoCard>

            <InfoCard
              title="Subscription"
              icon={<CreditCard className="h-5 w-5" />}
            >
              <InfoRow
                label="Status"
                value={<StatusBadge status={subscription?.status} />}
              />
              <InfoRow
                label="Cancel At Period End"
                value={formatBoolean(subscription?.cancelAtPeriodEnd)}
              />
              <InfoRow
                label="Current Period Start"
                value={formatDate(subscription?.currentPeriodStart)}
              />
              <InfoRow
                label="Current Period End"
                value={formatDate(subscription?.currentPeriodEnd)}
              />
              <InfoRow
                label="Stripe Customer"
                value={subscription?.stripeCustomerId || "N/A"}
              />
              <InfoRow
                label="Stripe Subscription"
                value={subscription?.stripeSubscriptionId || "N/A"}
              />
            </InfoCard>
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            <InfoCard title="Usage Limits" icon={<Layers className="h-5 w-5" />}>
              <UsageBar
                label="Workspaces"
                used={usage?.workspaces ?? 0}
                total={limits?.maxWorkspaces ?? 0}
              />

              <UsageBar
                label="Projects"
                used={usage?.projects ?? 0}
                total={limits?.maxProjects ?? 0}
              />

              <InfoRow
                label="Can Create Workspace"
                value={
                  billing?.canCreateWorkspace ? (
                    <CheckCircle2 className="ml-auto h-5 w-5 text-emerald-600" />
                  ) : (
                    <XCircle className="ml-auto h-5 w-5 text-red-500" />
                  )
                }
              />

              <InfoRow
                label="Can Create Project"
                value={
                  billing?.canCreateProject ? (
                    <CheckCircle2 className="ml-auto h-5 w-5 text-emerald-600" />
                  ) : (
                    <XCircle className="ml-auto h-5 w-5 text-red-500" />
                  )
                }
              />
            </InfoCard>

            <InfoCard
              title="Entitlements"
              icon={<ShieldCheck className="h-5 w-5" />}
            >
              <InfoRow
                label="Brands Included"
                value={entitlements?.brandsIncluded ?? "N/A"}
              />
              <InfoRow
                label="Scans Per Month"
                value={entitlements?.scansPerMonth ?? "N/A"}
              />
              <InfoRow
                label="Daily Scans"
                value={formatBoolean(entitlements?.dailyScans)}
              />
              <InfoRow
                label="Seats Included"
                value={entitlements?.seatsIncluded ?? "N/A"}
              />
              <InfoRow
                label="Extra Seat Price"
                value={formatCurrency(entitlements?.extraSeatPrice)}
              />
            </InfoCard>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <h2 className="text-base font-semibold text-slate-900">
                Plan Features
              </h2>
            </div>

            {entitlements?.features?.length ? (
              <div className="flex flex-wrap gap-2">
                {entitlements.features.map((feature:any) => (
                  <span
                    key={feature}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium capitalize text-slate-700"
                  >
                    {formatText(feature)}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No features found.</p>
            )}
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4">
              <CalendarDays className="h-5 w-5 text-orange-600" />
              <h2 className="text-base font-semibold text-slate-900">
                Payment History
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                      Amount
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                      Currency
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                      Status
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                      Payment Method
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {subscriberHistory.length > 0 ? (
                    subscriberHistory.map((payment) => (
                      <tr
                        key={payment._id}
                        className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50"
                      >
                        <td className="px-4 py-4 text-sm font-medium text-slate-900">
                          {formatCurrency(payment.amount)}
                        </td>

                        <td className="px-4 py-4 text-sm uppercase text-slate-700">
                          {payment.currency || "N/A"}
                        </td>

                        <td className="px-4 py-4">
                          <StatusBadge status={payment.status} />
                        </td>

                        <td className="px-4 py-4 text-sm capitalize text-slate-700">
                          {formatText(payment.paymentMethod)}
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-700">
                          {formatDate(payment.paidAt || payment.createdAt)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-12 text-center text-sm text-slate-500"
                      >
                        No payment history found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}