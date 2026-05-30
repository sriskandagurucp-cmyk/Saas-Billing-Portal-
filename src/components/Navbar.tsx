/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useAppState } from '../context/StateContext';
import {
  Sparkles,
  Search,
  Bell,
  User as UserIcon,
  Shield,
  LogOut,
  Sliders,
  Menu,
  ChevronDown,
} from 'lucide-react';
import { UserRole, CurrentRoute } from '../types';

export const Navbar: React.FC<{ onMobileMenuToggle?: () => void }> = ({ onMobileMenuToggle }) => {
  const {
    currentUser,
    logOut,
    activeRole,
    setActiveRole,
    setShowCommandPalette,
    navigateTo,
    activityLogs,
  } = useAppState();

  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const notifyRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Notifications simulations
  const recentNotifications = [
    { id: '1', title: 'Ledger Reconciled', desc: 'Marcus consolidated invoices for Q2', time: '10m ago', unread: true },
    { id: '2', title: 'License Tier Upgraded', desc: 'Sarah.C transitioned to Enterprise', time: '5h ago', unread: false },
    { id: '3', title: 'Failed payment retry', desc: 'Attempt failed for account Miles.D', time: '1d ago', unread: false },
  ];

  // Outside clicks handler
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (notifyRef.current && !notifyRef.current.contains(target)) {
        setShowNotificationMenu(false);
      }
      if (profileRef.current && !profileRef.current.contains(target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-800/80 bg-gray-950/75 backdrop-blur-xl supports-backdrop-filter:bg-gray-950/60 transition-all">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Left Side: Dynamic Mobile Menu / Branding */}
        <div className="flex items-center gap-4">
          {onMobileMenuToggle && (
            <button
              onClick={onMobileMenuToggle}
              className="p-1.5 rounded-lg border border-gray-800 bg-gray-900/40 text-gray-400 hover:text-white lg:hidden"
              aria-label="Toggle Navigation Drawer"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          <button
            onClick={() => navigateTo('/')}
            className="flex items-center gap-2 text-left group cursor-pointer selection:bg-transparent"
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-500/10 group-hover:scale-105 transition-all">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-sm text-gray-100 tracking-tight leading-none">skygrid.io</h1>
              <p className="text-[10px] text-gray-500 leading-none mt-1">SaaS billing platform</p>
            </div>
          </button>
        </div>

        {/* Middle: Interactive Smart Command Palette search bar */}
        <div className="hidden md:block max-w-sm w-full mx-4">
          <button
            onClick={() => setShowCommandPalette(true)}
            className="w-full inline-flex items-center gap-3 px-3.5 py-1.5 rounded-lg border border-gray-800/80 bg-gray-900/40 text-gray-500 hover:text-gray-400 text-xs font-sans text-left transition-all hover:border-gray-700/80 hover:bg-gray-900/60"
          >
            <Search className="h-4 w-4" />
            <span className="flex-1">Search command panel...</span>
            <span className="px-1.5 py-0.5 rounded border border-gray-800 bg-gray-950 text-[10px] font-mono leading-none">
              ⌘K
            </span>
          </button>
        </div>

        {/* Right Side: Demo RBAC role pill + User Info */}
        <div className="flex items-center gap-3">
          
          {/* CRITICAL Sandbox Role Switcher Widget */}
          <div className="flex items-center gap-1 bg-gray-900/85 border border-gray-800 rounded-full px-1.5 py-1">
            <span className="hidden xl:inline-block text-[9px] text-gray-500 uppercase tracking-widest font-bold ml-1.5 mr-1 selection:bg-transparent">
              Sandbox Role:
            </span>
            <div className="flex gap-0.5">
              {(['Admin', 'Finance', 'User'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                    activeRole === role
                      ? role === 'Admin'
                        ? 'bg-indigo-600 text-white shadow shadow-indigo-600/20'
                        : role === 'Finance'
                        ? 'bg-amber-600 text-white shadow shadow-amber-600/20'
                        : 'bg-emerald-600 text-white shadow shadow-emerald-500/20'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-850/60'
                  }`}
                  title={`Sandbox demo role-shift clearance mapping to: ${role}`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Trigger Command Palette for Mobile */}
          <button
            onClick={() => setShowCommandPalette(true)}
            className="p-1.5 md:hidden text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition-colors border border-transparent hover:border-gray-800"
          >
            <Search className="h-4.5 w-4.5" />
          </button>

          {/* Notifications Dropdown Drawer */}
          <div className="relative" ref={notifyRef}>
            <button
              onClick={() => setShowNotificationMenu(!showNotificationMenu)}
              className="relative p-1.5 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition-colors border border-gray-800 bg-gray-900/20 cursor-pointer"
            >
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-indigo-500 rounded-full" />
            </button>

            {showNotificationMenu && (
              <div className="absolute right-0 mt-2.5 max-w-xs w-[280px] p-1 rounded-xl border border-gray-800 bg-gray-950/95 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-white/10">
                <div className="px-3.5 py-2 border-b border-gray-800 flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <span>Dynamic Notifications</span>
                  <Sliders className="h-3 w-3" />
                </div>
                <div className="divide-y divide-gray-900 max-h-[220px] overflow-y-auto">
                  {recentNotifications.map((n) => (
                    <div key={n.id} className="p-3 hover:bg-gray-900/30 transition-colors text-xs flex gap-2">
                      <div className="shrink-0 pt-0.5">
                        <span className={`h-2 w-2 rounded-full block ${n.unread ? 'bg-indigo-400' : 'bg-transparent'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-200 truncate">{n.title}</p>
                        <p className="text-[10px] text-gray-400 leading-normal mt-0.5">{n.desc}</p>
                        <span className="text-[9px] text-gray-500 mt-1 block font-mono">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-1.5 border-t border-gray-800 text-center">
                  <button
                    onClick={() => {
                      navigateTo('/dashboard');
                      setShowNotificationMenu(false);
                    }}
                    className="w-full py-1 text-[10px] font-semibold text-indigo-400 hover:text-indigo-300 hover:bg-gray-900 rounded-md transition-colors"
                  >
                    View All Platform Activity
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Action Overlay Drawer */}
          {currentUser ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-1.5 p-1 rounded-full hover:bg-gray-900/80 transition-colors border border-transparent hover:border-gray-800 cursor-pointer"
              >
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="h-7 w-7 rounded-full object-cover border border-indigo-500/20"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="h-7 w-7 rounded-full bg-indigo-600 text-white text-xs font-bold font-mono flex items-center justify-center">
                    {currentUser.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
                <ChevronDown className="h-3.5 w-3.5 text-gray-500 hidden sm:block" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2.5 max-w-xs w-[220px] p-1.5 rounded-xl border border-gray-800 bg-gray-950/95 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-white/10">
                  <div className="p-2.5 border-b border-gray-850">
                    <p className="text-xs font-bold text-gray-200 truncate">{currentUser.name}</p>
                    <p className="text-[10px] text-gray-400 truncate mt-0.5 font-mono">{currentUser.email}</p>
                    
                    <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase leading-none bg-indigo-500/10 text-indigo-400 border border-indigo-500/15">
                      <Shield className="h-3 w-3" />
                      {currentUser.role} Clear
                    </span>
                  </div>

                  <div className="mt-1.5">
                    <button
                      onClick={() => {
                        navigateTo('/dashboard');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
                    >
                      <UserIcon className="h-4 w-4" />
                      <span>Console Overview</span>
                    </button>
                    <button
                      onClick={() => {
                        navigateTo('/settings');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
                    >
                      <Sliders className="h-4 w-4" />
                      <span>Workspace Setting</span>
                    </button>
                    <div className="h-px bg-gray-850 my-1.5" />
                    <button
                      onClick={() => {
                        logOut();
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Disconnect Session</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigateTo('/login')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium cursor-pointer transition-colors"
            >
              Sign In
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
