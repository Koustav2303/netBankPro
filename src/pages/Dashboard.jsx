import { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  User, Wallet, CreditCard, ArrowRightLeft, 
  PiggyBank, Smartphone, History, Phone, LogOut, Menu, X
} from 'lucide-react';
import toast from 'react-hot-toast';

import Profile from './dashboard-sections/Profile';
import Balance from './dashboard-sections/Balance';
import AtmFacilities from './dashboard-sections/AtmFacilities';
import DepositWithdraw from './dashboard-sections/DepositWithdraw';
import UpiTransfer from './dashboard-sections/UpiTransfer';
import FixedDeposit from './dashboard-sections/FixedDeposit';
import TransactionHistory from './dashboard-sections/TransactionHistory';
import Contact from './dashboard-sections/Contact';
import Footer from '../components/Footer';

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', name: 'User Profile', icon: <User size={20} /> },
    { path: '/dashboard/balance', name: 'Balance', icon: <Wallet size={20} /> },
    { path: '/dashboard/atm', name: 'ATM Facilities', icon: <CreditCard size={20} /> },
    { path: '/dashboard/transfer', name: 'Deposit & Withdraw', icon: <ArrowRightLeft size={20} /> },
    { path: '/dashboard/fd', name: 'Fixed Deposit', icon: <PiggyBank size={20} /> },
    { path: '/dashboard/upi', name: 'UPI Transaction', icon: <Smartphone size={20} /> },
    { path: '/dashboard/history', name: 'History', icon: <History size={20} /> },
    { path: '/dashboard/contact', name: 'Contact Us', icon: <Phone size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      
      {/* MOBILE TOP HEADER (Visible only on mobile screens) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-30 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button 
            className="p-2 -ml-2 rounded-xl text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={26} />
          </button>
          <h2 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 tracking-wider">
            NetBankPro
          </h2>
        </div>
      </div>

      {/* MOBILE BACKDROP OVERLAY (Darkens screen when sidebar is open) */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-72 md:w-64 bg-white dark:bg-gray-800 shadow-2xl md:shadow-xl border-r border-gray-100 dark:border-gray-700 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          
          {/* Sidebar Header with Close Button for Mobile */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 tracking-wider hidden md:block">
              NetBankPro
            </h2>
            <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white tracking-wider md:hidden">
              Menu
            </h2>
            <button 
              className="md:hidden p-2 -mr-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto hide-scrollbar">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || (location.pathname === '/dashboard/' && item.path === '/dashboard');
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-700">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors font-medium"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 h-full overflow-y-auto pt-24 md:pt-0 relative z-0">
        <div className="p-4 md:p-8 min-h-full flex flex-col">
          
          {/* Dashboard Routes */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Profile />} />
              <Route path="/balance" element={<Balance />} />
              <Route path="/atm" element={<AtmFacilities />} />
              <Route path="/transfer" element={<DepositWithdraw />} />
              <Route path="/fd" element={<FixedDeposit />} />
              <Route path="/upi" element={<UpiTransfer />} />
              <Route path="/history" element={<TransactionHistory />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>

          {/* Global Dashboard Footer */}
          <Footer />
          
        </div>
      </main>

    </div>
  );
}