'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Grid, Ticket, Users, BarChart3, Settings, 
  ChevronDown, Bell, ArrowUpRight, TrendingUp 
} from 'lucide-react';

export default function OrganizerAnalyticsPage() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  const categories = [
    { name: 'Dashboard', icon: Grid, path: '/organizer/dashboard', active: false },
    { name: 'Events', icon: Ticket, path: '/organizer/events', active: false },
    { name: 'Attendees', icon: Users, path: '/organizer/attendees', active: false },
    { name: 'Analytics', icon: BarChart3, path: '/organizer/analytics', active: true },
    { name: 'Settings', icon: Settings, path: '/organizer/settings', active: false },
  ];

  const cardsData = [
    { title: 'Event Views', value: '2,450', percent: '+12.5%', isPositive: true },
    { title: 'Bookings Started', value: '850', percent: '+8.2%', isPositive: true },
    { title: 'Bookings Confirmed', value: '532', percent: '+15.3%', isPositive: true },
    { title: 'Conversion Rate', value: '21.7%', percent: '+9.1%', isPositive: true },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex text-[#111827] font-sans antialiased">
      
      {/* LEFT COMPONENT PANEL SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col justify-between p-6 shrink-0 select-none">
        <div className="space-y-8">
          {/* Brand Logo Header */}
          <div className="flex items-center gap-3 pl-2">
            <div className="h-9 w-9 rounded-xl bg-[#6D5DFC] flex items-center justify-center text-white font-extrabold text-base shadow-sm shadow-[#6D5DFC]/20">
              B
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">BookIt</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-3 mb-2">Organizer</span>
            {categories.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => router.push(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    item.active
                      ? 'bg-[#6D5DFC]/5 text-[#6D5DFC]'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${item.active ? 'text-[#6D5DFC]' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* MAIN VIEW CANVAS */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* TOP COMPACT ACTIONS BAR */}
        <header className="h-[72px] bg-white border-b border-slate-100/80 px-10 flex items-center justify-end gap-4 shrink-0 select-none">
          <button className="h-9 w-9 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 flex items-center justify-center transition-colors relative cursor-pointer">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 bg-rose-500 rounded-full" />
          </button>
          <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256')] bg-cover bg-center" />
        </header>

        {/* CORE ANALYTICS FEED */}
        <main className="flex-1 overflow-y-auto px-10 py-8 space-y-6 max-w-[1200px] w-full">
          
          {/* Header Layout */}
          <div className="flex items-start justify-between select-none">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Analytics</h1>
              <p className="text-slate-400 text-xs font-medium">Track your event performance</p>
            </div>

            {/* Timeframe selector matching image dropdown */}
            <div className="relative select-none">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="appearance-none bg-white border border-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl pr-10 text-slate-700 outline-none focus:border-[#6D5DFC] shadow-xs cursor-pointer"
              >
                <option>Last 30 Days</option>
                <option>Last 7 Days</option>
                <option>Last 90 Days</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* FOUR METRIC TRACKER CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 select-none">
            {cardsData.map((card, idx) => (
              <div key={idx} className="bg-white border border-slate-100/80 p-5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col justify-between space-y-3 relative group">
                <span className="text-xs font-semibold text-slate-400 tracking-tight">{card.title}</span>
                <div className="flex flex-col space-y-2">
                  <span className="text-2xl font-bold tracking-tight text-slate-900">{card.value}</span>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-0.5">
                      {card.percent}
                    </span>
                    {/* Tiny inline chart placeholder component as shown in mockup layout */}
                    <div className="text-[#6D5DFC]/40 group-hover:text-[#6D5DFC] transition-colors">
                      <svg className="h-4 w-8" viewBox="0 0 24 12" fill="none">
                        <path d="M2 10C5 6 8 8 12 4C16 0 19 3 22 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* LOWER ANALYTICS ROW SPLIT MATRIX */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* VIEWS VS BOOKINGS LINE CHART COMPONENT */}
            <div className="lg:col-span-7 bg-white border border-slate-100/80 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] space-y-6">
              <div className="space-y-4 select-none">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">Views vs Bookings</h3>
                <div className="flex items-center gap-4 text-[10px] font-semibold tracking-wide text-slate-500">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#6D5DFC]" /> Views</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#22D3EE]" /> Bookings</span>
                </div>
              </div>

              {/* GRAPH VISUAL SHELL CONTEXT */}
              <div className="h-52 w-full relative grid grid-cols-12 items-stretch pt-2">
                
                {/* Y Axis Data Labels Grid Layout */}
                <div className="col-span-1 flex flex-col justify-between text-[10px] font-medium font-mono text-slate-400 text-left select-none pb-5">
                  <span>200</span>
                  <span>150</span>
                  <span>100</span>
                  <span>50</span>
                  <span>0</span>
                </div>

                {/* Main Graph Grid Lines and Vector Paths */}
                <div className="col-span-11 relative flex flex-col justify-between pb-5">
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="w-full border-t border-slate-100" />
                    <div className="w-full border-t border-slate-100" />
                    <div className="w-full border-t border-slate-100" />
                    <div className="w-full border-t border-slate-100" />
                    <div className="w-full border-b border-slate-100" />
                  </div>

                  {/* Complex SVG Lines replicating layout graph accurately */}
                  <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Background gradient mask fills */}
                    <path d="M 0 70 Q 15 65, 25 55 T 50 45 T 75 60 T 100 30 L 100 100 L 0 100 Z" fill="url(#purpleGrad)" opacity="0.03" />
                    <path d="M 0 85 Q 15 80, 25 70 T 50 68 T 75 75 T 100 45 L 100 100 L 0 100 Z" fill="url(#tealGrad)" opacity="0.02" />

                    <defs>
                      <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6D5DFC"/><stop offset="100%" stopColor="#FFF"/></linearGradient>
                      <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22D3EE"/><stop offset="100%" stopColor="#FFF"/></linearGradient>
                    </defs>

                    {/* Path Lines */}
                    <path d="M 0 70 Q 15 65, 25 55 T 50 45 T 75 60 T 100 30" fill="none" stroke="#6D5DFC" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 0 85 Q 15 80, 25 70 T 50 68 T 75 75 T 100 45" fill="none" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />

                    {/* Interactive Active Highlight Core nodes at mid-point tracking tooltip */}
                    <circle cx="53" cy="46" r="3.5" fill="#6D5DFC" stroke="white" strokeWidth="1.5" />
                    <circle cx="53" cy="69" r="3.5" fill="#22D3EE" stroke="white" strokeWidth="1.5" />
                    <line x1="53" y1="0" x2="53" y2="100" stroke="#6D5DFC" strokeWidth="1" strokeDasharray="2,2" opacity="0.3" />
                  </svg>

                  {/* Absolute Tooltip Card Layer from Mockup */}
                  <div className="absolute top-4 left-[42%] bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] rounded-xl p-3 space-y-1.5 select-none text-left min-w-[100px] pointer-events-none animate-fade-in">
                    <p className="text-[10px] font-bold text-slate-400 font-mono">10 May 2025</p>
                    <div className="space-y-0.5 text-xs">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-500 flex items-center gap-1 font-medium"><span className="h-1.5 w-1.5 rounded-full bg-[#6D5DFC]" /> Views</span>
                        <span className="font-bold text-slate-800 font-mono">120</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-500 flex items-center gap-1 font-medium"><span className="h-1.5 w-1.5 rounded-full bg-[#22D3EE]" /> Bookings</span>
                        <span className="font-bold text-slate-800 font-mono">45</span>
                      </div>
                    </div>
                  </div>

                  {/* Horizontal Time Axis Markers Grid */}
                  <div className="absolute -bottom-1 left-0 right-0 flex justify-between text-[10px] font-mono font-bold text-slate-400 select-none">
                    <span>20 Apr</span>
                    <span>27 Apr</span>
                    <span>04 May</span>
                    <span>11 May</span>
                    <span>18 May</span>
                  </div>
                </div>

              </div>
            </div>

            {/* BOOKINGS BY STATUS SEGMENTATION PIE MATRIX */}
            <div className="lg:col-span-5 bg-white border border-slate-100/80 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col justify-between space-y-6">
              <div className="select-none">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">Bookings by Status</h3>
              </div>

              {/* Concentric Doughnut Matrix Shell */}
              <div className="relative h-36 w-36 mx-auto flex items-center justify-center select-none">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#F8FAFC" strokeWidth="3" />
                  {/* Confirmed - 70% (Indigo) */}
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#4F46E5" strokeWidth="3.2" strokeDasharray="70 100" strokeDashoffset="0" strokeLinecap="round" />
                  {/* Cancelled - 10% (Rose) */}
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#EF4444" strokeWidth="3.2" strokeDasharray="10 100" strokeDashoffset="-70" strokeLinecap="round" />
                  {/* Started - 20% (Teal/Cyan) */}
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#06B6D4" strokeWidth="3.2" strokeDasharray="20 100" strokeDashoffset="-80" strokeLinecap="round" />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-bold tracking-tight text-slate-900">532</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Total</span>
                </div>
              </div>

              {/* Legends alignment mapping the bottom list grid exactly */}
              <div className="space-y-2.5 text-xs font-semibold text-slate-600 select-none pt-2 border-t border-slate-50">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-medium text-slate-500"><span className="h-2 w-2 rounded-full bg-[#4F46E5]" /> Confirmed</span>
                  <span className="font-mono text-slate-400 font-medium">70% <span className="text-slate-900 font-bold ml-1.5">(372)</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-medium text-slate-500"><span className="h-2 w-2 rounded-full bg-[#EF4444]" /> Cancelled</span>
                  <span className="font-mono text-slate-400 font-medium">10% <span className="text-slate-900 font-bold ml-1.5">(53)</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-medium text-slate-500"><span className="h-2 w-2 rounded-full bg-[#06B6D4]" /> Started</span>
                  <span className="font-mono text-slate-400 font-medium">20% <span className="text-slate-900 font-bold ml-1.5">(107)</span></span>
                </div>
              </div>
            </div>

          </div>

        </main>
      </div>

    </div>
  );
}