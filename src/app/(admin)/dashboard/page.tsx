import { PlatformStatusWidget, RecentActivityWidget, SubscriptionSummaryWidget } from '@/components/Dashboard/DashboardWidgets';
import { KPICards } from '@/components/Dashboard/KPICards';
import { PageHeader } from '@/components/shared/PageHeader';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Welcome to your super admin panel. Monitor key metrics and system health."
      />

      <KPICards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivityWidget />
        <SubscriptionSummaryWidget />
      </div>

      <PlatformStatusWidget />
    </div>
  );
}
