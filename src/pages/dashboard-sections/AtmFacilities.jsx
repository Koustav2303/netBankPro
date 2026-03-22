import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import toast from 'react-hot-toast';
import { 
  CreditCard, ShieldAlert, Eye, EyeOff, Wifi, 
  Globe, Lock, Unlock, Settings, Plus, RotateCcw,
  ShoppingBag, Zap, AlertTriangle, ChevronRight,
  Smartphone
} from 'lucide-react';

export default function AtmFacilities() {
  const containerRef = useRef(null);
  const frontCardRef = useRef(null);
  const backCardRef = useRef(null);
  const cardsContainerRef = useRef(null);
  
  const [activeTab, setActiveTab] = useState('manage'); // manage, limits, apply
  const [isFlipped, setIsFlipped] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  
  const [cardSettings, setCardSettings] = useState({
    online: true,
    international: false,
    contactless: true,
    atmWithdrawal: true
  });
  
  const [limit, setLimit] = useState(50000);
  const [applyForm, setApplyForm] = useState({ type: 'physical', name: '', address: '' });

  // Mock personalized data
  const userName = "Koustav Pan";
  const cardNumber = showDetails ? "4092 8172 6354 9012" : "•••• •••• •••• 9012";
  const cvv = showDetails ? "482" : "•••";
  const expiry = "12/29";

  useEffect(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  // 3D Card Flip Animation Logic
  useEffect(() => {
    if (isFlipped) {
      gsap.to(frontCardRef.current, { rotationY: 180, duration: 0.6, ease: "power2.inOut" });
      gsap.to(backCardRef.current, { rotationY: 0, duration: 0.6, ease: "power2.inOut" });
    } else {
      gsap.to(frontCardRef.current, { rotationY: 0, duration: 0.6, ease: "power2.inOut" });
      gsap.to(backCardRef.current, { rotationY: -180, duration: 0.6, ease: "power2.inOut" });
    }
  }, [isFlipped]);

  const toggleSetting = (setting) => {
    if (isFrozen) {
      toast.error('Cannot change settings while card is frozen.');
      return;
    }
    setCardSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
    const status = !cardSettings[setting] ? 'enabled' : 'disabled';
    const name = setting.charAt(0).toUpperCase() + setting.slice(1).replace(/([A-Z])/g, ' $1');
    toast.success(`${name} ${status} successfully.`);
  };

  const handleFreeze = () => {
    setIsFrozen(!isFrozen);
    if (!isFrozen) {
      toast.error('Card temporarily frozen. All transactions blocked.', { icon: '❄️' });
    } else {
      toast.success('Card unfrozen and active.', { icon: '🔥' });
    }
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    toast.success(`New ${applyForm.type} card application submitted!`);
    setApplyForm({ type: 'physical', name: '', address: '' });
  };

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-500 dark:from-violet-400 dark:to-indigo-300">
            Card Management
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Control your physical and virtual debit cards with advanced security.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Column: The Interactive 3D Card Area */}
        <div className="xl:col-span-5 flex flex-col items-center gap-6">
          
          {/* 3D Scene Container */}
          <div 
            ref={cardsContainerRef}
            className="w-full max-w-md aspect-[1.586/1] relative group perspective-1000"
            style={{ perspective: '1000px' }}
          >
            {/* Front of Card */}
            <div 
              ref={frontCardRef}
              className={`absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between shadow-2xl [backface-visibility:hidden] transition-all duration-300 ${isFrozen ? 'grayscale opacity-80' : ''}`}
              style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #312e81 50%, #1e1b4b 100%)',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay rounded-2xl pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"></div>
              
              <div className="flex justify-between items-start relative z-10">
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-10 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-md shadow-inner opacity-90 flex items-center justify-center">
                    <div className="w-8 h-6 border border-yellow-600/30 rounded-sm"></div>
                  </div>
                  <Wifi size={24} className="text-white/60 rotate-90" />
                </div>
                <div className="text-right">
                  <span className="text-white font-black italic tracking-widest text-2xl drop-shadow-md">NETBANK</span>
                  <p className="text-white/50 text-[10px] tracking-widest uppercase mt-1">Platinum Premium</p>
                </div>
              </div>

              <div className="space-y-4 relative z-10 text-white">
                <div className="font-mono text-2xl md:text-3xl tracking-[0.15em] text-white/90 drop-shadow-md">
                  {cardNumber}
                </div>
                <div className="flex justify-between items-end uppercase text-xs tracking-widest text-white/80">
                  <div>
                    <div className="text-[9px] mb-1 opacity-60">Card Holder</div>
                    <div className="font-medium text-sm text-white drop-shadow-sm truncate max-w-[150px]">
                      {userName}
                    </div>
                  </div>
                  <div className="text-right flex gap-4">
                    <div>
                      <div className="text-[9px] mb-1 opacity-60">Valid Thru</div>
                      <div className="font-medium">{expiry}</div>
                    </div>
                    {/* Simulated Mastercard Circles */}
                    <div className="flex items-center -space-x-2 pb-1">
                      <div className="w-6 h-6 rounded-full bg-red-500/80 mix-blend-screen"></div>
                      <div className="w-6 h-6 rounded-full bg-yellow-500/80 mix-blend-screen"></div>
                    </div>
                  </div>
                </div>
              </div>

              {isFrozen && (
                <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm rounded-2xl flex items-center justify-center z-20">
                  <div className="bg-white/20 px-6 py-2 rounded-full border border-white/30 text-white font-bold tracking-widest uppercase flex items-center gap-2">
                    <Lock size={16} /> Card Frozen
                  </div>
                </div>
              )}
            </div>

            {/* Back of Card */}
            <div 
              ref={backCardRef}
              className="absolute inset-0 w-full h-full rounded-2xl flex flex-col shadow-2xl [backface-visibility:hidden] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
                transform: 'rotateY(-180deg)'
              }}
            >
              <div className="w-full h-12 bg-black mt-6 opacity-80"></div>
              <div className="p-6 flex-1 flex flex-col justify-center">
                <div className="w-full h-10 bg-gray-200 rounded flex items-center justify-end px-4">
                  <span className="font-mono text-gray-800 font-bold italic">{cvv}</span>
                </div>
                <div className="mt-4 text-[8px] text-white/40 leading-tight text-center px-4">
                  This card is the property of NetBankPro. Misuse is a criminal offence. If found, please return to the nearest branch or call the number on the back of this card.
                </div>
              </div>
            </div>
          </div>

          {/* Card View Controls */}
          <div className="flex gap-4 w-full max-w-md">
            <button 
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <RotateCcw size={18} /> Flip Card
            </button>
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              {showDetails ? <EyeOff size={18} /> : <Eye size={18} />} 
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
        </div>

        {/* Right Column: Tabbed Interface for Controls */}
        <div className="xl:col-span-7 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col min-h-[500px]">
          
          {/* Custom Tabs */}
          <div className="flex border-b border-gray-100 dark:border-gray-700 overflow-x-auto hide-scrollbar">
            <button 
              onClick={() => setActiveTab('manage')}
              className={`flex-1 min-w-[120px] py-5 text-sm font-medium transition-all ${activeTab === 'manage' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20 dark:text-indigo-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
            >
              Manage Card
            </button>
            <button 
              onClick={() => setActiveTab('limits')}
              className={`flex-1 min-w-[120px] py-5 text-sm font-medium transition-all ${activeTab === 'limits' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20 dark:text-indigo-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
            >
              Set Limits
            </button>
            <button 
              onClick={() => setActiveTab('apply')}
              className={`flex-1 min-w-[120px] py-5 text-sm font-medium transition-all ${activeTab === 'apply' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20 dark:text-indigo-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
            >
              Apply New Card
            </button>
          </div>

          <div className="p-6 md:p-8 flex-1 bg-gray-50/30 dark:bg-gray-800/30">
            
            {/* MANAGE TAB */}
            {activeTab === 'manage' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                
                {/* Master Freeze Toggle */}
                <div className={`p-5 rounded-2xl border transition-colors flex justify-between items-center ${isFrozen ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/50' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${isFrozen ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
                      {isFrozen ? <Lock size={24} /> : <Unlock size={24} />}
                    </div>
                    <div>
                      <h4 className={`font-semibold ${isFrozen ? 'text-blue-800 dark:text-blue-300' : 'text-gray-800 dark:text-white'}`}>Freeze Card</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Temporarily block all transactions</p>
                    </div>
                  </div>
                  <button onClick={handleFreeze} className={`w-14 h-7 rounded-full transition-colors relative shadow-inner ${isFrozen ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform shadow-md ${isFrozen ? 'translate-x-8' : 'translate-x-1'}`}></div>
                  </button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2">Usage Settings</h4>
                  
                  {/* Setting Items */}
                  {[
                    { id: 'online', title: 'Online Transactions', desc: 'E-commerce and app payments', icon: <ShoppingBag size={20} /> },
                    { id: 'contactless', title: 'Tap & Pay (NFC)', desc: 'Contactless POS payments', icon: <Zap size={20} /> },
                    { id: 'international', title: 'International Usage', desc: 'Transactions outside India', icon: <Globe size={20} /> },
                    { id: 'atmWithdrawal', title: 'ATM Withdrawals', desc: 'Cash withdrawals at ATMs', icon: <CreditCard size={20} /> }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 p-2.5 rounded-xl">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">{item.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => toggleSetting(item.id)} 
                        disabled={isFrozen}
                        className={`w-12 h-6 rounded-full transition-colors relative ${cardSettings[item.id] ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'} ${isFrozen ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform shadow-sm ${cardSettings[item.id] ? 'translate-x-7' : 'translate-x-1'}`}></div>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                   <button onClick={() => toast("PIN reset instructions sent to registered email")} className="w-full text-left p-4 rounded-xl text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors flex justify-between items-center">
                     <span>Generate or Change PIN</span>
                     <ChevronRight size={20} />
                   </button>
                   <button onClick={() => toast.error("Card permanently blocked. Request a replacement in the 'Apply' tab.")} className="w-full text-left p-4 rounded-xl text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex justify-between items-center">
                     <span className="flex items-center gap-2"><AlertTriangle size={18} /> Permanently Block Card</span>
                     <ChevronRight size={20} />
                   </button>
                </div>

              </div>
            )}

            {/* LIMITS TAB */}
            {activeTab === 'limits' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-lg">
                  <h3 className="text-lg font-medium opacity-90 mb-1">Daily Spending Limit</h3>
                  <div className="text-4xl font-extrabold mb-6">₹ {limit.toLocaleString('en-IN')}</div>
                  
                  <input 
                    type="range" 
                    min="10000" max="200000" step="5000"
                    value={limit}
                    onChange={(e) => setLimit(parseInt(e.target.value))}
                    disabled={isFrozen}
                    className="w-full accent-white h-2 bg-white/30 rounded-lg appearance-none cursor-pointer mb-2 disabled:opacity-50"
                  />
                  <div className="flex justify-between text-xs font-medium opacity-80">
                    <span>₹ 10,000</span>
                    <span>₹ 2,00,000</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-gray-800 dark:text-white">Current Usage Today</h4>
                    <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">₹ 12,450 spent</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden mb-2">
                    <div 
                      className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${(12450 / limit) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
                    ₹ {(limit - 12450).toLocaleString('en-IN')} remaining
                  </p>
                </div>
                
                <button 
                  onClick={() => toast.success("Limits saved successfully!")}
                  disabled={isFrozen}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/30"
                >
                  Save New Limits
                </button>
              </div>
            )}

            {/* APPLY NEW CARD TAB */}
            {activeTab === 'apply' && (
              <form onSubmit={handleApplySubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <label className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${applyForm.type === 'physical' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}>
                    <input type="radio" name="cardType" value="physical" checked={applyForm.type === 'physical'} onChange={() => setApplyForm({...applyForm, type: 'physical'})} className="hidden" />
                    <CreditCard size={28} className={applyForm.type === 'physical' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'} />
                    <h4 className="font-semibold mt-3 text-gray-800 dark:text-white">Physical Card</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Delivered to home</p>
                  </label>
                  <label className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${applyForm.type === 'virtual' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}>
                    <input type="radio" name="cardType" value="virtual" checked={applyForm.type === 'virtual'} onChange={() => setApplyForm({...applyForm, type: 'virtual'})} className="hidden" />
                    <Smartphone size={28} className={applyForm.type === 'virtual' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'} />
                    <h4 className="font-semibold mt-3 text-gray-800 dark:text-white">Virtual Card</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Instant digital access</p>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Name on Card</label>
                  <input required type="text" value={applyForm.name} onChange={(e) => setApplyForm({...applyForm, name: e.target.value})} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-gray-800 dark:text-white" placeholder="Name to be printed" />
                </div>
                
                {applyForm.type === 'physical' && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Delivery Address</label>
                    <textarea required rows="3" value={applyForm.address} onChange={(e) => setApplyForm({...applyForm, address: e.target.value})} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none text-gray-800 dark:text-white" placeholder="Enter complete address"></textarea>
                  </div>
                )}

                <button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/30 flex justify-center items-center gap-2 mt-4">
                  <Plus size={20} /> Request New Card
                </button>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}