import { Heart } from 'lucide-react';

export default function TodaysSpecial() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full animate-fade-in-up group">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Today's Special</h3>

      <div className="relative rounded-xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop" 
          alt="Special Pizza" 
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-orange-500 shadow-sm">
          Hot Deal
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1 group-hover:text-orange-500 transition-colors">Spicy Pizza with Extra Cheese</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-1">Fresh mozzarella, pepperoni, and spicy jalapeños</p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">$6.53</span>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 transition-colors">
              <Heart className="w-4 h-4 fill-current" />
            </button>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">256k</span>
          </div>
        </div>
      </div>
    </div>
  );
}