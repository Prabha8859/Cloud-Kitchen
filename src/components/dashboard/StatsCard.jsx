import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatsCard({ icon: Icon, value, label, trend, trendValue, iconColor, iconBg }) {
  const isPositive = trend === 'up';
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-all duration-300 animate-fade-in-up cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-xl ${iconBg} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 shadow-inner`}>
          <Icon className={`w-6 h-6 ${iconColor}`} strokeWidth={2} />
        </div>
        {trendValue && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${isPositive ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'}`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{value}</h3>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
      </div>
    </div>
  );
}