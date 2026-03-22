import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import toast from 'react-hot-toast';
import { 
  User, Shield, Settings, Camera, Copy, 
  Smartphone, Mail, MapPin, CheckCircle2, 
  Bell, Globe, Key, AlertTriangle 
} from 'lucide-react';

export default function Profile() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  
  const [userData, setUserData] = useState({
    name: 'Koustav Pan',
    email: 'koustav2303@example.com',
    phone: '+91 9876543210',
    dob: '2000-03-23',
    accountNo: '102938475629',
    ifsc: 'NETB0001234',
    aadhar: 'XXXX-XXXX-9012',
    address: 'Tech Park, Cyber City, Bengaluru, Karnataka'
  });

  const [securityData, setSecurityData] = useState({
    twoFactor: true,
    loginAlerts: true,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState({
    emailPromo: false,
    smsAlerts: true,
    language: 'English'
  });

  useEffect(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(contentRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [activeTab]);

  const handleSavePersonal = (e) => {
    e.preventDefault();
    setIsEditing(false);
    toast.success('Personal information updated successfully!');
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (securityData.newPassword !== securityData.confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }
    toast.success('Password changed securely.');
    setSecurityData({ ...securityData, currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  const toggleSetting = (category, setting) => {
    if (category === 'security') {
      setSecurityData(prev => ({ ...prev, [setting]: !prev[setting] }));
      toast.success(`${setting === 'twoFactor' ? '2FA' : 'Login Alerts'} updated.`);
    } else {
      setPreferences(prev => ({ ...prev, [setting]: !prev[setting] }));
      toast.success('Preferences updated.');
    }
  };

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto pb-12">
      
      {/* Hero Header Section */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
        
        {/* Cover Photo Area */}
        <div className="h-48 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-300" />
            <span className="font-semibold tracking-wide">KYC Verified</span>
          </div>
        </div>

        {/* Profile Info Overlay */}
        <div className="px-8 pb-8 relative flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-16">
          
          {/* Avatar with Upload Button */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-2xl bg-white dark:bg-gray-800 p-2 shadow-lg">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center overflow-hidden relative">
                <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                  {userData.name.charAt(0)}
                </span>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera size={24} className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Name and Quick Stats */}
          <div className="flex-1 pb-2">
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight">
              {userData.name}
            </h1>
            <p className="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-2 mt-1">
              Premium Account Member
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full sm:w-auto pb-2">
            <button 
              onClick={() => copyToClipboard(userData.accountNo, 'Account Number')}
              className="flex-1 sm:flex-none px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Copy size={16} /> Acc No
            </button>
            <button 
              onClick={() => copyToClipboard(userData.ifsc, 'IFSC Code')}
              className="flex-1 sm:flex-none px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Copy size={16} /> IFSC
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Navigation Sidebar */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sticky top-24">
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('personal')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === 'personal' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
              >
                <User size={18} /> Personal Details
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === 'security' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
              >
                <Shield size={18} /> Security
              </button>
              <button 
                onClick={() => setActiveTab('preferences')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === 'preferences' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
              >
                <Settings size={18} /> Preferences
              </button>
            </nav>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-9" ref={contentRef}>
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden min-h-[500px]">
            
            {/* PERSONAL TAB */}
            {activeTab === 'personal' && (
              <div>
                <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Profile Information</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your personal details here.</p>
                  </div>
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-5 py-2 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-xl font-medium hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                  >
                    {isEditing ? 'Cancel' : 'Edit Details'}
                  </button>
                </div>

                <form onSubmit={handleSavePersonal} className="p-6 md:p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><User size={16} /></span>
                        <input type="text" value={userData.name} disabled={!isEditing} onChange={(e) => setUserData({...userData, name: e.target.value})} className={`w-full bg-gray-50 dark:bg-gray-900 border ${isEditing ? 'border-blue-300 dark:border-blue-700 focus:ring-2 focus:ring-blue-500/50' : 'border-gray-200 dark:border-gray-700'} rounded-xl py-3 pl-11 pr-4 outline-none transition-all text-gray-800 dark:text-white`} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Date of Birth</label>
                      <input type="date" value={userData.dob} disabled={!isEditing} onChange={(e) => setUserData({...userData, dob: e.target.value})} className={`w-full bg-gray-50 dark:bg-gray-900 border ${isEditing ? 'border-blue-300 dark:border-blue-700 focus:ring-2 focus:ring-blue-500/50' : 'border-gray-200 dark:border-gray-700'} rounded-xl p-3 outline-none transition-all text-gray-800 dark:text-white`} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Mail size={16} /></span>
                        <input type="email" value={userData.email} disabled={!isEditing} onChange={(e) => setUserData({...userData, email: e.target.value})} className={`w-full bg-gray-50 dark:bg-gray-900 border ${isEditing ? 'border-blue-300 dark:border-blue-700 focus:ring-2 focus:ring-blue-500/50' : 'border-gray-200 dark:border-gray-700'} rounded-xl py-3 pl-11 pr-4 outline-none transition-all text-gray-800 dark:text-white`} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Smartphone size={16} /></span>
                        <input type="tel" value={userData.phone} disabled={!isEditing} onChange={(e) => setUserData({...userData, phone: e.target.value})} className={`w-full bg-gray-50 dark:bg-gray-900 border ${isEditing ? 'border-blue-300 dark:border-blue-700 focus:ring-2 focus:ring-blue-500/50' : 'border-gray-200 dark:border-gray-700'} rounded-xl py-3 pl-11 pr-4 outline-none transition-all text-gray-800 dark:text-white`} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Residential Address</label>
                    <div className="relative">
                      <span className="absolute left-4 top-4 text-gray-400"><MapPin size={16} /></span>
                      <textarea rows="3" value={userData.address} disabled={!isEditing} onChange={(e) => setUserData({...userData, address: e.target.value})} className={`w-full bg-gray-50 dark:bg-gray-900 border ${isEditing ? 'border-blue-300 dark:border-blue-700 focus:ring-2 focus:ring-blue-500/50' : 'border-gray-200 dark:border-gray-700'} rounded-xl py-3 pl-11 pr-4 outline-none transition-all resize-none text-gray-800 dark:text-white`}></textarea>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end pt-4">
                      <button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30">
                        Save Changes
                      </button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === 'security' && (
              <div className="p-6 md:p-8 animate-in fade-in duration-300">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Security Settings</h3>
                
                <div className="space-y-6">
                  {/* Toggles */}
                  <div className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <Shield size={18} className="text-green-500" /> Two-Factor Authentication
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Require an OTP via SMS for all login attempts.</p>
                    </div>
                    <button onClick={() => toggleSetting('security', 'twoFactor')} className={`w-12 h-6 rounded-full transition-colors relative ${securityData.twoFactor ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${securityData.twoFactor ? 'translate-x-7' : 'translate-x-1'}`}></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <AlertTriangle size={18} className="text-amber-500" /> Login Alerts
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Get notified of logins from unrecognized devices.</p>
                    </div>
                    <button onClick={() => toggleSetting('security', 'loginAlerts')} className={`w-12 h-6 rounded-full transition-colors relative ${securityData.loginAlerts ? 'bg-amber-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${securityData.loginAlerts ? 'translate-x-7' : 'translate-x-1'}`}></div>
                    </button>
                  </div>

                  {/* Change Password Form */}
                  <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                      <Key size={18} /> Update Password
                    </h4>
                    <form onSubmit={handlePasswordUpdate} className="space-y-5 max-w-md">
                      <div>
                        <input type="password" required value={securityData.currentPassword} onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})} placeholder="Current Password" className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-800 dark:text-white" />
                      </div>
                      <div>
                        <input type="password" required value={securityData.newPassword} onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})} placeholder="New Password" className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-800 dark:text-white" />
                      </div>
                      <div>
                        <input type="password" required value={securityData.confirmPassword} onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})} placeholder="Confirm New Password" className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-800 dark:text-white" />
                      </div>
                      <button type="submit" className="w-full bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold py-3 rounded-xl transition-colors hover:bg-gray-700 dark:hover:bg-white">
                        Update Password
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* PREFERENCES TAB */}
            {activeTab === 'preferences' && (
              <div className="p-6 md:p-8 animate-in fade-in duration-300">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">App Preferences</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <Mail size={18} className="text-blue-500" /> Promotional Emails
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Receive updates on new banking products and offers.</p>
                    </div>
                    <button onClick={() => toggleSetting('preferences', 'emailPromo')} className={`w-12 h-6 rounded-full transition-colors relative ${preferences.emailPromo ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${preferences.emailPromo ? 'translate-x-7' : 'translate-x-1'}`}></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <Bell size={18} className="text-indigo-500" /> SMS Transaction Alerts
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Get instant SMS messages for all debits and credits.</p>
                    </div>
                    <button onClick={() => toggleSetting('preferences', 'smsAlerts')} className={`w-12 h-6 rounded-full transition-colors relative ${preferences.smsAlerts ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${preferences.smsAlerts ? 'translate-x-7' : 'translate-x-1'}`}></div>
                    </button>
                  </div>

                  <div className="p-5 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <label className="font-semibold text-gray-800 dark:text-white flex items-center gap-2 mb-3">
                      <Globe size={18} className="text-cyan-500" /> Interface Language
                    </label>
                    <select 
                      value={preferences.language}
                      onChange={(e) => {
                        setPreferences({...preferences, language: e.target.value});
                        toast.success(`Language set to ${e.target.value}`);
                      }}
                      className="w-full md:w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 outline-none text-gray-800 dark:text-white"
                    >
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Bengali</option>
                      <option>Spanish</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}