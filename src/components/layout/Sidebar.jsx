import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChefHat, 
  ChevronDown,
  ChevronRight,
  Menu,
  LogOut
} from 'lucide-react';
import { menuItems } from '../../data/sidebarMenu';

/**
 * SidebarItem Component
 * 
 * Renders a single menu item.
 * - Handles hover effects (white border).
 * - Shows tooltip in collapsed mode.
 * - Manages sub-menu expansion.
 */
const SidebarItem = ({ item, isActive, isExpanded, onClick, onSubItemClick, currentPath, isCollapsed }) => {
  const Icon = item.icon;
  const hasSubItems = item.subItems && item.subItems.length > 0;

  return (
    <div>
      {/* Main Menu Item */}
      <button
        onClick={() => onClick(item)}
        className={`
          relative w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} 
          p-3 rounded-xl transition-all duration-300 cursor-pointer group border
          ${isActive 
            ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 border-orange-500/30 shadow-lg shadow-orange-500/10' 
            : 'border-transparent hover:bg-slate-800/50 hover:border-white/50'
          }
        `}
      >
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : 'flex-1'}`}>
          <div className={`
            p-2 rounded-lg transition-all duration-300
            ${isActive 
              ? 'bg-gradient-to-br from-orange-500 to-pink-500 shadow-lg' 
              : 'bg-slate-800/50'
            }
          `}>
            <Icon className="w-5 h-5" />
          </div>

          {/* Tooltip for Collapsed State */}
          {isCollapsed && (
            <div className="absolute left-16 z-50 w-max origin-left scale-0 rounded-md bg-slate-900 px-3 py-2 text-xs font-bold text-white shadow-xl transition-all duration-200 group-hover:scale-100 border border-slate-700">
              {item.label}
            </div>
          )}

          {!isCollapsed && (
            <div className="text-left flex-1 overflow-hidden">
              <p className={`font-medium text-sm truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                {item.label}
              </p>
              <p className="text-xs text-slate-500 mt-0.5 truncate">
                {item.description}
              </p>
            </div>
          )}
        </div>
        {!isCollapsed && hasSubItems && (
          <div className="ml-2">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-400" />
            )}
          </div>
        )}
      </button>

      {/* Sub Menu Items */}
      {!isCollapsed && hasSubItems && isExpanded && (
        <div className="mt-2 ml-4 space-y-1 border-l-2 border-slate-700/50 pl-4">
          {item.subItems.map((subItem) => (
            <button
              key={subItem.id}
              onClick={() => onSubItemClick(subItem)}
              className={`
                w-full text-left p-2 rounded-lg text-sm transition-all duration-200 cursor-pointer
                hover:translate-x-1
                ${currentPath === subItem.path
                  ? 'bg-slate-800 text-orange-400 font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
                }
              `}
            >
              {subItem.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState(null);
  // Persist collapsed state in localStorage
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return JSON.parse(localStorage.getItem('sidebarCollapsed')) || false;
  });

  // Effect to update localStorage when collapsed state changes
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);


  // Handle navigation and submenu toggling
  const handleMenuClick = (item) => {
    if (item.subItems && !isCollapsed) {
      setExpandedMenu(expandedMenu === item.id ? null : item.id);
    } else {
      navigate(item.path || '#');
    }
  };

  // Handle sub-item click
  const handleSubItemClick = (subItem) => {
    navigate(subItem.path || '#');
  };

  // Check if a menu item is active based on the current URL
  const isItemActive = (item) => {
    if (item.path) return location.pathname === item.path;
    // Keep parent active if sub-item is selected (logic can be expanded here)
    return false;
  };

  return (
    <div className={`hidden md:flex ${isCollapsed ? 'w-20' : 'w-72'} h-screen sticky top-0 flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl transition-all duration-300`}>
      {/* --- Header Section --- */}
      <div className={`p-6 border-b border-slate-700/50 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        
        {/* Logo Area (Hidden when collapsed) */}
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <ChefHat className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">FoodHub</h1>
                <p className="text-xs text-slate-400">Admin Panel</p>
              </div>
            </div>
          )}
        
        {/* Toggle Button (Hamburger Menu) */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Navigation */}
      {/* --- Navigation Section (Scrollable) --- */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = isItemActive(item) || expandedMenu === item.id;
          const isExpanded = expandedMenu === item.id;

          return (
            <SidebarItem
              key={item.id}
              item={item}
              isActive={isActive}
              isExpanded={isExpanded}
              onClick={handleMenuClick}
              onSubItemClick={handleSubItemClick}
              currentPath={location.pathname}
              isCollapsed={isCollapsed}
            />
          );
        })}
      </nav>

      {/* Footer */}
      {/* --- Footer Section --- */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between gap-3'}`}>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-400">Admin User</p>
              <p className="text-sm font-medium truncate">admin@foodhub.com</p>
            </div>
          )}
          
          <button 
            className={`
              p-2 rounded-lg text-slate-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 border border-transparent transition-all
              ${isCollapsed ? '' : 'bg-slate-800/50'}
            `}
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}