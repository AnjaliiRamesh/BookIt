
// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Search, Calendar, Bell, MapPin, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

// export default function AllEventsPage() {
//   const router = useRouter();
//   const [selectedCategory, setSelectedCategory] = useState('All Categories');
//   const [currentPage, setCurrentPage] = useState(1);

//   const categories = ['All Categories', 'Tech', 'Music', 'Business', 'Sports', 'Art', 'Health'];

//   const verticalEventDataset = [
//     { id: '1', title: 'Tech Summit 2025', location: 'Bengaluru, India', date: '15 May 2025', time: '10:00 AM', seats: '20 Seats Left', price: ' should be dynamically mapped ', displayPrice: ' can render standard text ', rawVal: '₹999', img: 'https://images.unsplash.com/photo-1540574467063-178a50c2df87?q=80&w=400' },
//     { id: '2', title: 'Live in Concert', location: 'Mumbai, India', date: '20 May 2025', time: '07:00 PM', seats: '5 Seats Left', price: ' should be dynamically mapped ', displayPrice: ' can render standard text ', rawVal: '₹799', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400' },
//     { id: '3', title: 'UI/UX Design Workshop', location: 'Delhi, India', date: '25 May 2025', time: '11:00 AM', seats: '12 Seats Left', price: ' should be dynamically mapped ', displayPrice: ' can render standard text ', rawVal: '₹1499', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=400' },
//     { id: '4', title: 'City Marathon 2025', location: 'Delhi, India', date: '01 Jun 2025', time: '06:00 AM', seats: 'Sold Out', price: ' should be dynamically mapped ', displayPrice: ' can render standard text ', rawVal: '₹499', isSold: true, img: 'https://images.unsplash.com/photo-1502224562085-639556652f33?q=80&w=400' }
//   ];

//   return (
//     <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      
//       {/* NAVIGATION BAR - ALIGNED TO MIDDLE IMAGE */}
//       <header className="h-[72px] border-b border-slate-100 px-12 flex items-center justify-between bg-white select-none shrink-0">
//         <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
//           <div className="h-8 w-8 rounded-lg bg-[#6D5DFC] flex items-center justify-center text-white font-bold text-sm">B</div>
//           <span className="font-bold text-lg tracking-tight">BookIt</span>
//         </div>
//         <nav className="flex items-center gap-8 text-sm font-medium text-slate-600">
//           <button onClick={() => router.push('/events')} className="text-[#6D5DFC] font-semibold cursor-pointer">Events</button>
//           <button onClick={() => router.push('/auth')} className="hover:text-slate-900 transition-colors cursor-pointer">My Bookings</button>
//           <button onClick={() => router.push('/auth')} className="hover:text-slate-900 transition-colors cursor-pointer">Organizer</button>
//         </nav>
//         <div className="flex items-center gap-4 text-slate-400">
//           <Search className="h-4 w-4 cursor-pointer hover:text-slate-600" />
//           <Bell className="h-4 w-4 cursor-pointer hover:text-slate-600" />
//           <div className="h-7 w-7 rounded-full bg-slate-100 border border-slate-200" />
//         </div>
//       </header>

//       {/* SEARCH AND SCOPE AREA */}
//       <div className="max-w-5xl w-full mx-auto px-6 pt-10 space-y-6">
//         <div className="space-y-1.5">
//           <h1 className="text-2xl font-bold tracking-tight">All Events</h1>
//           <p className="text-slate-400 text-xs font-normal">Find your next experience</p>
//         </div>

//         <div className="flex gap-3 items-center w-full max-w-2xl">
//           <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/60 px-3 py-2 rounded-xl flex-1 text-sm text-slate-400">
//             <Search className="h-4 w-4" />
//             <input type="text" placeholder="Search events..." className="w-full bg-transparent outline-none text-slate-900 placeholder-slate-400" />
//           </div>
//           <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/60 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 cursor-pointer">
//             <Calendar className="h-4 w-4 text-slate-400" />
//             <span>Date</span>
//           </div>
//           <button className="flex items-center gap-1.5 border border-slate-200 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer">
//             <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
//           </button>
//         </div>
//       </div>

