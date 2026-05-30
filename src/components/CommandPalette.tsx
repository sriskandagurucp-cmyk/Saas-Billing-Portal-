/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShieldAlert, CreditCard, Landmark, ClipboardList, Settings, Sparkles, User, LogOut, ArrowRight, Zap } from 'lucide-react';
import { useAppState } from '../context/StateContext';
import { UserRole, CurrentRoute } from '../types';

export const CommandPalette: React.FC = () => {
  const {
    showCommandPalette,
    setShowCommandPalette,
    navigateTo,
    activeRole,
    setActiveRole,
    currentUser,
    logOut,
    plans,
    billingInterval,
    setBillingInterval,
    addToast,
  } = useAppState();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(!showCommandPalette);
      } else if (e.key === 'Escape') {
        setShowCommandPalette(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCommandPalette, setShowCommandPalette]);

  // Autofocus when visible
  useEffect(() => {
    if (showCommandPalette) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setSearchQuery('');
      setSelectedIndex(0);
    }
  }, [showCommandPalette]);

  // Handle outside hits
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowCommandPalette(false);
      }
    };
    if (showCommandPalette) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCommandPalette, setShowCommandPalette]);

  // Map searchable commands
  const commands = [
    // Navigation routes
    { id: 'nav_home', title: 'Go to Main Landing', category: 'Navigation', shortcut: '↵', action: () => navigateTo('/') },
    { id: 'nav_dash', title: 'Go to Personal Core Dashboard', category: 'Navigation', shortcut: 'G + D', action: () => navigateTo('/dashboard') },
    { id: 'nav_admin', title: 'Go to Admin Permissions Panel', category: 'Navigation', shortcut: 'G + A', action: () => navigateTo('/dashboard/admin'), adminOnly: true },
    { id: 'nav_finance', title: 'Go to Finance Ledger Board', category: 'Navigation', shortcut: 'G + F', action: () => navigateTo('/dashboard/finance'), financeOnly: true },
    { id: 'nav_bill', title: 'Go to Subscription Billing Console', category: 'Navigation', shortcut: 'G + B', action: () => navigateTo('/billing') },
    { id: 'nav_price', title: 'View Pricing Packages Comparison', category: 'Navigation', shortcut: 'G + P', action: () => navigateTo('/pricing') },
    { id: 'nav_inv', title: 'Check Invoices Directory', category: 'Navigation', shortcut: 'G + I', action: () => navigateTo('/invoices') },
    { id: 'nav_settings', title: 'Check Platform Profile Settings', category: 'Navigation', shortcut: 'G + S', action: () => navigateTo('/settings') },
    
    // Sandbox Role Swapping!
    { id: 'role_admin', title: 'Demo Switch Role to Administrator', category: 'Sandbox Security', shortcut: '⌘ + 1', action: () => setActiveRole('Admin') },
    { id: 'role_finance', title: 'Demo Switch Role to Finance Auditor', category: 'Sandbox Security', shortcut: '⌘ + 2', action: () => setActiveRole('Finance') },
    { id: 'role_user', title: 'Demo Switch Role to General Subscriber', category: 'Sandbox Security', shortcut: '⌘ + 3', action: () => setActiveRole('User') },
    
    // Utilities
    { id: 'toggle_bill', title: `Cycle Billing plan to ${billingInterval === 'monthly' ? 'Annual Yearly' : 'Monthly'}`, category: 'Configuration', shortcut: 'Tab', action: () => {
      setBillingInterval(billingInterval === 'monthly' ? 'yearly' : 'monthly');
      addToast('Billing Plan Changed', `Cycles shifted to ${billingInterval === 'monthly' ? 'yearly' : 'monthly'} rate index`, 'success');
    }},
    { id: 'user_logout', title: 'Simulate Logout Session', category: 'Account Settings', shortcut: '⇧ + L', action: () => logOut() },
  ];

  // Filters commands list
  const filteredCommands = commands.filter((cmd) => {
    // Check permissions
    if (cmd.adminOnly && activeRole !== 'Admin') return false;
    if (cmd.financeOnly && activeRole !== 'Finance' && activeRole !== 'Admin') return false;

    if (!searchQuery) return true;
    const normSearch = searchQuery.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(normSearch) ||
      cmd.category.toLowerCase().includes(normSearch)
    );
  });

  // Key navigation in palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        setShowCommandPalette(false);
      }
    }
  };

  if (!showCommandPalette) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowCommandPalette(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: -8 }}
        ref={containerRef}
        className="relative max-w-xl w-full rounded-2xl border border-gray-800 bg-gray-950/95 shadow-2xl overflow-hidden shadow-black ring-1 ring-white/10"
        onKeyDown={handleKeyDown}
      >
        {/* Glow Header Frame */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
          <Search className="h-5 w-5 text-gray-500" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or page (e.g. 'Admin', 'Invoices', 'Role')..."
            className="flex-1 min-w-0 bg-transparent py-1 text-sm text-gray-200 placeholder-gray-500 font-sans focus:outline-none"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded border border-gray-800 bg-gray-900 text-[10px] font-mono font-medium text-gray-500">
            ESC
          </span>
        </div>

        {/* Categories / Commands List */}
        <div className="max-h-[380px] overflow-y-auto p-2 scrollbar-thin">
          {filteredCommands.length > 0 ? (
            <div className="space-y-3">
              {/* Group commands by category */}
              {Array.from(new Set(filteredCommands.map((c) => c.category))).map((cat) => (
                <div key={cat} className="space-y-1">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 selection:bg-transparent">
                    {cat}
                  </div>
                  {filteredCommands
                    .filter((c) => c.category === cat)
                    .map((cmd) => {
                      const absoluteIndex = filteredCommands.findIndex((fc) => fc.id === cmd.id);
                      const isSelected = absoluteIndex === selectedIndex;
                      
                      return (
                        <button
                          key={cmd.id}
                          onClick={() => {
                            cmd.action();
                            setShowCommandPalette(false);
                          }}
                          className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-lg transition-all text-xs font-sans ${
                            isSelected
                              ? 'bg-indigo-600/90 text-white shadow-lg shadow-indigo-600/15'
                              : 'text-gray-400 hover:bg-gray-900 hover:text-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {cmd.category === 'Sandbox Security' && <ShieldAlert className="h-4 w-4 shrink-0 text-amber-400" />}
                            {cmd.category === 'Navigation' && <ArrowRight className="h-4 w-4 shrink-0 text-indigo-400" />}
                            {cmd.category === 'Configuration' && <Zap className="h-4 w-4 shrink-0 text-emerald-400" />}
                            {cmd.category === 'Account Settings' && <LogOut className="h-4 w-4 shrink-0 text-rose-400" />}
                            <span className="truncate">{cmd.title}</span>
                          </div>

                          <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded shrink-0 ${
                            isSelected ? 'bg-indigo-500 text-white' : 'bg-gray-900 border border-gray-800 text-gray-500'
                          }`}>
                            {cmd.shortcut}
                          </span>
                        </button>
                      );
                    })}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-gray-500">
              No parameters matched `<span className="font-mono text-gray-400">{searchQuery}</span>`.
            </div>
          )}
        </div>

        {/* Keyboard Helper Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-gray-800 bg-gray-950/70 text-[10px] text-gray-500">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Current Role Simulation:</span>
            <span className="font-semibold text-indigo-400 bg-indigo-500/10 px-1.5 rounded uppercase font-mono">
              {activeRole}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
