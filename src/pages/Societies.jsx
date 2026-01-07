import React from "react";
import { MoreVertical, Building, Plus } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import PageHeader from "../components/UI/PageHeader";
import Button from "../components/UI/Button";
import Badge from "../components/UI/Badge";

const dummySocieties = [
  { id: 1, name: "Gokuldham Society", location: "Mumbai, Goregaon", admin: "Bhide", status: "Active", kitchens: 12 },
  { id: 2, name: "Blue Ridge", location: "Pune, Hinjewadi", admin: "Rahul Roy", status: "Active", kitchens: 8 },
  { id: 3, name: "Prestige Lakeside", location: "Bangalore, Varthur", admin: "Anita Desai", status: "Pending", kitchens: 0 },
  { id: 4, name: "DLF Cyber City", location: "Gurgaon, Sector 24", admin: "Vikram Malhotra", status: "Active", kitchens: 25 },
  { id: 5, name: "Lotus Panache", location: "Noida, Sector 110", admin: "Suresh Raina", status: "Inactive", kitchens: 3 },
];

export default function Societies() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Societies"
        subtitle="Manage registered residential societies"
        rightContent={
          <Button variant="primary" icon={Plus}>
            Add Society
          </Button>
        }
      />

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4">Society Name</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Admin</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Kitchens</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {dummySocieties.map((society) => (
                <tr key={society.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                        <Building size={16} className="text-slate-400"/>
                        {society.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">{society.location}</td>
                  <td className="px-6 py-4">{society.admin}</td>
                  <td className="px-6 py-4">
                    <Badge status={society.status} />
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-900 dark:text-white">{society.kitchens}</span>
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