import { useState } from 'react';
import { Plus, MapPin, User, Building } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import PageHeader from '../components/UI/PageHeader';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';
import SocietiesSummary from '../components/societies/SocietiesSummary';
import SocietiesListTable from '../components/societies/SocietiesListTable';
import SocietyDetailModal from '../components/kitchens/SocietyDetailModal';
import AddSocietyModal from '../components/kitchens/AddSocietyModal';
import CommonFilters from '../components/UI/CommonFilters';

export default function Societies() {
  const [selectedSociety, setSelectedSociety] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [societies, setSocieties] = useState([
    { 
      id: 1, 
      name: "Gokuldham Society", 
      location: "Mumbai, Goregaon", 
      admin: "Bhide", 
      status: "Active", 
      kitchens: 12,
      totalOrders: 345,
      blocks: 4
    },
    { 
      id: 2, 
      name: "Blue Ridge", 
      location: "Pune, Hinjewadi", 
      admin: "Rahul Roy", 
      status: "Active", 
      kitchens: 8,
      totalOrders: 189,
      blocks: 3
    },
    { 
      id: 3, 
      name: "Prestige Lakeside", 
      location: "Bangalore, Varthur", 
      admin: "Anita Desai", 
      status: "Pending", 
      kitchens: 0,
      totalOrders: 0,
      blocks: 2
    },
    { 
      id: 4, 
      name: "DLF Cyber City", 
      location: "Gurgaon, Sector 24", 
      admin: "Vikram Malhotra", 
      status: "Active", 
      kitchens: 25,
      totalOrders: 892,
      blocks: 6
    },
    { 
      id: 5, 
      name: "Lotus Panache", 
      location: "Noida, Sector 110", 
      admin: "Suresh Raina", 
      status: "Blocked", 
      kitchens: 3,
      totalOrders: 45,
      blocks: 2
    },
    { 
      id: 6, 
      name: "Green Valley Heights", 
      location: "Delhi, Dwarka", 
      admin: "Meera Singh", 
      status: "Active", 
      kitchens: 15,
      totalOrders: 567,
      blocks: 4
    },
    { 
      id: 7, 
      name: "Royal Residency", 
      location: "Noida, Sector 62", 
      admin: "Karan Kapoor", 
      status: "Pending", 
      kitchens: 0,
      totalOrders: 0,
      blocks: 3
    },
  ]);

  const handleViewDetails = (society) => {
    setSelectedSociety(society);
  };

  const handleCloseModal = () => {
    setSelectedSociety(null);
  };

  const handleAddSociety = (newSocietyData) => {
    console.log("New Society Data:", newSocietyData);
    // Here you would typically make an API call to save the data
    setShowAddModal(false);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
  };

  const handleDeleteSociety = (society) => {
    console.log("Delete society:", society);
  };

  const filteredSocieties = societies.filter(society => {
    const matchesSearch = society.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    society.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    society.admin.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || society.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      {/* Page Header */}
      <PageHeader
        title="Societies Management"
        subtitle="Manage registered residential societies and their kitchens"
        rightContent={
          <Button variant="primary" icon={Plus} onClick={() => setShowAddModal(true)}>
            Add Society
          </Button>
        }
      />

      {/* Summary Cards */}
      <SocietiesSummary />

      {/* Common Filters */}
      <CommonFilters
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        filterStatus={filterStatus}
        onFilterChange={(e) => setFilterStatus(e.target.value)}
        onClearFilters={handleClearFilters}
        viewMode={viewMode}
        onViewChange={setViewMode}
        placeholder="Search by name, location or admin..."
      />

      {/* Content Area */}
      <SocietiesListTable 
        societies={filteredSocieties} 
        onViewDetails={handleViewDetails} 
        onDelete={handleDeleteSociety}
        viewMode={viewMode} 
      />

      {/* Society Detail Modal */}
      {selectedSociety && (
        <SocietyDetailModal 
          society={selectedSociety} 
          onClose={handleCloseModal} 
        />
      )}

      {/* Add Society Modal */}
      <AddSocietyModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddSociety}
      />
    </DashboardLayout>
  );
}