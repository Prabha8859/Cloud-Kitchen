import { Building2, CheckCircle, Clock, Ban } from 'lucide-react';
import StatsCard from '../UI/StatsCard';

export default function SocietiesSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        label="Total Societies"
        value="48"
        icon={Building2}
        percentage={85}
        color="blue"
        trend="up"
        trendValue="+12"
      />
      <StatsCard
        label="Active Societies"
        value="42"
        icon={CheckCircle}
        percentage={92}
        color="green"
        trend="up"
        trendValue="+8"
      />
      <StatsCard
        label="Pending Approval"
        value="5"
        icon={Clock}
        percentage={45}
        color="orange"
        trend="neutral"
        trendValue="0"
      />
      <StatsCard
        label="Blocked"
        value="1"
        icon={Ban}
        percentage={15}
        color="red"
        trend="down"
        trendValue="-2"
      />
    </div>
  );
}