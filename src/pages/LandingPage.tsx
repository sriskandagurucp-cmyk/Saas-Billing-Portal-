/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAppState } from '../context/StateContext';
import {
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Terminal,
  Globe,
  Gauge,
  UserCheck,
  Cpu,
  CheckCircle,
  HelpCircle,
  Users,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigateTo, plans, billingInterval, setBillingInterval } = useAppState();

  const faqs = [
    { q: 'How does the RBAC sandbox simulation work?', a: 'You can immediately click the role switches at the top header to see the entire portal change its visualization dynamically. This shows the real-world application of user, finance, and administrator routing clearances.' },
    { q: 'Does this platform secure payment procedures?', a: 'All card processes are fully simulated in a safe sandbox layer. Upgrading packages immediately registers mock transaction entries in your Ledger and renders downloadable statements instantly.' },
    { q: 'Can I invite additional team coworkers?', a: 'Yes! Navigate directly into the Workspace Settings page to invite teammates, customize their clear permissions and observe dynamic user profiles update on-the-fly.' },
    { q: 'What database system backs this setup?', a: 'This is backed by React Context synchronization with standard browser localStorage. Any users added, logs audited, invoices compiled, or plans changed persist perfectly between browser reloads.' },
  ];

  const features = [
    { title: 'Granular RBAC Security', desc: 'Secure view clearances restricting administrators, auditors, and subscribers separately.', icon: ShieldAlert, color: 'text-indigo-400 border-indigo-500/10 bg-indigo-500/5' },
    { title: 'Interactive Ledgers', desc: 'Comprehensive billing records displaying status flags, download nodes, and transaction audits.', icon: Terminal, color: 'text-emerald-400 border-emerald-500/10 bg-emerald-500/5' },
    { title: 'Micro-Target Analytics', desc: 'Slick responsive SVG graphs, statistics trends, and interactive area tracking overlays.', icon: Gauge, color: 'text-violet-400 border-violet-500/10 bg-violet-500/5' },
    { title: 'Workspace Provisioning', desc: 'Real-time team directory setup, profile filters, invitations management, and seat removals.', icon: Users, color: 'text-amber-400 border-amber-500/10 bg-amber-500/5' },
    { title: 'Global Multi-Region Sync', desc: 'Automatic global caching structures, microsecond calculations, and automated statements.', icon: Globe, color: 'text-teal-400 border-teal-500/10 bg-teal-500/5' },
    { title: 'Demarcated Sandbox', desc: 'Instant demo buttons in the header allowing auditors to verify code flow without logging out.', icon: UserCheck, color: 'text-rose-400 border-rose-500/10 bg-rose-500/5' },
  ];

  const testimonials = [
    { quote: "The role switching capability on SkyGrid allowed us to audit our entire team's access profiles within minutes. The financial statements system is clean, intuitive and beautiful.", auth: "Marcus Wright", title: "Chief Auditor at Cyberdyne" },
    { quote: "Having access to printable, custom generated invoices without external heavier APIs is a breath of fresh air. The interface is remarkably responsive.", auth: "Sarah Connor", title: "Executive at SkyNet Networks" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 selection:bg-indigo-600 selection:text-white" id="landing-page-full">
      
      {/* Immersive Glowing Accented Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[150px] left-1/3 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute -top-[100px] right-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-16 text-center md:pt-32 md:pb-24">
        
        {/* Sparkles pill banner */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-xs text-indigo-400 font-semibold mb-6 shadow-inner tracking-tight">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Complete Sandbox Infrastructure Active</span>
        </div>

        {/* Catchy headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          The Role-Based <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-indigo-200 to-violet-500">
            SaaS Billing Console
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl mx-auto text-sm sm:text-base text-gray-400 mb-8 leading-relaxed">
          Unlock granular workspace management, payment ledger auditing, and live subscription toggles. Simulate Admin, Finance, and User permissions immediately.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={() => navigateTo('/login')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/20 transition-all cursor-pointer text-sm"
          >
            <span>Launch Billing Board</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => {
              const el = document.getElementById('pricing-grid-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-800 hover:border-gray-700 bg-gray-900/40 text-gray-300 hover:text-white transition-all cursor-pointer text-sm"
          >
            Check Plan Matrices
          </button>
        </div>

      </section>

      {/* Grid of Custom App Mockup Elements */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-2.5 backdrop-blur-xl shadow-2xl shadow-black/90">
          <div className="rounded-xl border border-gray-800 bg-gray-950 p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-gray-900 mb-6">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-gray-500 font-mono ml-2 leading-none">skygrid_system_core_ui.app</span>
              </div>
              <span className="px-2 py-0.5 rounded border border-indigo-500/20 bg-indigo-500/5 text-[9px] font-mono font-bold text-indigo-400 uppercase">
                Active State Ledger
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-gray-900 bg-gray-950/60 font-sans">
                <p className="text-[10px] font-bold uppercase text-gray-500">MRR Forecast</p>
                <p className="text-xl font-bold text-white font-mono mt-2">$64,800.00</p>
                <div className="h-1 bg-indigo-500 w-2/3 rounded-full mt-3" />
              </div>
              <div className="p-4 rounded-xl border border-gray-900 bg-gray-950/60 font-sans">
                <p className="text-[10px] font-bold uppercase text-gray-500">Security Access Policy</p>
                <p className="text-xl font-bold text-emerald-400 font-mono mt-2">RBAC ACTIVE</p>
                <div className="h-1 bg-emerald-500 w-1/2 rounded-full mt-3" />
              </div>
              <div className="p-4 rounded-xl border border-gray-900 bg-gray-950/60 font-sans">
                <p className="text-[10px] font-bold uppercase text-gray-500">SSL Ledger System</p>
                <p className="text-xl font-bold text-indigo-300 font-mono mt-2">SSL SECURE</p>
                <div className="h-1 bg-indigo-300 w-4/5 rounded-full mt-3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">Designed for modern teams</h2>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            Everything you need block-by-block to control permissions and manage subscriptions under a modular framework.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="p-5 rounded-xl border border-gray-800/80 bg-gray-950/40 shadow hover:border-gray-700 hover:bg-gray-900/20 transition-all group"
            >
              <div className={`h-9 w-9 rounded-lg flex items-center justify-center border ${feat.color} mb-3 transition-transform group-hover:scale-105`}>
                <feat.icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-gray-100 group-hover:text-indigo-400 transition-colors mb-1.5">{feat.title}</h3>
              <p className="text-xs text-gray-500 leading-normal">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing comparison Table section */}
      <section id="pricing-grid-section" className="relative z-10 max-w-5xl mx-auto px-6 py-16 border-t border-gray-900">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">Clear, proportional pricing</h2>
          <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
            Pick a tier and update subscription layouts instantly. Toggle yearly to save over 20%.
          </p>

          {/* Monthly/Yearly Toggle bar */}
          <div className="inline-flex items-center gap-1 p-1 bg-gray-900/60 border border-gray-800 rounded-lg">
            <button
              onClick={() => setBillingInterval('monthly')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                billingInterval === 'monthly' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingInterval('yearly')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                billingInterval === 'yearly' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Annual Billing (Save 20%)
            </button>
          </div>
        </div>

        {/* Plans Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => {
            const price = billingInterval === 'monthly' ? plan.priceMonthly : Math.floor(plan.priceYearly / 12);
            
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between p-6 rounded-2xl border bg-gray-950 shadow-lg ${
                  plan.recommended
                    ? 'border-indigo-500 ring-1 ring-indigo-500/20'
                    : 'border-gray-850'
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-indigo-600 border border-indigo-400 text-white text-[9px] font-bold uppercase tracking-wider">
                    Recommended Package
                  </span>
                )}

                <div>
                  <h3 className="text-base font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-4 mb-2">
                    <span className="text-3xl font-bold text-white font-mono">${price}</span>
                    <span className="text-xs text-gray-500">/ mo</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mb-6 font-medium">
                    {billingInterval === 'yearly' ? `Billed annually ($${plan.priceYearly}/yr)` : 'Billed monthly on cycle'}
                  </p>

                  <div className="h-px bg-gray-900 mb-6" />

                  {/* Feature listing */}
                  <ul className="space-y-3.5 mb-8 text-xs text-gray-400">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                    {plan.limitations.map((lim) => (
                      <li key={lim} className="flex items-start gap-2.5 text-gray-600">
                        <CheckCircle className="h-4 w-4 text-gray-800 shrink-0 mt-0.5" />
                        <span className="line-through">{lim}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => navigateTo('/login')}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    plan.recommended
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white border border-transparent shadow-lg shadow-indigo-600/10'
                      : 'border border-gray-800 hover:border-gray-700 hover:bg-gray-900 text-gray-300 hover:text-white'
                  }`}
                >
                  Start {plan.name} Trial
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Customer Testimonials section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-12 border-t border-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((test, index) => (
            <div key={index} className="p-6 rounded-xl border border-gray-900 bg-gray-900/10 font-sans">
              <p className="text-sm italic text-gray-300 leading-relaxed">"{test.quote}"</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold leading-none">
                  {test.auth.substring(0,2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white pr-2">{test.auth}</h4>
                  <p className="text-[10px] text-gray-500">{test.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs collapse section */}
      <section className="relative z-10 max-w-2xl mx-auto px-6 py-16 border-t border-gray-900">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">Answers directly</h2>
          <p className="text-xs text-gray-500">Frequently pondered platform details regarding billing, integrations and sandboxing.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-4 rounded-xl border border-gray-900 bg-gray-900/20 font-sans">
              <h4 className="text-xs font-bold text-gray-200 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>{faq.q}</span>
              </h4>
              <p className="mt-2 text-xs text-gray-500 leading-relaxed font-normal pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Branding footer */}
      <footer className="relative z-10 max-w-5xl mx-auto px-6 py-12 text-center border-t border-gray-900 text-xs text-gray-500">
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="h-6 w-6 rounded bg-indigo-600 flex items-center justify-center">
            <Cpu className="h-3 w-3 text-white" />
          </div>
          <span className="font-bold text-sm text-gray-300 tracking-tight leading-none">skygrid.io</span>
        </div>
        <p className="leading-relaxed">© 2026 SkyGrid Solutions Corp. Built in complete compliance with cryptographic standards for billing management.</p>
        <div className="mt-4 flex justify-center gap-4 text-[10px] text-gray-600">
          <span>Simulation Mode Authorized</span>
          <span>•</span>
          <span>Terms of Clearance</span>
          <span>•</span>
          <span>Database Sandbox Layer</span>
        </div>
      </footer>

    </div>
  );
};
