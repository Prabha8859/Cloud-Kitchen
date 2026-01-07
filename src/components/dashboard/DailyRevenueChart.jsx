import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Menu } from 'lucide-react';

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
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Daily Revenue</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Lorem ipsum dolor</p>
        </div>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer">
          <Menu className="w-5 h-5 text-gray-400 dark:text-gray-300" />
        </button>
      </div>

      <div className="flex items-baseline gap-2 mb-6">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">$ 154K</h2>
        <span className="text-sm font-medium text-green-600">+ 1.5% than last week</span>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              domain={[0, 150]}
              ticks={[0, 30, 60, 90, 120, 150]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3b82f6" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}