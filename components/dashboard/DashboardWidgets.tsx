import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockLogs, mockSubscriptions } from '@/lib/mock-data';
import { PLAN_DETAILS } from '@/lib/constants';
import { formatDateTime } from '@/lib/formatting';
import { PlanBadge } from '@/components/shared/PlanBadge';
import { AlertCircle, Activity, Zap } from 'lucide-react';

export function RecentActivityWidget() {
  const recent = mockLogs.slice(0, 5);
  return (
    <Card className="border-slate-700 bg-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Activity className="w-5 h-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recent.map((log) => (
            <div key={log.id} className="flex items-start gap-4 pb-4 border-b border-slate-700 last:border-0 last:pb-0">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{log.actor}</p>
                <p className="text-xs text-slate-400">{log.action} - {log.module}</p>
                <p className="text-xs text-slate-500">{formatDateTime(log.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function SubscriptionSummaryWidget() {
  const planCounts = mockSubscriptions.reduce(
    (acc, sub) => {
      acc[sub.currentPlan] = (acc[sub.currentPlan] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <Card className="border-slate-700 bg-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Zap className="w-5 h-5" />
          Subscription Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(planCounts).map(([plan, count]) => {
            const details = PLAN_DETAILS[plan as keyof typeof PLAN_DETAILS];
            return (
              <div key={plan} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <PlanBadge plan={plan as any} />
                  <span className="text-sm text-slate-400">{count} subscriptions</span>
                </div>
                <span className="text-sm font-medium text-white">${(count * (details.monthlyPrice * 30)).toLocaleString()}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function PlatformStatusWidget() {
  const statuses = [
    { label: 'API Uptime', value: '99.99%', status: 'healthy' },
    { label: 'Database Response', value: '120ms', status: 'healthy' },
    { label: 'Active Incidents', value: '0', status: 'healthy' },
  ];

  return (
    <Card className="border-slate-700 bg-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <AlertCircle className="w-5 h-5" />
          Platform Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {statuses.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm text-slate-400">{item.label}</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium text-white">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
