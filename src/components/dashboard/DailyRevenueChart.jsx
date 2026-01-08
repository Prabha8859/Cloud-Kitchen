import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MoreHorizontal } from 'lucide-react';

const data = [
  { name: 'Mon', revenue: 30 },
  { name: 'Tue', revenue: 50 },
  { name: 'Wed', revenue: 25 },
  { name: 'Thu', revenue: 70 },
  { name: 'Fri', revenue: 40 },
  { name: 'Sat', revenue: 90 },
  { name: 'Sun', revenue: 150 },
];

export default function DailyRevenueChart() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-all duration-300 animate-fade-in-up group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Daily Revenue</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">Weekly Performance</p>
        </div>
        <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-baseline gap-2 mb-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">$154K</h2>
        <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">+ 1.5%</span>
      </div>

      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
              domain={[0, 150]}
              ticks={[0, 50, 100, 150]}
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
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}