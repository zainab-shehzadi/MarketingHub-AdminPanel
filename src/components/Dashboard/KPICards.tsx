import { Card, CardContent } from "@/components/ui/card";
import type { AdminDashboardStats, DashboardMetric } from "@/types/dashboard";
import { Building2, CreditCard, Users } from "lucide-react";

interface KPICardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  metric?: DashboardMetric;
}

function KPICard({ icon, label, value, metric }: KPICardProps) {
  const growthPercent = metric?.growthPercent ?? 0;
  const isPositive = growthPercent >= 0;
  const growthLabel = metric?.label || "from last month";

  return (
    <Card className="border border-border bg-white shadow-none ring-0 transition-all hover:border-[#CBD5E1] hover:shadow-sm">
      <CardContent>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600">{label}</p>

            <p className="text-2xl font-bold text-slate-900 md:text-3xl">
              {value}
            </p>

            <p
              className={`text-xs ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {isPositive ? "+" : ""}
              {growthPercent}% {growthLabel}
            </p>
          </div>

          <div className="rounded-lg border border-orange-200 bg-orange-50 p-2 text-orange-600">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

type KPICardsProps = {
  stats: AdminDashboardStats | null;
  isLoading?: boolean;
};

export function KPICards({ stats, isLoading = false }: KPICardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="border border-border bg-white shadow-none ring-0">
            <CardContent>
              <div className="h-20 animate-pulse rounded-xl bg-slate-100" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KPICard
        icon={<Building2 className="h-5 w-5" />}
        label="Total Brands"
        value={stats?.totalBrands?.total ?? 0}
        metric={stats?.totalBrands}
      />

      <KPICard
        icon={<Building2 className="h-5 w-5" />}
        label="Total Agencies"
        value={stats?.totalAgencies?.total ?? 0}
        metric={stats?.totalAgencies}
      />

      <KPICard
        icon={<Users className="h-5 w-5" />}
        label="Active Users"
        value={stats?.activeUsers?.total ?? 0}
        metric={stats?.activeUsers}
      />

      <KPICard
        icon={<CreditCard className="h-5 w-5" />}
        label="Active Subscriptions"
        value={stats?.activeSubscriptions?.total ?? 0}
        metric={stats?.activeSubscriptions}
      />
    </div>
  );
}