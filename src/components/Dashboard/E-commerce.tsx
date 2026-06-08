
import { PageHeader } from "../shared/PageHeader";
import { PlatformStatusWidget, RecentActivityWidget, SubscriptionSummaryWidget } from "./DashboardWidgets";
import { KPICards } from "./KPICards";


const ECommerce = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Welcome to your super admin panel. Monitor key metrics and system health."
      />

      <KPICards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentActivityWidget />
        <SubscriptionSummaryWidget />
      </div>

      <PlatformStatusWidget />
    </div>
  );
};

export default ECommerce;