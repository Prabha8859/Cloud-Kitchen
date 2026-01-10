import React from 'react';
import { Eye, Building, MapPin, User, Trash2 } from 'lucide-react';
import Button from '../UI/Button';
import Badge from '../UI/Badge';
import Table from '../UI/Table';

export default function SocietiesListTable({ societies, onViewDetails, onDelete, viewMode = 'list' }) {
  const columns = [
    {
      header: 'Society Name',
      accessor: 'name',
      render: (society) => (
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                <Building size={16} />
            </div>
            <span className="font-medium text-slate-900 dark:text-white">{society.name}</span>
        </div>
      )
    },
    {
      header: 'Location',
      accessor: 'location',
      render: (society) => (
        <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
           <MapPin size={14} />
           {society.location}
        </div>
      )
    },
    {
      header: 'Admin',
      accessor: 'admin',
       render: (society) => (
        <div className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-200">
           <User size={14} />
           {society.admin}
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (society) => (
        <Badge status={society.status.toLowerCase() === 'blocked' ? 'inactive' : society.status.toLowerCase()}>{society.status}</Badge>
      )
    },
    {
      header: 'Kitchens',
      accessor: 'kitchens',
      className: 'text-center',
      render: (society) => <span className="font-medium text-slate-700 dark:text-slate-200">{society.kitchens}</span>
    },
    {
      header: 'Orders',
      accessor: 'totalOrders',
      className: 'text-center',
      render: (society) => <span className="font-medium text-slate-700 dark:text-slate-200">{society.totalOrders}</span>
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (society) => (
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onViewDetails(society); }} title="View Details">
            <Eye size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={(e) => { e.stopPropagation(); onDelete && onDelete(society); }} title="Delete">
            <Trash2 size={18} />
          </Button>
        </div>
      )
    }
  ];

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {societies.map((society) => (
          <div key={society.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <Building size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{society.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin size={12} />
                    {society.location}
                  </div>
                </div>
              </div>
              <Badge status={society.status.toLowerCase() === 'blocked' ? 'inactive' : society.status.toLowerCase()}>{society.status}</Badge>
            </div>
            
            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Admin</span>
                <span className="font-medium text-slate-700 dark:text-slate-200 flex items-center gap-1">
                  <User size={14} /> {society.admin}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Kitchens</span>
                <span className="font-medium text-slate-700 dark:text-slate-200">{society.kitchens}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Total Orders</span>
                <span className="font-medium text-slate-700 dark:text-slate-200">{society.totalOrders}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-2">
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={(e) => { e.stopPropagation(); onDelete && onDelete(society); }}>
                <Trash2 size={16} className="mr-1" /> Delete
              </Button>
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onViewDetails(society); }}>
                <Eye size={16} className="mr-1" /> View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Table 
      columns={columns} 
      data={societies} 
      onRowClick={onViewDetails}
    />
  );
}