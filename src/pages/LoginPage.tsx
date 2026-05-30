/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppState } from '../context/StateContext';
import { Shield, Mail, Lock, UserCheck, Sparkles, LogIn, ChevronRight, HelpCircle } from 'lucide-react';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const { logIn, navigateTo } = useAppState();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Admin');
  const [name, setName] = useState('');

  const [hoverPreset, setHoverPreset] = useState<string | null>(null);

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert('Please output a valid email address');
      return;
    }
    // Simulate simple signin flow
    logIn(email, selectedRole, name || undefined);
  };

  // Preset quick triggers
  const presets = [
    { name: 'Sarah Connor', email: 'sarah.c@skygrid.io', role: 'Admin' as UserRole, desc: 'Highest system settings clearances' },
    { name: 'Marcus Wright', email: 'marcus.w@skygrid.io', role: 'Finance' as UserRole, desc: 'Access receipt histories & payment logs' },
    { name: 'John Connor', email: 'john.c@skygrid.io', role: 'User' as UserRole, desc: 'Manage basic personal billing package' },
  ];

  const triggerPreset = (pr: typeof presets[0]) => {
    setEmail(pr.email);
    setPassword('•••••••••');
    setSelectedRole(pr.role);
    setName(pr.name);
    
    // Quick delay logIn
    setTimeout(() => {
      logIn(pr.email, pr.role, pr.name);
    }, 250);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-12 relative overflow-hidden font-sans">
      
      {/* Decorative radial gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-violet-600/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* Left column: Login Credentials form */}
        <div className="md:col-span-6 flex flex-col justify-center">
          <div className="p-8 rounded-2xl border border-gray-900 bg-gray-950/60 backdrop-blur-xl shadow-2xl shadow-indigo-500/5">
            
            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Shield className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="font-bold text-base text-white tracking-tight leading-none">skygrid.io Portal</span>
            </div>

            <h2 className="text-xl font-bold tracking-tight text-white mb-1.5">Welcome back</h2>
            <p className="text-xs text-gray-500 mb-6 font-normal">
              Input credential specs or select a preset to authorize sandbox privileges.
            </p>

            {/* Simulated Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5 leading-none">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. user@skygrid.io"
                    className="w-full pl-9 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-xs text-gray-200 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5 leading-none">Custom Profile Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-xl text-xs text-gray-200 placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5 leading-none">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-xs text-gray-200 placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* RBAC Selector during login */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5 leading-none">Security Access Role</label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-gray-900/80 border border-gray-800 rounded-lg">
                  {(['Admin', 'Finance', 'User'] as UserRole[]).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={`py-1 rounded-md text-[10px] font-bold transition-colors ${
                        selectedRole === role
                          ? role === 'Admin'
                            ? 'bg-indigo-600 text-white shadow'
                            : role === 'Finance'
                            ? 'bg-amber-600 text-white shadow'
                            : 'bg-emerald-600 text-white shadow'
                          : 'text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1.5">
                <button
                  type="button"
                  onClick={() => alert('Demo sandbox password is fully simulated! Use quick selection.')}
                  className="text-gray-500 hover:text-gray-400"
                >
                  Forgot system password?
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('/register')}
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  Sign up instead
                </button>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer transition-colors pt-3"
              >
                <LogIn className="h-4 w-4" />
                <span>Verify & Authorize Credentials</span>
              </button>
            </form>

          </div>
        </div>

        {/* Right column: Demo sandbox fast log in triggers */}
        <div className="md:col-span-6 flex flex-col justify-center">
          <div className="p-8 rounded-2xl border border-gray-900 bg-gray-950/40 backdrop-blur-md flex flex-col justify-between h-full relative overflow-hidden">
            
            <div className="absolute top-0 right-0 -translate-y-6 translate-x-6 w-32 h-32 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-[9px] text-amber-500 font-bold uppercase tracking-wider mb-4 leading-none select-none">
                <Sparkles className="h-3 w-3" /> Dedicated Evaluation Helper
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">Interactive RBAC Presets</h3>
              <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                Skip keyboard inputs: click any preset profile to instantly login as that specific clearance tier and preview restricted capabilities.
              </p>

              {/* Presets List */}
              <div className="space-y-3">
                {presets.map((pr) => {
                  const isHovered = hoverPreset === pr.name;
                  
                  return (
                    <button
                      key={pr.name}
                      type="button"
                      onMouseEnter={() => setHoverPreset(pr.name)}
                      onMouseLeave={() => setHoverPreset(null)}
                      onClick={() => triggerPreset(pr)}
                      className="w-full text-left p-3.5 rounded-xl border border-gray-850 bg-gray-900/30 hover:bg-gray-900 hover:border-indigo-500/40 transition-all flex items-center justify-between group"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="font-semibold text-xs text-gray-200 group-hover:text-indigo-400 transition-colors leading-none">
                            {pr.name}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono leading-none font-bold ${
                            pr.role === 'Admin'
                              ? 'bg-indigo-500/10 text-indigo-400'
                              : pr.role === 'Finance'
                              ? 'bg-amber-500/10 text-amber-400'
                              : 'bg-emerald-500/10 text-emerald-400'
                          }`}>
                            {pr.role}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-500 truncate leading-normal">{pr.desc}</p>
                      </div>

                      <div className="shrink-0 p-1.5 rounded-lg bg-gray-900 group-hover:bg-indigo-600 group-hover:-translate-x-1 transition-all">
                        <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-white" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Educational disclaimer */}
            <div className="mt-8 border-t border-gray-900/60 pt-4 flex items-start gap-2.5 text-[10px] text-gray-500 leading-normal">
              <HelpCircle className="h-4.5 w-4.5 text-gray-600 shrink-0 mt-0.5" />
              <span>
                To observe restricted views inside the workspace, simply switch user clearance structures using this interactive helper. Full security parameters are simulated.
              </span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
