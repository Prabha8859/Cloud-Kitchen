import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Customer Flow</h3>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">$2,780k</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">In Restaurant</p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">$1,410k</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Online Order</p>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
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
              domain={[0, 120]}
              ticks={[0, 30, 60, 90, 120]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Bar dataKey="restaurant" fill="#f97316" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="online" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}