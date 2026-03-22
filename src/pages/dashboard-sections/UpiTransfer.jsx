import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import toast from 'react-hot-toast';
import { useAccount } from '../../context/AccountContext';
import { 
  Smartphone, Send, QrCode, Search, CheckCircle2, 
  Zap, ShieldCheck, ArrowRightLeft, Camera, X,
  ArrowDownLeft, History, Contact2, Flashlight, 
  Image as ImageIcon, Share2, Download, Copy
} from 'lucide-react';

export default function UpiTransfer() {
  const containerRef = useRef(null);
  const { balance, setBalance } = useAccount();
  const [activeTab, setActiveTab] = useState('pay'); // pay, scan, request

  // Master Entry Animation
  useEffect(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto space-y-8 pb-12 relative min-h-[600px]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500 dark:from-purple-400 dark:to-indigo-300">
            UPI Transfers
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Zero fees. Instant settlement. 24/7 Availability.</p>
        </div>
        
        {/* Dynamic Balance Indicator */}
        <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3">
          <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600 dark:text-purple-400">
            <Zap size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">UPI Daily Limit</p>
            <p className="text-lg font-bold text-gray-800 dark:text-white">
              ₹ {balance > 100000 ? '1,00,000' : balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden relative min-h-[500px] flex flex-col">
        
        {/* UPI Tab Navigation */}
        <div className="flex border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
          <button 
            onClick={() => setActiveTab('pay')}
            className={`flex-1 py-5 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'pay' ? 'text-purple-600 border-b-2 border-purple-600 bg-white dark:bg-gray-800 dark:text-purple-400 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
          >
            <Send size={18} /> Pay to UPI ID
          </button>
          <button 
            onClick={() => setActiveTab('scan')}
            className={`flex-1 py-5 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'scan' ? 'text-purple-600 border-b-2 border-purple-600 bg-white dark:bg-gray-800 dark:text-purple-400 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
          >
            <QrCode size={18} /> Scan Any QR
          </button>
          <button 
            onClick={() => setActiveTab('request')}
            className={`flex-1 py-5 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'request' ? 'text-purple-600 border-b-2 border-purple-600 bg-white dark:bg-gray-800 dark:text-purple-400 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
          >
            <ArrowDownLeft size={18} /> Request Money
          </button>
        </div>

        <div className="p-6 md:p-10 flex-1 relative">
          {/* We use isolated components to prevent animation ref crashes on unmount */}
          {activeTab === 'pay' && <PaySection balance={balance} setBalance={setBalance} />}
          {activeTab === 'scan' && <ScanSection />}
          {activeTab === 'request' && <RequestSection />}
        </div>

      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT: PAY TO UPI ID
// ==========================================
function PaySection({ balance, setBalance }) {
  const sectionRef = useRef(null);
  const contactsRef = useRef([]);
  
  const [upiId, setUpiId] = useState('');
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');
  const [isValidUpi, setIsValidUpi] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [transactionRef, setTransactionRef] = useState('');

  const recentContacts = [
    { name: 'Rahul S.', upi: 'rahul@okaxis', color: 'bg-blue-500' },
    { name: 'Priya M.', upi: 'priya.m@ybl', color: 'bg-emerald-500' },
    { name: 'Aarav K.', upi: 'aarav99@sbi', color: 'bg-amber-500' },
    { name: 'Neha G.', upi: 'neha.g@icici', color: 'bg-rose-500' },
    { name: 'Swiggy', upi: 'swiggy@hdfc', color: 'bg-orange-500' },
  ];

  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4 });
    
    // Safely animate contacts array
    const validRefs = contactsRef.current.filter(Boolean);
    if (validRefs.length > 0) {
      gsap.fromTo(validRefs,
        { opacity: 0, scale: 0.8, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "back.out(1.5)" }
      );
    }
  }, []);

  useEffect(() => {
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    setIsValidUpi(upiRegex.test(upiId));
  }, [upiId]);

  const executePayment = (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);

    if (!isValidUpi || !numAmount || numAmount <= 0) {
      toast.error('Please enter a valid UPI ID and Amount');
      return;
    }
    if (numAmount > balance) {
      toast.error('Insufficient funds');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setBalance(prev => prev - numAmount);
      setTransactionRef(`UPI-${Math.floor(Math.random() * 90000000) + 10000000}`);
      setIsProcessing(false);
      setShowSuccessOverlay(true);
      
      setTimeout(() => {
        setShowSuccessOverlay(false);
        setUpiId('');
        setAmount('');
        setRemarks('');
      }, 3000);
    }, 1500);
  };

  return (
    <div ref={sectionRef} className="max-w-2xl mx-auto space-y-8">
      
      {/* Recent Contacts Carousel */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Recent Transactions</h4>
          <button className="text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline flex items-center gap-1">
            <History size={14} /> View All
          </button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 pt-1 px-1">
          <div className="flex flex-col items-center gap-2 min-w-[72px] cursor-pointer group" onClick={() => toast('Opening contact book...')}>
            <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-500 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
              <Search size={20} className="text-gray-500 dark:text-gray-400" />
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300 text-center">Search</span>
          </div>
          
          {recentContacts.map((contact, i) => (
            <div 
              key={i} 
              ref={el => contactsRef.current[i] = el}
              onClick={() => { setUpiId(contact.upi); toast.success('Contact selected'); }}
              className="flex flex-col items-center gap-2 min-w-[72px] cursor-pointer group"
            >
              <div className={`w-14 h-14 rounded-full ${contact.color} text-white flex items-center justify-center text-xl font-bold shadow-md group-hover:ring-4 ring-purple-500/30 transition-all transform group-hover:-translate-y-1`}>
                {contact.name.charAt(0)}
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300 text-center truncate w-full px-1">{contact.name}</span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={executePayment} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Receiver UPI ID</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Contact2 size={18} /></span>
            <input required type="text" value={upiId} onChange={(e) => setUpiId(e.target.value.toLowerCase())} className={`w-full bg-gray-50 dark:bg-gray-900 border ${isValidUpi ? 'border-green-400 focus:ring-green-500/50' : 'border-gray-200 dark:border-gray-700 focus:ring-purple-500/50'} rounded-xl py-4 pl-12 pr-12 outline-none focus:ring-2 transition-all text-gray-800 dark:text-white font-medium`} placeholder="e.g. username@bank" />
            {isValidUpi && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 animate-in zoom-in"><CheckCircle2 size={20} /></span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Amount (INR)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-xl">₹</span>
              <input required type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-4 pl-10 pr-4 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-gray-800 dark:text-white text-xl font-bold" placeholder="0.00" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Note (Optional)</label>
            <input type="text" value={remarks} onChange={(e) => setRemarks(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-4 px-4 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-gray-800 dark:text-white" placeholder="e.g. Dinner split" />
          </div>
        </div>

        <button type="submit" disabled={isProcessing || (!isValidUpi && upiId.length > 0)} className={`w-full font-bold py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 text-white text-lg ${isProcessing || (!isValidUpi && upiId.length > 0) ? 'bg-purple-400 dark:bg-purple-800 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-purple-500/30'}`}>
          {isProcessing ? <div className="flex items-center gap-3"><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Processing...</div> : <>Pay Securely <ArrowRightLeft size={18} /></>}
        </button>
      </form>

      {showSuccessOverlay && (
        <div className="absolute inset-0 z-50 bg-gradient-to-br from-purple-600 to-indigo-700 flex flex-col items-center justify-center text-white animate-in fade-in duration-300 rounded-3xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 flex flex-col items-center animate-in slide-in-from-bottom-10 duration-500">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(255,255,255,0.4)] animate-[bounce_1s_ease-in-out_infinite]">
              <CheckCircle2 size={60} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-1 opacity-90">Payment Successful</h2>
            <p className="text-5xl font-black mb-8 drop-shadow-lg">₹{parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 w-80 border border-white/20">
              <div className="flex justify-between py-2 border-b border-white/10"><span className="text-white/70 text-sm">Paid to</span><span className="font-semibold text-right">{upiId}</span></div>
              <div className="flex justify-between py-2 border-b border-white/10"><span className="text-white/70 text-sm">Ref No.</span><span className="font-mono font-semibold">{transactionRef}</span></div>
              <div className="flex justify-between py-2"><span className="text-white/70 text-sm">Via</span><span className="font-semibold">NetBankPro UPI</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// SUB-COMPONENT: SCAN QR (Realistic Viewfinder)
// ==========================================
function ScanSection() {
  const sectionRef = useRef(null);
  const scannerLineRef = useRef(null);
  const [flashlightOn, setFlashlightOn] = useState(false);

  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4 });
    
    // Laser Animation - safely scoped and cleaned up
    let laserTween;
    if (scannerLineRef.current) {
      laserTween = gsap.to(scannerLineRef.current, {
        y: 240, // Distance to scan down
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "linear"
      });
    }
    
    // Cleanup function when user switches tabs
    return () => {
      if (laserTween) laserTween.kill();
    };
  }, []);

  return (
    <div ref={sectionRef} className="flex flex-col items-center justify-center py-4 w-full h-full">
      
      {/* Viewfinder Area */}
      <div className={`relative w-72 h-72 md:w-80 md:h-80 bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border-4 ${flashlightOn ? 'border-gray-500' : 'border-gray-800'} transition-colors duration-300`}>
        
        {/* Fake Camera Feed Background */}
        <div className={`absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] transition-opacity duration-300 ${flashlightOn ? 'opacity-40' : 'opacity-10'}`}></div>
        
        {/* Flashlight beam simulation */}
        {flashlightOn && <div className="absolute inset-0 bg-white/10 radial-gradient-mask mix-blend-overlay"></div>}
        
        {/* QR Corner Brackets (Target) */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-xl shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
        <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-xl shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
        <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-xl shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-white rounded-br-xl shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
        
        {/* Animated Scanning Laser */}
        <div 
          ref={scannerLineRef}
          className="absolute top-8 left-8 right-8 h-1 bg-green-500 shadow-[0_0_20px_4px_rgba(34,197,94,0.8)] z-10 rounded-full"
        ></div>
        
        {/* Central Icon */}
        <div className="absolute inset-0 flex items-center justify-center text-white/30 flex-col gap-2">
          <Camera size={40} className={flashlightOn ? 'text-white/60' : ''} />
          <span className="text-sm font-medium tracking-widest uppercase">Align QR Code</span>
        </div>
      </div>
      
      {/* Controls */}
      <div className="mt-8 flex gap-6">
        <button 
          onClick={() => setFlashlightOn(!flashlightOn)}
          className={`flex flex-col items-center gap-2 transition-colors ${flashlightOn ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}`}
        >
          <div className={`p-4 rounded-full shadow-md ${flashlightOn ? 'bg-purple-100 dark:bg-purple-900/40' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}>
            <Flashlight size={24} />
          </div>
          <span className="text-xs font-semibold">Flashlight</span>
        </button>

        <button 
          onClick={() => toast.success("Opening gallery...")}
          className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          <div className="p-4 rounded-full shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <ImageIcon size={24} />
          </div>
          <span className="text-xs font-semibold">Gallery QR</span>
        </button>
      </div>

      <p className="mt-8 text-sm text-gray-400 text-center max-w-xs">
        Supports BharatQR, Google Pay, PhonePe, Paytm, and all UPI QR codes.
      </p>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT: REQUEST MONEY (Shareable QR)
// ==========================================
function RequestSection() {
  const sectionRef = useRef(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
  }, []);

  return (
    <div ref={sectionRef} className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-center h-full py-4">
      
      {/* Left Side: The Shareable QR Card */}
      <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-800 p-1 rounded-3xl shadow-2xl w-full max-w-sm shrink-0 transform hover:scale-[1.02] transition-transform">
        <div className="bg-white dark:bg-gray-900 rounded-[22px] p-6 flex flex-col items-center text-center relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-2">Koustav Pan</h3>
          <p className="text-sm font-mono text-gray-500 dark:text-gray-400 mt-1 mb-6">koustav.pan@netbank</p>
          
          {/* Simulated QR Code Graphic */}
          <div className="w-48 h-48 bg-white border-2 border-gray-100 rounded-2xl p-3 shadow-sm mb-6 relative group">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=koustav.pan@netbank&pn=Koustav%20Pan${amount ? `&am=${amount}` : ''}`} 
              alt="UPI QR Code" 
              className="w-full h-full rounded-xl mix-blend-multiply"
            />
            {/* Center Bank Logo overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
              <Zap size={24} className="text-purple-600" />
            </div>
          </div>

          {amount && (
            <div className="mb-4 text-purple-600 dark:text-purple-400 font-bold bg-purple-50 dark:bg-purple-900/20 px-4 py-1.5 rounded-full">
              Requesting: ₹{amount}
            </div>
          )}

          <div className="flex w-full gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button onClick={() => toast.success("QR Code saved to gallery")} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm">
              <Download size={16} /> Save
            </button>
            <button onClick={() => toast.success("Opening share menu...")} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 font-semibold hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors text-sm">
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Right Side: Request Details Form */}
      <div className="w-full max-w-sm space-y-6">
        <div>
          <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Generate Request</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">Add an amount to generate a specific payment QR code, or share your generic QR above.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Amount to Request</label>
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-gray-800 dark:text-white font-bold" 
              placeholder="Leave blank for open payment" 
            />
          </div>

          <button 
            onClick={() => {
              navigator.clipboard.writeText(`upi://pay?pa=koustav.pan@netbank&pn=Koustav%20Pan${amount ? `&am=${amount}` : ''}`);
              toast.success("Payment Link Copied!");
            }}
            className="w-full bg-gray-800 dark:bg-gray-100 hover:bg-gray-700 dark:hover:bg-white text-white dark:text-gray-900 font-bold py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2"
          >
            <Copy size={18} /> Copy Payment Link
          </button>
        </div>
      </div>

    </div>
  );
}