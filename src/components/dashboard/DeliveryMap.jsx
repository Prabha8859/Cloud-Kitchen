import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { User, Clock } from 'lucide-react';

// Fix for default marker icon in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Example of a custom icon definition
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Example location pin icon
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35]
});

export default function DeliveryMap() {
  const [hoveredRiderId, setHoveredRiderId] = useState(null);
  const positions = [
    { id: 1, lat: 51.505, lng: -0.09, name: "London Kitchen" },
    { id: 2, lat: 40.7128, lng: -74.0060, name: "New York Hub" },
    { id: 3, lat: 28.6139, lng: 77.2090, name: "New Delhi Center" },
    { id: 4, lat: 35.6895, lng: 139.6917, name: "Tokyo Branch" },
    { id: 5, lat: -33.8688, lng: 151.2093, name: "Sydney Dispatch" }
  ];

  const activeRiders = [
    { id: 1, name: "Vikram Singh", status: "On Delivery", time: "12m", location: "Sector 62", phone: "+91 98765 43210", orderId: "#ORD-8852" },
    { id: 2, name: "Rahul Kumar", status: "Picking Up", time: "5m", location: "Sector 18", phone: "+91 98765 43211", orderId: "#ORD-9921" },
    { id: 3, name: "Amit Patel", status: "On Delivery", time: "28m", location: "Indirapuram", phone: "+91 98765 43212", orderId: "#ORD-7734" }
  ];

  // Note: To use this component, you must install dependencies:
  // npm install leaflet react-leaflet
  // If not installed, this will crash.

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-slate-700 h-full flex flex-col animate-fade-in-up hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Live Delivery Map</h3>
        <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg animate-pulse">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Live
        </span>
      </div>

      <div className="relative w-full h-64 bg-gray-100 dark:bg-slate-900 rounded-xl overflow-hidden mb-4 z-0">
        <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {positions.map((pos) => (
            <Marker key={pos.id} position={[pos.lat, pos.lng]} icon={customIcon}>
              <Popup>
                {pos.name}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="flex-1">
        <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Active Riders</h4>
        <div className="space-y-2">
          {activeRiders.map((rider) => (
            <div 
              key={rider.id} 
              className="relative flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors cursor-pointer group/item"
              onMouseEnter={() => setHoveredRiderId(rider.id)}
              onMouseLeave={() => setHoveredRiderId(null)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <User size={14} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white group-hover/item:text-blue-600 transition-colors">{rider.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{rider.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-md">
                <Clock size={12} />
                {rider.time}
              </div>

              {/* Tooltip */}
              {hoveredRiderId === rider.id && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-56 bg-gray-900 dark:bg-slate-950 text-white text-xs rounded-xl p-3 shadow-xl z-50 border border-gray-800 pointer-events-none animate-fade-in-up">
                  <div className="flex items-center justify-between border-b border-gray-700 pb-2 mb-2">
                    <span className="font-bold text-sm">{rider.name}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${rider.status === 'On Delivery' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                      {rider.status}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-gray-400"><span>Order ID:</span> <span className="text-gray-200">{rider.orderId}</span></div>
                    <div className="flex justify-between text-gray-400"><span>Phone:</span> <span className="text-gray-200">{rider.phone}</span></div>
                    <div className="flex justify-between text-gray-400"><span>Location:</span> <span className="text-gray-200">{rider.location}</span></div>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-slate-950"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}