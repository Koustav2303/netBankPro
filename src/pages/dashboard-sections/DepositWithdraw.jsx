import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import toast from 'react-hot-toast';
import { useAccount } from '../../context/AccountContext';
import { 
  ArrowDownToLine, ArrowUpFromLine, Wallet, ShieldCheck, 
  Building2, CreditCard, Smartphone, History, 
  TrendingUp, TrendingDown, Lock, X, CheckCircle2 
} from 'lucide-react';

export default function DepositWithdraw() {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const historyRef = useRef([]);
  
  // Global Account Context
  const { balance, setBalance } = useAccount();
  
  // Core States
  const [activeAction, setActiveAction] = useState('deposit'); // 'deposit' or 'withdraw'
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [remarks, setRemarks] = useState('');
  
  // Security & Processing States
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  // Session History State
  const [sessionHistory, setSessionHistory] = useState([
    { id: 'TRX-091', type: 'deposit', amount: 15000, time: 'Just now', method: 'Bank Transfer' }
  ]);

  const dailyLimit = 100000;
  const spentToday = 12450; // Mock data

  // Master Entry Animation
  useEffect(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  // Form transition animation when switching tabs
  useEffect(() => {
    gsap.fromTo(formRef.current,
      { opacity: 0, x: activeAction === 'deposit' ? -20 : 20 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
    );
    setAmount('');
    setRemarks('');
  }, [activeAction]);

  const handleAmountChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    setAmount(val);
  };

  const handleQuickAmount = (val) => {
    setAmount((prev) => (parseInt(prev || 0) + val).toString());
  };

  const handlePreSubmit = (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);

    if (!numAmount || numAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (activeAction === 'withdraw') {
      if (numAmount > balance) {
        toast.error('Insufficient funds in your account');
        return;
      }
      if (numAmount + spentToday > dailyLimit) {
        toast.error(`Amount exceeds your remaining daily limit of ₹${(dailyLimit - spentToday).toLocaleString()}`);
        return;
      }
      // Trigger OTP Modal for Withdrawals
      setShowOtpModal(true);
    } else {
      // Direct process for deposits
      executeTransaction(numAmount);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value[0];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 3) {
      otpRefs[index + 1].current.focus();
    }
  };

  const verifyOtpAndWithdraw = () => {
    if (otp.join('').length !== 4) {
      toast.error('Please enter complete 4-digit OTP');
      return;
    }
    
    setShowOtpModal(false);
    setOtp(['', '', '', '']);
    executeTransaction(parseFloat(amount));
  };

  const executeTransaction = (numAmount) => {
    setIsProcessing(true);

    // Simulate network delay
    setTimeout(() => {
      if (activeAction === 'deposit') {
        setBalance(prev => prev + numAmount);
        toast.success(`₹${numAmount.toLocaleString('en-IN')} deposited successfully!`);
      } else {
        setBalance(prev => prev - numAmount);
        toast.success(`₹${numAmount.toLocaleString('en-IN')} withdrawn successfully!`);
      }

      // Add to session history
      const newTrx = {
        id: `TRX-${Math.floor(Math.random() * 900) + 100}`,
        type: activeAction,
        amount: numAmount,
        time: 'Just now',
        method: paymentMethod === 'bank' ? 'Bank Transfer' : paymentMethod === 'upi' ? 'UPI' : 'Card'
      };
      
      setSessionHistory([newTrx, ...sessionHistory]);
      
      setAmount('');
      setRemarks('');
      setIsProcessing(false);
    }, 1500);
  };

  const isDeposit = activeAction === 'deposit';
  const themeColor = isDeposit ? 'emerald' : 'rose';

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto space-y-8 pb-12 relative">
      
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className={`text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${isDeposit ? 'from-emerald-600 to-teal-500' : 'from-rose-600 to-red-500'} transition-all duration-500`}>
            Fund Transfers
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Move your money securely with instant settlement.</p>
        </div>
        
        {/* Live Balance Pill */}
        <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-500">
            <Wallet size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Available Balance</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white transition-all">
              ₹ {balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left/Center Column: The Main Action Interface */}
        <div className="xl:col-span-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-500">
          
          {/* Master Toggle */}
          <div className="flex p-2 bg-gray-50 dark:bg-gray-900/50 m-6 rounded-2xl border border-gray-200 dark:border-gray-700">
            <button 
              type="button"
              onClick={() => setActiveAction('deposit')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                isDeposit 
                  ? 'bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-md transform scale-[1.02]' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
              }`}
            >
              <ArrowDownToLine size={18} /> Add Funds
            </button>
            <button 
              type="button"
              onClick={() => setActiveAction('withdraw')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                !isDeposit 
                  ? 'bg-white dark:bg-gray-800 text-rose-600 dark:text-rose-400 shadow-md transform scale-[1.02]' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
              }`}
            >
              <ArrowUpFromLine size={18} /> Withdraw Funds
            </button>
          </div>

          <form ref={formRef} onSubmit={handlePreSubmit} className="p-6 md:p-8 space-y-8 pt-0">
            
            {/* Amount Input Area */}
            <div className="space-y-4">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
                Enter Amount to {isDeposit ? 'Deposit' : 'Withdraw'}
              </label>
              
              <div className="relative max-w-sm mx-auto">
                <span className={`absolute left-4 top-1/2 -translate-y-1/2 font-bold text-2xl ${amount ? `text-${themeColor}-500` : 'text-gray-300 dark:text-gray-600'}`}>₹</span>
                <input 
                  required 
                  type="text" 
                  value={amount ? parseInt(amount).toLocaleString('en-IN') : ''} 
                  onChange={handleAmountChange} 
                  className={`w-full bg-transparent border-b-2 ${amount ? `border-${themeColor}-500 text-${themeColor}-600 dark:text-${themeColor}-400` : 'border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white'} py-4 pl-12 pr-4 outline-none transition-all text-center text-4xl font-black tracking-tight`} 
                  placeholder="0"
                />
              </div>

              {/* Quick Amount Chips */}
              <div className="flex flex-wrap justify-center gap-3 pt-4">
                {[1000, 5000, 10000, 25000].map((val) => (
                  <button 
                    key={val} 
                    type="button" 
                    onClick={() => handleQuickAmount(val)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-colors border ${
                      isDeposit 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800/30 dark:hover:bg-emerald-900/40' 
                        : 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100 dark:bg-rose-900/20 dark:border-rose-800/30 dark:hover:bg-rose-900/40'
                    }`}
                  >
                    + ₹{val.toLocaleString('en-IN')}
                  </button>
                ))}
                <button 
                  type="button" 
                  onClick={() => setAmount('')}
                  className="px-4 py-2 rounded-full text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-6 border-t border-gray-100 dark:border-gray-700">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Select {isDeposit ? 'Payment Method' : 'Destination'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'bank', icon: <Building2 size={20} />, label: 'Linked Bank', sub: 'HDFC ****8912' },
                  { id: 'upi', icon: <Smartphone size={20} />, label: 'UPI ID', sub: 'Instant Transfer' },
                  { id: 'card', icon: <CreditCard size={20} />, label: 'Debit/Credit', sub: 'Visa / Mastercard' }
                ].map((method) => (
                  <label 
                    key={method.id}
                    className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-2 ${
                      paymentMethod === method.id 
                        ? `border-${themeColor}-500 bg-${themeColor}-50 dark:bg-${themeColor}-900/10` 
                        : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <input type="radio" name="paymentMethod" value={method.id} checked={paymentMethod === method.id} onChange={(e) => setPaymentMethod(e.target.value)} className="hidden" />
                    <div className={paymentMethod === method.id ? `text-${themeColor}-500` : 'text-gray-400'}>
                      {method.icon}
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${paymentMethod === method.id ? `text-${themeColor}-700 dark:text-${themeColor}-300` : 'text-gray-700 dark:text-gray-300'}`}>{method.label}</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">{method.sub}</p>
                    </div>
                    {paymentMethod === method.id && (
                      <div className={`absolute top-2 right-2 text-${themeColor}-500`}>
                        <CheckCircle2 size={16} />
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Optional Remarks */}
            <div>
              <input 
                type="text" 
                value={remarks} 
                onChange={(e) => setRemarks(e.target.value)} 
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm text-gray-800 dark:text-white" 
                placeholder="Add a remark (Optional)"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button 
                type="submit" 
                disabled={isProcessing}
                className={`w-full font-bold py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 text-white
                  ${isProcessing 
                    ? 'bg-gray-400 cursor-wait' 
                    : isDeposit 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-emerald-500/30'
                      : 'bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 shadow-rose-500/30'
                  }
                `}
              >
                {isProcessing ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing Transaction...
                  </div>
                ) : (
                  <>
                    <ShieldCheck size={20} />
                    Confirm {isDeposit ? 'Deposit' : 'Withdrawal'} securely
                  </>
                )}
              </button>
            </div>
            
          </form>
        </div>

        {/* Right Column: Limits & Mini History Sidebar */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* Daily Limit Tracker (Only highly relevant for withdraw, but good to show) */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-4">Daily Transaction Limit</h3>
            <div className="flex justify-between items-end mb-2">
              <span className="text-2xl font-black text-gray-800 dark:text-white">
                ₹{spentToday.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium pb-1">
                of ₹{dailyLimit.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${(spentToday / dailyLimit) * 100}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-3 text-center uppercase tracking-wider">
              Resets at midnight IST
            </p>
          </div>

          {/* Session Transfer History */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex-1">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <History size={16} /> Session Activity
              </h3>
            </div>

            <div className="space-y-4">
              {sessionHistory.map((trx, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${trx.type === 'deposit' ? 'bg-emerald-50 text-emerald-500 dark:bg-emerald-900/20' : 'bg-rose-50 text-rose-500 dark:bg-rose-900/20'}`}>
                      {trx.type === 'deposit' ? <TrendingDown size={18} /> : <TrendingUp size={18} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 dark:text-white capitalize">{trx.type}</p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">{trx.method} • {trx.time}</p>
                    </div>
                  </div>
                  <div className={`text-sm font-black ${trx.type === 'deposit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-800 dark:text-white'}`}>
                    {trx.type === 'deposit' ? '+' : '-'}₹{trx.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* OTP Security Modal for Withdrawals */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-100 dark:border-gray-700 text-center p-8 relative">
            
            <button 
              onClick={() => { setShowOtpModal(false); setOtp(['','','','']); }}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X size={18} />
            </button>

            <div className="mx-auto w-16 h-16 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-full flex items-center justify-center mb-6 border-4 border-white dark:border-gray-800 shadow-lg">
              <Lock size={28} />
            </div>
            
            <h3 className="text-xl font-extrabold text-gray-800 dark:text-white mb-2">Verify Withdrawal</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Enter the 4-digit OTP sent to your registered mobile number ending in **89.
            </p>

            <div className="flex justify-center gap-3 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={otpRefs[index]}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-14 h-16 text-center text-2xl font-black bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-gray-800 dark:text-white transition-all"
                />
              ))}
            </div>

            <button 
              onClick={verifyOtpAndWithdraw}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-rose-500/30"
            >
              Verify & Complete Transfer
            </button>
            
            <button className="mt-4 text-xs font-bold text-rose-500 hover:underline">
              Resend OTP
            </button>
          </div>
        </div>
      )}

    </div>
  );
}