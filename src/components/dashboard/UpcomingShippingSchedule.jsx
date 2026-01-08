import { Send, ArrowRight } from 'lucide-react';

export default function UpcomingShippingSchedule() {
  const shipments = [
    {
      id: 1,
      name: 'Stepni Doe',
      items: '3 items',
      time: '10:12 am',
      address: '8817 Sand Pine Dr, Navarre, FL, 32566',
      avatar: 'SD'
    },
    {
      id: 2,
      name: 'Mical clark',
      items: '2 items',
      time: '12:12 am',
      address: '8817 Sand Pine Dr, Navarre, FL, 32566',
      avatar: 'MC'
    },
    {
      id: 3,
      name: 'Steponi mohan',
      items: '7 items',
      time: '11:12 am',
      address: '8817 Sand Pine Dr, Navarre, FL, 32566',
      avatar: 'SM'
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 animate-fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Upcoming Shipping Schedule</h3>
        <button className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1 transition-colors">
          View All <ArrowRight size={14} />
        </button>
      </div>

      <div className="space-y-3">
        {shipments.map((shipment) => (
          <div 
            key={shipment.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/30 rounded-xl hover:bg-white dark:hover:bg-slate-700 border border-transparent hover:border-gray-100 dark:hover:border-slate-600 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                {shipment.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{shipment.name}</h4>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-1.5 py-0.5 rounded">({shipment.items})</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">will be shipping on {shipment.time}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">{shipment.address}</p>
              </div>
            </div>

            <button className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors ml-2 shadow-sm group-hover:scale-105">
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}