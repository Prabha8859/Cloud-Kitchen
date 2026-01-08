import { X, Building, MapPin, Users, Home, ChefHat, ShoppingBag, Star } from 'lucide-react';
import Button from '../UI/Button';
import Badge from '../UI/Badge';

export default function SocietyDetailModal({ society, onClose }) {
  if (!society) return null;

  // Dummy kitchens data for the selected society
  const kitchens = [
    { id: 1, name: "Mama's Kitchen", owner: "Priya Sharma", rating: 4.5, orders: 234 },
    { id: 2, name: "Spice Paradise", owner: "Rajesh Kumar", rating: 4.8, orders: 456 },
    { id: 3, name: "Home Delights", owner: "Anjali Verma", rating: 4.2, orders: 189 },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in-up" onClick={onClose}>
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-shrink-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 md:px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
              <Building className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{society.name}</h2>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-1">
                <MapPin className="w-4 h-4" />
                {society.location}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 space-y-6 overflow-y-auto">
          {/* Status and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm mb-2">
                <Home className="w-4 h-4" />
                Blocks
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{society.blocks}</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm mb-2">
                <ChefHat className="w-4 h-4" />
                Kitchens
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{society.kitchens}</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm mb-2">
                <ShoppingBag className="w-4 h-4" />
                Total Orders
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{society.totalOrders}</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm mb-2">
                Status
              </div>
              <Badge status={society.status} />
            </div>
          </div>

          {/* Admin Info */}
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Society Admin
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                {society.admin.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">{society.admin}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Primary Contact</div>
              </div>
            </div>
          </div>

          {/* Kitchens List */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <ChefHat className="w-5 h-5" />
              Registered Kitchens ({kitchens.length})
            </h3>
            
            {society.status === 'Pending' ? (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No kitchens available yet. Society is pending approval.</p>
              </div>
            ) : society.kitchens === 0 ? (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <ChefHat className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No kitchens registered in this society yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {kitchens.map((kitchen) => (
                  <div 
                    key={kitchen.id}
                    className="bg-white dark:bg-slate-700 rounded-xl p-4 border border-slate-200 dark:border-slate-600 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-xl">
                          🍳
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">{kitchen.name}</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">Owner: {kitchen.owner}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-yellow-500 mb-1">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-semibold">{kitchen.rating}</span>
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">{kitchen.orders} orders</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            {society.status === 'Pending' && (
              <>
                <Button variant="primary" className="flex-1">
                  Approve Society
                </Button>
                <Button variant="danger" className="flex-1">
                  Reject Request
                </Button>
              </>
            )}
            {society.status === 'Active' && (
              <Button variant="danger" className="flex-1">
                Block Society
              </Button>
            )}
            {society.status === 'Blocked' && (
              <Button variant="primary" className="flex-1">
                Unblock Society
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}