//       {/* CORE MIDDLE IMAGE CONTENT GRID SPLIT */}
//       <main className="max-w-5xl w-full mx-auto px-6 py-8 flex gap-10 items-start flex-1">
        
//         {/* SIDE BAR: CATEGORY SELECTION MATRIX */}
//         <aside className="w-48 shrink-0 flex flex-col gap-1 select-none">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setSelectedCategory(cat)}
//               className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
//                 selectedCategory === cat
//                   ? 'bg-[#6D5DFC]/5 text-[#6D5DFC]'
//                   : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </aside>

//         {/* MIDDLE COMPONENT: VERTICAL STACK LIST */}
//         <div className="flex-1 space-y-4">
//           <div className="space-y-3.5">
//             {verticalEventDataset.map((event) => (
//               <div 
//                 key={event.id}
//                 onClick={() => router.push(`/auth`)}
//                 className="flex items-center bg-white border border-slate-100 p-3.5 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_24px_rgba(109,93,252,0.04)] transition-all cursor-pointer group"
//               >
//                 <div className="h-16 w-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
//                   <img src={event.img} alt={event.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
//                 </div>

//                 <div className="flex-1 min-w-0 px-4 flex flex-col justify-center">
//                   <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#6D5DFC] transition-colors truncate">{event.title}</h3>
//                   <div className="flex flex-col text-[11px] text-slate-400 mt-0.5 font-normal">
//                     <span>📍 {event.location}</span>
//                     <span className="text-[#6D5DFC] font-medium mt-0.5 font-mono">{event.date} • {event.time}</span>
//                   </div>
//                 </div>

//                 <div className="flex flex-col items-end justify-between h-14 shrink-0 pl-2">
//                   {event.isSold ? (
//                     <span className="text-[9px] font-bold tracking-wide text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md uppercase">Sold Out</span>
//                   ) : (
//                     <span className="text-[9px] font-bold tracking-wide text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md uppercase font-mono">{event.seats}</span>
//                   )}
//                   <span className="font-extrabold text-sm text-[#6D5DFC]">{event.rawVal}</span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* EXACT INTEGRATED PAGINATION: ALIGNED TO MIDDLE IMAGE */}
//           <div className="flex items-center justify-center gap-1 pt-8 select-none border-t border-slate-100">
//             <button className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-300 cursor-pointer">
//               <ChevronLeft className="h-4 w-4" />
//             </button>
//             {[1, 2, 3, 4, 5, '...', 20].map((p, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => typeof p === 'number' && setCurrentPage(p)}
//                 className={`h-7 px-2.5 text-xs font-semibold rounded-lg border transition-all ${
//                   currentPage === p
//                     ? 'bg-[#6D5DFC] border-[#6D5DFC] text-white shadow-sm'
//                     : p === '...'
//                     ? 'border-transparent text-slate-300 cursor-default'
//                     : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 cursor-pointer'
//                 }`}
//               >
//                 {p}
//               </button>
//             ))}
//             <button className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-300 cursor-pointer">
//               <ChevronRight className="h-4 w-4" />
//             </button>
//           </div>
//         </div>

//       </main>
//     </div>
//   );
// }


'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Calendar, Bell, MapPin, SlidersHorizontal, ChevronLeft, ChevronRight, X, Clock } from 'lucide-react';

