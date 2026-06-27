'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Upload, Calendar, MapPin, 
  DollarSign, Grid, AlertCircle, FileText 
} from 'lucide-react';

export default function CreateEventPage() {
  const router = useRouter();
  
  // Interactive Controlled Submission Trackers
  const [formData, setFormData] = useState({
    title: '',
    category: 'Tech',
    price: '',
    totalSeats: '',
    location: '',
    date: '',
    time: '',
    description: ''
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['Tech', 'Music', 'Business', 'Sports', 'Art', 'Health'];

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Mock Image Upload Preview Trigger
  const handleImageMockClick = () => {
    // Injecting a premium template mockup event cover asset path for UI completeness
    setImagePreview('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1200');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating database storage latency cycle
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/organizer/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-900 font-sans flex flex-col">
      
      {/* MINIMALIST BACKBAR ACTION RIBBON */}
      <header className="h-[72px] border-b border-slate-100 px-8 flex items-center justify-between bg-white select-none shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/organizer/dashboard')}
            className="h-9 w-9 border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-base font-bold tracking-tight">Create New Event</h1>
            <p className="text-[11px] text-slate-400 font-normal">Set up your next dynamic experience</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push('/organizer/dashboard')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-4 py-2 rounded-xl"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-[#6D5DFC] hover:bg-[#5b4ee3] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-[#6D5DFC]/10 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Publishing...' : 'Publish Event'}
          </button>
        </div>
      </header>

      {/* COMPONENT FORM GRID */}
      <main className="flex-1 overflow-y-auto px-6 py-10 max-w-4xl w-full mx-auto">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* LEFT SUB-GRID COLUMN: BANNER ASSET CANVAS */}
          <div className="md:col-span-1 space-y-4">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Event Banner</label>
            
            <div 
              onClick={handleImageMockClick}
              className="aspect-[4/5] w-full rounded-2xl border-2 border-dashed border-slate-200 bg-white hover:border-[#6D5DFC] transition-all flex flex-col items-center justify-center p-4 text-center cursor-pointer group relative overflow-hidden group"
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium backdrop-blur-xs">
                    Change Banner Image
                  </div>
                </>
              ) : (
                <div className="space-y-2.5 p-4 select-none">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mx-auto group-hover:text-[#6D5DFC] group-hover:bg-[#6D5DFC]/5 transition-colors">
                    <Upload className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700">Click to upload cover image</p>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Supports PNG, JPG up to 5MB (16:10 ratio recommended)</p>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-xl bg-amber-50/60 border border-amber-100 p-3 flex gap-2.5 text-amber-800">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <p className="text-[10px] leading-relaxed font-medium">This banner image will be featured directly across the public landing discovery grid decks.</p>
            </div>
          </div>

          {/* RIGHT SUB-GRID COLUMN: REGISTRATION METRICS FIELD DECK */}
          <div className="md:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.01)] space-y-6">
            
            {/* Input Row 1 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 tracking-tight flex items-center gap-1">
                <FileText className="h-3.5 w-3.5 text-slate-400" /> Event Title
              </label>
              <input 
                type="text" 
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Global AI Keynote & Panel Meetup"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#6D5DFC] focus:bg-white transition-all text-slate-900 font-medium placeholder-slate-400"
              />
            </div>

            {/* Input Multi-Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 tracking-tight flex items-center gap-1">
                  <Grid className="h-3.5 w-3.5 text-slate-400" /> Category
                </label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-[#6D5DFC] focus:bg-white transition-all text-slate-700 font-semibold cursor-pointer"
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 tracking-tight flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5 text-slate-400" /> Ticket Price
                </label>
                <input 
                  type="text" 
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., 999 (or Free)"
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#6D5DFC] focus:bg-white transition-all text-slate-900 font-medium font-mono placeholder-slate-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 tracking-tight flex items-center gap-1">
                  Available Slots
                </label>
                <input 
                  type="number" 
                  name="totalSeats"
                  required
                  value={formData.totalSeats}
                  onChange={handleInputChange}
                  placeholder="e.g., 150"
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#6D5DFC] focus:bg-white transition-all text-slate-900 font-medium font-mono placeholder-slate-400"
                />
              </div>
            </div>

            {/* Input Row 3 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 tracking-tight flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400" /> Venue Location
              </label>
              <input 
                type="text" 
                name="location"
                required
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Innovation Hub Hall 4, Bengaluru, KA"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#6D5DFC] focus:bg-white transition-all text-slate-900 font-medium placeholder-slate-400"
              />
            </div>

            {/* Input Row 4 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 tracking-tight flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" /> Event Date
                </label>
                <input 
                  type="date" 
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#6D5DFC] focus:bg-white transition-all text-slate-700 font-medium font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 tracking-tight flex items-center gap-1">
                  Start Time
                </label>
                <input 
                  type="time" 
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#6D5DFC] focus:bg-white transition-all text-slate-700 font-medium font-mono"
                />
              </div>
            </div>

            {/* Input Row 5 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 tracking-tight flex items-center gap-1">
                Event Description & Outline
              </label>
              <textarea 
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Share a brief schedule, target audience, and key highlights of the event..."
                className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl p-3.5 text-xs outline-none focus:border-[#6D5DFC] focus:bg-white transition-all text-slate-900 font-medium placeholder-slate-400 leading-relaxed resize-none"
              />
            </div>

          </div>
        </form>
      </main>
    </div>
  );
}