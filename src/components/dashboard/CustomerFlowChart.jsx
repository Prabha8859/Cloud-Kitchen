import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MoreHorizontal, ChevronDown } from 'lucide-react';

const data = [
  { name: 'Mon', restaurant: 70, online: 50 },
  { name: 'Tue', restaurant: 40, online: 70 },
  { name: 'Wed', restaurant: 50, online: 80 },
  { name: 'Thu', restaurant: 60, online: 100 },
  { name: 'Fri', restaurant: 60, online: 90 },
  { name: 'Sat', restaurant: 60, online: 110 },
  { name: 'Sun', restaurant: 65, online: 120 },
];

export default function CustomerFlowChart() {
  const [timeRange, setTimeRange] = useState('Weekly');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-all duration-300 animate-fade-in-up group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Customer Flow</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">{timeRange} Overview</p>
        </div>
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
          >
            {timeRange} <ChevronDown size={14} />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-24 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-lg shadow-lg z-10 overflow-hidden">
              {['Weekly', 'Monthly'].map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setTimeRange(range);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">$2,780k</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">In Restaurant</p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">$1,410k</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Online Order</p>
        </div>
      </div>

      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.5} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 10 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 10 }}
              domain={[0, 120]}
              ticks={[0, 30, 60, 90, 120]}
              width={30}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Bar dataKey="restaurant" fill="#f97316" radius={[4, 4, 0, 0]} barSize={12} />
            <Bar dataKey="online" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={12} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}