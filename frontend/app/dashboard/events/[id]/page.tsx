'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Calendar, MapPin, Clock, Users, 
  Share2, Heart, ShieldCheck, Info, CheckCircle 
} from 'lucide-react';
import { useAuth } from '../../../../context/AuthContext';

// Hardcoded repository tracking the dataset matching the dashboard matrix precisely
const masterEventsRegistry = [
  {
    id: '1',
    title: 'Tech Summit 2025',
    category: 'Tech',
    location: 'Bengaluru, India',
    date: '15 May 2025',
    time: '10:00 AM - 5:00 PM',
    price: '999',
    seatsLeft: 20,
    capacity: 200,
    organizer: 'BookIt Events',
    views: '1,245',
    bookings: '180',
    description: 'Tech Summit 2025 brings together industry leaders, developers, and innovators to explore the latest trends in technology.',
    img: 'https://images.unsplash.com/photo-1540574467063-178a50c2df87?q=80&w=1200'
  },
  {
    id: '2',
    title: 'Live in Concert',
    category: 'Music',
    location: 'Mumbai, India',
    date: '20 May 2025',
    time: '07:00 PM - 11:00 PM',
    price: '799',
    seatsLeft: 5,
    capacity: 500,
    organizer: 'Muzik Productions',
    views: '3,840',
    bookings: '495',
    description: 'Experience an electric night of live music, spectacular light displays, and unforgettable performances from top artists.',
    img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200'
  },
  {
    id: '3',
    title: 'UI/UX Design Workshop',
    category: 'Tech',
    location: 'Delhi, India',
    date: '25 May 2025',
    time: '11:00 AM - 4:00 PM',
    price: '1499',
    seatsLeft: 12,
    capacity: 50,
    organizer: 'Design Lab',
    views: '920',
    bookings: '38',
    description: 'An intensive, hands-on masterclass focusing on high-end interface composition, spacing systems, and modern SaaS UX flows.',
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200'
  },
  {
    id: '4',
    title: 'City Marathon 2025',
    category: 'Sports',
    location: 'Delhi, India',
    date: '01 June 2025',
    time: '06:00 AM - 10:00 AM',
    price: '499',
    seatsLeft: 0,
    capacity: 1000,
    organizer: 'FitIndia Athletics',
    views: '2,150',
    bookings: '1000',
    description: 'Join thousands of runners in the annual city-wide fitness challenge. All proceeds go toward local youth sports infrastructure.',
    img: 'https://images.unsplash.com/photo-1502224562085-639556652f33?q=80&w=1200'
  }
];

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const [event, setEvent] = useState<typeof masterEventsRegistry[0] | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const matched = masterEventsRegistry.find(item => item.id === id);
    if (matched) {
      setEvent(matched);
    }
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="h-6 w-6 border-2 border-[#6D5DFC] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleBookingTransaction = () => {
    setIsSubmitting(true);
    // Simulate payment clearing / server reservation transaction
    setTimeout(() => {
      setIsSubmitting(false);
      setIsBooked(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16 font-sans">
      
      {/* 1. MINIMAL TOP MASTER HEADER BAR */}
      <header className="h-[72px] border-b border-slate-100 px-8 flex items-center justify-between bg-white select-none">
        <div className="flex items-center gap-3">
          <div onClick={() => router.push('/dashboard')} className="h-9 w-9 rounded-xl bg-[#6D5DFC]/10 flex items-center justify-center text-[#6D5DFC] font-bold cursor-pointer">B</div>
          <span onClick={() => router.push('/dashboard')} className="font-bold text-lg tracking-tight text-slate-900 cursor-pointer">Bookit</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <button onClick={() => router.push('/dashboard')} className="hover:text-slate-900 transition-colors cursor-pointer">Events</button>
          <button onClick={() => router.push('/dashboard/bookings')} className="hover:text-slate-900 transition-colors cursor-pointer">My Bookings</button>
          <button onClick={() => router.push('/organizer/dashboard')} className="hover:text-slate-900 transition-colors cursor-pointer">Organizer</button>
        </div>
      </header>

      {/* 2. CORE UTILITY CRUMB BAR */}
      <div className="max-w-6xl mx-auto px-6 pt-8 select-none">
        <button 
          onClick={() => router.push('/dashboard')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" /> Back to events
        </button>
      </div>

      {/* 3. DYNAMIC CONTENT GRID SPLIT */}
      <main className="max-w-6xl mx-auto px-6 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: CRITICAL DATA MATRIX & META CORES */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="px-2.5 py-1 rounded-md bg-[#6D5DFC]/5 border border-[#6D5DFC]/10 text-[#6D5DFC] text-[10px] font-bold font-mono uppercase tracking-wider">
                {event.category}
              </span>
              {event.seatsLeft > 0 ? (
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-bold font-mono uppercase tracking-wider">
                  {event.seatsLeft} Seats Left
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-md bg-rose-50 text-rose-600 text-[10px] font-bold font-mono uppercase tracking-wider">
                  Sold Out
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              {event.title}
            </h1>

            {/* Micro Details Stack */}
            <div className="space-y-3 pt-2 text-sm text-slate-600 font-medium">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-slate-400" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          {/* Pricing & Checkout Panel Frame */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Ticket Pricing</p>
              <p className="text-3xl font-extrabold text-[#6D5DFC] mt-0.5">₹{event.price}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="h-10 w-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 transition-all cursor-pointer">
                <Heart className="h-4 w-4" />
              </button>

              {isBooked ? (
                <div className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-emerald-500/10 select-none animate-fade-in">
                  <CheckCircle className="h-4 w-4" /> Booked Confirmed
                </div>
              ) : event.seatsLeft === 0 ? (
                <button disabled className="px-6 py-2.5 bg-slate-100 border border-slate-200 text-slate-400 text-xs font-semibold rounded-xl cursor-not-allowed">
                  Allocation Empty
                </button>
              ) : (
                <button 
                  onClick={handleBookingTransaction}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#6D5DFC] hover:bg-[#5b4ee3] text-white text-xs font-semibold rounded-xl shadow-md shadow-[#6D5DFC]/10 transition-all cursor-pointer flex items-center justify-center min-w-[120px]"
                >
                  {isSubmitting ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : 'Book Now'}
                </button>
              )}
            </div>
          </div>

          {/* About This Event Block */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">About This Event</h3>
            <p className="text-sm text-slate-600 font-normal leading-relaxed">{event.description}</p>
            
            {/* Feature Check Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Keynote Sessions Included</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Open Panel Q&A Discussions</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Networking Opportunities</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" /> Workshop Resource Assets Provided</div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: HIGH-RES PLATFORM HERO ARTWORK & METRIC BLOCK */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Visual Display Shield */}
          <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] relative group">
            <img src={event.img} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" />
            <button className="absolute top-4 right-4 h-9 w-9 rounded-xl bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-[#6D5DFC] hover:bg-white transition-all shadow-md cursor-pointer">
              <Share2 className="h-4 w-4" />
            </button>
          </div>

          {/* Event Metadata Metric Inventory Grid Layout */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] p-6 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono border-b border-slate-50 pb-2">Event Specifications</h4>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs">
              <div>
                <p className="text-slate-400 font-normal">Category</p>
                <p className="text-slate-900 font-bold mt-0.5">{event.category}</p>
              </div>
              <div>
                <p className="text-slate-400 font-normal">Organizer</p>
                <p className="text-slate-900 font-bold mt-0.5">{event.organizer}</p>
              </div>
              <div>
                <p className="text-slate-400 font-normal">Total Allocation Capacity</p>
                <p className="text-slate-900 font-bold mt-0.5">{event.capacity} Seats</p>
              </div>
              <div>
                <p className="text-slate-400 font-normal">Unique Views</p>
                <p className="text-slate-900 font-bold mt-0.5">{event.views}</p>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-50">
                <p className="text-slate-400 font-normal">Current Commited Bookings</p>
                <p className="text-slate-900 font-bold text-sm mt-0.5">{event.bookings} Tickets Reserved</p>
              </div>
            </div>
          </div>

          {/* Consumer Advisory Flag */}
          <div className="flex gap-3 bg-blue-500/[0.02] border border-blue-500/10 p-4 rounded-xl text-[11px] text-slate-500 font-normal leading-normal">
            <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
            <span>This transaction processes securely over the internal framework registry. Tickets persist on your account dashboard profile.</span>
          </div>

        </div>

      </main>
    </div>
  );
}