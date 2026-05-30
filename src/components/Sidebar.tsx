/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAppState } from '../context/StateContext';
import {
  LayoutDashboard,
  Users,
  BadgeDollarSign,
  Receipt,
  Settings,
  ShieldCheck,
  CreditCard,
  Database,
  Briefcase,
  ExternalLink,
  ChevronLeft,
  X,
  Lock,
} from 'lucide-react';
import { CurrentRoute } from '../types';

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onMobileClose }) => {
  const { currentRoute, navigateTo, activeRole } = useAppState();

  const handleRouteClick = (path: CurrentRoute) => {
    navigateTo(path);
    if (mobileOpen) {
      onMobileClose();
    }
  };

  // Nav item design template
  interface NavItem {
    label: string;
    path: CurrentRoute;
    icon: React.ComponentType<any>;
    clearance: 'All' | 'Finance' | 'Admin';
  }

  const items: NavItem[] = [
    { label: 'Welcome Portal', path: '/', icon: Briefcase, clearance: 'All' },
    { label: 'Console Overview', path: '/dashboard', icon: LayoutDashboard, clearance: 'All' },
    { label: 'Authorization Center', path: '/dashboard/admin', icon: Users, clearance: 'Admin' },
    { label: 'Financial Ledger', path: '/dashboard/finance', icon: BadgeDollarSign, clearance: 'Finance' },
    { label: 'Upgrade Options', path: '/pricing', icon: ShieldCheck, clearance: 'All' },
    { label: 'Simulated Billing', path: '/billing', icon: CreditCard, clearance: 'All' },
    { label: 'Invoice Receipts', path: '/invoices', icon: Receipt, clearance: 'All' },
    { label: 'Workspace Settings', path: '/settings', icon: Settings, clearance: 'All' },
  ];

  const filteredItems = items.filter((item) => {
    if (item.clearance === 'Admin') return activeRole === 'Admin';
    if (item.clearance === 'Finance') return activeRole === 'Finance' || activeRole === 'Admin';
    return true;
  });

  const sidebarContent = (
    <div className="flex flex-col h-full bg-gray-950/80 border-r border-gray-900 text-gray-400 font-sans select-none selection:bg-transparent">
      {/* Brand space */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-gray-900/60 lg:h-[65px]">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-indigo-500" />
          <span className="font-semibold text-[13px] tracking-widest text-white uppercase">RBAC Console</span>
        </div>

        {mobileOpen && (
          <button
            onClick={onMobileClose}
            className="p-1 rounded-lg hover:bg-gray-900 text-gray-500 hover:text-white lg:hidden"
            aria-label="Close Drawer"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        )}
      </div>

      {/* Nav Link Tree */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-7">
        
        {/* Navigation Categories */}
        <div className="space-y-1.5">
          <p className="px-3.5 text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-2">Main System</p>
          <nav className="space-y-1">
            {filteredItems.map((item) => {
              const active = currentRoute === item.path;
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  id={`nav-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleRouteClick(item.path)}
                  className={`w-full group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                    active
                      ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/15 font-semibold'
                      : 'border border-transparent hover:bg-gray-900/40 hover:text-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4.5 w-4.5 transition-colors ${active ? 'text-indigo-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
                    <span>{item.label}</span>
                  </div>
                  
                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Dynamic RBAC Locks (Displays locks for routes they cannot access) */}
        {activeRole !== 'Admin' && (
          <div className="bg-gray-950/40 rounded-xl border border-gray-900/80 p-3">
            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-3 block flex items-center gap-1">
              <Lock className="h-3 w-3 text-amber-500" /> Restricted Access
            </p>
            <div className="space-y-2">
              {items
                .filter((i) => !filteredItems.some((fi) => fi.path === i.path))
                .map((lockedItem) => (
                  <div key={lockedItem.path} className="flex items-center justify-between p-1.5 rounded border border-gray-900 bg-gray-950 text-[10px] text-gray-600">
                    <div className="flex items-center gap-2">
                      <lockedItem.icon className="h-3.5 w-3.5" />
                      <span>{lockedItem.label}</span>
                    </div>
                    <span className="text-[9px] font-mono leading-none font-bold text-amber-500/60 uppercase">
                      {lockedItem.clearance} clearance
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Helpful Info Panel widgets */}
        <div className="relative overflow-hidden p-4 rounded-xl border border-gray-900/90 bg-gray-950/60 text-xs">
          <div className="absolute top-0 right-0 -translate-y-6 translate-x-6 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl" />
          <h4 className="font-semibold text-gray-200">Interactive Evaluation</h4>
          <p className="mt-1 text-[10px] text-gray-500 leading-normal">
            You can use the role switcher in the top header or press <kbd className="bg-gray-900 px-1 border border-gray-800 rounded font-mono text-[9px]">Cmd+K</kbd> to change clearance layers instantly.
          </p>
        </div>

      </div>

      {/* Footer Details */}
      <div className="p-4 border-t border-gray-900 text-[10px] text-gray-500 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span>Version</span>
          <span className="font-mono">1.1.2-beta</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Licensing Mode</span>
          <span className="font-semibold text-emerald-400">Production Ready</span>
        </div>
        <div className="flex items-center justify-between mt-1 pt-1.5 border-t border-gray-900 text-[8px] tracking-wide uppercase font-bold text-gray-600">
          <span>Secure session tier</span>
          <span>SSL active</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Tablet & Desktop Layout */}
      <aside className="hidden lg:block lg:w-64 lg:shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Slideouts */}
      {mobileOpen && (
        <div className="relative z-50 lg:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            onClick={onMobileClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 left-0 w-64 max-w-xs h-full z-50">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
