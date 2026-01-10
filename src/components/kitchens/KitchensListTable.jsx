import { useState } from 'react';
import { ChefHat, MapPin, Star, Phone, Mail, MoreVertical, Eye, CheckCircle, Ban, Building } from 'lucide-react';
import Button from '../UI/Button';
import Badge from '../UI/Badge';
import Table from '../UI/Table';

export default function KitchensListTable({ kitchens, onViewDetails, viewMode = 'list' }) {
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

  const columns = [
    {
      header: 'Kitchen Name',
      accessor: 'name',
      render: (kitchen) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-slate-900 dark:text-white">{kitchen.name}</div>
            {kitchen.verified && (
              <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 mt-0.5">
                <CheckCircle className="w-3 h-3" />
                Verified
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      header: 'Owner',
      accessor: 'owner',
      render: (kitchen) => <span className="text-slate-900 dark:text-white font-medium">{kitchen.owner}</span>
    },
    {
      header: 'Society',
      accessor: 'society',
      render: (kitchen) => (
        <div className="flex items-start gap-2">
          <Building className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium text-slate-900 dark:text-white">{kitchen.society}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{kitchen.address}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Contact',
      accessor: 'contact',
      render: (kitchen) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Phone className="w-3.5 h-3.5" />
            <span>{kitchen.phone}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Mail className="w-3.5 h-3.5" />
            <span className="truncate max-w-[150px]">{kitchen.email}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Cuisine',
      accessor: 'cuisine',
      render: (kitchen) => (
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
      )
    },
    {
      header: 'Orders',
      accessor: 'totalOrders',
      className: 'text-center',
      render: (kitchen) => (
        <span className="inline-flex items-center justify-center min-w-[3rem] px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 font-semibold text-blue-700 dark:text-blue-400">
          {kitchen.totalOrders}
        </span>
      )
    },
    {
      header: 'Rating',
      accessor: 'rating',
      className: 'text-center',
      render: (kitchen) => (
        <div className="flex items-center justify-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-slate-900 dark:text-white">{kitchen.rating}</span>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      className: 'text-center',
      render: (kitchen) => <Badge status={kitchen.status} />
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (kitchen) => (
        <div className="relative inline-block text-left">
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
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-700 rounded-lg shadow-lg border border-slate-200 dark:border-slate-600 z-50">
              <div className="py-1">
                <button
                  onClick={(e) => { e.stopPropagation(); handleViewDetails(kitchen); setShowActions(null); }}
                  className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                {kitchen.status === 'pending' && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleAction('approve', kitchen); }}
                    className="w-full px-4 py-2 text-left text-sm text-green-600 dark:text-green-400 hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve Kitchen
                  </button>
                )}
                {kitchen.status === 'active' && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleAction('block', kitchen); }}
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
      )
    }
  ];

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kitchens.map((kitchen) => (
          <div key={kitchen.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white shadow-sm">
                  <ChefHat className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight">{kitchen.name}</h3>
                  {kitchen.verified && (
                    <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 mt-1">
                      <CheckCircle className="w-3 h-3" />
                      Verified Kitchen
                    </div>
                  )}
                </div>
              </div>
              <Badge status={kitchen.status} />
            </div>
            
            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm pb-2 border-b border-slate-100 dark:border-slate-700/50">
                <span className="text-slate-500 dark:text-slate-400">Owner</span>
                <span className="font-medium text-slate-700 dark:text-slate-200">{kitchen.owner}</span>
              </div>
              <div className="flex justify-between text-sm pb-2 border-b border-slate-100 dark:border-slate-700/50">
                <span className="text-slate-500 dark:text-slate-400">Society</span>
                <span className="font-medium text-slate-700 dark:text-slate-200 flex items-center gap-1">
                  <Building className="w-3 h-3" /> {kitchen.society}
                </span>
              </div>
              <div className="flex justify-between text-sm pb-2 border-b border-slate-100 dark:border-slate-700/50">
                <span className="text-slate-500 dark:text-slate-400">Rating</span>
                <span className="font-medium text-slate-700 dark:text-slate-200 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {kitchen.rating}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Total Orders</span>
                <span className="font-medium text-slate-700 dark:text-slate-200">{kitchen.totalOrders}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                className="flex-1 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                onClick={(e) => { e.stopPropagation(); handleViewDetails(kitchen); }}
              >
                <Eye className="w-4 h-4 mr-2" /> View
              </Button>
              <Button 
                variant="ghost" 
                className="flex-1 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
              >
                <Phone className="w-4 h-4 mr-2" /> Contact
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
      data={kitchens} 
      onRowClick={handleViewDetails}
    />
  );
}