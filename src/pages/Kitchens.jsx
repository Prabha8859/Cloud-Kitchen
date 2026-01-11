import { useState } from 'react';
import { useGetPendingKitchensQuery } from '../api/kitchens/kitchensApi';
import { Plus, ChefHat } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import PageHeader from '../components/UI/PageHeader';
import Button from '../components/UI/Button';
import KitchensSummary from '../components/kitchens/KitchensSummary';
import KitchensFilters from '../components/kitchens/KitchensFilters';
import KitchensListTable from '../components/kitchens/KitchensListTable';
import KitchenDetailModal from '../components/kitchens/KitchenDetailModal';

export default function Kitchens() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKitchen, setSelectedKitchen] = useState(null);
  const [viewMode, setViewMode] = useState('list');

  const { data: apiKitchens = [], isLoading: loading, isError, error } = useGetPendingKitchensQuery();

  // Accept multiple possible shapes from the API (array, {kitchens: []}, {data: {kitchens: []}})
  const rawKitchens = Array.isArray(apiKitchens)
    ? apiKitchens
    : apiKitchens?.kitchens || apiKitchens?.data?.kitchens || [];

  const kitchens = (rawKitchens || []).map((k) => {
    const owner = k.ownerId || k.owner || {};
    const society = typeof k.societyName === 'string' ? k.societyName : (k.society?.name || k.society || '—');
    const cuisineArr = Array.isArray(k.cuisineType) ? k.cuisineType : (Array.isArray(k.cuisine) ? k.cuisine : []);

    return {
      id: k._id || k.id || '',
      name: (k.name || k.kitchenName || '').toString(),
      owner: (owner.fullName || owner.name || owner.ownerName || '—').toString(),
      phone: (owner.mobile || owner.phone || owner.contact || '—').toString(),
      email: (owner.email || '').toString(),
      society: society.toString(),
      address: (k.fullAddress || k.address || '').toString(),
      rating: Number(k.rating || 0),
      totalOrders: Number(k.totalOrders || k.total_orders || 0),
      status: (k.status || '').toString().toLowerCase(),
      verified: !!k.isVerified,
      cuisine: cuisineArr.join(', '),
      raw: k,
    };
  });

  // Filter kitchens based on status and search
  const q = (searchTerm || '').toString().toLowerCase();
  const filteredKitchens = kitchens.filter(kitchen => {
    const matchesStatus = filterStatus === 'all' || (kitchen.status || '') === filterStatus;
    const matchesSearch = q === '' || [kitchen.name, kitchen.society, kitchen.owner]
      .map(v => (v || '').toString().toLowerCase())
      .some(s => s.includes(q));
    return matchesStatus && matchesSearch;
  });

  const handleViewDetails = (kitchen) => {
    setSelectedKitchen(kitchen);
  };

  const handleCloseModal = () => {
    setSelectedKitchen(null);
  };

  const handleExport = () => {
    console.log('Exporting kitchen data...');
    // Add export logic here
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <PageHeader
        title="Kitchen Management"
        subtitle="Manage and monitor all registered cloud kitchens"
        rightContent={
          <Button variant="primary" icon={Plus}>
            Add Kitchen
          </Button>
        }
      />

      {/* Summary Cards */}
      <KitchensSummary />

      {/* Filters */}
      <KitchensFilters
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onExport={handleExport}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onClearFilters={handleClearFilters}
      />

      {/* Kitchens List Table */}
      {loading ? (
        <div className="p-6">Loading kitchens...</div>
      ) : isError ? (
        <div className="p-6 text-center text-red-600">Failed to load kitchens: {error?.data?.message || error?.message || 'Unknown error'}</div>
      ) : filteredKitchens.length > 0 ? (
        <KitchensListTable 
          kitchens={filteredKitchens} 
          onViewDetails={handleViewDetails}
          viewMode={viewMode}
        />
      ) : (
        /* Empty State */
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-12 text-center">
          <ChefHat className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No kitchens found</h3>
          <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters or search term</p>
        </div>
      )}

      {/* Kitchen Detail Modal */}
      {selectedKitchen && (
        <KitchenDetailModal 
          kitchen={selectedKitchen} 
          onClose={handleCloseModal} 
        />
      )}
    </DashboardLayout>
  );
}