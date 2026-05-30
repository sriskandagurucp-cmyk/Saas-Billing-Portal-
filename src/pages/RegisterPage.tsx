/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppState } from '../context/StateContext';
import { Shield, Mail, Lock, Sparkles, UserCheck, CreditCard, ChevronRight } from 'lucide-react';
import { UserRole } from '../types';

export const RegisterPage: React.FC = () => {
  const { logIn, plans, navigateTo } = useAppState();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('User');
  const [selectedPlan, setSelectedPlan] = useState('plan_pro');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please fill out custom name and email addresses.');
      return;
    }
    // Instant login as newly registered profile
    logIn(email, selectedRole, name);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-12 relative overflow-hidden font-sans">
      
      {/* Glow ambient design */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="w-full max-w-xl">
        <div className="p-8 rounded-2xl border border-gray-900 bg-gray-950/60 backdrop-blur-xl shadow-2xl relative">
          
          {/* Logo */}
          <button onClick={() => navigateTo('/')} className="flex items-center gap-2 mb-6 cursor-pointer text-left">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center">
              <Shield className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="font-bold text-base text-white tracking-tight leading-none">skygrid.io</span>
          </button>

          <h2 className="text-xl font-bold tracking-tight text-white mb-1">Create sandbox account</h2>
          <p className="text-xs text-gray-400 mb-6">Set up credentials to evaluate subscriber, admin, or auditor access pipelines.</p>

          <form onSubmit={handleRegister} className="space-y-4 text-xs font-medium">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1 leading-none">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Connor Brewster"
                  className="w-full px-3.5 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-gray-200 placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1 leading-none">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. connor@skygrid.io"
                  className="w-full px-3.5 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-gray-200 placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1 leading-none">Security Privilege</label>
                <select
                  className="w-full px-3.5 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-gray-300 focus:border-indigo-500 focus:outline-none"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                >
                  <option value="User">General Subscriber (User)</option>
                  <option value="Finance">Finance Auditor (Finance)</option>
                  <option value="Admin">System Administrator (Admin)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1 leading-none">Initial Plan Package</label>
                <select
                  className="w-full px-3.5 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-gray-300 focus:border-indigo-500 focus:outline-none"
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                >
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} - ${p.priceMonthly}/mo
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1 leading-none">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-gray-200 placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold cursor-pointer transition-colors mt-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>Configure Account & Connect</span>
            </button>
          </form>

          <div className="h-px bg-gray-900 my-6" />

          <div className="text-center">
            <button
              onClick={() => navigateTo('/login')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Already registered? <span className="text-indigo-400 font-semibold">Sign in here</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
