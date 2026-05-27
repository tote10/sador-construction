'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Building2, Lock, Eye, EyeOff, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { useApp } from '@/lib/state/AppContext';

export default function LoginPage() {
  const { isLoggedIn, login } = useApp();
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!password) {
      setError('Please enter your administrator access code.');
      return;
    }

    setLoading(true);

    // Simulate network authentication delay
    setTimeout(() => {
      const success = login(password);
      setLoading(false);
      
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Invalid administrator passcode. (Try "admin123" or "password")');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-light p-6 relative overflow-hidden">
      {/* Decorative Brand Circles */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" />

      {/* Back button */}
      <div className="absolute top-6 left-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-blue font-bold text-xs uppercase tracking-wider transition"
        >
          <ArrowLeft size={16} />
          <span>Public Website</span>
        </Link>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 shadow-[0_25px_60px_rgba(15,41,66,0.04)] relative z-10 space-y-8">
        
        {/* Brand Banner */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-brand-blue text-brand-gold rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <Building2 size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-brand-blue">Sador General Construction CMS Console</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Admin Authentication</p>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 text-red-700 text-xs font-semibold items-start leading-relaxed">
            <AlertCircle size={16} className="shrink-0 text-red-500 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Access Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Access Passcode</label>
              <span className="text-[10px] text-slate-400 font-semibold italic">Hint: admin123</span>
            </div>
            
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock size={16} />
              </span>
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 focus:border-brand-gold focus:bg-white rounded-xl text-sm font-semibold text-slate-900 outline-none transition"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-blue"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand-blue hover:bg-brand-blue/90 border border-transparent font-bold text-white hover:text-brand-gold rounded-xl transition duration-300 shadow-md shadow-brand-blue/15 hover:shadow-brand-blue/30 active:scale-[0.99] flex items-center justify-center gap-2 outline-none disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Authenticating Console...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={18} />
                <span>Unlock Dashboard</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
