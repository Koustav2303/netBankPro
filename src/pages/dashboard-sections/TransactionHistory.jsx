import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import toast from 'react-hot-toast';
import { useAccount } from '../../context/AccountContext';
import { 
  ArrowUpRight, ArrowDownLeft, Search, Download, 
  X, FileText, CheckCircle2, Clock, Smartphone, 
  CreditCard, Building2, Filter, Grid, List, 
  Calendar, ChevronRight, BarChart3, Coffee, 
  ShoppingBag, Zap, ArrowRightLeft
} from 'lucide-react';

export default function TransactionHistory() {
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const statsRef = useRef([]);
  
  const { balance } = useAccount();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); 
  const [viewMode, setViewMode] = useState('list'); 
  const [selectedTx, setSelectedTx] = useState(null);

  const mockTransactions = [
    { id: 'TXN-90815', date: '2026-03-22', time: '18:45', description: 'Swiggy Food Order', type: 'debit', amount: 450, status: 'Completed', method: 'upi', category: 'food', ref: 'UPI/3091827364' },
    { id: 'TXN-90814', date: '2026-03-22', time: '14:30', description: 'Rahul Sharma', type: 'credit', amount: 2500, status: 'Completed', method: 'upi', category: 'transfer', ref: 'UPI/1239810293' },
    { id: 'TXN-90813', date: '2026-03-21', time: '09:15', description: 'Cash Deposit at Branch', type: 'credit', amount: 15000, status: 'Completed', method: 'bank', category: 'deposit', ref: 'DEP/BR-091/CASH' },
    { id: 'TXN-90812', date: '2026-03-20', time: '20:10', description: 'Amazon Shopping', type: 'debit', amount: 4299, status: 'Completed', method: 'card', category: 'shopping', ref: 'CARD/POS/AMZN' },
    { id: 'TXN-90811', date: '2026-03-19', time: '11:20', description: 'Fixed Deposit Interest', type: 'credit', amount: 850, status: 'Completed', method: 'bank', category: 'interest', ref: 'FD/INT/Q1' },
    { id: 'TXN-90810', date: '2026-03-18', time: '08:00', description: 'Netflix Subscription', type: 'debit', amount: 649, status: 'Pending', method: 'card', category: 'entertainment', ref: 'ACH/NETFLIX' },
    { id: 'TXN-90809', date: '2026-03-17', time: '19:30', description: 'Uber Rides', type: 'debit', amount: 320, status: 'Completed', method: 'upi', category: 'transport', ref: 'UPI/9988776655' },
    { id: 'TXN-90808', date: '2026-03-16', time: '10:00', description: 'Freelance Salary', type: 'credit', amount: 45000, status: 'Completed', method: 'bank', category: 'income', ref: 'NEFT/HDFC/SALARY' },
  ];

  const filteredTransactions = mockTransactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase()) || tx.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || tx.method === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalIn = mockTransactions.filter(t => t.type === 'credit').reduce((acc, curr) => acc + curr.amount, 0);
  const totalOut = mockTransactions.filter(t => t.type === 'debit').reduce((acc, curr) => acc + curr.amount, 0);
  const upiCount = mockTransactions.filter(t => t.method === 'upi').length;

  useEffect(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    if (statsRef.current.length > 0) {
      gsap.fromTo(statsRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.2)" }
      );
    }
  }, []);

  const getMethodIcon = (method) => {
    switch(method) {
      case 'upi': return <Smartphone size={16} className="text-purple-500" />;
      case 'card': return <CreditCard size={16} className="text-blue-500" />;
      case 'bank': return <Building2 size={16} className="text-emerald-500" />;
      default: return <FileText size={16} />;
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'food': return <Coffee size={20} />;
      case 'shopping': return <ShoppingBag size={20} />;
      case 'transfer': return <ArrowRightLeft size={20} />;
      case 'income': return <BarChart3 size={20} />;
      default: return <Zap size={20} />;
    }
  };

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto space-y-8 pb-12 relative">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
            Account Statement
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Track, filter, and download your financial history.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div ref={el => statsRef.current[0] = el} className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 text-green-500 rounded-lg">
              <ArrowDownLeft size={20} />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Money In (March)</span>
          </div>
          <p className="text-3xl font-semibold text-gray-800 dark:text-white">₹{totalIn.toLocaleString('en-IN')}</p>
        </div>

        <div ref={el => statsRef.current[1] = el} className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-lg">
              <ArrowUpRight size={20} />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Money Out (March)</span>
          </div>
          <p className="text-3xl font-semibold text-gray-800 dark:text-white">₹{totalOut.toLocaleString('en-IN')}</p>
        </div>

        <div ref={el => statsRef.current[2] = el} className="bg-gradient-to-br from-purple-600 to-indigo-600 p-6 rounded-3xl shadow-lg text-white relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-100 font-medium uppercase tracking-wider mb-1">UPI Transactions</p>
              <p className="text-3xl font-semibold">{upiCount} <span className="text-lg font-normal text-purple-200">this month</span></p>
            </div>
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Smartphone size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 space-y-4 md:space-y-0 md:flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
          
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 md:pb-0">
            {['all', 'upi', 'card', 'bank'].map((type) => (
              <button 
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize whitespace-nowrap flex items-center gap-2
                  ${filterType === type 
                    ? 'bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-900 shadow-md' 
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }
                `}
              >
                {type === 'all' ? <Filter size={16} /> : getMethodIcon(type)}
                {type === 'all' ? 'All Transactions' : type}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Search size={16} /></span>
              <input 
                type="text" 
                placeholder="Search history..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm text-gray-800 dark:text-white"
              />
            </div>
            <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-800 shadow-sm text-gray-800 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                <List size={18} />
              </button>
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-800 shadow-sm text-gray-800 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                <Grid size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 min-h-[400px]" ref={listRef}>
          
          {filteredTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              <Search size={48} className="mb-4 opacity-20" />
              <p>No transactions found for your criteria.</p>
            </div>
          ) : (
            <>
              {viewMode === 'list' ? (
                <div className="space-y-4">
                  {filteredTransactions.map((tx) => (
                    <div 
                      key={tx.id} 
                      onClick={() => setSelectedTx(tx)}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800/50 hover:shadow-md transition-all cursor-pointer bg-white dark:bg-gray-800"
                    >
                      <div className="flex items-center gap-4 mb-3 sm:mb-0">
                        <div className={`p-3 rounded-xl flex items-center justify-center w-12 h-12 ${tx.type === 'credit' ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400'}`}>
                          {getCategoryIcon(tx.category)}
                        </div>
                        <div>
                          <p className="text-base font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{tx.description}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span className="flex items-center gap-1"><Calendar size={12}/> {tx.date}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">{getMethodIcon(tx.method)} <span className="capitalize">{tx.method}</span></span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full pl-16 sm:pl-0">
                        <div className="text-left sm:text-right">
                          <p className={`text-lg font-semibold ${tx.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-white'}`}>
                            {tx.type === 'credit' ? '+' : '-'} ₹{tx.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </p>
                          <p className={`text-xs font-medium mt-1 ${tx.status === 'Completed' ? 'text-green-500' : 'text-amber-500'}`}>
                            {tx.status}
                          </p>
                        </div>
                        <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTransactions.map((tx) => (
                    <div 
                      key={tx.id}
                      onClick={() => setSelectedTx(tx)}
                      className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer group flex flex-col justify-between h-48"
                    >
                      <div className="flex justify-between items-start">
                        <div className={`p-2.5 rounded-xl ${tx.type === 'credit' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-rose-100 text-rose-600 dark:bg-rose-900/30'}`}>
                          {getCategoryIcon(tx.category)}
                        </div>
                        <span className="text-xs font-medium text-gray-500 bg-white dark:bg-gray-800 px-2 py-1 rounded-md border border-gray-100 dark:border-gray-700 uppercase flex items-center gap-1.5">
                          {getMethodIcon(tx.method)} {tx.method}
                        </span>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{tx.date} at {tx.time}</p>
                        <p className="text-lg font-semibold text-gray-800 dark:text-white truncate">{tx.description}</p>
                      </div>

                      <div className="flex justify-between items-end border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
                        <span className={`text-xs font-medium ${tx.status === 'Completed' ? 'text-green-500' : 'text-amber-500'}`}>
                          {tx.status}
                        </span>
                        <p className={`text-xl font-semibold ${tx.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-white'}`}>
                          {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300 relative">
            
            <div className={`h-3 w-full ${selectedTx.type === 'credit' ? 'bg-green-500' : 'bg-indigo-500'}`}></div>
            
            <button 
              onClick={() => setSelectedTx(null)}
              className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-gray-800 dark:hover:text-white rounded-full transition-colors z-10"
            >
              <X size={16} />
            </button>

            <div className="p-8 pb-4 text-center">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${selectedTx.type === 'credit' ? 'bg-green-50 text-green-500 dark:bg-green-900/20' : 'bg-rose-50 text-rose-500 dark:bg-rose-900/20'}`}>
                {getCategoryIcon(selectedTx.category)}
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">
                {selectedTx.type === 'credit' ? '+' : '-'}₹{selectedTx.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{selectedTx.description}</p>
              
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                <CheckCircle2 size={14} className={selectedTx.status === 'Completed' ? 'text-green-500' : 'text-amber-500'} /> 
                Payment {selectedTx.status}
              </div>
            </div>

            <div className="px-8 py-6">
              <div className="space-y-4 text-sm bg-gray-50 dark:bg-gray-900/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Date & Time</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{selectedTx.date}, {selectedTx.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Transaction ID</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{selectedTx.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Payment Method</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200 uppercase flex items-center gap-1.5">
                    {getMethodIcon(selectedTx.method)} {selectedTx.method}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
                  <span className="text-gray-500 dark:text-gray-400">Reference No.</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{selectedTx.ref}</span>
                </div>
              </div>

              <div className="mt-6 flex justify-center opacity-30 dark:opacity-50">
                <div className="h-10 w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiIC8+PGRlZnM+PHBhdHRlcm4gaWQ9InBhdHRlcm4iIHdpZHRoPSI4IiBoZWlnaHQ9IjEwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIxMCIgZmlsbD0iIzAwMCIgLz48cmVjdCB4PSI0IiB3aWR0aD0iMSIgaGVpZ2h0PSIxMCIgZmlsbD0iIzAwMCIgLz48cmVjdCB4PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSIxMCIgZmlsbD0iIzAwMCIgLz48L3BhdHRlcm4+PC9kZWZzPjwvc3ZnPg==')]"></div>
              </div>

              <div className="mt-6">
                <button 
                  onClick={() => toast.success(`Receipt downloaded to device`)}
                  className="w-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Download size={18} /> Download Statement
                </button>
              </div>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}