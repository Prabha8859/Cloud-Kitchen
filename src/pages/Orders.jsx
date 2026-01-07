import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import PageHeader from "../components/UI/PageHeader";

export default function Orders() {
  return (
    <DashboardLayout>
      <PageHeader title="Orders" subtitle="Manage incoming orders" />
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <p className="text-gray-500">Orders list will appear here.</p>
      </div>
    </DashboardLayout>
  );
}