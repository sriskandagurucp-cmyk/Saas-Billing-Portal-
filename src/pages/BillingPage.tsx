/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppState } from '../context/StateContext';
import {
  CreditCard,
  CheckCircle,
  HelpCircle,
  Shield,
  Briefcase,
  Layers,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

export const BillingPage: React.FC = () => {
  const {
    currentUser,
    plans,
    billingInterval,
    updateSubscription,
    addToast,
  } = useAppState();

  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 1337');
  const [expiry, setExpiry] = useState('12/29');
  const [nameOnCard, setNameOnCard] = useState(currentUser?.name || 'CONNOR BREWSTER');
  const [cvv, setCvv] = useState('***');

  const [savingCard, setSavingCard] = useState(false);

  // Active pricing details
  const activePlan = plans.find((p) => p.id === currentUser?.planId) || plans[0];
  const activePrice = billingInterval === 'monthly' ? activePlan.priceMonthly : Math.floor(activePlan.priceYearly/12);

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingCard(true);
    setTimeout(() => {
      setSavingCard(false);
      addToast('Card Settled Successfully', 'Modified primary card to visa credentials ending in 1337.', 'success');
    }, 1200);
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Page Title */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <CreditCard className="h-5.5 w-5.5 text-indigo-400" />
          <span>Billing Console & Card Setup</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Review active subscription cycles, configure credential credit cards, and test payment simulations inside our sandbox environment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left column: Sleek Credit Card design & Form */}
        <div className="lg:col-span-7 flex flex-col justify-between p-5 rounded-2xl border border-gray-800 bg-gray-950/40 backdrop-blur-md shadow-lg">
          <div>
            <span className="text-xs font-bold text-gray-200 uppercase tracking-widest pb-3.5 border-b border-gray-900 mb-6 block leading-none">
              Platform Payment Credentials
            </span>

            {/* Premium Card mockup */}
            <div className="relative overflow-hidden w-full max-w-sm mx-auto h-[160px] rounded-xl bg-gradient-to-br from-indigo-700 via-indigo-900 to-slate-950 border border-indigo-500/25 p-5 text-gray-100 flex flex-col justify-between shadow-xl mb-6">
              <div className="absolute top-0 right-0 -translate-y-6 translate-x-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm tracking-widest italic font-mono">skygrid.io</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-300">SANDBOX LICENSE</span>
              </div>

              <div className="text-base font-mono tracking-widest font-semibold py-1">
                {cardNumber}
              </div>

              <div className="flex items-center justify-between text-xs font-mono font-medium">
                <div>
                  <p className="text-[8px] text-indigo-300 uppercase leading-none mb-1">Holder</p>
                  <p className="truncate uppercase text-[10px]">{nameOnCard}</p>
                </div>
                <div>
                  <p className="text-[8px] text-indigo-300 uppercase leading-none mb-1">Expiry</p>
                  <p className="text-[10px]">{expiry}</p>
                </div>
              </div>
            </div>

            {/* Mock Visa Update form */}
            <form onSubmit={handleSaveCard} className="space-y-4 text-xs font-medium max-w-sm mx-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 leading-none">Card digits</label>
                  <input
                    type="text"
                    required
                    placeholder="4242 4242 4242 1337"
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-200 focus:outline-none"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 leading-none">Expiry Date</label>
                  <input
                    type="text"
                    required
                    placeholder="12/29"
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-200 focus:outline-none"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 leading-none">Holder Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Connor Brewster"
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-200 focus:outline-none"
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 leading-none">CVV Check</label>
                  <input
                    type="password"
                    required
                    placeholder="***"
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-200 focus:outline-none"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer transition-colors"
                disabled={savingCard}
              >
                {savingCard ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                <span>{savingCard ? 'Reconciling Token...' : 'Register Simulated Card'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right column: Current subscription overview */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-2xl border border-gray-800 bg-gray-950/40 backdrop-blur-md shadow-lg">
          <div>
            <span className="text-xs font-bold text-gray-200 uppercase tracking-widest pb-3.5 border-b border-gray-900 mb-4 block leading-none">
              Active Plan Summary
            </span>

            <div className="p-4 rounded-xl border border-gray-900 bg-gray-950 space-y-3.5 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-white pr-2">{activePlan.name} Tier Package</h4>
                  <p className="text-[10px] text-gray-500 mt-1">Automatic renewals in effect</p>
                </div>
                <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase leading-none bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 px-2 py-0.5 rounded-full">
                  Verified Active
                </span>
              </div>

              <div className="h-px bg-gray-900" />

              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Billed Volume Rate:</span>
                <span className="font-mono text-gray-200 font-semibold">${activePrice} / mo</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Cycle Interval:</span>
                <span className="font-mono text-gray-200 font-medium capitalize">{billingInterval} Sync</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Core Limitations:</span>
                <span className="text-gray-400 font-medium">None active</span>
              </div>
            </div>

            {/* List checklist advantages */}
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3 block leading-none">Included Features</p>
            <ul className="space-y-2 mb-6 text-xs text-gray-400">
              {activePlan.features.slice(0, 3).map((feat) => (
                <li key={feat} className="flex items-start gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center bg-gray-900/30 p-3 rounded-xl border border-gray-900 text-[10px] text-gray-500 leading-normal">
            <Shield className="h-4.5 w-4.5 text-indigo-400 shrink-0" />
            <span>Encrypted in compliance with standard TLS layer guidelines. All credentials stored securely in offline mock DB.</span>
          </div>
        </div>

      </div>

    </div>
  );
};
