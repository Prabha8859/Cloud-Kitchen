import DashboardLayout from "../components/layout/DashboardLayout";
import PageHeader from "../components/UI/PageHeader";
import StatsCard from "../components/dashboard/StatsCard";
import DailyRevenueChart from "../components/dashboard/DailyRevenueChart";
import CustomerFlowChart from "../components/dashboard/CustomerFlowChart";
import CustomerReview from "../components/dashboard/CustomerReview";
import TrendingKeywords from "../components/dashboard/TrendingKeywords";
import TodaysSpecial from "../components/dashboard/TodaysSpecial";
import DeliveryMap from "../components/dashboard/DeliveryMap";
import UpcomingShippingSchedule from "../components/dashboard/UpcomingShippingSchedule";
import Overview from "../components/dashboard/Overview";
import TopSellingItems from "../components/dashboard/TopSellingItems";
import { ShoppingBag, Package, Clock, DollarSign } from 'lucide-react';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Dashboard Overview"
        subtitle="Platform performance summary"
      />

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          label="Total Orders" 
          value="1,893" 
          icon={ShoppingBag} 
          percentage={65} 
          color="orange"
          trend="up"
          trendValue="+8.2%"
        />
        <StatsCard
         label="Pending Deliveries" 
          value="45" 
          icon={Package} 
          percentage={92} 
          color="teal"
          trend="up"
          trendValue="+5.3%"
        />
        <StatsCard
          label="Total Cancelled"
          value="59"
          icon={Clock}
          percentage={12}
          color="red"
          trend="down"
          trendValue="2%"
        />
        <StatsCard
          label="Total Revenue" 
          value="$54,239" 
          icon={DollarSign} 
          percentage={78} 
          color="indigo"
          trend="up"
          trendValue="+12.5%"
        />
      </div>

      {/* Overview & Top Selling Section */}
     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
  <div className="lg:col-span-2">
    <Overview />
  </div>
  <div>
    <TopSellingItems />
  </div>
</div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DailyRevenueChart />
        <CustomerFlowChart />
      </div>

      {/* Customer Reviews */}
      <div className="mb-6">
        <CustomerReview />
      </div>

      {/* Bottom Section: Keywords/Special, Map, Schedule */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Keywords & Special */}
        <div className="flex flex-col gap-6">
          <TrendingKeywords />
          <TodaysSpecial />
        </div>

        {/* Right Column: Map & Schedule */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <DeliveryMap />
          <UpcomingShippingSchedule />
        </div>
      </div>
    </DashboardLayout>
  );
}