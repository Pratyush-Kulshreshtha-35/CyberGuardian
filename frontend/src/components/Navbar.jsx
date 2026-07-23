import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = async () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        // We import axios dynamically or just use fetch to avoid adding new imports if possible.
        // Actually, let's just use standard fetch for simplicity in this handler.
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        await fetch(`${API_URL}/api/auth/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id })
        });
      } catch (err) {
        console.error('Logout error', err);
      }
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
                <ShieldCheck className="h-6 w-6 text-emerald-400" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                CyberGuardian
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
              <Link to="/about" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">About Us</Link>
              <Link to="/contact" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {token ? (
              <>
                <Link to="/analyzer" className="text-emerald-400 hover:text-emerald-300 px-3 py-2 text-sm font-medium transition-colors">
                  Analyzer
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
