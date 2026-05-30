/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAppState } from '../context/StateContext';
import { Check, Info, Sparkles, HelpCircle } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const {
    plans,
    currentUser,
    updateSubscription,
    billingInterval,
    setBillingInterval,
  } = useAppState();

  const handlePlanSelection = (planId: string) => {
    updateSubscription(planId);
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header section */}
      <div className="text-center max-w-lg mx-auto py-4">
        <h2 className="text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
          <Sparkles className="h-5.5 w-5.5 text-indigo-400" />
          <span>Flexible Workspace Packages</span>
        </h2>
        <p className="text-xs text-gray-400 mt-2 leading-relaxed">
          Upgrade or downgrade your active licensing setups instantly inside the sandbox. Try changing billing cycles to view annual discount adjustments.
        </p>

        {/* Dynamic Billing Cycle Switcher */}
        <div className="inline-flex items-center gap-1 p-1 bg-gray-900/60 border border-gray-800 rounded-lg mt-6">
          <button
            onClick={() => setBillingInterval('monthly')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              billingInterval === 'monthly' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Monthly Tiers
          </button>
          <button
            onClick={() => setBillingInterval('yearly')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              billingInterval === 'yearly' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Annual (Save 20%)
          </button>
        </div>
      </div>

      {/* Grid of pricing plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pt-2">
        {plans.map((p) => {
          const isActive = currentUser?.planId === p.id;
          const price = billingInterval === 'monthly' ? p.priceMonthly : Math.floor(p.priceYearly / 12);
          
          return (
            <div
              key={p.id}
              className={`relative flex flex-col justify-between p-6 rounded-2xl border bg-gray-950/40 backdrop-blur-md ${
                isActive
                  ? 'border-indigo-500 shadow-xl shadow-indigo-600/5 ring-1 ring-indigo-500/25'
                  : 'border-gray-850 hovering:border-gray-800'
              }`}
            >
              {/* Active ribbon */}
              {isActive && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-indigo-600 border border-indigo-400 text-white text-[9px] font-bold uppercase tracking-wider shadow">
                  Currently Active Tiers
                </span>
              )}

              {/* Recommended ribbons */}
              {!isActive && p.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-gray-900 border border-gray-800 text-indigo-400 text-[9px] font-bold uppercase tracking-wider">
                  Highly Preferred
                </span>
              )}

              <div>
                <h3 className="text-sm font-bold text-white mb-1.5">{p.name} Package</h3>
                
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-3xl font-extrabold text-white font-mono">${price}</span>
                  <span className="text-xs text-gray-500">/ mo</span>
                </div>
                <p className="text-[10px] text-gray-500 mt-1 leading-none font-medium">
                  {billingInterval === 'yearly' ? `Billed annually ($${p.priceYearly}/yr)` : 'Renews monthly'}
                </p>

                <div className="h-px bg-gray-900 my-6" />

                {/* Features columns list */}
                <ul className="space-y-3">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs text-gray-400">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                  {p.limitations.map((lim) => (
                    <li key={lim} className="flex items-start gap-2 text-xs text-gray-600">
                      <Check className="h-4 w-4 text-gray-800 shrink-0 mt-0.5" />
                      <span className="line-through">{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Purchase button triggers */}
              <button
                onClick={() => handlePlanSelection(p.id)}
                disabled={isActive}
                className={`w-full py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all mt-8 ${
                  isActive
                    ? 'border border-gray-800 bg-gray-900 text-indigo-400/80 cursor-default uppercase font-bold text-[10px]'
                    : p.recommended
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow shadow-indigo-500/10'
                    : 'border border-gray-800 hover:border-gray-700 hover:bg-gray-900 text-gray-300 hover:text-white'
                }`}
              >
                {isActive ? 'Account Synchronized' : `Switch to ${p.name}`}
              </button>
            </div>
          );
        })}
      </div>

      {/* Disclaimers & Info notes */}
      <div className="p-4 rounded-xl border border-gray-900 bg-gray-950/20 text-xs flex items-start gap-2.5">
        <Info className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
        <p className="text-gray-500 leading-normal">
          <strong>Evaluation Sandbox Rules:</strong> Upgrading or downgrading plans instantly alters user profile contexts in our database, registers a matching audit log entry, and issues dynamic transaction drafts. No monetary operations are executed.
        </p>
      </div>

    </div>
  );
};
