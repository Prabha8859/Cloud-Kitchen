import { Heart } from 'lucide-react';

export default function TodaysSpecial() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300 h-full">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Today's Special</h3>

      <div className="relative rounded-xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop" 
          alt="Special Pizza" 
          className="w-full h-64 object-cover"
        />
      </div>

      <div className="mt-4">
        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Spicy Pizza with Extra Cheese</h4>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">$6.53</span>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-blue-500 text-blue-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">256k</span>
          </div>
        </div>
      </div>
    </div>
  );
}