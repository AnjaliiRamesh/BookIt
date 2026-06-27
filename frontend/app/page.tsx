'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Calendar, MapPin, Bookmark, ArrowRight, X } from 'lucide-react';

export default function PublicHomePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const categories = ['All', 'Tech', 'Music', 'Business', 'Sports', 'Art', 'Health'];

  const masterEventsRegistry = [
    { id: '1', title: 'Tech Summit 2025', category: 'Tech', location: 'Bengaluru, India', date: '2026-05-15', displayDate: '15 May 2025', price: '₹999', img: 'https://images.unsplash.com/photo-1540574467063-178a50c2df87?q=80&w=600' },
    { id: '2', title: 'Live in Concert', category: 'Music', location: 'Mumbai, India', date: '2026-05-20', displayDate: '20 May 2025', price: '₹799', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600' },
    { id: '3', title: 'Design Workshop', category: 'Tech', location: 'Delhi, India', date: '2026-05-25', displayDate: '25 May 2025', price: '₹1499', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600' },
    { id: '4', title: 'City Marathon 2025', category: 'Sports', location: 'Delhi, India', date: '2026-06-01', displayDate: '01 Jun 2025', price: '₹499', isSoldOut: true, img: 'https://images.unsplash.com/photo-1502224562085-639556652f33?q=80&w=600' }
  ];

  // Client Filter Pipe
  const filteredEvents = masterEventsRegistry.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = !selectedDate || event.date === selectedDate;
    return matchesCategory && matchesSearch && matchesDate;
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      
      {/* HEADER */}
      <header className="h-[72px] border-b border-slate-100 px-12 flex items-center justify-between bg-white select-none shrink-0">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
          <div className="h-8 w-8 rounded-lg bg-[#6D5DFC] flex items-center justify-center text-white font-bold text-sm shadow-sm">B</div>
          <span className="font-bold text-lg tracking-tight">BookIt</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button onClick={() => router.push('/events')} className="hover:text-slate-900 transition-colors cursor-pointer">Events</button>
          <button onClick={() => router.push('/auth')} className="hover:text-slate-900 transition-colors cursor-pointer">My Bookings</button>
          <button onClick={() => router.push('/auth')} className="hover:text-slate-900 transition-colors cursor-pointer">Organizer</button>
          <button className="hover:text-slate-900 transition-colors cursor-pointer">About</button>
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/auth')} className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition-all cursor-pointer">Log in</button>
          <button onClick={() => router.push('/auth')} className="bg-[#6D5DFC] hover:bg-[#5b4ee3] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-md shadow-[#6D5DFC]/10 transition-all cursor-pointer">Sign up</button>
        </div>
      </header>

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-12 py-10 space-y-12">
        {/* HERO SECTION */}
        <div className="relative rounded-[32px] bg-gradient-to-r from-slate-50 via-white to-slate-50/50 border border-slate-100 p-12 flex justify-between items-center overflow-hidden">
          <div className="space-y-6 max-w-xl relative z-10">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.12]">
              Discover events.<br />
              <span className="text-[#6D5DFC]">Book effortlessly.</span>
            </h1>
            <p className="text-slate-500 text-sm font-normal max-w-sm leading-relaxed">
              Find and book amazing events around you. From tech conferences to live concerts.
            </p>

            {/* FIXED SEARCH BAR ENGINE */}
            <div className="flex items-center bg-white border border-slate-200 rounded-2xl shadow-sm p-1.5 w-full max-w-md relative">
              <div className="flex items-center gap-2 px-3 flex-1">
                <Search className="h-4 w-4 text-slate-400 shrink-0" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events, concerts, workshops..." 
                  className="w-full text-sm bg-transparent outline-none text-slate-900 placeholder-slate-400" 
                />
              </div>
              <div className="h-6 w-[1px] bg-slate-200" />
              
              {/* DATE PICKER ACTIONS */}
              <div 
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="flex items-center gap-2 px-4 text-slate-500 text-xs font-medium shrink-0 cursor-pointer hover:text-slate-900 relative select-none"
              >
                <Calendar className="h-4 w-4 text-slate-400" />
                <span className={selectedDate ? "text-[#6D5DFC] font-semibold" : ""}>
                  {selectedDate ? selectedDate : 'Select date'}
                </span>
                {selectedDate && <X onClick={(e) => { e.stopPropagation(); setSelectedDate(''); }} className="h-3 w-3 ml-1" />}

                {showDatePicker && (
                  <div className="absolute top-10 right-0 z-50 bg-white border border-slate-200 rounded-xl p-3 shadow-xl" onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => { setSelectedDate(e.target.value); setShowDatePicker(false); }}
                      className="text-xs outline-none bg-slate-50 border border-slate-200 p-2 rounded-lg text-slate-800"
                    />
                  </div>
                )}
              </div>
              <button className="bg-[#6D5DFC] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all cursor-pointer">Search</button>
            </div>
          </div>
          <div className="hidden md:block w-[320px] h-[200px] bg-gradient-to-br from-[#6D5DFC]/5 to-[#8B5CF6]/10 rounded-3xl border border-dashed border-slate-200/80" />
        </div>

        {/* POPULAR CATEGORIES (LOCALIZED TO HOME CARD STATES) */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Popular Categories</h3>
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)} 
                className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer bg-white ${
                  selectedCategory === cat 
                    ? 'bg-[#6D5DFC]/5 border-[#6D5DFC] text-[#6D5DFC]' 
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FEATURED EVENT ROW */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Featured Events</h2>
            <button onClick={() => router.push('/events')} className="text-xs font-semibold text-[#6D5DFC] flex items-center gap-1 cursor-pointer">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center text-sm text-slate-400 font-medium">
              No matching events found on this track.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredEvents.map((event) => (
                <div key={event.id} onClick={() => router.push('/auth')} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_24px_rgba(109,93,252,0.04)] transition-all duration-300 flex flex-col group cursor-pointer">
                  <div className="aspect-[14/9] w-full overflow-hidden bg-slate-50 relative">
                    <img src={event.img} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" />
                    <button className="absolute top-3 right-3 h-7 w-7 rounded-lg bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-600 shadow-sm"><Bookmark className="h-4 w-4" /></button>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#6D5DFC] transition-colors line-clamp-1">{event.title}</h4>
                      <div className="flex flex-col gap-0.5 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.location}</span>
                        <span className="pl-4">{event.displayDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                      <span className="font-bold text-sm text-[#6D5DFC]">{event.price}</span>
                      {event.isSoldOut && <span className="text-[9px] font-bold tracking-wide text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md uppercase">Sold Out</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}