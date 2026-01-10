import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import PageHeader from '../components/UI/PageHeader';

const Commission = () => {
  return (
    <DashboardLayout>
      <PageHeader 
        title="Commission Management" 
        subtitle="Manage commission rates and view earnings history"
      />
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 border border-slate-200 dark:border-slate-700">
        <p className="text-gray-500 dark:text-gray-400">Manage commission rates and view earnings history here.</p>
      </div>
    </DashboardLayout>
  );
};

export default Commission;