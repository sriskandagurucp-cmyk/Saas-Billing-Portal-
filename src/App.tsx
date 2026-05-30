/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StateProvider, useAppState } from './context/StateContext';

// Import All Page Components
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { FinancePage } from './pages/FinancePage';
import { PricingPage } from './pages/PricingPage';
import { BillingPage } from './pages/BillingPage';
import { SettingsPage } from './pages/SettingsPage';
import { InvoicesPage } from './pages/InvoicesPage';

// Import Layout Components
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Toast } from './components/Toast';
import { CommandPalette } from './components/CommandPalette';

import { Lock, ShieldAlert, Sparkles, AlertTriangle } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const {
    currentRoute,
    navigateTo,
    activeRole,
    currentUser,
    toasts,
    removeToast,
  } = useAppState();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Authorization Gates
  const isAuthorized = (): boolean => {
    if (currentRoute === '/dashboard/admin') {
      return activeRole === 'Admin';
    }
    if (currentRoute === '/dashboard/finance') {
      return activeRole === 'Finance' || activeRole === 'Admin';
    }
    return true;
  };

  // Render Page Content based on currentRoute path
  const renderPage = () => {
    // Check permission parameters first
    if (!isAuthorized()) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-12 py-20 min-h-[60vh] font-sans">
          <div className="h-16 w-16 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-6 shadow-lg shadow-rose-500/5 animate-pulse">
            <Lock className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">Access Token Revoked</h3>
          <p className="text-xs text-gray-500 max-w-sm mt-1.5 leading-relaxed">
            Your current sandbox authorization (<span className="text-rose-400 font-mono font-bold uppercase">{activeRole}</span>) does not possess sufficient privileges to view this directory.
          </p>
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => navigateTo('/dashboard')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gray-900 border border-gray-850 text-xs font-semibold hover:bg-gray-800 text-gray-200 transition-colors"
            >
              Back to Overview
            </button>
            <button
              onClick={() => navigateTo('/pricing')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-semibold transition-colors"
            >
              Verify Pricing Options
            </button>
          </div>
        </div>
      );
    }

    switch (currentRoute) {
      case '/':
        return <LandingPage />;
      case '/login':
        return <LoginPage />;
      case '/register':
        return <RegisterPage />;
      case '/dashboard':
        return <DashboardPage />;
      case '/dashboard/admin':
        return <AdminPage />;
      case '/dashboard/finance':
        return <FinancePage />;
      case '/pricing':
        return <PricingPage />;
      case '/billing':
        return <BillingPage />;
      case '/settings':
        return <SettingsPage />;
      case '/invoices':
        return <InvoicesPage />;
      default:
        return <LandingPage />;
    }
  };

  // Group pages that inherit the global logged-in dashboard layouts
  const isFullscreenPage = ['/', '/login', '/register'].includes(currentRoute);

  if (isFullscreenPage) {
    return (
      <div className="bg-gray-950 min-h-screen text-gray-200">
        {renderPage()}
        <Toast toasts={toasts} onClose={removeToast} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col lg:flex-row font-sans">
      
      {/* Search cmd+k commands pallet */}
      <CommandPalette />

      {/* Persistent Sidebar drawer */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Core View Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        
        {/* Dynamic header Nav control */}
        <Navbar onMobileMenuToggle={() => setMobileSidebarOpen(true)} />

        {/* Dynamic Page Space Wrapper */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-16 relative">
          
          {/* Subtle design ambient mesh backdrop */}
          <div className="absolute top-0 right-10 w-96 h-96 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Child content render slot */}
          {renderPage()}

        </main>
      </div>

      {/* Central notifications trigger alert layout */}
      <Toast toasts={toasts} onClose={removeToast} />

    </div>
  );
};

export default function App() {
  return (
    <StateProvider>
      <MainAppContent />
    </StateProvider>
  );
}
