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
    <Card className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600">{label}</p>
            <p className="text-3xl font-bold text-slate-900">{value}</p>
            {change && (
              <p className={`text-xs ${positive ? 'text-green-600' : 'text-red-600'}`}>
                {positive ? '+' : ''}{change} from last month
              </p>
            )}
          </div>
          <div className="p-2 bg-orange-100 rounded-lg text-orange-600">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export function KPICards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <KPICard icon={<Building2 className="w-5 h-5" />} label="Total Brands" value="124" change="12%" positive />
      <KPICard icon={<Building2 className="w-5 h-5" />} label="Total Agencies" value="18" change="2%" positive />
      <KPICard icon={<Users className="w-5 h-5" />} label="Active Users" value="2,847" change="5%" positive />
      <KPICard icon={<CreditCard className="w-5 h-5" />} label="Active Subscriptions" value="142" change="8%" positive />
      <KPICard icon={<TrendingUp className="w-5 h-5" />} label="MRR" value="$42,580" change="15%" positive />
      <KPICard icon={<TrendingUp className="w-5 h-5" />} label="Churn Rate" value="2.3%" change="0.5%" />
    </div>
  );
}
