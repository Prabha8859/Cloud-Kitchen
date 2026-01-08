import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import PageHeader from '../components/UI/PageHeader';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import SocietiesSummary from '../components/societies/SocietiesSummary';
import SocietiesListTable from '../components/societies/SocietiesListTable';
import SocietyDetailModal from '../components/societies/SocietyDetailModal';
import AddSocietyModal from '../components/societies/AddSocietyModal';

export default function Societies() {
  const [selectedSociety, setSelectedSociety] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
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

  const filteredSocieties = societies.filter(society => 
    society.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    society.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    society.admin.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {/* Search Filter */}
      <div className="mb-6 max-w-md">
        <Input
          icon={Search}
          placeholder="Search by name, location or admin..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Societies List Table */}
      <SocietiesListTable societies={filteredSocieties} onViewDetails={handleViewDetails} />

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