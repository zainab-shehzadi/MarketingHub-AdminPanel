import { PageHeader } from '@/components/shared/PageHeader';
import { KPICards } from '@/components/dashboard/KPICards';
import { RecentActivityWidget, SubscriptionSummaryWidget, PlatformStatusWidget } from '@/components/dashboard/DashboardWidgets';

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
