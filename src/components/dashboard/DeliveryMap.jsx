export default function DeliveryMap() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-slate-700 h-full flex flex-col animate-fade-in-up hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Delivery Map</h3>

      <div className="relative w-full flex-1 min-h-[400px] bg-gray-100 dark:bg-slate-900 rounded-xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=800&fit=crop" 
          alt="World Map" 
          className="w-full h-full object-cover opacity-20"
        />
        
        {/* Delivery Points - Simulated */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Europe Cluster */}
            <div className="absolute" style={{ top: '25%', left: '48%' }}>
              <div className="relative">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-3 h-3 bg-gray-800 border-2 border-white rounded-full shadow-lg"
                    style={{ 
                      top: `${Math.random() * 40 - 20}px`, 
                      left: `${Math.random() * 40 - 20}px` 
                    }}
                  ></div>
                ))}
                {/* Connection lines */}
                <svg className="absolute" style={{ top: '-50px', left: '-50px', width: '150px', height: '150px' }}>
                  <line x1="50" y1="50" x2="70" y2="40" stroke="#333" strokeWidth="1" opacity="0.3" />
                  <line x1="50" y1="50" x2="30" y2="60" stroke="#333" strokeWidth="1" opacity="0.3" />
                  <line x1="50" y1="50" x2="60" y2="70" stroke="#333" strokeWidth="1" opacity="0.3" />
                </svg>
              </div>
            </div>

            {/* Asia Cluster */}
            <div className="absolute" style={{ top: '35%', left: '70%' }}>
              <div className="relative">
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-3 h-3 bg-gray-800 border-2 border-white rounded-full shadow-lg"
                    style={{ 
                      top: `${Math.random() * 30 - 15}px`, 
                      left: `${Math.random() * 30 - 15}px` 
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* North America */}
            <div className="absolute" style={{ top: '30%', left: '20%' }}>
              <div className="w-3 h-3 bg-gray-800 border-2 border-white rounded-full shadow-lg"></div>
              <svg className="absolute" style={{ top: '-80px', left: '-100px', width: '200px', height: '150px' }}>
                <path d="M 100 80 Q 120 60, 150 70" stroke="#333" strokeWidth="1" fill="none" opacity="0.3" />
              </svg>
            </div>

            {/* Australia */}
            <div className="absolute" style={{ top: '70%', left: '75%' }}>
              <div className="w-3 h-3 bg-gray-800 border-2 border-white rounded-full shadow-lg"></div>
            </div>

            {/* Middle East */}
            <div className="absolute" style={{ top: '40%', left: '55%' }}>
              <div className="w-3 h-3 bg-gray-800 border-2 border-white rounded-full shadow-lg"></div>
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold text-xl">
            +
          </button>
          <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold text-xl">
            −
          </button>
        </div>
      </div>
    </div>
  );
}