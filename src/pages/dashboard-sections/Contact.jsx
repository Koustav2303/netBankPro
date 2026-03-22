import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from 'lucide-react';

export default function Contact() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    if (cardsRef.current.length > 0) {
      gsap.fromTo(cardsRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.15, ease: "power2.out", delay: 0.2 }
      );
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Message sent successfully! Our team will contact you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const contactMethods = [
    {
      icon: <Phone size={24} className="text-blue-500" />,
      title: 'Call Us directly',
      details: '+91 1800 234 5678',
      subDetails: 'Toll-free, 24/7 Support',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: <Mail size={24} className="text-emerald-500" />,
      title: 'Email Support',
      details: 'support@netbankpro.com',
      subDetails: 'Average response time: 2 hours',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      icon: <MapPin size={24} className="text-purple-500" />,
      title: 'Head Office',
      details: 'Tech Park, Cyber City',
      subDetails: 'Bengaluru, Karnataka 560001',
      bg: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto space-y-8 pb-12">
      
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          Get in Touch
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">
          Have a question or need assistance? Our dedicated support team is here to help you 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Contact Information Cards */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 px-2">
            Contact Information
          </h3>
          
          {contactMethods.map((method, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow flex items-start gap-5 group"
            >
              <div className={`p-4 rounded-2xl ${method.bg} group-hover:scale-110 transition-transform duration-300`}>
                {method.icon}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  {method.title}
                </h4>
                <p className="text-lg font-medium text-gray-800 dark:text-white mb-1">
                  {method.details}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                  {index === 0 ? <Clock size={14} /> : index === 1 ? <MessageSquare size={14} /> : <Globe size={14} />}
                  {method.subDetails}
                </p>
              </div>
            </div>
          ))}

          <div className="mt-8 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <h4 className="text-lg font-semibold mb-2 relative z-10">Premium Support</h4>
            <p className="text-sm text-gray-300 relative z-10 leading-relaxed">
              NetBankPro account holders get priority routing. Please use your registered email address when submitting queries for faster resolution.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-8 md:p-10">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Send us a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-gray-800 dark:text-white" 
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-gray-800 dark:text-white" 
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Subject</label>
                <input 
                  required 
                  type="text" 
                  value={formData.subject} 
                  onChange={(e) => setFormData({...formData, subject: e.target.value})} 
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-gray-800 dark:text-white" 
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Your Message</label>
                <textarea 
                  required 
                  rows="5"
                  value={formData.message} 
                  onChange={(e) => setFormData({...formData, message: e.target.value})} 
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none text-gray-800 dark:text-white" 
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full font-medium py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 text-white
                    ${isSubmitting 
                      ? 'bg-blue-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/30'
                    }
                  `}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}