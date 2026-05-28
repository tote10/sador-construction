'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingCallButton } from '@/components/layout/FloatingCallButton';
import {
  MapPin, Calendar, Clock, User, ShieldCheck, Search, X,
  ChevronLeft, ChevronRight, Eye, RefreshCw, SlidersHorizontal
} from 'lucide-react';

export default function ProjectsClient({ projects = [], seoSettings = {} }: { projects?: any[]; seoSettings?: any }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = `Projects Portfolio | ${seoSettings?.title || 'Sador General Construction'}`;
    }
  }, [seoSettings?.title]);

  const handleMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 || isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const filteredProjects = (projects ?? []).filter(project => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const openProjectDetails = (project: any) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
    setSliderPosition(50);
  };

  const closeProjectDetails = () => setSelectedProject(null);

  const nextImage = (imagesLength: number) => setActiveImageIndex(prev => (prev + 1) % imagesLength);
  const prevImage = (imagesLength: number) => setActiveImageIndex(prev => (prev - 1 + imagesLength) % imagesLength);

  return (
    <>
      <Navbar />
      <FloatingCallButton />

      <main className="flex-grow pt-28">
        {/* HERO HEADER */}
        <section className="bg-slate-900 text-white relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-brand-blue/90 mix-blend-multiply z-10" />
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600"
              alt="Commercial Complex"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-30"
            />
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-20 space-y-6">
            <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Portfolio Catalog</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">Our Signature Projects</h1>
            <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full" />
            <p className="text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
              Explore the project record covering buildings, roads, and civil infrastructure across Ethiopia.
            </p>
          </div>
        </section>

        {/* SEARCH & FILTERS */}
        <section className="py-10 bg-white border-b border-slate-100 px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 justify-between items-center">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects by title, description or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 focus:border-brand-gold focus:bg-white rounded-xl text-sm font-semibold text-slate-900 outline-none transition"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-blue">
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider shrink-0">
                <SlidersHorizontal size={14} className="text-brand-gold" />
                <span>Filters:</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {['All', 'Building', 'Road', 'Infrastructure', 'Other'].map(category => (
                  <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 text-xs font-bold uppercase tracking-wide rounded-xl border transition-all ${selectedCategory === category ? 'bg-brand-blue border-brand-blue text-white shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                    {category === 'All' ? 'All Sectors' : category}
                  </button>
                ))}
              </div>

              <div className="h-6 w-px bg-slate-200 hidden sm:block" />

              <div className="flex gap-2">
                {['All', 'Completed', 'Ongoing'].map(status => (
                  <button key={status} onClick={() => setSelectedStatus(status)} className={`px-4 py-2 text-xs font-bold uppercase tracking-wide rounded-xl border transition-all ${selectedStatus === status ? 'bg-brand-blue border-brand-blue text-white shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                    {status === 'All' ? 'All Status' : status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* GRID */}
        <section className="py-20 px-6 bg-brand-light">
          <div className="max-w-7xl mx-auto">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl p-8 space-y-4">
                <h3 className="text-xl font-bold text-brand-blue">No Projects Found</h3>
                <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto">We couldn't find any projects matching your search parameters. Try adjusting filters or search keywords.</p>
                <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedStatus('All'); }} className="px-5 py-2.5 bg-brand-gold text-brand-blue font-bold rounded-xl text-xs uppercase transition hover:bg-brand-gold/90">Reset Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map(project => (
                  <div key={project.id} onClick={() => openProjectDetails(project)} className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-gold/25 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full">
                    <div className="h-64 sm:h-72 bg-slate-100 relative overflow-hidden shrink-0">
                      <Image src={(project.images ?? [])[0] || 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=1200'} alt={project.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 z-10 flex gap-2">
                        <span className="px-3 py-1 bg-brand-gold text-brand-blue text-[9px] font-bold uppercase tracking-wider rounded-lg shadow-sm">{project.category}</span>
                        <span className="px-3 py-1 bg-brand-blue text-white text-[9px] font-bold uppercase tracking-wider rounded-lg">{project.status}</span>
                      </div>
                      <div className="absolute inset-0 bg-brand-blue/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-blue shadow-lg scale-90 group-hover:scale-100 transition-transform">
                          <Eye size={20} />
                        </div>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                          <MapPin size={12} className="text-brand-gold" />
                          <span>{project.location}</span>
                          <span className="text-slate-200">|</span>
                          <span>{project.year}</span>
                        </div>
                        <h3 className="text-xl font-extrabold text-brand-blue group-hover:text-brand-gold transition-colors leading-tight">{project.title}</h3>
                        <p className="text-xs text-slate-500 font-semibold leading-relaxed line-clamp-2">{project.description}</p>
                      </div>

                      {(project.beforeImage || project.afterImage) && (
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-extrabold text-brand-gold uppercase tracking-wider">
                          <RefreshCw size={10} className="animate-spin-slow" />
                          <span>Before & After Slider Enabled</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {selectedProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={closeProjectDetails} />

            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-150 w-full max-w-5xl relative z-10 grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] lg:max-h-none overflow-y-auto lg:overflow-visible">
              <button onClick={closeProjectDetails} className="absolute right-5 top-5 z-30 p-2.5 bg-slate-900 text-white rounded-full hover:bg-brand-gold hover:text-brand-blue shadow transition" aria-label="Close modal">
                <X size={20} />
              </button>

              <div className="lg:col-span-7 bg-slate-950 flex flex-col justify-center relative min-h-[350px] lg:min-h-[500px]">
                {selectedProject.beforeImage && selectedProject.afterImage && activeImageIndex === 0 ? (
                  <div ref={sliderContainerRef} className="relative w-full h-full min-h-[350px] lg:min-h-[500px] select-none overflow-hidden" onMouseMove={handleMouseMove} onTouchMove={handleTouchMove} onMouseDown={() => { isDragging.current = true; }} onMouseUp={() => { isDragging.current = false; }} onMouseLeave={() => { isDragging.current = false; }}>
                    <Image src={selectedProject.afterImage!} alt="Completed project" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover pointer-events-none" />
                    <div className="absolute bottom-4 right-4 z-20 px-3 py-1 bg-brand-blue/80 text-white text-[10px] font-bold uppercase tracking-wider rounded">AFTER</div>

                    <div className="absolute inset-y-0 left-0 right-0 overflow-hidden pointer-events-none" style={{ width: `${sliderPosition}%` }}>
                      <div className="relative h-full w-full">
                        <Image src={selectedProject.beforeImage!} alt="Project before start" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 z-20 px-3 py-1 bg-brand-gold/80 text-brand-blue text-[10px] font-bold uppercase tracking-wider rounded">BEFORE</div>

                    <div className="absolute inset-y-0 w-1 bg-white cursor-ew-resize flex items-center justify-center z-20" style={{ left: `${sliderPosition}%` }}>
                      <div className="w-8 h-8 rounded-full bg-white text-brand-blue shadow-lg border border-slate-200 flex items-center justify-center shrink-0 -ml-3.5">
                        <SlidersHorizontal size={14} className="rotate-90 text-brand-gold" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full min-h-[350px] lg:min-h-[500px]">
                    <Image src={selectedProject.images[activeImageIndex] || 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=1200'} alt={selectedProject.title} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover opacity-90" />
                    {((selectedProject.images ?? []) as any).length > 1 && (
                      <>
                        <button onClick={() => prevImage(selectedProject.images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-slate-900/60 hover:bg-slate-950 text-white flex items-center justify-center transition"><ChevronLeft size={18} /></button>
                        <button onClick={() => nextImage(selectedProject.images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-slate-900/60 hover:bg-slate-950 text-white flex items-center justify-center transition"><ChevronRight size={18} /></button>
                        <div className="absolute bottom-6 inset-x-0 flex justify-center gap-1.5 z-20">
                          {(selectedProject.images ?? []).map((_: any, i: number) => (
                            <button key={i} onClick={() => setActiveImageIndex(i)} className={`w-2 h-2 rounded-full transition-all ${i === activeImageIndex ? 'bg-brand-gold w-4' : 'bg-white/40 hover:bg-white/60'}`} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {(selectedProject.beforeImage || selectedProject.afterImage) && (
                  <div className="absolute top-6 left-6 z-20 flex gap-2">
                    <button onClick={() => setActiveImageIndex(0)} className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition border`}>Before/After</button>
                    <button onClick={() => setActiveImageIndex(1)} className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition border`}>Gallery</button>
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 p-8 sm:p-10 overflow-y-auto max-h-[70vh] lg:max-h-none">
                <div className="space-y-4">
                  <h2 className="text-2xl font-extrabold text-brand-blue">{selectedProject.title}</h2>
                  <p className="text-sm text-slate-600">{selectedProject.description}</p>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h4 className="text-xs font-bold text-slate-500 uppercase">Location</h4>
                      <p className="text-sm font-semibold text-slate-700 mt-1">{selectedProject.location}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h4 className="text-xs font-bold text-slate-500 uppercase">Year</h4>
                      <p className="text-sm font-semibold text-slate-700 mt-1">{selectedProject.year}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </main>
    </>
  );
}
