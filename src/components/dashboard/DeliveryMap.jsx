import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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
  const positions = [
    { id: 1, lat: 51.505, lng: -0.09, name: "London Kitchen" },
    { id: 2, lat: 40.7128, lng: -74.0060, name: "New York Hub" },
    { id: 3, lat: 28.6139, lng: 77.2090, name: "New Delhi Center" },
    { id: 4, lat: 35.6895, lng: 139.6917, name: "Tokyo Branch" },
    { id: 5, lat: -33.8688, lng: 151.2093, name: "Sydney Dispatch" }
  ];

  // Note: To use this component, you must install dependencies:
  // npm install leaflet react-leaflet
  // If not installed, this will crash.

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-slate-700 h-full flex flex-col animate-fade-in-up hover:shadow-xl transition-all duration-300 group">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Delivery Map</h3>

      <div className="relative w-full h-80 bg-gray-100 dark:bg-slate-900 rounded-xl overflow-hidden">
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
    </div>
  );
}