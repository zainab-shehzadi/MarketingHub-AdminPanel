import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, CreditCard, TrendingUp } from 'lucide-react';

interface KPICardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
}

function KPICard({ icon, label, value, change, positive }: KPICardProps) {
  return (
    <Card className="border border-border bg-white shadow-none ring-0 transition-all hover:border-[#CBD5E1] hover:shadow-sm">
      <CardContent>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600">{label}</p>
            <p className="text-2xl md:text-3xl font-bold text-slate-900">{value}</p>
            {change && (
              <p className={`text-xs ${positive ? 'text-green-600' : 'text-red-600'}`}>
                {positive ? '+' : ''}
                {change} from last month
              </p>
            )}
          </div>

          <div className="rounded-lg border border-orange-200 bg-orange-50 p-2 text-orange-600">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function KPICards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KPICard icon={<Building2 className="h-5 w-5" />} label="Total Brands" value="124" change="12%" positive />
      <KPICard icon={<Building2 className="h-5 w-5" />} label="Total Agencies" value="18" change="2%" positive />
      <KPICard icon={<Users className="h-5 w-5" />} label="Active Users" value="2,847" change="5%" positive />
      <KPICard icon={<CreditCard className="h-5 w-5" />} label="Active Subscriptions" value="142" change="8%" positive />
    </div>
  );
}