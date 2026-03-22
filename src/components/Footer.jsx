import { Link } from 'react-router-dom';
import { ShieldCheck, Twitter, Linkedin, Github, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 rounded-t-3xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] dark:shadow-none transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 tracking-wider">
              NetBankPro
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Experience the next generation of digital banking. Secure, fast, and built for your financial freedom.
            </p>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 w-fit px-3 py-1.5 rounded-lg text-xs font-semibold">
              <ShieldCheck size={16} /> DICGC Insured up to ₹5 Lakhs
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-800 dark:text-white font-semibold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              {['Dashboard', 'ATM Facilities', 'Fund Transfers', 'Fixed Deposits'].map((item) => (
                <li key={item}>
                  <Link to={`/dashboard/${item === 'Dashboard' ? '' : item.split(' ')[0].toLowerCase()}`} className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Security */}
          <div>
            <h4 className="text-gray-800 dark:text-white font-semibold mb-4 uppercase tracking-wider text-sm">Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security Info'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h4 className="text-gray-800 dark:text-white font-semibold mb-4 uppercase tracking-wider text-sm">Connect</h4>
            <div className="space-y-3 mb-6">
              <a href="mailto:support@netbankpro.com" className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Mail size={16} /> support@netbankpro.com
              </a>
              <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Phone size={16} /> 1800-234-5678 (24/7)
              </p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 rounded-lg transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 rounded-lg transition-all">
                <Linkedin size={18} />
              </a>
              <a href="https://github.com/Koustav2303" target="_blank" rel="noreferrer" className="p-2 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg transition-all">
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} NetBankPro. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            Crafted with <Heart size={14} className="text-rose-500 fill-rose-500" /> for modern finance.
          </p>
        </div>

      </div>
    </footer>
  );
}