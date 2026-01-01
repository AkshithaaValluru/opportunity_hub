import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

interface Props {
  onLogin: (user: User) => void;
  onBack: () => void;
  defaultView?: 'login' | 'signup';
}

const AuthPage: React.FC<Props> = ({ onLogin, onBack, defaultView = 'login' }) => {
  const [isLogin, setIsLogin] = useState(defaultView === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLogin(defaultView === 'login');
  }, [defaultView]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      onLogin({
        email,
        name: email.split('@')[0] || 'User'
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-baby-50 flex">
      {/* Left Decoration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-baby-100 to-love-100 relative overflow-hidden items-center justify-center p-12 border-r border-baby-200">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1574&q=80')] opacity-5 bg-cover bg-center grayscale mix-blend-overlay"></div>
        <div className="relative z-10 max-w-lg">
          <div className="bg-white/60 backdrop-blur-md border border-white/40 p-8 rounded-3xl mb-8 shadow-xl shadow-baby-300/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-baby-400 p-2 rounded-lg text-white">
                <Sparkles className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-bold text-baby-900 tracking-tight">OpportunityHub</h1>
            </div>
            <p className="text-baby-800 text-lg leading-relaxed">
              Unlock your potential with AI-driven opportunity discovery. Join thousands of students finding their dream internships and hackathons.
            </p>
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-white">
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 text-baby-400 hover:text-baby-600 flex items-center gap-2 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-baby-900 mb-2">{isLogin ? 'Welcome back' : 'Create an account'}</h2>
            <p className="text-slate-500">
              {isLogin ? 'Enter your details to access your account.' : 'Start your journey with us today.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-baby-200 focus:border-baby-400 focus:ring-4 focus:ring-baby-100 transition-all bg-baby-50/50 focus:bg-white text-slate-800 placeholder:text-baby-300 outline-none"
                placeholder="student@university.edu"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-baby-200 focus:border-baby-400 focus:ring-4 focus:ring-baby-100 transition-all bg-baby-50/50 focus:bg-white text-slate-800 placeholder:text-baby-300 outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-baby-400 hover:bg-baby-500 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-baby-400/30"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-baby-600 font-semibold hover:underline"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;