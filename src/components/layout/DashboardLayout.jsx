import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import RouteLoader from "./RouteLoader";
import { ChefHat, Utensils, ShoppingBag, Truck, Users, Home, Receipt, TrendingUp } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [LoadingIcon, setLoadingIcon] = useState(null);
  const location = useLocation();

  // Route-specific icons mapping
  const routeIcons = {
    '/dashboard': TrendingUp,
    '/societies': Home,
    '/kitchens': ChefHat,
    '/orders': Receipt,
    '/subscriptions': Users,
    '/delivery': Truck,
    '/commission': ShoppingBag
  };

  useEffect(() => {
    // Set the icon based on current path
    const IconComponent = routeIcons[location.pathname] || Utensils;
    setLoadingIcon(() => IconComponent);
    
    // Trigger loading state
    setIsLoading(true);
    
    // Hide loader after delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1.2 seconds for better animation completion

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-transparent transition-colors duration-300 overflow-hidden">
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onMenuClick={() => setIsMobileSidebarOpen(true)} />
        
        {/* Main Content Area with Relative positioning for Loader */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          <main 
            key={location.pathname}
            className={`p-6 flex-1 overflow-y-auto transition-opacity duration-700 ${
              isLoading ? 'opacity-0' : 'opacity-100 animate-page-enter'
            }`}
          >
            {children}
          </main>

          {/* Route Loader Component */}
          <RouteLoader icon={LoadingIcon} isVisible={isLoading} />
        </div>
      </div>

      <style>{`
        @keyframes page-enter {
          0% { 
            opacity: 0; 
            transform: translateY(20px) scale(0.98); 
          }
          100% { 
            opacity: 1; 
            transform: none; 
          }
        }

        .animate-page-enter {
          animation: page-enter 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}