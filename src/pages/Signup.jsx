import { useRef, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import toast from 'react-hot-toast';

export default function Signup() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  
  const initialFormState = {
    name: '', accountNo: '', aadhar: '', phone: '', email: '', password: '', confirmPassword: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, scale: 0.95 }, 
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
    );
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    toast.success('Account Created Successfully!');
    setTimeout(() => navigate('/login'), 1500);
  };

  const clearForm = () => setFormData(initialFormState);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 py-12">
      <div ref={containerRef} className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">Create Account</h2>
        
        <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs */}
          {['name', 'accountNo', 'phone', 'email'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-2 capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
              <input required type={field === 'email' ? 'email' : 'text'} value={formData[field]} 
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setFormData({...formData, [field]: e.target.value})}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-2">Aadhar Number</label>
            <input required type="text" placeholder="XXXX-XXXX-XXXX" value={formData.aadhar} 
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFormData({...formData, aadhar: e.target.value})}
            />
          </div>

          <div>
             {/* Empty div for grid spacing */}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input required type="password" value={formData.password} 
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <input required type="password" value={formData.confirmPassword} 
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          <div className="col-span-1 md:col-span-2 flex gap-4 mt-4">
            <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
              Submit
            </button>
            <button type="button" onClick={clearForm} className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 font-bold py-3 rounded-lg transition-colors">
              Clear Form
            </button>
          </div>
        </form>

        <p className="text-center mt-6 text-sm">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}