"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, Building2, Calendar, CheckCircle2, Shield, Target } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingCallButton } from '@/components/layout/FloatingCallButton';
import { COMPANY } from '@/lib/constants';

const coreValues = [
  {
    title: 'Safety First',
    description: 'We enforce strict site safety standards, training, and supervision on every project.'
  },
  {
    title: 'Accountability',
    description: 'We manage resources transparently and provide clear reporting throughout delivery.'
  },
  {
    title: 'Diligence',
    description: 'We execute each task carefully with close attention to detail and quality.'
  },
  {
    title: 'Operational Excellence',
    description: 'We optimize workflows to reduce waste, delay, and avoidable rework.'
  },
  {
    title: 'Reliability',
    description: 'We deliver consistently and stand behind the work we complete.'
  }
];

const milestones = [
  { year: '2012 E.C.', title: 'Company Founded', desc: 'Established to provide small-, medium-, and large-scale general civil construction works.' },
  { year: '2017', title: 'Infrastructure Expansion', desc: 'Expanded into highway, drainage, and urban development delivery.' },
  { year: '2030', title: 'Vision Target', desc: 'Aiming to become the most reliable construction partner in the market.' }
];

export default function AboutClient({ seoSettings, heroImageSrc, teamImageSrc }: any) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = `About Us | ${seoSettings?.title || COMPANY.name}`;
    }
  }, [seoSettings?.title]);

  return (
    <>
      <Navbar />
      <FloatingCallButton />

      <main className="flex-grow pt-28">
        <section className="relative overflow-hidden bg-slate-950 text-white px-6 py-24">
          <div className="absolute inset-0 bg-brand-blue/90" />
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.35),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
          {heroImageSrc ? (
            <div className="absolute inset-0">
              <Image
                src={heroImageSrc}
                alt="About Sador hero"
                fill
                priority
                sizes="100vw"
                className="object-cover opacity-25"
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,41,66,0.96),rgba(15,41,66,0.84))]" />
          )}

          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,41,66,0.92),rgba(15,41,66,0.78))] flex items-end justify-end overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.18),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.12),transparent_20%),radial-gradient(circle_at_55%_75%,rgba(212,175,55,0.1),transparent_24%)]" />
              <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex justify-end pb-6 sm:pb-10">
                <div className="rounded-3xl border border-white/10 bg-white/8 backdrop-blur-md px-5 py-4 text-right shadow-lg max-w-sm">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand-gold">Hero Image Needed</p>
                  <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                    Add a local image such as <span className="font-semibold text-white">/public/company/about-hero.jpg</span> and pass it into <span className="font-semibold text-white">AboutClient</span>.
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-brand-gold backdrop-blur-md">
                About Sador
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Building durable infrastructure with discipline, safety, and precision.
              </h1>
              <p className="max-w-3xl text-base font-medium leading-relaxed text-slate-300 sm:text-lg">
                Sador General Construction is a general contractor focused on delivering reliable,
                high-quality construction services across Ethiopia.
              </p>

              <div className="flex flex-col gap-3 pt-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-7 py-4 font-bold text-brand-blue transition-all duration-300 hover:bg-brand-gold/90 hover:-translate-y-0.5"
                >
                  Contact Us
                  <ArrowRight size={18} />
                </Link>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/15"
                >
                  Call {COMPANY.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12 lg:items-start">
            <div className="space-y-8 lg:col-span-7">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-brand-gold">Company Overview</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl">
                  A contractor built on reliability and integrity.
                </h2>
                <p className="max-w-3xl text-base font-medium leading-relaxed text-slate-600">
                  We approach every project as a long-term responsibility, not just a short-term contract. Whether the
                  work involves residential buildings, commercial spaces, or public infrastructure, our goal is to
                  deliver durable results that reflect professionalism and precision.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-100 bg-brand-light p-6 shadow-sm">
                  <Building2 className="mb-4 h-6 w-6 text-brand-gold" />
                  <h3 className="text-lg font-bold text-brand-blue">Identity</h3>
                  <ul className="mt-4 space-y-2 text-sm font-semibold text-slate-600">
                    <li>Established: 2012 E.C.</li>
                    <li>Founder and General Manager: Eng. Tinsae Fikadu</li>
                    <li>Focus: Small-, medium-, and large-scale civil construction</li>
                  </ul>
                </div>

                <div className="rounded-3xl border border-slate-100 bg-brand-light p-6 shadow-sm">
                  <Target className="mb-4 h-6 w-6 text-brand-gold" />
                  <h3 className="text-lg font-bold text-brand-blue">Mission</h3>
                  <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-600">
                    Deliver high-quality construction services through proper resource management and skilled
                    craftsmanship, completing projects on time and within budget.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-100 bg-brand-light p-6 shadow-sm">
                  <Award className="mb-4 h-6 w-6 text-brand-gold" />
                  <h3 className="text-lg font-bold text-brand-blue">Vision</h3>
                  <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-600">
                    Become the most reliable construction partner in the industry by 2030, known for quality, schedule
                    discipline, and safety.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-100 bg-brand-light p-6 shadow-sm">
                  <Shield className="mb-4 h-6 w-6 text-brand-gold" />
                  <h3 className="text-lg font-bold text-brand-blue">Positioning</h3>
                  <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-600">
                    A reliable partner for quality-driven delivery across buildings, roads, and public infrastructure.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8 lg:col-span-5">
              <div className="rounded-[2rem] bg-brand-blue p-8 text-white shadow-[0_24px_60px_rgba(10,36,66,0.18)]">
                <div className="flex items-center gap-3 border-b border-white/10 pb-5">
                  <Calendar className="h-5 w-5 text-brand-gold" />
                  <h3 className="text-xl font-bold">Delivery Principles</h3>
                </div>
                <div className="mt-6 space-y-5">
                  {coreValues.map((value) => (
                    <div key={value.title} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
                      <div>
                        <h4 className="text-sm font-bold">{value.title}</h4>
                        <p className="text-xs leading-relaxed text-slate-300">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-bold text-brand-blue">Why Clients Choose Us</h3>
                <ul className="mt-5 space-y-3 text-sm font-semibold text-slate-600">
                  <li>Strong accountability culture</li>
                  <li>Proven reliability in project execution</li>
                  <li>Organized resource control systems</li>
                  <li>Skilled workforce with practical experience</li>
                  <li>Commitment to on-time delivery and quality workmanship</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-24">
          <div className="mx-auto max-w-7xl space-y-14">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
              <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 lg:col-span-7 min-h-[320px] lg:min-h-[420px]">
                {teamImageSrc ? (
                  <Image
                    src={teamImageSrc}
                    alt="Our Team"
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover opacity-90"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-blue via-slate-900 to-slate-800 px-8 text-center">
                    <div className="max-w-md space-y-4">
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-gold">Your Image Here</p>
                      <h4 className="text-2xl font-extrabold text-white">Add your team photo or site image</h4>
                      <p className="text-sm leading-relaxed text-slate-300">
                        Supply a local file path such as <span className="font-semibold text-white">/company/team.jpg</span> or pass an image URL into `AboutClient`.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-[2rem] border border-slate-100 bg-brand-blue p-8 text-white shadow-sm lg:col-span-5">
                <h3 className="text-2xl font-extrabold">Project delivery discipline</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  Our work is organized around a clear sequence of initiation, planning, execution, monitoring, and
                  handover. That structure keeps teams aligned and helps clients understand progress at every stage.
                </p>
                <div className="mt-8 space-y-4 border-t border-white/10 pt-6 text-sm font-semibold text-slate-200">
                  <p>• Structured planning and resource alignment</p>
                  <p>• Quality control and site supervision</p>
                  <p>• Transparent reporting and client communication</p>
                  <p>• Final completion and handover discipline</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-brand-light px-6 py-24">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-brand-blue p-8 text-white shadow-[0_24px_70px_rgba(10,36,66,0.18)] sm:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-brand-gold">Contact</span>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Work with a contractor that values precision.</h2>
                <p className="max-w-3xl text-sm font-medium leading-relaxed text-slate-300">
                  Ready to discuss a building, road, or infrastructure project? Reach out to the Sador team for a
                  direct conversation about scope, schedule, and delivery.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="inline-flex items-center justify-center rounded-xl bg-brand-gold px-5 py-3.5 font-bold text-brand-blue transition-all duration-300 hover:bg-brand-gold/90"
                >
                  Call Now
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-5 py-3.5 font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/15"
                >
                  Contact Page
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
