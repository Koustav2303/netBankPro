import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import toast from 'react-hot-toast';
import { useAccount } from '../../context/AccountContext';
import { 
  PiggyBank, TrendingUp, Calendar, ShieldCheck, 
  Plus, IndianRupee, PieChart, ArrowRight, 
  FileText, CheckCircle2, Clock, Info, X, Download
} from 'lucide-react';

export default function FixedDeposit() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  
  // Pulling global balance to sync FD creation with main account
  const { balance, setBalance } = useAccount();

  // Investment Calculator State
  const [fdForm, setFdForm] = useState({
    amount: 50000,
    durationMonths: 12,
    payoutType: 'cumulative',
    isSeniorCitizen: false
  });

  // Modal State
  const [selectedFd, setSelectedFd] = useState(null);

  // Mock active deposits
  const [activeDeposits, setActiveDeposits] = useState([
    { id: 'FD-77291', amount: 100000, interestRate: 7.5, maturityAmount: 107500, date: '2025-06-15', maturityDate: '2026-06-15', progress: 75, status: 'Active' },
    { id: 'FD-77292', amount: 50000, interestRate: 8.0, maturityAmount: 58000, date: '2024-01-10', maturityDate: '2026-01-10', progress: 95, status: 'Active' }
  ]);

  // Dynamic Calculations
  const baseRate = 7.1;
  const currentRate = fdForm.isSeniorCitizen ? baseRate + 0.5 : baseRate;
  const principal = parseFloat(fdForm.amount) || 0;
  const timeInYears = fdForm.durationMonths / 12;
  const estimatedInterest = principal * (currentRate / 100) * timeInYears;
  const estimatedReturn = principal + estimatedInterest;
  
  // Visual projection percentages
  const principalPercent = (principal / estimatedReturn) * 100 || 100;
  const interestPercent = (estimatedInterest / estimatedReturn) * 100 || 0;

  useEffect(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    if (cardsRef.current.length > 0) {
      gsap.fromTo(cardsRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.2)" }
      );
    }
  }, [activeDeposits.length]);

  const handleCreateFD = (e) => {
    e.preventDefault();
    
    if (principal < 5000) {
      toast.error('Minimum deposit amount is ₹5,000');
      return;
    }

    if (principal > balance) {
      toast.error('Insufficient funds in your main account.');
      return;
    }

    const today = new Date();
    const maturity = new Date();
    maturity.setMonth(maturity.getMonth() + parseInt(fdForm.durationMonths));

    const newFD = {
      id: `FD-${Math.floor(Math.random() * 90000) + 10000}`,
      amount: principal,
      interestRate: currentRate,
      maturityAmount: estimatedReturn,
      date: today.toISOString().split('T')[0],
      maturityDate: maturity.toISOString().split('T')[0],
      progress: 0,
      status: 'Just Created'
    };

    // Deduct from main balance
    setBalance(prev => prev - principal);
    
    setActiveDeposits([newFD, ...activeDeposits]);
    toast.success('Fixed Deposit created successfully! Amount deducted from main balance.');
    
    // Reset form to default
    setFdForm({ amount: 5000, durationMonths: 12, payoutType: 'cumulative', isSeniorCitizen: false });
  };

  const handleDownloadReceipt = () => {
    toast.success(`Digital Certificate for ${selectedFd.id} downloaded!`);
  };

  const quickAmounts = [10000, 50000, 100000, 500000];

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto space-y-8 pb-12 relative">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-400">
            Wealth Management
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Secure your future with guaranteed returns and flexible tenures.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3">
            <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-amber-600 dark:text-amber-400">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Top Interest Rate</p>
              <p className="text-lg font-bold text-gray-800 dark:text-white">
                Up to {baseRate + 0.5}% p.a.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Column: Advanced Investment Calculator & Creator */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            
            <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
              <div className="relative z-10 flex items-center gap-4 mb-2">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                  <PieChart size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-wide">Open New FD</h3>
                  <p className="text-amber-100 text-sm font-medium mt-1">Calculate and invest instantly</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleCreateFD} className="p-6 md:p-8 space-y-8">
              
              {/* Amount Input */}
              <div className="space-y-3">
                <label className="flex justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <span>Investment Amount</span>
                  <span className="text-indigo-500 dark:text-indigo-400">Avail: ₹{balance.toLocaleString('en-IN')}</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><IndianRupee size={20} /></span>
                  <input 
                    required 
                    type="number" 
                    min="5000"
                    value={fdForm.amount} 
                    onChange={(e) => setFdForm({...fdForm, amount: e.target.value})} 
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all text-gray-800 dark:text-white text-lg font-semibold" 
                  />
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {quickAmounts.map((amt) => (
                    <button 
                      key={amt} 
                      type="button" 
                      onClick={() => setFdForm({...fdForm, amount: amt})}
                      className="px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg text-xs font-semibold hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors border border-amber-100 dark:border-amber-800/30"
                    >
                      +₹{(amt/1000)}k
                    </button>
                  ))}
                </div>
              </div>

              {/* Tenure Slider */}
              <div className="space-y-3">
                <label className="flex justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <span>Tenure (Months)</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">{fdForm.durationMonths} Months</span>
                </label>
                <input 
                  type="range" 
                  min="6" max="120" step="6"
                  value={fdForm.durationMonths}
                  onChange={(e) => setFdForm({...fdForm, durationMonths: e.target.value})}
                  className="w-full accent-amber-500 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 font-medium">
                  <span>6 M</span>
                  <span>5 Yrs</span>
                  <span>10 Yrs</span>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg">
                    <UserPlusIcon size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white text-sm">Senior Citizen</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Extra 0.5% interest rate</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setFdForm({...fdForm, isSeniorCitizen: !fdForm.isSeniorCitizen})} 
                  className={`w-12 h-6 rounded-full transition-colors relative ${fdForm.isSeniorCitizen ? 'bg-amber-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${fdForm.isSeniorCitizen ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </button>
              </div>

              {/* Projection Card */}
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 space-y-5">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Total Maturity Value</p>
                    <p className="text-2xl font-black text-amber-600 dark:text-amber-400">₹ {estimatedReturn.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Interest Rate</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">{currentRate}%</p>
                  </div>
                </div>

                {/* Visual Stacked Bar */}
                <div className="space-y-2">
                  <div className="w-full flex h-3 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 transition-all duration-500" style={{ width: `${principalPercent}%` }}></div>
                    <div className="bg-amber-500 transition-all duration-500" style={{ width: `${interestPercent}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-indigo-500"></div> Principal: ₹{principal.toLocaleString('en-IN')}
                    </span>
                    <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div> Wealth Gained: ₹{estimatedInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-amber-500/30 flex justify-center items-center gap-2 group">
                Confirm & Invest <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
                <ShieldCheck size={16} className="text-green-500" /> Fully Insured by DICGC up to ₹5 Lakhs
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Active Deposits Portfolio */}
        <div className="xl:col-span-7 space-y-6">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Your Portfolio</h3>
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full">
              {activeDeposits.length} Active FDs
            </span>
          </div>
          
          {activeDeposits.length === 0 ? (
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700 rounded-3xl p-16 text-center flex flex-col items-center justify-center text-gray-500">
              <PiggyBank size={64} className="mb-4 opacity-20" />
              <p className="text-lg font-medium">Your portfolio is empty.</p>
              <p className="text-sm mt-2 opacity-70">Create a fixed deposit to see it track here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeDeposits.map((fd, index) => (
                <div 
                  key={fd.id} 
                  ref={el => cardsRef.current[index] = el}
                  className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-amber-300 dark:hover:border-amber-700/50 transition-all flex flex-col justify-between min-h-[260px] group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-gray-50 dark:bg-gray-900 px-3 py-1 rounded-lg text-xs font-mono text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700">
                        {fd.id}
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
                        {fd.status}
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Invested Amount</p>
                      <p className="text-2xl font-black text-gray-800 dark:text-white">₹{fd.amount.toLocaleString('en-IN')}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5"><Calendar size={14}/> Maturity</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{fd.maturityDate}</span>
                      </div>
                      
                      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full relative" 
                          style={{ width: `${fd.progress}%` }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center mt-6">
                    <div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">Expected Return</p>
                      <p className="text-lg font-bold text-amber-600 dark:text-amber-400">₹{fd.maturityAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedFd(fd)}
                      className="bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl text-sm font-semibold transition-colors border border-gray-200 dark:border-gray-700"
                    >
                      Certificate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Digital Certificate Modal */}
      {selectedFd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-100 dark:border-gray-700">
            
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck size={24} /> Official FD Certificate
              </h3>
              <button 
                onClick={() => setSelectedFd(null)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                <ShieldCheck size={200} />
              </div>

              <div className="text-center mb-8">
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Certificate Number</p>
                <h4 className="text-xl font-mono text-gray-800 dark:text-white font-bold">{selectedFd.id}</h4>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 space-y-4 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Account Holder</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">Koustav Pan</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Principal Amount</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">₹{selectedFd.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Interest Rate</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{selectedFd.interestRate}% p.a.</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Booking Date</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{selectedFd.date}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Maturity Date</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{selectedFd.maturityDate}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Maturity Value</span>
                  <span className="text-xl font-black text-amber-600 dark:text-amber-400">₹{selectedFd.maturityAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button 
                  onClick={handleDownloadReceipt}
                  className="flex-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/40 font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 border border-amber-200 dark:border-amber-800/30"
                >
                  <Download size={18} /> Download PDF
                </button>
              </div>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}

// Helper icon component since Lucide doesn't have UserPlus built in by default in some versions
function UserPlusIcon(props) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={props.size || 24} 
      height={props.size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={props.className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <line x1="19" y1="8" x2="19" y2="14"></line>
      <line x1="22" y1="11" x2="16" y2="11"></line>
    </svg>
  );
}