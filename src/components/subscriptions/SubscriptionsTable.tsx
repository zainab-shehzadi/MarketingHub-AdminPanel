"use client";

import { ActionDropdown } from "@/components/modals/ActionDropdown";
import { PaymentSubscriber } from "@/types/payment.types";

interface SubscriptionsTableProps {
  subscriptions: PaymentSubscriber[];
  isLoading?: boolean;
  onView?: (subscription: PaymentSubscriber) => void;
}

function getPlanClasses(planKey?: string) {
  switch (planKey) {
    case "free_brand_explorer":
      return "bg-slate-50 text-slate-700 border border-slate-200";

    case "brand_pro":
    case "agency_starter":
      return "bg-orange-50 text-orange-700 border border-orange-200";

    case "agency_growth":
      return "bg-green-50 text-green-700 border border-green-200";

    case "agency_scale":
      return "bg-indigo-50 text-indigo-700 border border-indigo-200";

    default:
      return "bg-slate-50 text-slate-600 border border-slate-200";
  }
}

function getStatusClasses(status?: string) {
  switch (status) {
    case "active":
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";

    case "free":
      return "bg-blue-50 text-blue-700 border border-blue-200";

    case "past_due":
    case "suspended":
      return "bg-amber-50 text-amber-700 border border-amber-200";

    case "cancelled":
      return "bg-red-50 text-red-700 border border-red-200";

    default:
      return "bg-slate-50 text-slate-600 border border-slate-200";
  }
}

function formatText(value?: string | null) {
  if (!value) return "N/A";

  return value.replaceAll("_", " ");
}

function formatCurrency(amount?: number) {
  if (typeof amount !== "number") return "$0";

  return `$${amount.toLocaleString()}`;
}

export function SubscriptionsTable({
  subscriptions,
  isLoading = false,
  onView,
}: SubscriptionsTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                Organization
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                Email
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                Plan
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                Billing
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                Payments
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                Status
              </th>

              <th className="px-4 py-4 text-right text-sm font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm text-slate-500"
                >
                  Loading subscriptions...
                </td>
              </tr>
            ) : subscriptions.length > 0 ? (
              subscriptions.map((subscriber) => {
                const user = subscriber.user;
                const plan = subscriber.plan;
                const subscription = subscriber.subscription;
                const paymentSummary = subscriber.paymentSummary;

                const rowId = user._id;
                const organizationType = user.organizationType || "N/A";
                const email = user.email || "N/A";
                const planName = plan?.name || "No Plan";
                const planKey = plan?.key || user.planKey;
                const billingStatus = user.billingStatus || "N/A";
                const status = subscription?.status || billingStatus || "N/A";

                return (
                  <tr
                    key={rowId}
                    className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50"
                  >
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-900">
                          {organizationType}
                        </p>

                        <p className="text-xs capitalize text-slate-500">
                          {user.role || "N/A"}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-700">
                      {email}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getPlanClasses(
                          planKey
                        )}`}
                      >
                        {planName}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm capitalize text-slate-700">
                      {formatText(billingStatus)}
                    </td>

                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-900">
                          {formatCurrency(paymentSummary?.totalPaidFormatted)}
                        </p>

                        <p className="text-xs text-slate-500">
                          {paymentSummary?.succeededPayments || 0}/
                          {paymentSummary?.totalPayments || 0} succeeded
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClasses(
                          status
                        )}`}
                      >
                        {formatText(status)}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div className="relative flex justify-end">
                        <ActionDropdown
                          actions={[
                            {
                              label: "View Detail",
                              icon: "view",
                              onClick: () => onView?.(subscriber),
                            },
                          ]}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm text-slate-500"
                >
                  No subscriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}