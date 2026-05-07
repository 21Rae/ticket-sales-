import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Trophy, Mail, Lock, User, ArrowRight, Github, Sparkles } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // For demo, the email name is the first part of email
      const name = email.split('@')[0];
      await login(email, name);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center space-x-2 group mb-6">
            <div className="w-12 h-12 bg-accent rounded-sm flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <Trophy className="text-black" size={28} />
            </div>
            <div className="text-left">
              <span className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none block">FIFA</span>
              <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] block leading-none">Access Control</span>
            </div>
          </Link>
          <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Welcome Back</h2>
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-2">Enter your credentials to access your tickets</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-white/60 uppercase tracking-widest mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-white text-sm font-medium focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-black text-white/60 uppercase tracking-widest">Password</label>
                <Link to="/forgot-password" size={10} className="text-[10px] font-bold text-accent uppercase tracking-widest hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-white text-sm font-medium focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input 
                id="remember-me"
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 bg-white/5 border border-white/10 rounded-sm accent-accent"
              />
              <label htmlFor="remember-me" className="ml-3 text-[10px] font-bold text-white/60 uppercase tracking-widest cursor-pointer">Remember me for 30 days</label>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-accent text-black p-4 font-black uppercase tracking-widest text-sm hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <span>{isLoading ? 'Processing...' : 'Sign In'}</span>
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-center text-[10px] font-bold text-white/40 uppercase tracking-widest mb-6">Or continue with</p>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center space-x-2 bg-white/5 border border-white/10 p-3 hover:bg-white hover:text-black transition-all group">
                <Github size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">GitHub</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-white/5 border border-white/10 p-3 hover:bg-white hover:text-black transition-all group">
                <Sparkles size={18} className="text-accent group-hover:text-black" />
                <span className="text-[10px] font-black uppercase tracking-widest">Google</span>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-[10px] font-bold text-white/40 uppercase tracking-widest">
          Don't have an account? <Link to="/signup" className="text-accent hover:underline">Register Now</Link>
        </p>
      </motion.div>
    </div>
  );
};

export const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, name);
      navigate('/verify-email');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center space-x-2 group mb-6">
            <div className="w-12 h-12 bg-accent rounded-sm flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <Trophy className="text-black" size={28} />
            </div>
            <div className="text-left">
              <span className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none block">FIFA</span>
              <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] block leading-none">Registration</span>
            </div>
          </Link>
          <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Create Account</h2>
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-2">Join millions of fans across the continent</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-sm backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-white/60 uppercase tracking-widest mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  required
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-white text-sm font-medium focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-white/60 uppercase tracking-widest mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-white text-sm font-medium focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-white/60 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-white text-sm font-medium focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <p className="text-[10px] font-bold text-white/40 leading-relaxed">
              By clicking "Register Account" you agree to our <Link to="/terms" className="text-accent underline">Ticketing Terms & Conditions</Link> and <Link to="/privacy" className="text-accent underline">Privacy Policy</Link>.
            </p>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-accent text-black p-4 font-black uppercase tracking-widest text-sm hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <span>{isLoading ? 'Creating Account...' : 'Register Account'}</span>
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-[10px] font-bold text-white/40 uppercase tracking-widest">
          Already have an account? <Link to="/login" className="text-accent hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export const VerifyEmailPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <Mail className="text-accent" size={40} />
        </div>
        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">Check Your Inbox</h2>
        <p className="text-white/60 text-sm font-medium mb-8 leading-relaxed">
          We've sent a verification link to your email. Please verify your account to unlock full booking features.
        </p>
        <div className="space-y-4">
          <Link to="/dashboard" className="block w-full bg-accent text-black p-4 font-black uppercase tracking-widest text-sm hover:bg-white transition-all">
            Continue to Dashboard
          </Link>
          <button className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] hover:text-white transition-colors">
            Resend Email
          </button>
        </div>
      </div>
    </div>
  );
};
