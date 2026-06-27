'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { 
  Grid, Ticket, Settings, LogOut, Bell, Calendar, 
  TrendingUp, Users, DollarSign, Percent, ArrowUpRight, Plus 
} from 'lucide-react';

export default function OrganizerDashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  // Exact metric data mappings from the reference mockup cards
  const statsTelemetry = [
    { label: 'Total Events', value: '12', change: null, icon: Grid, color: 'text-indigo-500' },
    { label: 'Total Bookings', value: '532', change: null, icon: Ticket, color: 'text-blue-500' },
    { label: 'Total Revenue', value: '₹4,78,000', change: null, icon: DollarSign, color: 'text-emerald-500' },
    { label: 'Conversion Rate', value: '24.5%', change: '+12.5%', icon: Percent, color: 'text-violet-500' }
  ];

  const recentEventsDataset = [
    { id: 'e1', title: 'Tech Summit 2025', date: '15 May 2025', location: 'Bengaluru', sold: '180 / 200', status: 'Active', img: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=200' },
    { id: 'e2', title: 'UI/UX Design Workshop', date: '25 May 2025', location: 'Delhi', sold: '45 / 50', status: 'Active', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=200' },
    { id: 'e3', title: 'AI & Future Tech', date: '05 Jun 2025', location: 'Mumbai', sold: '80 / 100', status: 'Active', img: 'https://images.unsplash.com/photo-1502224562085-639556652f33?q=80&w=200' }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex text-slate-900 font-sans">
      
      {/* 1. LEFT SIDE UTILITY PANEL STRIP */}
      <aside className="w-[72px] border-r border-slate-100 flex flex-col justify-between items-center py-6 shrink-0 bg-white select-none">
        <div className="flex flex-col gap-8 items-center w-full">
          <div onClick={() => router.push('/')} className="h-10 w-10 rounded-xl bg-[#6D5DFC]/10 flex items-center justify-center text-[#6D5DFC] font-bold text-lg cursor-pointer">
            B
          </div>
          <nav className="flex flex-col gap-3 w-full px-3">
            <button className="w-full aspect-square rounded-xl bg-[#6D5DFC]/5 text-[#6D5DFC] flex items-center justify-center cursor-pointer">
              <Grid className="h-5 w-5" />
            </button>
            <button className="w-full aspect-square rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 flex items-center justify-center transition-all cursor-pointer">
              <Ticket className="h-5 w-5" />
            </button>
            <button className="w-full aspect-square rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 flex items-center justify-center transition-all cursor-pointer">
              <Settings className="h-5 w-5" />
            </button>
          </nav>
        </div>
        <div className="w-full px-3">
          <button onClick={() => logout()} className="w-full aspect-square rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition-all cursor-pointer">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </aside>

      {/* RIGHT SIDE VIEWPORT COMPONENT */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 2. TOP NAV BAR */}
        <header className="h-[72px] border-b border-slate-100 px-8 flex items-center justify-between bg-white shrink-0 select-none">
          <div className="flex items-center gap-3">
            <span className="font-bold text-xl tracking-tight text-slate-900">Bookit</span>
            <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[10px] font-bold font-mono uppercase tracking-wider border border-amber-100">Organizer Portal</span>
          </div>
          
          <div className="flex items-center gap-8 font-medium text-sm text-slate-600">
            <button onClick={() => router.push('/dashboard')} className="hover:text-slate-900 transition-colors cursor-pointer">Events Marketplace</button>
            <button className="text-[#6D5DFC] font-semibold cursor-pointer">Dashboard</button>
            
            <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
              <button className="text-slate-400 hover:text-slate-600 transition-colors relative cursor-pointer">
                <Bell className="h-4 w-4" />
                <span className="absolute top-0 right-0 h-1.5 w-1.5 bg-rose-500 rounded-full" />
              </button>
              
              <div className="flex items-center gap-2 pl-2">
                <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center font-mono text-xs text-[#6D5DFC] font-bold">
                  {user?.name?.substring(0, 2).toUpperCase() || 'RS'}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 3. BUSINESS ANALYTICS DASHBOARD PANELS */}
        <main className="flex-1 overflow-y-auto px-12 py-10 max-w-[1200px] w-full mx-auto space-y-8">
          
          {/* Header Action Alignment */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
              <p className="text-slate-400 text-xs font-normal">Welcome back, {user?.name || 'Rohit Sharma'} 👋</p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              {/* Selective Timeline Window Filter */}
              <div className="relative">
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl pr-8 text-slate-600 outline-none focus:border-[#6D5DFC] cursor-pointer shadow-sm"
                >
                  <option>10 May 2025 - 17 May 2025</option>
                  <option>Last 30 Days</option>
                  <option>Last 6 Months</option>
                </select>
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>

              <button className="bg-[#6D5DFC] hover:bg-[#5b4ee3] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-[#6D5DFC]/10 flex items-center gap-1.5 transition-all cursor-pointer">
                <Plus className="h-4 w-4" /> Create Event
              </button>
            </div>
          </div>

          {/* TELEMETRY ROW CARDS: PURE WHITE GLASS CONFIGURATION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 select-none">
            {statsTelemetry.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div key={idx} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.01)] flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-400">{stat.label}</span>
                    <div className={`h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center ${stat.color}`}>
                      <IconComp className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-extrabold tracking-tight text-slate-900">{stat.value}</span>
                    {stat.change && (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md flex items-center gap-0.5 font-mono">
                        <TrendingUp className="h-2.5 w-2.5" /> {stat.change}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RECENT EVENTS CONTROL DECK TABLE BLOCK */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Recent Events</h2>
              <button className="text-xs font-semibold text-[#6D5DFC] hover:underline cursor-pointer">View all events</button>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.01)]">
              <div className="divide-y divide-slate-50">
                {recentEventsDataset.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors group">
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="h-12 w-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                        <img src={event.img} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#6D5DFC] transition-colors truncate">{event.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 font-medium">📍 {event.location} • {event.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-12 text-right select-none pl-4">
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider font-mono">Tickets Sold</p>
                        <p className="text-xs font-bold text-slate-700 mt-0.5 font-mono">{event.sold}</p>
                      </div>
                      <div className="w-20 flex flex-col items-end">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider font-mono">
                          {event.status}
                        </span>
                      </div>
                      <button className="h-8 w-8 border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#6D5DFC] hover:border-slate-300 bg-white transition-all cursor-pointer">
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </main>
      </div>

    </div>
  );
}