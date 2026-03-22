import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Sun, Moon } from 'lucide-react';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { AccountProvider } from './context/AccountContext';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <AccountProvider>
      <Router>
        <div className="min-h-screen relative font-sans bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:scale-110 transition-transform duration-200 border border-gray-100 dark:border-gray-700"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-indigo-600" />
            )}
          </button>

          <Toaster 
            position="top-right" 
            toastOptions={{
              duration: 3000,
              className: 'dark:bg-gray-800 dark:text-white border dark:border-gray-700',
              style: {
                background: darkMode ? '#1f2937' : '#ffffff',
                color: darkMode ? '#f9fafb' : '#111827',
              }
            }}
          />

          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
          
        </div>
      </Router>
    </AccountProvider>
  );
}

export default App;