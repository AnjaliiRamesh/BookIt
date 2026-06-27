'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../Lib/api';
import { Mail, Lock, Eye, EyeOff, User, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function AuthPage() {
  const { login } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  
  // Registration and login fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'USER' | 'ORGANIZER'>('USER');
  
  // Toggles and feedback
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Pre-flight client validation for registration matching your mockup requirements
    if (!isLoginView && password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isLoginView) {
        const response = await api.post('/auth/login', { email, password });
        const { token, user } = response.data;
        login(token, user);
      } else {
        // Pass the explicit chosen platform role context during creation
        // await api.post('/auth/register', { name, email, password, role: selectedRole });
        // Explicitly convert the role context variable to UPPERCASE for Prisma compatibility.
        await api.post('/auth/signup', { name, email, password, role: selectedRole.toUpperCase() });
        setSuccessMsg('Sign up complete! Directing to authentication gateway...');
        setTimeout(() => {
          setIsLoginView(true);
          setSuccessMsg('');
          setPassword('');
          setConfirmPassword('');
        }, 2000);
      }
    } catch (err: any) {
      const serverMessage = err.response?.data?.message || 'Operational connection failure to base API routes.';
      setErrorMsg(serverMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#F8FAFC]">
      
      {/* LEFT COLUMN: Brand Split Hero Graphic Frame */}
      <div className="hidden lg:flex lg:col-span-5 relative overflow-hidden bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#4338CA] p-12 flex-col justify-between text-white">
        {/* Background Decorative Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070')] bg-cover bg-center mix-blend-overlay opacity-25" />
        
        <div className="relative z-10 flex items-center gap-2.5 font-semibold text-xl tracking-tight">
          <div className="h-7 w-7 rounded-lg bg-indigo-500 flex items-center justify-center shadow-md">
            <span className="text-sm font-bold">B</span>
          </div>
          <span>BookIt</span>
        </div>

        <div className="relative z-10 max-w-md my-auto space-y-4">
          <h1 className="text-4xl font-bold tracking-tight leading-[1.15]">
            {isLoginView ? 'Book events that inspire you' : 'Create events. Inspire people.'}
          </h1>
          <p className="text-indigo-200/80 text-sm leading-relaxed">
            {isLoginView 
              ? 'Discover and book amazing events happening around you. Explore concerts, workshops, and more.' 
              : 'Join thousands of organizers and attendees on BookIt. Build and publish events in minutes.'}
          </p>
        </div>

        <div className="relative z-10 text-xs text-indigo-200/50 font-mono">
          &copy; 2026 BookIt Systems Inc. All rights reserved.
        </div>
      </div>

      {/* RIGHT COLUMN: Exact Mockup Form Core Platform Frame */}
      <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[480px] bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8 sm:p-10 transition-all">
          
          {/* Header Lines */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {isLoginView ? 'Welcome back 👋' : 'Create your account ✨'}
            </h2>
            <p className="text-slate-500 text-xs mt-1">
              {isLoginView ? 'Sign in to your account to continue' : 'Sign up to start your journey'}
            </p>
          </div>

          {/* Messages System Feedback Banners */}
          {errorMsg && (
            <div className="mb-5 flex items-center gap-3 bg-rose-50 border border-rose-100 p-3.5 rounded-xl text-rose-600 text-xs font-medium">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 flex items-center gap-3 bg-emerald-50 border border-emerald-100 p-3.5 rounded-xl text-emerald-600 text-xs font-medium">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form Infrastructure */}
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            
            {/* 1. Full Name Block (Register Only) */}
            {!isLoginView && (
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">Full name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl placeholder-slate-400 text-slate-900 focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10 transition-all"
                    placeholder="Your full name"
                  />
                </div>
              </div>
            )}

            {/* 2. Email Address Input */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl placeholder-slate-400 text-slate-900 focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* 3. Primary Passphrase Input */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-slate-200 rounded-xl placeholder-slate-400 text-slate-900 focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10 transition-all"
                  placeholder={isLoginView ? "Enter your password" : "Create a password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* 4. Confirm Password Input (Register Only) */}
            {!isLoginView && (
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">Confirm password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-slate-200 rounded-xl placeholder-slate-400 text-slate-900 focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10 transition-all"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* 5. Role Custom Select Matrix Fields (Register Only) */}
            {!isLoginView && (
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-semibold text-slate-700">I am joining as</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('USER')}
                    className={`flex items-start gap-3 p-3 text-left border rounded-xl transition-all cursor-pointer ${
                      selectedRole === 'USER'
                        ? 'border-[#6366F1] bg-[#6366F1]/[0.02] ring-1 ring-[#6366F1]'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      checked={selectedRole === 'USER'}
                      readOnly
                      className="mt-0.5 accent-[#6366F1]"
                    />
                    <div>
                      <p className="text-xs font-semibold text-slate-900">Attendee</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Book and attend events</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('ORGANIZER')}
                    className={`flex items-start gap-3 p-3 text-left border rounded-xl transition-all cursor-pointer ${
                      selectedRole === 'ORGANIZER'
                        ? 'border-[#6366F1] bg-[#6366F1]/[0.02] ring-1 ring-[#6366F1]'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      checked={selectedRole === 'ORGANIZER'}
                      readOnly
                      className="mt-0.5 accent-[#6366F1]"
                    />
                    <div>
                      <p className="text-xs font-semibold text-slate-900">Organizer</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Create and manage events</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* 6. Context Helpers Checkboxes (Login View Only) */}
            {isLoginView && (
              <div className="flex items-center justify-between text-xs font-medium pt-1">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-300 text-[#6366F1] accent-[#6366F1]" />
                  <span>Remember me</span>
                </label>
                <button type="button" className="text-[#6366F1] hover:text-[#4F46E5] transition-colors">
                  Forget password?
                </button>
              </div>
            )}

            {/* 7. Executive Primary Purple Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 mt-2 text-sm font-semibold text-white bg-[#6366F1] hover:bg-[#4F46E5] rounded-xl transition-all shadow-md shadow-[#6366F1]/10 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : isLoginView ? (
                'Sign in'
              ) : (
                'Sign up'
              )}
            </button>
          </form>

          {/* Bottom Footer Switcher Links */}
          <div className="mt-8 text-center text-xs text-slate-500">
            {isLoginView ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => {
                setIsLoginView(!isLoginView);
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className="font-semibold text-[#6366F1] hover:text-[#4F46E5] transition-colors cursor-pointer"
            >
              {isLoginView ? 'Sign up' : 'Sign in'}
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}