import { useState } from 'react';
import DashboardLayout from "../components/layout/DashboardLayout";
import PageHeader from "../components/UI/PageHeader";
import Button from "../components/UI/Button";
import Badge from "../components/UI/Badge";
import Input from "../components/UI/Input";
import { 
  ChefHat, 
  MapPin, 
  Star, 
  Phone, 
  Mail, 
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

export default function Kitchens() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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
    }
  ];

  const filteredKitchens = kitchens.filter(kitchen => {
    const matchesStatus = filterStatus === 'all' || kitchen.status === filterStatus;
    const matchesSearch = kitchen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          kitchen.society.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <DashboardLayout>
      <PageHeader
        title="Kitchen Management"
        subtitle="Manage and monitor all registered kitchens"
        rightContent={
          <div className="flex items-center gap-3">
            <Button variant="secondary" icon={Download}>
              Export
            </Button>
            <Button variant="primary" icon={Plus}>
              Add Kitchen
            </Button>
          </div>
        }
      />

      {/* Filters Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-gray-700">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filter:</span>
            </div>
            {['all', 'active', 'pending', 'inactive'].map((status) => (
              <Button
                key={status}
                onClick={() => setFilterStatus(status)}
                variant={filterStatus === status ? 'primary' : 'ghost'}
                size="sm"
                className={filterStatus !== status ? 'bg-gray-100 hover:bg-gray-200' : ''}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
          <Input
            icon={Search}
            type="text"
            placeholder="Search by name or society..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64"
          />
        </div>
      </div>

      {/* Kitchen Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredKitchens.map((kitchen) => (
          <div 
            key={kitchen.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{kitchen.name}</h3>
                    <p className="text-white/80 text-sm">{kitchen.owner}</p>
                  </div>
                </div>
                {kitchen.verified && (
                  <Badge status="active" className="bg-white/20 text-white border-transparent">Verified</Badge>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              {/* Status and Rating */}
              <div className="flex items-center justify-between">
                <Badge status={kitchen.status} />
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-800">{kitchen.rating}</span>
                  <span className="text-sm text-gray-500">({kitchen.totalOrders})</span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">{kitchen.society}</p>
                    <p className="text-gray-500">{kitchen.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{kitchen.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{kitchen.email}</span>
                </div>
              </div>

              {/* Cuisine Tags */}
              <div className="flex flex-wrap gap-2">
                {kitchen.cuisine.split(', ').map((item, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-1 bg-orange-50 text-orange-600 text-xs font-medium rounded-lg"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
                <div>
                  <p className="text-gray-500">Total Orders</p>
                  <p className="font-bold text-gray-800">{kitchen.totalOrders}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500">Joined</p>
                  <p className="font-bold text-gray-800">{kitchen.joinedDate}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2">
                <Button variant="secondary" size="sm" icon={Eye} className="flex-1 text-blue-600 hover:bg-blue-50 border-blue-100">
                  View
                </Button>
                <Button variant="secondary" size="sm" icon={Edit} className="flex-1 text-green-600 hover:bg-green-50 border-green-100">
                  Edit
                </Button>
                <Button variant="danger" size="icon">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredKitchens.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
          <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No kitchens found</h3>
          <p className="text-gray-500">Try adjusting your filters or search term</p>
        </div>
      )}
    </DashboardLayout>
  );
}