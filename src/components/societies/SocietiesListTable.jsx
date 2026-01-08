import { useState } from 'react';
import { Building, MoreVertical, Eye, CheckCircle, Ban, MapPin, Users } from 'lucide-react';
import Button from '../UI/Button';
import Badge from '../UI/Badge';

export default function SocietiesListTable({ societies = [], onViewDetails }) {
  const [selectedSociety, setSelectedSociety] = useState(null);
  const [showActions, setShowActions] = useState(null);

  const handleAction = (action, society) => {
    console.log(`${action} action for`, society.name);
    setShowActions(null);
    // Add your action logic here
  };

  const handleViewDetails = (society) => {
    if (onViewDetails) {
      onViewDetails(society);
    }
  };

  if (societies.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-12 text-center">
        <Building className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No societies found</h3>
        <p className="text-slate-500 dark:text-slate-400">Get started by adding a new society.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
          <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white font-semibold border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-6 py-4">Society Name</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Admin</th>
              <th className="px-6 py-4 text-center">Blocks</th>
              <th className="px-6 py-4 text-center">Kitchens</th>
              <th className="px-6 py-4 text-center">Total Orders</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {societies.map((society) => (
              <tr 
                key={society.id} 
                className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer"
                onClick={() => handleViewDetails(society)}
              >
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                      <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-semibold">{society.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        <Users className="w-3 h-3" />
                        {society.admin}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <MapPin className="w-4 h-4" />
                    {society.location}
                  </div>
                </td>
                <td className="px-6 py-4">{society.admin}</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 font-semibold text-slate-900 dark:text-white">
                    {society.blocks}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center min-w-[2rem] px-2 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/20 font-semibold text-purple-700 dark:text-purple-400">
                    {society.kitchens}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="font-semibold text-slate-900 dark:text-white">{society.totalOrders}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <Badge status={society.status} />
                </td>
                <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="relative inline-block">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowActions(showActions === society.id ? null : society.id);
                      }}
                    >
                      <MoreVertical size={18} />
                    </Button>

                    {showActions === society.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-700 rounded-lg shadow-lg border border-slate-200 dark:border-slate-600 z-10">
                        <div className="py-1">
                          <button
                            onClick={() => handleViewDetails(society)}
                            className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                          {society.status === 'Pending' && (
                            <button
                              onClick={() => handleAction('approve', society)}
                              className="w-full px-4 py-2 text-left text-sm text-green-600 dark:text-green-400 hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center gap-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Approve
                            </button>
                          )}
                          {society.status === 'Active' && (
                            <button
                              onClick={() => handleAction('block', society)}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center gap-2"
                            >
                              <Ban className="w-4 h-4" />
                              Block Society
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}