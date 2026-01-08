import { useState } from 'react';
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

  // Dummy Kitchen Data
  const kitchens = [
    {
      id: 1,
      name: "Spice Garden Kitchen",
      owner: "Rajesh Kumar",
      phone: "+91 98765 43210",
      email: "rajesh@spicegarden.com",
      society: "Green Valley Heights",
      address: "Sector 62, Noida",
      rating: 4.8,
      totalOrders: 1250,
      status: "active",
      verified: true,
      cuisine: "North Indian, Chinese",
      joinedDate: "Jan 15, 2024"
    },
    {
      id: 2,
      name: "Mama's Kitchen",
      owner: "Priya Sharma",
      phone: "+91 98765 43211",
      email: "priya@mamaskitchen.com",
      society: "Lotus Apartments",
      address: "Sector 50, Noida",
      rating: 4.6,
      totalOrders: 890,
      status: "active",
      verified: true,
      cuisine: "South Indian, Continental",
      joinedDate: "Feb 20, 2024"
    },
    {
      id: 3,
      name: "Punjab Da Dhaba",
      owner: "Amarjeet Singh",
      phone: "+91 98765 43212",
      email: "amarjeet@punjabdhaba.com",
      society: "Royal Gardens",
      address: "Sector 75, Noida",
      rating: 4.9,
      totalOrders: 2100,
      status: "active",
      verified: true,
      cuisine: "Punjabi, Tandoor",
      joinedDate: "Dec 10, 2023"
    },
    {
      id: 4,
      name: "Healthy Bites",
      owner: "Sneha Patel",
      phone: "+91 98765 43213",
      email: "sneha@healthybites.com",
      society: "Sunshine Residency",
      address: "Sector 45, Noida",
      rating: 4.5,
      totalOrders: 670,
      status: "pending",
      verified: false,
      cuisine: "Healthy Food, Salads",
      joinedDate: "Mar 5, 2024"
    },
    {
      id: 5,
      name: "Biryani House",
      owner: "Mohammed Ali",
      phone: "+91 98765 43214",
      email: "ali@biryanihouse.com",
      society: "Paradise Complex",
      address: "Sector 18, Noida",
      rating: 4.7,
      totalOrders: 1560,
      status: "active",
      verified: true,
      cuisine: "Biryani, Mughlai",
      joinedDate: "Nov 8, 2023"
    },
    {
      id: 6,
      name: "Italian Corner",
      owner: "Neha Gupta",
      phone: "+91 98765 43215",
      email: "neha@italiancorner.com",
      society: "Silver Oak Society",
      address: "Sector 92, Noida",
      rating: 4.4,
      totalOrders: 450,
      status: "inactive",
      verified: true,
      cuisine: "Italian, Pizza",
      joinedDate: "Jan 30, 2024"
    },
    {
      id: 7,
      name: "Desi Tadka",
      owner: "Vikram Singh",
      phone: "+91 98765 43216",
      email: "vikram@desitadka.com",
      society: "Blue Ridge Apartments",
      address: "Sector 78, Noida",
      rating: 4.3,
      totalOrders: 320,
      status: "pending",
      verified: false,
      cuisine: "North Indian, Street Food",
      joinedDate: "Dec 28, 2024"
    }
  ];

  // Filter kitchens based on status and search
  const filteredKitchens = kitchens.filter(kitchen => {
    const matchesStatus = filterStatus === 'all' || kitchen.status === filterStatus;
    const matchesSearch = kitchen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          kitchen.society.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          kitchen.owner.toLowerCase().includes(searchTerm.toLowerCase());
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
      />

      {/* Kitchens List Table */}
      {filteredKitchens.length > 0 ? (
        <KitchensListTable 
          kitchens={filteredKitchens} 
          onViewDetails={handleViewDetails} 
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