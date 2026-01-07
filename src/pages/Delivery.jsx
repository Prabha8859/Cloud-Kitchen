import React from "react";
import { MapPin, Star, MoreVertical, Plus } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import PageHeader from "../components/UI/PageHeader";
import Button from "../components/UI/Button";
import Badge from "../components/UI/Badge";

const dummyRiders = [
  { id: 1, name: "Vikram Singh", phone: "+91 98765 43210", status: "Active", currentOrder: "ORD-001", rating: 4.8, location: "Sector 62, Noida" },
  { id: 2, name: "Rahul Kumar", phone: "+91 98765 43211", status: "Busy", currentOrder: "ORD-005", rating: 4.5, location: "Sector 18, Noida" },
  { id: 3, name: "Amit Patel", phone: "+91 98765 43212", status: "Offline", currentOrder: "-", rating: 4.9, location: "Indirapuram" },
  { id: 4, name: "Suresh Raina", phone: "+91 98765 43213", status: "Active", currentOrder: "-", rating: 4.2, location: "Sector 15, Noida" },
  { id: 5, name: "Deepak Verma", phone: "+91 98765 43214", status: "Busy", currentOrder: "ORD-008", rating: 4.7, location: "Greater Noida" },
];

export default function Delivery() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Delivery Partners"
        subtitle="Manage delivery riders and their status"
        rightContent={
          <Button variant="primary" icon={Plus}>
            Add Rider
          </Button>
        }
      />
      
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4">Rider Name</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Current Order</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {dummyRiders.map((rider) => (
                <tr key={rider.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{rider.name}</td>
                  <td className="px-6 py-4">{rider.phone}</td>
                  <td className="px-6 py-4">
                    <Badge status={rider.status === 'Busy' ? 'pending' : rider.status === 'Offline' ? 'inactive' : 'active'}>
                      {rider.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">{rider.currentOrder}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{rider.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3 h-3" />
                      {rider.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
                      <MoreVertical size={18} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}