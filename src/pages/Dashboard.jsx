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
import { ShoppingBag, Truck, Clock, DollarSign } from 'lucide-react';

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
          icon={ShoppingBag}
          value="89"
          label="Total Order"
          trend="up"
          trendValue="3%"
          iconColor="text-gray-700 dark:text-white"
          iconBg="bg-gray-100 dark:bg-slate-700"
        />
        <StatsCard
          icon={Truck}
          value="899"
          label="Total Delivered"
          trend="up"
          trendValue="8%"
          iconColor="text-gray-700 dark:text-white"
          iconBg="bg-gray-100 dark:bg-slate-700"
        />
        <StatsCard
          icon={Clock}
          value="59"
          label="Total Cancelled"
          trend="down"
          trendValue="2%"
          iconColor="text-gray-700 dark:text-white"
          iconBg="bg-gray-100 dark:bg-slate-700"
        />
        <StatsCard
          icon={DollarSign}
          value="$789k"
          label="Total Revenue"
          trend="down"
          trendValue="12%"
          iconColor="text-gray-700 dark:text-white"
          iconBg="bg-gray-100 dark:bg-slate-700"
        />
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