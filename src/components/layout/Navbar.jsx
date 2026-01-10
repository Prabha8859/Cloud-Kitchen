import { Search, Bell, User, Menu, Settings } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import ThemeToggle from './ThemeToggle';
import Input from '../UI/Input';

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () => {
    setShowProfile(false);
    navigate('/profile');
  };

  return (
    <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm sticky top-0 z-40 transition-colors duration-200">
      <div className="px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Search */}
          <div className="flex items-center gap-4 flex-1">
            <button type="button" onClick={onMenuClick} className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            
            <div className="relative max-w-md w-full">
              <Input 
                icon={Search}
                type="text"
                placeholder="Search kitchens, orders, societies..."
                className="w-full"
              />
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Theme Toggle Component */}
            <ThemeToggle />

            {/* Settings */}
            <button type="button" className="p-2.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors relative group">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors relative"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="card-base absolute right-0 mt-2 w-80 z-50 p-0 py-2">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                    <h3 className="font-semibold text-gray-800 dark:text-white">Notifications</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">You have 3 unread messages</p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {[
                      { title: 'New Kitchen Registration', time: '5 min ago', unread: true },
                      { title: 'Order #1234 Completed', time: '12 min ago', unread: true },
                      { title: 'Society Approval Pending', time: '1 hour ago', unread: true },
                      { title: 'Payment Received', time: '2 hours ago', unread: false }
                    ].map((notif, idx) => (
                      <div 
                        key={idx}
                        className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors ${notif.unread ? 'bg-orange-50/30 dark:bg-orange-900/10' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${notif.unread ? 'bg-orange-500' : 'bg-gray-300 dark:bg-slate-600'}`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{notif.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-gray-100 dark:border-slate-700">
                    <button className="text-sm text-orange-600 font-medium hover:text-orange-700">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button 
                type="button"
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{user?.name || 'Admin User'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role?.replace('-', ' ') || 'Admin'}</p>
                </div>
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="card-base absolute right-0 mt-2 w-64 z-50 p-0 py-2">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                    <p className="font-semibold text-gray-800 dark:text-white">{user?.name || 'Admin User'}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email || 'admin@foodhub.com'}</p>
                  </div>
                  <div className="py-2">
                    <button 
                      onClick={handleProfileClick}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      Profile Settings
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                      Account Settings
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                      Help & Support
                    </button>
                  </div>
                  <div className="border-t border-gray-100 dark:border-slate-700 pt-2">
                    <button 
                      onClick={logout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}