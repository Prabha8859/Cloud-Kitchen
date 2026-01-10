import { X, ChefHat, MapPin, Phone, Mail, Star, ShoppingBag, TrendingUp, AlertCircle, Calendar, Building, CheckCircle, DollarSign } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import Button from '../UI/Button';
import Badge from '../UI/Badge';

export default function KitchenDetailModal({ kitchen, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!kitchen) return null;

  // Dummy performance data
  const performanceStats = {
    totalEarnings: "₹1,24,500",
    avgOrderValue: "₹285",
    cancellationRate: "3.2%",
    responseTime: "12 mins"
  };

  // Dummy recent orders
  const recentOrders = [
    { id: "#ORD-1234", customer: "Rahul Sharma", amount: "₹450", status: "delivered", date: "Jan 8, 2026" },
    { id: "#ORD-1235", customer: "Priya Singh", amount: "₹620", status: "delivered", date: "Jan 8, 2026" },
    { id: "#ORD-1236", customer: "Amit Kumar", amount: "₹340", status: "pending", date: "Jan 8, 2026" },
  ];

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div 
        className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-500 px-6 py-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold text-white">{kitchen.name}</h2>
                {kitchen.verified && (
                  <CheckCircle className="w-5 h-5 text-white" />
                )}
              </div>
              <div className="flex items-center gap-3 text-white/90 text-sm">
                <span>Owner: {kitchen.owner}</span>
                <span>•</span>
                <span>Joined {kitchen.joinedDate}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm mb-2">
                <ShoppingBag className="w-4 h-4" />
                Total Orders
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{kitchen.totalOrders}</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm mb-2">
                <Star className="w-4 h-4" />
                Rating
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{kitchen.rating} ⭐</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm mb-2">
                <DollarSign className="w-4 h-4" />
                Earnings
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{performanceStats.totalEarnings}</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm mb-2">
                Status
              </div>
              <Badge status={kitchen.status} className="text-base" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-5">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-700 dark:text-slate-300">{kitchen.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-700 dark:text-slate-300">{kitchen.email}</span>
                  </div>
                </div>
              </div>

              {/* Society & Location */}
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-5">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Location Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Society</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{kitchen.society}</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">{kitchen.address}</span>
                  </div>
                </div>
              </div>

              {/* Cuisine Types */}
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-5">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Cuisine Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {kitchen.cuisine.split(', ').map((item, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1.5 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-sm font-medium rounded-lg"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Performance Metrics */}
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-5">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Avg Order Value</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white">{performanceStats.avgOrderValue}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Response Time</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white">{performanceStats.responseTime}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Earnings</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white">{performanceStats.totalEarnings}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Cancellation Rate</div>
                    <div className="text-lg font-bold text-red-600 dark:text-red-400">{performanceStats.cancellationRate}</div>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-5">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Recent Orders
                </h3>
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div 
                      key={order.id}
                      className="bg-white dark:bg-slate-700 rounded-lg p-3 border border-slate-200 dark:border-slate-600"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{order.id}</span>
                        <Badge status={order.status} />
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                        <span>{order.customer}</span>
                        <span className="font-bold text-slate-900 dark:text-white">{order.amount}</span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{order.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            {kitchen.status === 'pending' && (
              <>
                <Button variant="primary" className="flex-1">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Kitchen
                </Button>
                <Button variant="danger" className="flex-1">
                  Reject Application
                </Button>
              </>
            )}
            {kitchen.status === 'active' && (
              <>
                <Button variant="secondary" className="flex-1">
                  Send Warning
                </Button>
                <Button variant="danger" className="flex-1">
                  Block Kitchen
                </Button>
              </>
            )}
            {kitchen.status === 'inactive' && (
              <Button variant="primary" className="flex-1">
                Activate Kitchen
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}