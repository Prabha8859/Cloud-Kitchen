import { useState } from 'react';
import { User, Lock, Bell, Shield, Camera, Save, Mail, Smartphone, Globe, AlertTriangle, Eye, EyeOff, CheckCircle2, XCircle, Database, Activity, Download, UserCog, Settings } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import PageHeader from '../components/UI/PageHeader';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Modal from '../components/UI/Modal';
import { useAuth } from '../hooks/useAuth';

export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Mock state for notifications
  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailMarketing: false,
    emailSystem: true,
    pushOrders: true,
    pushSystem: true,
    pushMarketing: false,
    smsOrders: false,
    smsSystem: true
  });

  // Mock state for admin controls
  const [adminSettings, setAdminSettings] = useState({
    maintenanceMode: false,
    newRegistrations: true,
    autoApprovals: false,
    debugMode: false
  });

  const handleSave = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Settings saved!");
    }, 1000);
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setPasswordError('');

    if (!passwords.current || !passwords.new || !passwords.confirm) {
      setPasswordError('All fields are required');
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setPasswordError('New passwords do not match');
      return;
    }
    if (passwords.new.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setPasswords({ current: '', new: '', confirm: '' });
      // In a real app, you would show a toast notification here
    }, 1000);
  };

  const handleDeleteAccount = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowDeleteModal(false);
      console.log("Account deleted");
      // In a real app, you would logout and redirect here
    }, 1000);
  };

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAdminSetting = (key) => {
    setAdminSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: User, color: 'blue' },
    { id: 'security', label: 'Security', icon: Lock, color: 'green' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'purple' },
  ];

  if (user?.role === 'super-admin') {
    tabs.push({ id: 'admin', label: 'Admin Controls', icon: Shield, color: 'red' });
  }

  return (
    <DashboardLayout>
      <PageHeader 
        title="Profile & Settings" 
        subtitle="Manage your account, security, and system preferences" 
      />

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* Enhanced Sidebar */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden sticky top-24">
            {/* Profile Card in Sidebar */}
            <div className="p-6 bg-gradient-to-br from-orange-500 to-pink-600 text-white">
              <div className="flex flex-col items-center text-center">
                <div className="relative group cursor-pointer mb-4">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold ring-4 ring-white/30 shadow-xl">
                    {user?.name?.charAt(0) || 'A'}
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-1">{user?.name || 'Admin User'}</h3>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium capitalize">
                  {user?.role?.replace('-', ' ') || 'Admin'}
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="p-3 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/30 scale-[1.02]'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:scale-[1.01]'
                    }`}
                  >
                    <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">Quick Info</div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Member Since</span>
                  <span className="font-semibold text-slate-900 dark:text-white">Jan 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Last Login</span>
                  <span className="font-semibold text-slate-900 dark:text-white">Today, 9:42 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">User ID</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">#SA-8839</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            
            {/* General Tab */}
            {activeTab === 'general' && (
              <form onSubmit={handleSave} className="p-8 space-y-8">
                {/* Header */}
                <div className="flex items-center gap-3 pb-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white shadow-lg">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Personal Information</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Update your profile details and preferences</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <Input defaultValue={user?.name || "Admin User"} icon={User} />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      defaultValue={user?.email || "admin@foodhub.com"} 
                      type="email" 
                      icon={Mail} 
                      disabled 
                      className="bg-slate-50 dark:bg-slate-900/50 cursor-not-allowed" 
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400">Email cannot be changed</p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
                    <Input defaultValue="+91 98765 43210" type="tel" icon={Smartphone} />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Language</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 z-10" />
                      <select className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-slate-900 dark:text-white appearance-none cursor-pointer hover:border-slate-300 dark:hover:border-slate-600">
                        <option>English (US)</option>
                        <option>Hindi</option>
                        <option>Spanish</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Timezone & Location */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Regional Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Timezone</label>
                      <select className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-slate-900 dark:text-white cursor-pointer">
                        <option>Asia/Kolkata (GMT+5:30)</option>
                        <option>America/New_York (GMT-5)</option>
                        <option>Europe/London (GMT+0)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Date Format</label>
                      <select className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-slate-900 dark:text-white cursor-pointer">
                        <option>DD/MM/YYYY</option>
                        <option>MM/DD/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" disabled={isLoading} icon={Save}>
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="p-8 space-y-8">
                {/* Header */}
                <div className="flex items-center gap-3 pb-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white shadow-lg">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Security Settings</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Manage your password and account security</p>
                  </div>
                </div>

                {/* Password Section */}
                <form onSubmit={handlePasswordUpdate} className="space-y-6">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-green-600" />
                      Change Password
                    </h4>
                    
                    {passwordError && (
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-100 dark:border-red-900/50">
                        {passwordError}
                      </div>
                    )}

                    <div className="space-y-4 max-w-xl">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Current Password</label>
                        <div className="relative">
                          <Input 
                            type={showPassword.current ? "text" : "password"} 
                            placeholder="Enter current password" 
                            icon={Lock} 
                            value={passwords.current}
                            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                          >
                            {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">New Password</label>
                        <div className="relative">
                          <Input 
                            type={showPassword.new ? "text" : "password"} 
                            placeholder="Enter new password" 
                            icon={Lock} 
                            value={passwords.new}
                            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                          >
                            {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        {/* Password Strength Indicator */}
                        <div className="space-y-2 mt-3">
                          <div className="flex gap-1">
                            <div className="flex-1 h-1.5 bg-red-500 rounded-full"></div>
                            <div className="flex-1 h-1.5 bg-orange-500 rounded-full"></div>
                            <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                            <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                          </div>
                          <p className="text-xs text-slate-500">Password strength: <span className="font-semibold text-orange-600">Medium</span></p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Confirm New Password</label>
                        <div className="relative">
                          <Input 
                            type={showPassword.confirm ? "text" : "password"} 
                            placeholder="Confirm new password" 
                            icon={Lock} 
                            value={passwords.confirm}
                            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                          >
                            {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 flex justify-end">
                      <Button type="submit" variant="primary" disabled={isLoading}>
                        Update Password
                      </Button>
                    </div>
                  </div>
                </form>

                {/* Two-Factor Authentication */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-900/50">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500 rounded-xl text-white shrink-0">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Two-Factor Authentication</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Add an extra layer of security to your account with 2FA</p>
                      <Button variant="primary" size="sm">Enable 2FA</Button>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400">
                      Disabled
                    </span>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
                  <div className="rounded-2xl border-2 border-red-200 dark:border-red-900/50 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/10 dark:to-red-800/10 p-6">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className="p-3 bg-red-500 rounded-xl text-white shrink-0">
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-red-900 dark:text-red-200 mb-1">Danger Zone</h3>
                        <p className="text-sm text-red-700 dark:text-red-300 mb-4 leading-relaxed">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <Button variant="danger" type="button" onClick={() => setShowDeleteModal(true)}>
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="p-8 space-y-8">
                {/* Header */}
                <div className="flex items-center gap-3 pb-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white shadow-lg">
                    <Bell className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Notification Preferences</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Choose how you want to receive updates</p>
                  </div>
                </div>

                {/* Email Notifications */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Mail className="w-5 h-5 text-purple-600" />
                    Email Notifications
                  </h4>
                  
                  <NotificationToggle
                    title="Order Updates"
                    description="Get notified about new orders, cancellations, and completions"
                    checked={notifications.emailOrders}
                    onChange={() => toggleNotification('emailOrders')}
                    icon={CheckCircle2}
                  />
                  
                  <NotificationToggle
                    title="System Alerts"
                    description="Receive important system updates and maintenance notices"
                    checked={notifications.emailSystem}
                    onChange={() => toggleNotification('emailSystem')}
                    icon={Activity}
                  />
                  
                  <NotificationToggle
                    title="Marketing Emails"
                    description="Promotional offers, tips, and product updates"
                    checked={notifications.emailMarketing}
                    onChange={() => toggleNotification('emailMarketing')}
                    icon={Mail}
                  />
                </div>

                {/* Push Notifications */}
                <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-purple-600" />
                    Push Notifications
                  </h4>
                  
                  <NotificationToggle
                    title="Real-time Orders"
                    description="Instant notifications for new orders and urgent updates"
                    checked={notifications.pushOrders}
                    onChange={() => toggleNotification('pushOrders')}
                    icon={Bell}
                  />
                  
                  <NotificationToggle
                    title="System Events"
                    description="Critical system events and status changes"
                    checked={notifications.pushSystem}
                    onChange={() => toggleNotification('pushSystem')}
                    icon={Activity}
                  />
                </div>

                {/* SMS Notifications */}
                <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-purple-600" />
                    SMS Notifications
                  </h4>
                  
                  <NotificationToggle
                    title="Order SMS"
                    description="Text messages for critical order updates"
                    checked={notifications.smsOrders}
                    onChange={() => toggleNotification('smsOrders')}
                    icon={Smartphone}
                  />
                  
                  <NotificationToggle
                    title="System SMS"
                    description="Emergency alerts and important announcements"
                    checked={notifications.smsSystem}
                    onChange={() => toggleNotification('smsSystem')}
                    icon={AlertTriangle}
                  />
                </div>

                <div className="pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                  <Button variant="primary" icon={Save}>
                    Save Preferences
                  </Button>
                </div>
              </div>
            )}

            {/* Admin Controls Tab */}
            {activeTab === 'admin' && (
              <div className="p-8 space-y-8">
                {/* Header */}
                <div className="flex items-center gap-3 pb-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl text-white shadow-lg">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Super Admin Controls</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Manage critical system settings and operations</p>
                  </div>
                </div>

                {/* System Status */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatCard
                    title="System Status"
                    value="Operational"
                    icon={Activity}
                    color="green"
                  />
                  <StatCard
                    title="Active Users"
                    value="1,247"
                    icon={UserCog}
                    color="blue"
                  />
                  <StatCard
                    title="Server Load"
                    value="34%"
                    icon={Database}
                    color="orange"
                  />
                </div>

                {/* Critical Controls */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-red-600" />
                    Critical System Controls
                  </h4>

                  <AdminToggle
                    title="Maintenance Mode"
                    description="Enable to prevent all users from accessing the system"
                    checked={adminSettings.maintenanceMode}
                    onChange={() => toggleAdminSetting('maintenanceMode')}
                    icon={AlertTriangle}
                    variant="danger"
                  />

                  <AdminToggle
                    title="New Registrations"
                    description="Allow new kitchens and societies to register on the platform"
                    checked={adminSettings.newRegistrations}
                    onChange={() => toggleAdminSetting('newRegistrations')}
                    icon={UserCog}
                    variant="success"
                  />

                  <AdminToggle
                    title="Auto Approvals"
                    description="Automatically approve new kitchen and society registrations"
                    checked={adminSettings.autoApprovals}
                    onChange={() => toggleAdminSetting('autoApprovals')}
                    icon={CheckCircle2}
                    variant="warning"
                  />

                  <AdminToggle
                    title="Debug Mode"
                    description="Enable detailed logging for troubleshooting (affects performance)"
                    checked={adminSettings.debugMode}
                    onChange={() => toggleAdminSetting('debugMode')}
                    icon={Database}
                    variant="info"
                  />
                </div>

                {/* Quick Actions */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ActionCard
                      title="Download System Logs"
                      description="Export complete system activity logs"
                      icon={Download}
                      buttonText="Download"
                    />
                    <ActionCard
                      title="Database Backup"
                      description="Create a backup of all system data"
                      icon={Database}
                      buttonText="Backup Now"
                    />
                    <ActionCard
                      title="Clear Cache"
                      description="Clear system cache to improve performance"
                      icon={Activity}
                      buttonText="Clear Cache"
                    />
                    <ActionCard
                      title="User Analytics"
                      description="View detailed user activity reports"
                      icon={UserCog}
                      buttonText="View Report"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Account"
      >
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300">
            Are you sure you want to permanently delete your account? This action cannot be undone and all your data will be lost.
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDeleteAccount} disabled={isLoading}>
              {isLoading ? 'Deleting...' : 'Delete Account'}
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

// Helper Components
function NotificationToggle({ title, description, checked, onChange, icon: Icon }) {
  return (
    <div className="flex items-start justify-between p-4 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 transition-all group">
      <div className="flex gap-3 flex-1">
        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg h-fit group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
          <Icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white">{title}</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer ml-4">
        <input 
          type="checkbox" 
          className="sr-only peer" 
          checked={checked}
          onChange={onChange}
        />
        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-purple-500"></div>
      </label>
    </div>
  );
}

function AdminToggle({ title, description, checked, onChange, icon: Icon, variant }) {
  const variants = {
    danger: 'border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 hover:border-red-300 dark:hover:border-red-800',
    success: 'border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-900/10 hover:border-green-300 dark:hover:border-green-800',
    warning: 'border-orange-200 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-900/10 hover:border-orange-300 dark:hover:border-orange-800',
    info: 'border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/10 hover:border-blue-300 dark:hover:border-blue-800'
  };
  
  const iconVariants = {
    danger: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    success: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    warning: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
  };

  const toggleVariants = {
    danger: 'peer-checked:bg-gradient-to-r peer-checked:from-red-600 peer-checked:to-red-500',
    success: 'peer-checked:bg-gradient-to-r peer-checked:from-green-600 peer-checked:to-green-500',
    warning: 'peer-checked:bg-gradient-to-r peer-checked:from-orange-600 peer-checked:to-orange-500',
    info: 'peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-blue-500'
  };

  return (
    <div className={`flex items-start justify-between p-4 rounded-xl border transition-all group ${variants[variant]}`}>
      <div className="flex gap-3 flex-1">
        <div className={`p-2 rounded-lg h-fit transition-colors ${iconVariants[variant]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white">{title}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{description}</p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer ml-4">
        <input 
          type="checkbox" 
          className="sr-only peer" 
          checked={checked}
          onChange={onChange}
        />
        <div className={`w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${variant === 'danger' ? 'red' : variant === 'success' ? 'green' : variant === 'warning' ? 'orange' : 'blue'}-300 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${toggleVariants[variant]}`}></div>
      </label>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  const colors = {
    green: 'from-green-500 to-green-600',
    blue: 'from-blue-500 to-blue-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600'
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3">
        <div className={`p-3 bg-gradient-to-br ${colors[color]} rounded-xl text-white shadow-lg`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{title}</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ title, description, icon: Icon, buttonText }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-700 transition-all group">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50 transition-colors">
          <Icon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-slate-900 dark:text-white">{title}</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
        </div>
      </div>
      <Button variant="secondary" size="sm" className="w-full">
        {buttonText}
      </Button>
    </div>
  );
}
