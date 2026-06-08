"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type {
  AdminRecentActivity,
  SubscriptionDistributionSegment,
} from "@/types/dashboard";
import { Activity, Zap } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";

const PIE_COLORS = ["#DE5A3F", "#242C2F", "#6B7280", "#F59E0B", "#10B981"];

function formatDateTime(value?: string) {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatLabel(value?: string | null) {
  if (!value) return "N/A";

  return value.replaceAll("_", " ");
}

type RecentActivityWidgetProps = {
  activities: AdminRecentActivity[];
  isLoading?: boolean;
};

export function RecentActivityWidget({
  activities,
  isLoading = false,
}: RecentActivityWidgetProps) {
  const recent = activities.slice(0, 5);

  return (
    <Card className="w-full border border-border bg-white shadow-sm ring-0">
      <CardHeader className="px-4 pb-3 sm:px-6 sm:pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-bold text-slate-900 sm:text-xl">
          <Activity className="h-5 w-5 shrink-0 text-orange-600 sm:h-6 sm:w-6" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 sm:px-6">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-16 animate-pulse rounded-xl bg-slate-100"
              />
            ))}
          </div>
        ) : recent.length > 0 ? (
          <div className="space-y-4">
            {recent.map((activity, index) => (
              <div
                key={`${activity.action}-${activity.timestamp}-${index}`}
                className="flex items-start gap-3 border-b border-slate-200 pb-4 last:border-0 last:pb-0 sm:gap-4"
              >
                <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-500" />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="break-words text-sm font-semibold text-slate-900">
                      {activity.email || activity.name || "System Activity"}
                    </p>

                    {activity.organizationType ? (
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                        {activity.organizationType}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-0.5 break-words text-xs capitalize text-slate-600">
                    {formatLabel(activity.description || activity.action)} -{" "}
                    {formatLabel(activity.category)}
                  </p>

                  {activity.workspaceName ? (
                    <p className="mt-0.5 text-xs text-slate-500">
                      Workspace: {activity.workspaceName}
                    </p>
                  ) : null}

                  {activity.planName ? (
                    <p className="mt-0.5 text-xs text-slate-500">
                      Plan: {activity.planName}
                    </p>
                  ) : null}

                  <p className="mt-0.5 text-xs text-slate-500">
                    {formatDateTime(activity.timestamp || activity.at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
            No recent activity found.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

type SubscriptionSummaryWidgetProps = {
  data: SubscriptionDistributionSegment[];
  isLoading?: boolean;
};

export function SubscriptionSummaryWidget({
  data,
  isLoading = false,
}: SubscriptionSummaryWidgetProps) {
  const chartData = data.map((item) => ({
    plan: item.planName,
    planKey: item.planKey,
    audience: item.audience,
    subscriptions: item.count,
    isFree: item.isFree,
  }));

  const chartConfig = {
    subscriptions: {
      label: "Subscriptions",
      color: "#DE5A3F",
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full overflow-hidden border border-border bg-white shadow-sm ring-0">
      <CardHeader className="px-4 pb-2 sm:px-6">
        <CardTitle className="flex min-w-0 items-center gap-2 text-base font-bold text-slate-900 sm:text-lg">
          <Zap className="h-5 w-5 shrink-0 text-orange-600" />
          <span className="truncate">Subscription Distribution</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 pb-5 sm:px-6">
        {isLoading ? (
          <div className="mx-auto h-[230px] w-full max-w-[280px] animate-pulse rounded-full bg-slate-100 sm:h-[260px] sm:max-w-[320px]" />
        ) : chartData.length > 0 ? (
          <>
            <ChartContainer
              config={chartConfig}
              className="mx-auto h-[230px] w-full max-w-[280px] sm:h-[260px] sm:max-w-[320px]"
            >
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="subscriptions"
                  nameKey="plan"
                  cx="50%"
                  cy="50%"
                  innerRadius="48%"
                  outerRadius="74%"
                  paddingAngle={4}
                  stroke="white"
                  strokeWidth={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={entry.planKey}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>

                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, _name, item) => {
                        const payload = item?.payload as
                          | {
                              plan: string;
                              audience: string;
                              isFree: boolean;
                            }
                          | undefined;

                        return [
                          `${value} subscriptions`,
                          payload
                            ? `${payload.plan} · ${payload.audience} · ${
                                payload.isFree ? "Free" : "Paid"
                              }`
                            : "",
                        ];
                      }}
                    />
                  }
                />
              </PieChart>
            </ChartContainer>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {chartData.map((item, index) => (
                <div
                  key={item.planKey}
                  className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{
                        backgroundColor: PIE_COLORS[index % PIE_COLORS.length],
                      }}
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {item.plan}
                      </p>
                      <p className="truncate text-[11px] text-slate-500">
                        {item.audience} · {item.isFree ? "Free" : "Paid"}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-900 shadow-sm">
                    {item.subscriptions}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
            No subscription distribution found.
          </div>
        )}
      </CardContent>
    </Card>
  );
}