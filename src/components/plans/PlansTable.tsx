"use client";

import type { PaymentCatalogPlan } from "@/types/payment.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActionDropdown } from "@/components/modals/ActionDropdown";

interface PlansTableProps {
  plans: PaymentCatalogPlan[];
  isLoading?: boolean;
  currentPlanKey?: string | null;
  onEdit?: (plan: PaymentCatalogPlan) => void;
  onDelete?: (id: string) => void;
  onViewFeatures?: (plan: PaymentCatalogPlan) => void;
}

function formatCurrency(cents?: number) {
  if (typeof cents !== "number") return "$0";

  return `$${(cents / 100).toLocaleString()}`;
}

function formatText(value?: string | null) {
  if (!value) return "N/A";

  return value.replaceAll("_", " ");
}

function getStatusClasses(isFree: boolean) {
  return isFree
    ? "bg-blue-100 text-blue-700"
    : "bg-emerald-100 text-emerald-700";
}

export function PlansTable({
  plans,
  isLoading = false,
  currentPlanKey,
  onEdit,
  onDelete,
  onViewFeatures,
}: PlansTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-200 bg-slate-50 hover:bg-transparent">
            <TableHead className="font-semibold text-slate-700">
              Plan
            </TableHead>

            <TableHead className="font-semibold text-slate-700">
              Audience
            </TableHead>

            <TableHead className="font-semibold text-slate-700">
              Monthly
            </TableHead>

            <TableHead className="font-semibold text-slate-700">
              Extra Seat
            </TableHead>

            <TableHead className="font-semibold text-slate-700">
              Brands
            </TableHead>

            <TableHead className="font-semibold text-slate-700">
              Seats
            </TableHead>

            <TableHead className="font-semibold text-slate-700">
              Status
            </TableHead>

            <TableHead className="text-right font-semibold text-slate-700">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="py-10 text-center text-sm text-slate-500"
              >
                Loading plans...
              </TableCell>
            </TableRow>
          ) : plans.length > 0 ? (
            plans.map((plan) => {
              const isCurrentPlan = plan.key === currentPlanKey;
              const featureCount = plan.entitlements?.features?.length || 0;

              return (
                <TableRow
                  key={plan._id}
                  className="border-slate-200 hover:bg-slate-50"
                >
                  <TableCell>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold capitalize text-slate-900">
                          {plan.name}
                        </p>

                        {isCurrentPlan ? (
                          <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-semibold text-orange-700">
                            Current
                          </span>
                        ) : null}
                      </div>

                     
                      <p className="mt-1 text-xs text-slate-400">
                        {featureCount} included features
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="text-sm font-medium text-slate-700">
                    {plan.audience}
                  </TableCell>

                  <TableCell className="font-medium text-slate-900">
                    {formatCurrency(plan.price?.monthly)}
                    <span className="ml-1 text-xs text-slate-500">/mo</span>
                  </TableCell>

                  <TableCell className="font-medium text-slate-900">
                    {formatCurrency(plan.price?.extraSeatMonthly)}
                    <span className="ml-1 text-xs text-slate-500">/seat</span>
                  </TableCell>

                  <TableCell className="text-sm text-slate-700">
                    {plan.entitlements?.brandsIncluded === 999999
                      ? "Unlimited"
                      : plan.entitlements?.brandsIncluded ?? "N/A"}
                  </TableCell>

                  <TableCell className="text-sm text-slate-700">
                    {plan.entitlements?.seatsIncluded ?? "N/A"}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${getStatusClasses(
                        plan.isFree
                      )}`}
                    >
                      {plan.isFree ? "Free" : "Paid"}
                    </span>
                  </TableCell>

                  <TableCell className="flex justify-end">
                    <ActionDropdown
                      actions={[
                        {
                          label: "View Features",
                          icon: "view",
                          onClick: () => onViewFeatures?.(plan),
                        },
                        // {
                        //   label: "Edit",
                        //   icon: "edit",
                        //   onClick: () => onEdit?.(plan),
                        // },
                        // {
                        //   label: "Delete",
                        //   icon: "delete",
                        //   isDangerous: true,
                        //   onClick: () => onDelete?.(plan._id),
                        // },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={8}
                className="py-10 text-center text-sm text-slate-500"
              >
                No plans found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}