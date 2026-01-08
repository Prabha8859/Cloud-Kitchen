import { ChefHat, CheckCircle, Clock, Ban } from 'lucide-react';
import StatsCard from '../UI/StatsCard';

export default function KitchensSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        label="Total Kitchens"
        value="156"
        icon={ChefHat}
        percentage={88}
        color="orange"
        trend="up"
        trendValue="+18"
      />
      <StatsCard
        label="Active Kitchens"
        value="142"
        icon={CheckCircle}
        percentage={95}
        color="green"
        trend="up"
        trendValue="+12"
      />
      <StatsCard
        label="Pending Verification"
        value="8"
        icon={Clock}
        percentage={35}
        color="yellow"
        trend="neutral"
        trendValue="0"
      />
      <StatsCard
        label="Blocked Kitchens"
        value="6"
        icon={Ban}
        percentage={20}
        color="red"
        trend="down"
        trendValue="-3"
      />
    </div>
  );
}