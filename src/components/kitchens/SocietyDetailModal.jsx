import { X, Building, MapPin, User, Home, ShoppingBag } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import Button from '../UI/Button';
import Badge from '../UI/Badge';

export default function SocietyDetailModal({ society, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!society) return null;
  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />
      <div 
        className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Building className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{society.name}</h2>
              <div className="flex items-center gap-3 text-white/90 text-sm mt-1">
                <span className="flex items-center gap-1"><MapPin size={14} /> {society.location}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><User size={14} /> Admin: {society.admin}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm mb-2">
                <Home className="w-4 h-4" />
                Total Blocks
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{society.blocks}</div>
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
              <Badge status={society.status} className="text-base" />
            </div>
          </div>

          {/* Kitchens List (Placeholder) */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Registered Kitchens</h3>
            <div className="space-y-3">
               <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl text-center text-slate-500">
                  {society.kitchens > 0 ? `${society.kitchens} kitchens registered in this society.` : "No kitchens registered yet."}
               </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
             <Button variant="secondary" className="flex-1" onClick={onClose}>Close</Button>
             <Button variant="primary" className="flex-1">Manage Society</Button>
          </div>
        </div>
      </div>
    </div>
  , document.body);
}