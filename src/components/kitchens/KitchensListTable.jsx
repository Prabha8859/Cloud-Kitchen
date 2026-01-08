import { useState } from 'react';
import { ChefHat, MapPin, Star, Phone, Mail, MoreVertical, Eye, CheckCircle, Ban, Building } from 'lucide-react';
import Button from '../UI/Button';
import Badge from '../UI/Badge';

export default function KitchensListTable({ kitchens, onViewDetails }) {
  const [showActions, setShowActions] = useState(null);

  const handleAction = (action, kitchen) => {
    console.log(`${action} action for`, kitchen.name);
    setShowActions(null);
  };

  const handleViewDetails = (kitchen) => {
    if (onViewDetails) {
      onViewDetails(kitchen);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[1200px] text-left text-sm text-slate-600 dark:text-slate-300">
          <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white font-semibold border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-6 py-4">Kitchen Name</th>
              <th className="px-6 py-4">Owner</th>
              <th className="px-6 py-4">Society</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Cuisine</th>
              <th className="px-6 py-4 text-center">Orders</th>
              <th className="px-6 py-4 text-center">Rating</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {kitchens.map((kitchen) => (
              <tr 
                key={kitchen.id} 
                className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer"
                onClick={() => handleViewDetails(kitchen)}
              >
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white">
                      <ChefHat className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold">{kitchen.name}</div>
                      {kitchen.verified && (
                        <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 mt-0.5">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-slate-900 dark:text-white font-medium">{kitchen.owner}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-start gap-2">
                    <Building className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">{kitchen.society}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{kitchen.address}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{kitchen.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate max-w-[150px]">{kitchen.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {kitchen.cuisine.split(', ').slice(0, 2).map((item, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-xs font-medium rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center min-w-[3rem] px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 font-semibold text-blue-700 dark:text-blue-400">
                    {kitchen.totalOrders}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-slate-900 dark:text-white">{kitchen.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <Badge status={kitchen.status} />
                </td>
                <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="relative inline-block">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowActions(showActions === kitchen.id ? null : kitchen.id);
                      }}
                    >
                      <MoreVertical size={18} />
                    </Button>

                    {showActions === kitchen.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-700 rounded-lg shadow-lg border border-slate-200 dark:border-slate-600 z-10">
                        <div className="py-1">
                          <button
                            onClick={() => handleViewDetails(kitchen)}
                            className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                          {kitchen.status === 'pending' && (
                            <button
                              onClick={() => handleAction('approve', kitchen)}
                              className="w-full px-4 py-2 text-left text-sm text-green-600 dark:text-green-400 hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center gap-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Approve Kitchen
                            </button>
                          )}
                          {kitchen.status === 'active' && (
                            <button
                              onClick={() => handleAction('block', kitchen)}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center gap-2"
                            >
                              <Ban className="w-4 h-4" />
                              Block Kitchen
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