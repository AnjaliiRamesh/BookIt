'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { 
  Search, Calendar, Bell, LogOut, Grid, Ticket, 
  Settings, MapPin, ArrowRight, Bookmark, ChevronLeft, ChevronRight, X 
} from 'lucide-react';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  // Interactive Filter States
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ['All', 'Tech', 'Music', 'Business', 'Sports', 'Art', 'Health'];

  const masterEventsRegistry = [
    {
      id: '1',
      title: 'Tech Summit 2025',
      category: 'Tech',
      location: 'Bengaluru, India',
      date: '2025-05-15',
      displayDate: '15 May 2025',
      price: '₹999',
      seatsLeft: 20,
      status: 'Available',
      img: 'https://images.unsplash.com/photo-1540574467063-178a50c2df87?q=80&w=600'
    },
    {
      id: '2',
      title: 'Live in Concert',
      category: 'Music',
      location: 'Mumbai, India',
      date: '2025-05-20',
      displayDate: '20 May 2025',
      price: '₹799',
      seatsLeft: 5,
      status: 'Available',
      img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600'
    },
    {
      id: '3',
      title: 'UI/UX Design Workshop',
      category: 'Tech',
      location: 'Delhi, India',
      date: '2025-05-25',
      displayDate: '25 May 2025',
      price: '₹1499',
      seatsLeft: 12,
      status: 'Available',
      img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600'
    },
    {
      id: '4',
      title: 'City Marathon 2025',
      category: 'Sports',
      location: 'Delhi, India',
      date: '2025-06-01',
      displayDate: '01 Jun 2025',
      price: '₹499',
      seatsLeft: 0,
      status: 'Sold Out',
      img: 'https://images.unsplash.com/photo-1502224562085-639556652f33?q=80&w=600'
    }
  ];

  // Comprehensive Search & Dynamic Filtering Logic (Category, Query, and Exact Calendar Date match)
  const filteredEvents = masterEventsRegistry.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = !selectedDate || event.date === selectedDate;
    return matchesCategory && matchesSearch && matchesDate;
  });

  const clearDateFilter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDate('');
    setShowDatePicker(false);
  };

  return (
    <div className="min-h-screen bg-white flex text-slate-900 font-sans">
      
      {/* 1. LEFT SIDE NAVIGATION STRIP */}
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
              className="w-full aspect-square rounded-xl bg-[#6D5DFC]/5 text-[#6D5DFC] flex items-center justify-center cursor-pointer"
            >
              <Grid className="h-5 w-5" />
            </button>
            <button 
              onClick={() => router.push('/dashboard/bookings')}
              className="w-full aspect-square rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 flex items-center justify-center transition-all cursor-pointer"
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

      {/* RIGHT SIDE MASTER WINDOW */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 2. TOP GLOBAL MASTER NAV BAR */}
        <header className="h-[72px] border-b border-slate-100 px-8 flex items-center justify-between bg-white shrink-0 select-none">
          <div className="flex items-center gap-3">
            <span onClick={() => router.push('/dashboard')} className="font-bold text-xl tracking-tight text-slate-900 cursor-pointer">Bookit</span>
          </div>
          
          <div className="flex items-center gap-8 font-medium text-sm text-slate-600">
            <button onClick={() => router.push('/dashboard')} className="text-[#6D5DFC] font-semibold cursor-pointer">Events</button>
            <button onClick={() => router.push('/dashboard/bookings')} className="hover:text-slate-900 transition-colors cursor-pointer">My Bookings</button>
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
                <button 
                  onClick={() => logout()}
                  className="px-3 py-1.5 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 rounded-lg text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* 3. DYNAMIC CONTENT AREA */}
        <main className="flex-1 overflow-y-auto px-12 py-10 max-w-[1400px] w-full mx-auto space-y-8">
          
          {/* Marketplace Headline Header Display */}
          <div className="relative rounded-3xl bg-gradient-to-r from-slate-50 via-white to-slate-50/50 border border-slate-100 p-10 flex justify-between items-center overflow-hidden">
            <div className="space-y-6 max-w-xl relative z-10">
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.12]">
                  Discover events.<br />
                  <span className="text-[#6D5DFC]">Book effortlessly.</span>
                </h1>
                <p className="text-slate-500 text-sm font-normal max-w-sm leading-relaxed">
                  Find and book amazing events around you. From tech conferences to live concerts.
                </p>
              </div>

              {/* Functional Compound Filtering Search Bar Bar */}
              <div className="flex items-center bg-white border border-slate-200 rounded-2xl shadow-sm p-1.5 w-full max-w-lg relative">
                <div className="flex items-center gap-2 px-3 flex-1">
                  <Search className="h-4 w-4 text-slate-400 shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Search events, locations, keywords..."
                    className="w-full text-sm bg-transparent outline-none border-none placeholder-slate-400 text-slate-900"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <div className="h-6 w-[1px] bg-slate-200" />
                
                {/* Fully Functional Date Selection Trigger */}
                <div 
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="flex items-center gap-2 px-4 text-slate-500 text-xs font-medium shrink-0 cursor-pointer hover:text-slate-900 transition-colors relative"
                >
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span className={selectedDate ? "text-[#6D5DFC] font-semibold" : ""}>
                    {selectedDate ? selectedDate : 'Select date'}
                  </span>
                  {selectedDate && (
                    <X onClick={clearDateFilter} className="h-3 w-3 ml-1 text-slate-400 hover:text-slate-600 rounded-full" />
                  )}

                  {/* Absolute Position Date Picker Overlay UI */}
                  {showDatePicker && (
                    <div className="absolute top-10 right-0 z-50 bg-white border border-slate-200 rounded-xl p-3 shadow-xl animate-fade-in" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="date" 
                        value={selectedDate}
                        onChange={(e) => {
                          setSelectedDate(e.target.value);
                          setShowDatePicker(false);
                          setCurrentPage(1);
                        }}
                        className="text-xs font-sans outline-none bg-slate-50 border border-slate-200 p-2 rounded-lg text-slate-800 focus:border-[#6D5DFC]"
                      />
                    </div>
                  )}
                </div>

                <button className="bg-[#6D5DFC] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-[#6D5DFC]/10 transition-all cursor-pointer hover:bg-[#5b4ee3]">
                  Search
                </button>
              </div>
            </div>
            <div className="hidden md:block w-[240px] h-[160px] relative pointer-events-none bg-gradient-to-br from-[#6D5DFC]/5 to-[#8B5CF6]/10 rounded-2xl border border-dashed border-slate-200" />
          </div>

          {/* Active Category Selector Slider */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Popular Categories</h3>
            <div className="flex flex-wrap gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#6D5DFC]/5 border-[#6D5DFC] text-[#6D5DFC]'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* EVENTS CARD WORKFLOW RENDERING */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                {selectedCategory === 'All' ? 'All Events' : `${selectedCategory} Events`} 
                <span className="text-xs font-normal text-slate-400 ml-2">({filteredEvents.length} items found)</span>
              </h2>
            </div>

            {filteredEvents.length === 0 ? (
              <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center text-sm text-slate-400 font-medium">
                No events found matching your active filter criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredEvents.map((event) => (
                  <div 
                    key={event.id}
                    onClick={() => router.push(`/dashboard/events/${event.id}`)}
                    className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(109,93,252,0.06)] transition-all duration-300 flex flex-col group relative cursor-pointer"
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden bg-slate-50 relative">
                      <img src={event.img} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" />
                      <button 
                        onClick={(e) => e.stopPropagation()} 
                        className="absolute top-3 right-3 h-7 w-7 rounded-lg bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-600 hover:text-[#6D5DFC] shadow-sm cursor-pointer"
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                      
                      {event.seatsLeft > 0 && (
                        <div className="absolute bottom-3 left-3 px-2 py-1 rounded-md bg-emerald-500/90 text-white text-[10px] font-bold font-mono tracking-wide uppercase backdrop-blur-sm">
                          {event.seatsLeft} Seats Left
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#6D5DFC] transition-colors line-clamp-1">
                          {event.title}
                        </h4>
                        <div className="flex flex-col gap-0.5 text-xs text-slate-400">
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.location}</span>
                          <span className="pl-4">{event.displayDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-50 shrink-0">
                        <span className="font-bold text-sm text-[#6D5DFC]">{event.price}</span>
                        {event.status === 'Sold Out' ? (
                          <span className="text-[10px] font-bold tracking-wide text-rose-500 bg-rose-50 px-2 py-1 rounded-md uppercase">Sold Out</span>
                        ) : (
                          <button className="text-[10px] font-bold tracking-wide text-[#6D5DFC] bg-[#6D5DFC]/5 group-hover:bg-[#6D5DFC] group-hover:text-white px-2.5 py-1.5 rounded-lg uppercase transition-all cursor-pointer">
                            Book Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PAGINATION PANEL */}
          <div className="flex items-center justify-center gap-1.5 pt-8 select-none border-t border-slate-50">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            {[1, 2, 3, 4, 5, '...', 20].map((page, index) => (
              <button
                key={index}
                disabled={page === '...'}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                className={`h-8 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  currentPage === page
                    ? 'bg-[#6D5DFC] border-[#6D5DFC] text-white shadow-sm shadow-[#6D5DFC]/10'
                    : page === '...'
                    ? 'border-transparent text-slate-400 cursor-default'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 cursor-pointer'
                }`}
              >
                {page}
              </button>
            ))}

            <button 
              disabled={currentPage === 20}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, 20))}
              className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

        </main>
      </div>

    </div>
  );
}