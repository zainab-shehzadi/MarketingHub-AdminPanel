"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockLogs, mockSubscriptions } from "@/lib/mock-data";
import { PLAN_DETAILS } from "@/lib/constants";
import { formatDateTime } from "@/lib/formatting";
import { AlertCircle, Activity, Zap } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";

type PlanKey = keyof typeof PLAN_DETAILS;

const PIE_COLORS = ["#DE5A3F", "#242C2F", "#6B7280", "#F59E0B", "#10B981"];

export function RecentActivityWidget() {
  const recent = mockLogs.slice(0, 5);

  return (
    <Card className="w-full border border-border bg-white shadow-sm ring-0">
      <CardHeader className="px-4 pb-3 sm:px-6 sm:pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-bold text-slate-900 sm:text-xl">
          <Activity className="h-5 w-5 shrink-0 text-orange-600 sm:h-6 sm:w-6" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 sm:px-6">
        <div className="space-y-4">
          {recent.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-3 border-b border-slate-200 pb-4 last:border-0 last:pb-0 sm:gap-4"
            >
              <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-500" />

              <div className="min-w-0 flex-1">
                <p className="break-words text-sm font-medium text-slate-900 sm:truncate">
                  {log.actor}
                </p>
                <p className="mt-0.5 break-words text-xs text-slate-600">
                  {log.action} - {log.module}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {formatDateTime(log.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function SubscriptionSummaryWidget() {
  const planCounts = mockSubscriptions.reduce<Record<string, number>>(
    (acc, sub) => {
      acc[sub.currentPlan] = (acc[sub.currentPlan] || 0) + 1;
      return acc;
    },
    {}
  );

  const chartData = Object.entries(planCounts).map(([plan, count]) => {
    const details = PLAN_DETAILS[plan as PlanKey];

    return {
      plan,
      subscriptions: count,
      revenue: count * details.monthlyPrice * 30,
    };
  });

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
                  key={entry.plan}
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                />
              ))}
            </Pie>

            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, _name, item) => {
                    const payload = item?.payload as
                      | { plan: string; revenue: number }
                      | undefined;

                    return [
                      `${value} subscriptions`,
                      payload
                        ? `${payload.plan} · $${payload.revenue.toLocaleString()}`
                        : "",
                    ];
                  }}
                />
              }
            />
          </PieChart>
        </ChartContainer>

        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {chartData.map((item, index) => (
            <div
              key={item.plan}
              className="flex min-w-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{
                  backgroundColor: PIE_COLORS[index % PIE_COLORS.length],
                }}
              />

              <div className="min-w-0 text-center">
                <p className="truncate text-sm font-semibold text-slate-900">
                  ${item.revenue.toLocaleString()}
                </p>
                <p className="truncate text-[11px] text-slate-500">
                  {item.plan}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function PlatformStatusWidget() {
  const statuses = [
    { label: "API Uptime", value: "99.99%" },
    { label: "Database Response", value: "120ms" },
    { label: "Active Incidents", value: "0" },
  ];

  return (
    <Card className="w-full border border-border bg-white shadow-sm ring-0">
      <CardHeader className="px-4 pb-3 sm:px-6">
        <CardTitle className="flex items-center gap-2 text-lg font-bold text-slate-900 sm:text-xl">
          <AlertCircle className="h-5 w-5 shrink-0 text-orange-600" />
          <span>Platform Status</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 sm:px-6">
        <div className="space-y-3">
          {statuses.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-1 rounded-lg bg-slate-50 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:bg-transparent sm:px-0 sm:py-0"
            >
              <span className="text-sm text-slate-600">{item.label}</span>

              <div className="flex items-center gap-2">
                <div className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
                <span className="text-sm font-medium text-slate-900">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}