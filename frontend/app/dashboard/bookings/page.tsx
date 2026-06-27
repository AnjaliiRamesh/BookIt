'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { 
  Grid, Ticket, Settings, LogOut, Bell, Calendar, 
  MapPin, CheckCircle, Clock, AlertTriangle, ArrowUpRight 
} from 'lucide-react';

export default function MyBookingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Past' | 'Cancelled'>('Upcoming');

  // Hardcoded repository mirroring the visual elements from your exact reference image
  const bookingsMockData = [
    {
      id: 'b1',
      eventId: '1',
      title: 'Tech Summit 2025',
      location: 'Bengaluru, India',
      date: '15 May 2025',
      time: '10:00 AM',
      status: 'Confirmed',
      tabType: 'Upcoming',
      img: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=200'
    },
    {
      id: 'b2',
      eventId: '2',
      title: 'Live in Concert',
      location: 'Mumbai, India',
      date: '20 May 2025',
      time: '07:00 PM',
      status: 'Confirmed',
      tabType: 'Upcoming',
      img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=40&w=200'
    },
    {
      id: 'b3',
      eventId: '3',
      title: 'UI/UX Design Workshop',
      location: 'Delhi, India',
      date: '25 May 2025',
      time: '11:00 AM',
      status: 'Confirmed',
      tabType: 'Upcoming',
      img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=40&w=200'
    }
  ];

  const filteredBookings = bookingsMockData.filter(b => b.tabType === activeTab);

  return (
    <div className="min-h-screen bg-white flex text-slate-900 font-sans">
      
      {/* 1. LEFT SIDE UTILITY STRIP */}
      <aside className="w-[72px] border-r border-slate-100 flex flex-col justify-between items-center py-6 shrink-0 bg-white select-none">
        <div className="flex flex-col gap-8 items-center w-full">
          <div 
            onClick={() => router.push('/dashboard')} 
            className="h-10 w-10 rounded-xl bg-[#6D5DFC]/10 flex items-center justify-center text-[#6D5DFC] font-bold text-lg cursor-pointer transition-transform hover:scale-105"
          >
            B
          </div>
          <nav className="flex flex-col gap-3 w-full px-3">
            <button 
              onClick={() => router.push('/dashboard')}
              className="w-full aspect-square rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 flex items-center justify-center transition-all cursor-pointer"
            >
              <Grid className="h-5 w-5" />
            </button>
            <button 
              onClick={() => router.push('/dashboard/bookings')}
              className="w-full aspect-square rounded-xl bg-[#6D5DFC]/5 text-[#6D5DFC] flex items-center justify-center cursor-pointer"
            >
              <Ticket className="h-5 w-5" />
            </button>
            <button 
              onClick={() => router.push('/dashboard/settings')}
              className="w-full aspect-square rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 flex items-center justify-center transition-all cursor-pointer"
            >
              <Settings className="h-5 w-5" />
            </button>
          </nav>
        </div>
        <div className="w-full px-3">
          <button 
            onClick={() => logout()}
            className="w-full aspect-square rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition-all cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </aside>

      {/* RIGHT SIDE MASTER AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 2. TOP MASTER HEADER BAR */}
        <header className="h-[72px] border-b border-slate-100 px-8 flex items-center justify-between bg-white shrink-0 select-none">
          <div className="flex items-center gap-3">
            <span onClick={() => router.push('/dashboard')} className="font-bold text-xl tracking-tight text-slate-900 cursor-pointer">Bookit</span>
          </div>
          
          <div className="flex items-center gap-8 font-medium text-sm text-slate-600">
            <button onClick={() => router.push('/dashboard')} className="hover:text-slate-900 transition-colors cursor-pointer">Events</button>
            <button onClick={() => router.push('/dashboard/bookings')} className="text-[#6D5DFC] font-semibold cursor-pointer">My Bookings</button>
            <button onClick={() => router.push('/organizer/dashboard')} className="hover:text-slate-900 transition-colors cursor-pointer">Organizer</button>
            
            <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
              <button className="text-slate-400 hover:text-slate-600 transition-colors relative cursor-pointer">
                <Bell className="h-4 w-4" />
                <span className="absolute top-0 right-0 h-1.5 w-1.5 bg-rose-500 rounded-full" />
              </button>
              
              <div className="flex items-center gap-2 pl-2">
                <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center font-mono text-xs text-[#6D5DFC] font-bold">
                  {user?.name?.substring(0, 2).toUpperCase() || 'OP'}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 3. BOOKINGS ARCHIVE PANEL FEED */}
        <main className="flex-1 overflow-y-auto px-12 py-10 max-w-[900px] w-full mx-auto space-y-6">
          
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Bookings</h1>
            <p className="text-slate-500 text-xs font-normal">All your booked events and token allocations</p>
          </div>

          {/* Precise Tab Filter Interface from Reference Mockup */}
          <div className="flex items-center gap-6 border-b border-slate-100 select-none pt-2">
            {(['Upcoming', 'Past', 'Cancelled'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-xs font-semibold tracking-wide border-b-2 transition-all cursor-pointer relative ${
                  activeTab === tab
                    ? 'border-[#6D5DFC] text-[#6D5DFC]'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* DYNAMIC LIST INTERFACE LAYER */}
          <div className="space-y-4 pt-2">
            {filteredBookings.length === 0 ? (
              <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center text-xs text-slate-400 font-medium bg-slate-50/30">
                No tickets found under the "{activeTab}" history classification stack.
              </div>
            ) : (
              <div className="space-y-3.5">
                {filteredBookings.map((booking) => (
                  <div 
                    key={booking.id}
                    className="flex items-center bg-white border border-slate-100 p-4 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_24px_rgba(109,93,252,0.03)] transition-all group"
                  >
                    {/* Thumbnail Artwork Component */}
                    <div className="h-16 w-24 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-50">
                      <img src={booking.img} alt={booking.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                    </div>

                    {/* Meta Payload Data Block */}
                    <div className="flex-1 min-w-0 px-5 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 items-center">
                      <div className="space-y-0.5">
                        <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#6D5DFC] transition-colors line-clamp-1">
                          {booking.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {booking.date}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {booking.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium md:justify-self-start">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">{booking.location}</span>
                      </div>
                    </div>

                    {/* Action Integration Block & Explicit Verification Badge */}
                    <div className="flex items-center gap-4 shrink-0 pl-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                        <CheckCircle className="h-3 w-3" /> {booking.status}
                      </span>
                      
                      <button 
                        onClick={() => router.push(`/dashboard/events/${booking.eventId}`)}
                        className="px-3 py-1.5 bg-slate-50 hover:bg-[#6D5DFC]/5 text-slate-700 hover:text-[#6D5DFC] border border-slate-100 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1"
                      >
                        View <ArrowUpRight className="h-3 w-3" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Help Center Subtext Overlay */}
          <div className="pt-6 text-center text-xs text-slate-400 font-normal">
            Can't find your booking? <span className="text-[#6D5DFC] font-medium hover:underline cursor-pointer">Contact support</span>
          </div>

        </main>
      </div>

    </div>
  );
}