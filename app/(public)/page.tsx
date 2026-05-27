'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, Phone, Mail, MapPin, Building2, HardHat, Shield, 
  Target, Award, CheckCircle, ChevronLeft, ChevronRight, MessageSquare, Star 
} from 'lucide-react';
import { useApp } from '@/lib/state/AppContext';
import AwardsSlider from '@/components/ui/AwardsSlider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingCallButton } from '@/components/layout/FloatingCallButton';
import { COMPANY } from '@/lib/constants';

export default function LandingPage() {
  const { 
    projects, 
    services, 
    testimonials, 
    homepageContent, 
    seoSettings,
    submitContact 
  } = useApp();

  // Dynamic Browser Tab Title updating from SEO settings
  useEffect(() => {
    if (typeof window !== 'undefined' && seoSettings.title) {
      document.title = seoSettings.title;
    }
  }, [seoSettings.title]);

  // Testimonials Slider State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Quote Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Building',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    submitContact({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      projectType: formData.projectType,
      message: formData.message
    });
    
    setFormSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: 'Building',
      message: ''
    });

    // Reset success toast after 5s
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  // Next/Prev Testimonial
  const nextTestimonial = () => {
    setActiveTestimonial(prev => (prev + 1) % (testimonials.length || 1));
  };
  const prevTestimonial = () => {
    setActiveTestimonial(prev => (prev - 1 + (testimonials.length || 1)) % (testimonials.length || 1));
  };

  // Auto advance testimonials every 6s
  useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return;
    const id = setInterval(() => setActiveTestimonial(prev => (prev + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [testimonials]);

  const sanitizedHeroSubtitle = homepageContent.heroSubtitle.replace(/grade\s*-?\s*1/gi, 'general');

  const featuredProjects = projects.filter(p => p.featured);
  const topServices = services.slice(0, 3);
  const heroWords = homepageContent.heroTitle.split(' ');

  // Mapping string icons to Lucide components
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-8 h-8 text-brand-gold" />;
      case 'Navigation': return <HardHat className="w-8 h-8 text-brand-gold" />;
      case 'HardHat': return <Shield className="w-8 h-8 text-brand-gold" />;
      default: return <Building2 className="w-8 h-8 text-brand-gold" />;
    }
  };

  return (
    <>
      <Navbar />
      <FloatingCallButton />

      <main className="flex-grow pt-20">
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-900 text-white py-20 px-6">
          {/* Background Images with Zoom (Ken Burns Effect) */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-brand-blue/85 mix-blend-multiply z-10" />
            <Image
              src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2000"
              alt="Heavy Civil Engineering"
              fill
              priority
              sizes="100vw"
              className="object-cover animate-[pulse_10s_infinite] opacity-60 scale-105"
            />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white font-bold text-xs uppercase tracking-widest">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-ping" />
                General Contractor
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight">
                {heroWords.map((word, idx) => {
                  if (idx >= heroWords.length - 2) {
                    return <span key={idx} className="text-brand-gold"> {word}</span>;
                  }
                  return <span key={idx}> {word}</span>;
                })}
              </h1>

              <p className="text-lg text-slate-300 font-medium leading-relaxed max-w-xl">
                {sanitizedHeroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link 
                  href="/projects" 
                  className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-brand-gold hover:bg-brand-gold/90 text-brand-blue font-bold rounded-xl transition-all duration-300 shadow-lg shadow-brand-gold/25 hover:shadow-brand-gold/40 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Explore Portfolio
                  <ArrowRight size={18} />
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold rounded-xl transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Hero Right Card Info */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl" />
                <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4">Our Values</h3>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center shrink-0">
                    <Shield className="text-brand-gold w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Uncompromising Safety</h4>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">0-accident site safety records across major infrastructure zones.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center shrink-0">
                    <Award className="text-brand-gold w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Certified Excellence</h4>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">Quality control systems meeting strict building code guidelines.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center shrink-0">
                    <Target className="text-brand-gold w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">On-Time Completion</h4>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">Advanced structural critical path scheduling protocols.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS / STATS SECTION */}
        <section className="relative z-30 -mt-10 max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.03)] p-8 sm:p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y-2 md:divide-y-0 md:divide-x-2 divide-slate-100/60">
              <div className="flex flex-col items-center justify-center text-center p-4">
                <span className="text-4xl sm:text-5xl font-extrabold text-brand-blue tracking-tight mb-2">
                  {homepageContent.yearsOfExperience}+
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">Years Experience</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-4 pt-8 md:pt-4">
                <span className="text-4xl sm:text-5xl font-extrabold text-brand-blue tracking-tight mb-2">
                  {homepageContent.projectsDone}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">Completed Projects</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-4 pt-8 md:pt-4">
                <span className="text-4xl sm:text-5xl font-extrabold text-brand-blue tracking-tight mb-2">
                  {homepageContent.happyClients}+
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">Client Partners</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-4 pt-8 md:pt-4">
                <span className="text-4xl sm:text-5xl font-extrabold text-brand-blue tracking-tight mb-2">
                  {homepageContent.activeStaff}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">Engineers & Staff</span>
              </div>
            </div>
          </div>
        </section>

        {/* BRIEF ABOUT SECTION */}
        <section className="py-24 px-6 bg-brand-light">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* About Left Image Grid */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8 relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] bg-slate-200">
                  <Image
                    src="https://images.unsplash.com/photo-1504307651254-35680f356f58?q=80&w=1000"
                    alt="On Site Excavation"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="col-span-4 relative rounded-3xl overflow-hidden shadow-lg border-4 border-white aspect-square bg-slate-200 mt-8">
                  <Image
                    src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=600"
                    alt="Heavy Machinery Works"
                    fill
                    sizes="(min-width: 1024px) 20vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="col-span-5 relative rounded-3xl overflow-hidden shadow-lg border-4 border-white aspect-square bg-slate-200 -mt-12 ml-6 z-10">
                  <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600"
                    alt="Hospital Foundation"
                    fill
                    sizes="(min-width: 1024px) 25vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="col-span-7 bg-brand-blue text-white rounded-3xl p-6 sm:p-8 shadow-xl -mt-6 border-4 border-white z-10 flex flex-col justify-center">
                  <Award size={36} className="text-brand-gold mb-3" />
                  <h4 className="text-lg font-bold mb-1">General Contractor</h4>
                  <p className="text-xs text-slate-300 font-semibold leading-relaxed">Focused on delivering reliable, high-quality construction services across Ethiopia.</p>
                </div>
              </div>
            </div>

            {/* About Right Content */}
            <div className="lg:col-span-6 space-y-8 lg:pl-4">
              <div className="space-y-4">
                <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Sador General Construction Profile</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-blue tracking-tight leading-tight">
                  Building durable infrastructure with discipline, safety, and precision.
                </h2>
              </div>

              <div className="space-y-6 text-slate-600 font-medium leading-relaxed">
                <p>
                  Sador General Construction is a general contractor focused on delivering reliable, high-quality construction services across Ethiopia.
                </p>
                <p>
                  Our team combines practical field experience, structured project control, and quality-driven execution to turn plans into durable, functional assets for clients and communities.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex gap-8">
                <div className="space-y-2">
                  <h4 className="text-brand-blue font-bold flex items-center gap-2">
                    <CheckCircle size={16} className="text-brand-gold" />
                      Civil Infrastructure
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">Roads, drainage, and utility works.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-brand-blue font-bold flex items-center gap-2">
                    <CheckCircle size={16} className="text-brand-gold" />
                      Building Construction
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">Commercial and residential structures.</p>
                </div>
              </div>

              <div>
                <Link 
                  href="/about" 
                  className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-gold font-bold text-sm transition-colors group"
                >
                  Read Corporate Bio
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* SERVICES CARDS */}
        <section className="py-24 px-6 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto space-y-16">
            
            {/* Services Header */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Capabilities</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-blue tracking-tight">
                Our Areas of Execution
              </h2>
              <p className="text-base sm:text-lg text-slate-500 font-medium">
                From estimation to handover, our service structure supports durable construction outcomes.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topServices.map((service, index) => (
                <div 
                  key={service.id}
                  className="group relative bg-brand-light p-8 sm:p-10 rounded-3xl border border-slate-100 hover:bg-white hover:border-brand-gold/30 hover:shadow-[0_20px_50px_rgba(15,41,66,0.04)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    {/* Icon Container */}
                    <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-brand-blue group-hover:border-brand-blue transition-all duration-500">
                      {getServiceIcon(service.iconName)}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-brand-blue">{service.title}</h3>
                    <p className="text-sm text-slate-500 font-semibold leading-relaxed">{service.description}</p>
                    
                    {/* List Items */}
                    <ul className="space-y-2.5 pt-4 border-t border-slate-100">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <Link 
                      href="/services" 
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue hover:text-brand-gold tracking-wide transition-colors group/link"
                    >
                      Specifications
                      <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section className="py-24 px-6 bg-brand-light border-y border-slate-100">
          <div className="max-w-7xl mx-auto space-y-16">
            
            {/* Projects Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4 max-w-xl">
                <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Portfolio Highlights</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-blue tracking-tight">
                  Signature Infrastructure
                </h2>
              </div>
              <div>
                <Link 
                  href="/projects" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-brand-blue border border-slate-200 font-bold rounded-xl text-sm transition-all shadow-sm hover:shadow"
                >
                  View All Portfolio
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Projects Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {featuredProjects.map((project, idx) => {
                // Large layout for first project, smaller for others
                const isLarge = idx === 0;
                return (
                  <div 
                    key={project.id}
                    className={`group relative overflow-hidden rounded-3xl shadow-lg border border-black/5 bg-slate-900 ${
                      isLarge ? 'lg:col-span-7 h-[450px] sm:h-[520px]' : 'lg:col-span-5 h-[450px] sm:h-[520px]'
                    }`}
                  >
                    {/* Background Image */}
                    <Image
                      src={project.images[0] || 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=1200'}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-[1200ms] opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-95" />
                    
                    {/* Floating Info Tag */}
                    <div className="absolute top-6 left-6 z-20 flex gap-2">
                      <span className="px-3.5 py-1.5 bg-brand-gold text-brand-blue text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-md">
                        {project.category}
                      </span>
                      <span className="px-3.5 py-1.5 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-lg">
                        {project.status}
                      </span>
                    </div>

                    {/* Details Panel */}
                    <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10 space-y-4 z-20">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                        <MapPin size={12} className="text-brand-gold" />
                        <span>{project.location}</span>
                        <span className="text-slate-500 font-light">|</span>
                        <span>{project.year}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed line-clamp-2 max-w-xl">
                        {project.description}
                      </p>
                      
                      <div className="pt-2">
                        <Link 
                          href="/projects" 
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-brand-gold tracking-widest uppercase transition-colors"
                        >
                          View Gallery & Details
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}

              {featuredProjects.length === 0 && (
                <div className="col-span-12 text-center py-12 text-slate-500">
                  No featured projects are marked yet. Highlight portfolio items to show them here.
                </div>
              )}
            </div>

          </div>
        </section>

        {/* AWARDS */}
        <AwardsSlider />

        {/* TESTIMONIALS */}
        {testimonials.length > 0 && (
          <section className="py-24 px-6 bg-white overflow-hidden relative border-b border-slate-100">
            {/* Vector Decors */}
            <div className="absolute top-1/2 left-10 -translate-y-1/2 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-4xl mx-auto space-y-10 relative z-10 text-center">
              <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Testimonials</span>
              
              <div className="w-16 h-16 rounded-2xl bg-brand-light flex items-center justify-center mx-auto text-brand-gold shadow-sm border border-slate-100">
                <MessageSquare size={28} />
              </div>

              {/* Slider Content */}
              <div className="relative min-h-[180px] flex items-center justify-center px-4">
                {testimonials.map((test, index) => (
                  <div 
                    key={test.id}
                    className={`space-y-6 transition-all duration-500 absolute w-full ${
                      index === activeTestimonial 
                        ? 'opacity-100 scale-100 relative' 
                        : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    {/* Stars */}
                    <div className="flex justify-center gap-1">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-brand-gold text-brand-gold" />
                      ))}
                    </div>

                    <blockquote className="text-xl sm:text-2xl font-medium text-slate-700 leading-relaxed max-w-2xl mx-auto italic">
                      "{test.quote}"
                    </blockquote>

                    {test.image && (
                      <div className="relative mx-auto w-20 h-20 rounded-full overflow-hidden border-2 border-brand-gold/40 shadow-sm">
                        <Image src={test.image} alt={test.clientName} fill sizes="80px" className="object-cover" />
                      </div>
                    )}

                    {test.note && (
                      <p className="text-sm text-slate-500 max-w-xl mx-auto">{test.note}</p>
                    )}
                    
                    <div className="flex flex-col items-center">
                      <cite className="font-extrabold text-brand-blue not-italic text-base sm:text-lg">
                        {test.clientName}
                      </cite>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {test.companyName}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Controls */}
              {testimonials.length > 1 && (
                <div className="flex justify-center items-center gap-4 pt-6">
                  <button 
                    onClick={prevTestimonial}
                    className="w-11 h-11 border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-50 hover:border-brand-blue transition text-brand-blue"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-xs font-semibold text-slate-400">
                    {activeTestimonial + 1} / {testimonials.length}
                  </span>
                  <button 
                    onClick={nextTestimonial}
                    className="w-11 h-11 border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-50 hover:border-brand-blue transition text-brand-blue"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* CTA / CONTACT FORM */}
        <section className="py-24 px-6 bg-brand-light relative">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* CTA Left text */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Inquire Now</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-blue tracking-tight">
                  Ready to break ground?
                </h2>
              </div>
              
              <p className="text-slate-600 font-medium leading-relaxed">
                Consult with Sador General Construction's project estimation unit. Supply your parameters and scope details, and our civil estimation engineers will structure a comprehensive outline.
              </p>

              <div className="space-y-6 pt-4 border-t border-slate-200/50">
                <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-4 group w-fit">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-blue shadow-sm border border-slate-200 group-hover:bg-brand-blue group-hover:text-white transition">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Call Direct Line</h5>
                    <p className="text-slate-700 font-bold text-base sm:text-lg">{COMPANY.phone}</p>
                  </div>
                </a>

                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-4 group w-fit">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-blue shadow-sm border border-slate-200 group-hover:bg-brand-blue group-hover:text-white transition">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Corporate Email</h5>
                    <p className="text-slate-700 font-bold text-base">{COMPANY.email}</p>
                  </div>
                </a>
              </div>
            </div>

            {/* CTA Right Form Card */}
            <div className="lg:col-span-7 relative">
              {formSubmitted && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-100 flex flex-col items-center justify-center p-8 z-30 text-center animate-fade-in shadow-xl">
                  <div className="w-16 h-16 bg-brand-gold/15 text-brand-gold rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={36} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-brand-blue mb-2">Submission Received</h3>
                  <p className="text-sm text-slate-500 font-medium max-w-sm">
                    Thank you. Your request has been queued for review and our team will respond shortly.
                  </p>
                </div>
              )}

              <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100">
                <h4 className="text-xl font-bold text-brand-blue mb-6">Request Technical Assessment</h4>
                
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe" 
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:bg-white focus:ring-4 focus:ring-brand-gold/5 rounded-xl py-3.5 px-4 text-sm font-semibold text-slate-900 outline-none transition"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="email@company.com" 
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:bg-white focus:ring-4 focus:ring-brand-gold/5 rounded-xl py-3.5 px-4 text-sm font-semibold text-slate-900 outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Phone Number</label>
                      <input 
                        type="text" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+251 900 000 000" 
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:bg-white focus:ring-4 focus:ring-brand-gold/5 rounded-xl py-3.5 px-4 text-sm font-semibold text-slate-900 outline-none transition"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Project Class</label>
                      <select 
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:bg-white focus:ring-4 focus:ring-brand-gold/5 rounded-xl py-3.5 px-4 text-sm font-semibold text-slate-900 outline-none transition cursor-pointer"
                      >
                        <option value="Building">Building Construction</option>
                        <option value="Road">Road & Civil Works</option>
                        <option value="Infrastructure">Civil Infrastructure</option>
                        <option value="Other">Other Construction</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Scope Description</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Specify project location, estimated area, duration target, and special civil requirements..." 
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:bg-white focus:ring-4 focus:ring-brand-gold/5 rounded-xl py-3.5 px-4 text-sm font-semibold text-slate-900 outline-none transition resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-brand-blue hover:bg-brand-blue/90 border border-transparent font-bold text-white hover:text-brand-gold rounded-xl transition duration-300 shadow-md shadow-brand-blue/15 hover:shadow-brand-blue/30 active:scale-[0.99] outline-none"
                  >
                    Submit RFP Parameters
                  </button>
                </form>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}