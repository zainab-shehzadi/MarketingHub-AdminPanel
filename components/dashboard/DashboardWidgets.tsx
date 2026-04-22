'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockLogs, mockSubscriptions } from '@/lib/mock-data';
import { PLAN_DETAILS } from '@/lib/constants';
import { formatDateTime } from '@/lib/formatting';
import { AlertCircle, Activity, Zap } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { PieChart, Pie, Cell } from 'recharts';

export function RecentActivityWidget() {
  const recent = mockLogs.slice(0, 5);

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <Activity className="h-5 w-5 text-orange-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {recent.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-4 border-b border-slate-200 pb-4 last:border-0 last:pb-0"
            >
              <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900">{log.actor}</p>
                <p className="text-xs text-slate-600">
                  {log.action} - {log.module}
                </p>
                <p className="text-xs text-slate-500">{formatDateTime(log.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

type PlanKey = keyof typeof PLAN_DETAILS;

const PIE_COLORS = ['#DE5A3F', '#242C2F', '#6B7280', '#F59E0B', '#10B981'];

export function SubscriptionSummaryWidget() {
  const planCounts = mockSubscriptions.reduce<Record<string, number>>((acc, sub) => {
    acc[sub.currentPlan] = (acc[sub.currentPlan] || 0) + 1;
    return acc;
  }, {});

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
      label: 'Subscriptions',
      color: '#DE5A3F',
    },
  } satisfies ChartConfig;

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <Zap className="h-5 w-5 text-orange-600" />
          Subscription Distribution
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-center">
          <ChartContainer config={chartConfig} className="mx-auto h-[320px] w-full max-w-[360px]">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="subscriptions"
                nameKey="plan"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
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
                        payload ? `${payload.plan} · $${payload.revenue.toLocaleString()}` : '',
                      ];
                    }}
                  />
                }
              />
            </PieChart>
          </ChartContainer>

          <div className="space-y-3">
            {chartData.map((item, index) => (
              <div
                key={item.plan}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-900">{item.plan}</p>
                    <p className="text-xs text-slate-500">
                      {item.subscriptions} subscriptions
                    </p>
                  </div>
                </div>

                <p className="text-sm font-semibold text-slate-900">
                  ${item.revenue.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PlatformStatusWidget() {
  const statuses = [
    { label: 'API Uptime', value: '99.99%' },
    { label: 'Database Response', value: '120ms' },
    { label: 'Active Incidents', value: '0' },
  ];

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <AlertCircle className="h-5 w-5 text-orange-600" />
          Platform Status
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {statuses.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm text-slate-600">{item.label}</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium text-slate-900">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}