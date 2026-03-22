import { useRef, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import toast from 'react-hot-toast';

export default function Login() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  useEffect(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate authentication
    if(formData.username && formData.password) {
      toast.success('Login Successful!');
      setTimeout(() => navigate('/dashboard'), 1000); // Auto-redirect after toast
    } else {
      toast.error('Please fill all fields');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div ref={containerRef} className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">Welcome Back</h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Username or Email</label>
            <input 
              type="text" 
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input 
              type="password" 
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-sm text-blue-500 hover:underline" onClick={() => toast("Forgot password flow coming soon!")}>
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}