export default function AllEventsPage() {
  const router = useRouter();
  
  // Active Telemetry States
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ['All Categories', 'Tech', 'Music', 'Business', 'Sports', 'Art', 'Health'];

  // Enhanced Dataset with Category Flags to allow computational filtering pipelines
  const verticalEventDataset = [
    { id: '1', title: 'Tech Summit 2025', category: 'Tech', location: 'Bengaluru, India', date: '2026-05-15', displayDate: '15 May 2025', time: '10:00 AM', seats: '20 Seats Left', rawVal: '₹999', img: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=200' },
    { id: '2', title: 'Live in Concert', category: 'Music', location: 'Mumbai, India', date: '2026-05-20', displayDate: '20 May 2025', time: '07:00 PM', seats: '5 Seats Left', rawVal: '₹799', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=200' },
    { id: '3', title: 'UI/UX Design Workshop', category: 'Tech', location: 'Delhi, India', date: '2026-05-25', displayDate: '25 May 2025', time: '11:00 AM', seats: '12 Seats Left', rawVal: '₹1499', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=200' },
    { id: '4', title: 'City Marathon 2025', category: 'Sports', location: 'Delhi, India', date: '2026-06-01', displayDate: '01 Jun 2025', time: '06:00 AM', seats: 'Sold Out', rawVal: '₹499', isSold: true, img: 'https://images.unsplash.com/photo-1502224562085-639556652f33?q=80&w=200' }
  ];

  // Dynamic Filtering Runtime Evaluator Engine
  const filteredEvents = verticalEventDataset.filter(event => {
    const matchesCategory = selectedCategory === 'All Categories' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = !selectedDate || event.date === selectedDate;
    
    return matchesCategory && matchesSearch && matchesDate;
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      
      {/* NAVIGATION BAR - ALIGNED TO MIDDLE IMAGE */}
      <header className="h-[72px] border-b border-slate-100 px-12 flex items-center justify-between bg-white select-none shrink-0">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
          <div className="h-8 w-8 rounded-lg bg-[#6D5DFC] flex items-center justify-center text-white font-bold text-sm">B</div>
          <span className="font-bold text-lg tracking-tight">BookIt</span>
        </div>
        <nav className="flex items-center gap-8 text-sm font-medium text-slate-600">
          <button onClick={() => router.push('/events')} className="text-[#6D5DFC] font-semibold cursor-pointer">Events</button>
          <button onClick={() => router.push('/auth')} className="hover:text-slate-900 transition-colors cursor-pointer">My Bookings</button>
          <button onClick={() => router.push('/auth')} className="hover:text-slate-900 transition-colors cursor-pointer">Organizer</button>
        </nav>
        <div className="flex items-center gap-4 text-slate-400">
          <Search className="h-4 w-4 cursor-pointer hover:text-slate-600" />
          <Bell className="h-4 w-4 cursor-pointer hover:text-slate-600" />
          <div className="h-7 w-7 rounded-full bg-slate-100 border border-slate-200" />
        </div>
      </header>

      {/* SEARCH AND SCOPE AREA - CLEANED INPUT GEOMETRY PROPORTIONS */}
      <div className="max-w-5xl w-full mx-auto px-6 pt-10 space-y-6">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight">All Events</h1>
          <p className="text-slate-400 text-xs font-normal">Find your next experience</p>
        </div>

        <div className="flex gap-3 items-center w-full max-w-xl relative">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/60 px-3.5 py-2 rounded-xl flex-1 text-xs">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search events, locations..." 
              className="w-full bg-transparent outline-none text-slate-900 placeholder-slate-400 font-medium" 
            />
          </div>

          {/* OPERATIONAL INTERACTIVE CALENDAR OVERLAY WINDOW */}
          <div 
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-2 bg-slate-50 border border-slate-200/60 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-500 cursor-pointer hover:bg-slate-100 select-none shrink-0 relative"
          >
            <Calendar className="h-4 w-4 text-slate-400" />
            <span className={selectedDate ? "text-[#6D5DFC] font-semibold" : ""}>
              {selectedDate ? selectedDate : 'Date'}
            </span>
            {selectedDate && (
              <X 
                onClick={(e) => { e.stopPropagation(); setSelectedDate(''); setCurrentPage(1); }} 
                className="h-3 w-3 ml-1 text-slate-400 hover:text-slate-600" 
              />
            )}

            {showDatePicker && (
              <div className="absolute top-11 left-0 z-50 bg-white border border-slate-200 rounded-xl p-3 shadow-xl" onClick={(e) => e.stopPropagation()}>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => { setSelectedDate(e.target.value); setShowDatePicker(false); setCurrentPage(1); }}
                  className="text-xs outline-none bg-slate-50 border border-slate-200 p-2 rounded-lg text-slate-800 font-sans focus:border-[#6D5DFC]"
                />
              </div>
            )}
          </div>

          <button className="flex items-center gap-1.5 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer shrink-0">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
          </button>
        </div>
      </div>

      {/* CORE MIDDLE IMAGE CONTENT GRID SPLIT */}
      <main className="max-w-5xl w-full mx-auto px-6 py-8 flex gap-12 items-start flex-1">
        
        {/* SIDE BAR: CATEGORY SELECTION MATRIX WITH ENHANCED WHITESPACE AND MARGINS */}
        <aside className="w-48 shrink-0 flex flex-col space-y-3 select-none border-r border-slate-50 pr-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
              className={`w-full text-left px-4 py-2.5 text-xs font-medium tracking-wide rounded-xl transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#6D5DFC]/5 text-[#6D5DFC] font-semibold'
                  : 'text-slate-500 hover:bg-slate-50/80 hover:text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </aside>

        {/* MIDDLE COMPONENT: VERTICAL STACK LIST */}
        <div className="flex-1 space-y-4">
          <div className="space-y-4">
            {filteredEvents.length === 0 ? (
              <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center text-xs text-slate-400 font-medium">
                No events found matching your current tracking selections.
              </div>
            ) : (
              filteredEvents.map((event) => (
                <div 
                  key={event.id}
                  onClick={() => router.push(`/auth`)}
                  className="flex items-center bg-white border border-slate-100 p-4 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_24px_rgba(109,93,252,0.04)] transition-all cursor-pointer group"
                >
                  {/* UNIFORM CONTROLLED ART CONTAINER SLOTS */}
                  <div className="h-20 w-32 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100 shadow-sm relative">
                    <img src={event.img} alt={event.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                  </div>

                  {/* ENHANCED CONTRAST TYPOGRAPHY SCALE */}
                  <div className="flex-1 min-w-0 px-6 flex flex-col justify-center space-y-1.5">
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-[#6D5DFC] transition-colors truncate tracking-tight">
                      {event.title}
                    </h3>
                    <div className="flex flex-col text-xs text-slate-500 space-y-1 font-medium">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-slate-400" /> {event.location}</span>
                      <span className="text-[#6D5DFC] font-semibold tracking-wide flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-indigo-400" /> {event.displayDate || event.date} • {event.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between h-20 shrink-0 pl-2 py-1">
                    {event.isSold ? (
                      <span className="text-[10px] font-bold tracking-wide text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md uppercase">Sold Out</span>
                    ) : (
                      <span className="text-[10px] font-bold tracking-wide text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md uppercase font-mono">{event.seats}</span>
                    )}
                    <span className="font-extrabold text-base text-[#6D5DFC] tracking-tight">{event.rawVal}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* EXACT INTEGRATED PAGINATION: ALIGNED TO MIDDLE IMAGE */}
          <div className="flex items-center justify-center gap-1 pt-8 select-none border-t border-slate-100">
            <button className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-300 cursor-pointer">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {[1, 2, 3, 4, 5, '...', 20].map((p, idx) => (
              <button
                key={idx}
                disabled={p === '...'}
                onClick={() => typeof p === 'number' && setCurrentPage(p)}
                className={`h-7 px-2.5 text-xs font-semibold rounded-lg border transition-all ${
                  currentPage === p
                    ? 'bg-[#6D5DFC] border-[#6D5DFC] text-white shadow-sm'
                    : p === '...'
                    ? 'border-transparent text-slate-300 cursor-default'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 cursor-pointer'
                }`}
              >
                {p}
              </button>
            ))}
            <button className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-300 cursor-pointer">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}