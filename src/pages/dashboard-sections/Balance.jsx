import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useAccount } from '../../context/AccountContext';
import { TrendingUp, TrendingDown, Activity, Wallet, CreditCard, ArrowRight } from 'lucide-react';

export default function Balance() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  
  // Pulling the global balance from our Context
  const { balance } = useAccount();

  useEffect(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    if (cardsRef.current.length > 0) {
      gsap.fromTo(cardsRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "back.out(1.2)" }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto space-y-8 pb-12">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
            Financial Overview
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Track your real-time global account balance and analytics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Balance Card (Takes up 2 columns) */}
        <div 
          ref={el => cardsRef.current[0] = el}
          className="lg:col-span-2 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 rounded-3xl p-8 md:p-12 shadow-2xl shadow-blue-500/20 text-white relative overflow-hidden flex flex-col justify-between min-h-[300px]"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 opacity-10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

          <div className="relative z-10 flex justify-between items-start">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <Wallet size={18} className="text-blue-200" />
              <span className="text-sm font-medium text-blue-100 tracking-wide uppercase">Total Available Balance</span>
            </div>
            <Activity size={24} className="text-blue-300 opacity-70" />
          </div>

          <div className="relative z-10 mt-12">
            <h3 className="text-6xl md:text-7xl font-black tracking-tight drop-shadow-lg">
              ₹ {balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </h3>
            <p className="text-blue-200 mt-4 text-lg flex items-center gap-2">
              <TrendingUp size={20} className="text-green-400" /> +2.4% from last month
            </p>
          </div>
        </div>

        {/* Side Stats Column */}
        <div className="space-y-6 flex flex-col justify-between">
          <div 
            ref={el => cardsRef.current[1] = el}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 flex-1 flex flex-col justify-center"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl text-green-500">
                <TrendingUp size={24} />
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Total Income (March)</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">₹ 84,500.00</p>
          </div>

          <div 
            ref={el => cardsRef.current[2] = el}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 flex-1 flex flex-col justify-center"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-2xl text-red-500">
                <TrendingDown size={24} />
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Total Expenses (March)</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">₹ 32,150.00</p>
          </div>
        </div>

      </div>

      {/* Quick Actions Grid */}
      <div 
        ref={el => cardsRef.current[3] = el}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
      >
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 text-white flex justify-between items-center group cursor-pointer shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              <CreditCard size={28} />
            </div>
            <div>
              <h4 className="text-xl font-semibold">View Statements</h4>
              <p className="text-gray-400 text-sm mt-1">Download monthly PDFs</p>
            </div>
          </div>
          <ArrowRight size={24} className="text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all" />
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-8 text-white flex justify-between items-center group cursor-pointer shadow-xl shadow-emerald-500/20">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Wallet size={28} />
            </div>
            <div>
              <h4 className="text-xl font-semibold">Spend Analytics</h4>
              <p className="text-emerald-100 text-sm mt-1">See where your money goes</p>
            </div>
          </div>
          <ArrowRight size={24} className="text-emerald-100 group-hover:text-white group-hover:translate-x-2 transition-all" />
        </div>
      </div>

    </div>
  );
}