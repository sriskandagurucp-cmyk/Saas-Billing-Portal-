/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAppState } from '../context/StateContext';
import { MetricCard } from '../components/MetricCard';
import { SvgAnalyticsChart } from '../components/SvgAnalyticsChart';
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  UserCheck,
  Receipt,
  Users,
  LineChart,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    currentUser,
    plans,
    invoices,
    transactions,
    activityLogs,
    billingInterval,
    navigateTo,
    activeRole,
  } = useAppState();

  // Find active subscription plan
  const activePlan = plans.find((p) => p.id === currentUser?.planId) || plans[0];

  // Calculate stats
  const aggregateRevenue = invoices
    .filter((inv) => inv.status === 'Paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const activeLicencesCount = invoices.filter((inv) => inv.status === 'Paid').length;

  // Recent 4 invoices
  const recentInvoices = invoices.slice(0, 4);

  // Recent 4 activity logs
  const recentLogs = activityLogs.slice(0, 4);

  return (
    <div className="space-y-8 font-sans">
      
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            Welcome Back, <span className="bg-gradient-to-r from-indigo-400 to-indigo-200 bg-clip-text text-transparent">{currentUser?.name || 'Subscriber'}</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono leading-none bg-indigo-500/10 text-indigo-400 border border-indigo-500/15 py-0.5 px-2 rounded-full uppercase ml-1.5 font-bold">
              {activeRole} Console
            </span>
          </h2>
          <p className="text-xs text-gray-400 mt-1 leading-none">
            An overview of your workspace settings, billing ledgers and active integrations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('/billing')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-800 hover:border-gray-700 bg-gray-900/40 text-gray-300 hover:text-white text-xs font-semibold cursor-pointer transition-all"
          >
            <CreditCard className="h-4 w-4 text-indigo-400" />
            <span>Manage Subscription</span>
          </button>
        </div>
      </div>

      {/* Top Row: Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          id="mrr"
          title="Monthly Recurring Revenue"
          value={`$${(activePlan.priceMonthly * 8).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          trend={{ value: '+12.4%', isPositive: true }}
          details="Unified seat subscriptions"
          sparklineData={[30, 32, 28, 45, 41, 55, 49, 64]}
          colorTheme="indigo"
        />
        <MetricCard
          id="billing"
          title="Sandbox System Revenue"
          value={`$${aggregateRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          trend={{ value: '+44.2%', isPositive: true }}
          details="Aggregated paid invoices"
          sparklineData={[10, 24, 15, 30, 42, 38, 55, 78]}
          colorTheme="emerald"
        />
        <MetricCard
          id="sub"
          title="Verified System Nodes"
          value={activeLicencesCount.toString()}
          trend={{ value: '+2 new', isPositive: true }}
          details="Active cloud certificates"
          sparklineData={[2, 2, 3, 3, 4, 4, 5, 5]}
          colorTheme="amber"
        />
        <MetricCard
          id="limits"
          title="Simulation Rate Load"
          value="99.98%"
          trend={{ value: 'Under limits', isPositive: true }}
          details="API endpoint load"
          sparklineData={[99, 99, 98, 99, 99, 99, 99, 99]}
          colorTheme="rose"
        />
      </div>

      {/* Interactive Charts Matrix Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: Graphic Area Analytics Chart */}
        <div className="lg:col-span-8 p-5 rounded-2xl border border-gray-800 bg-gray-950/40 backdrop-blur-md flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between pb-4 border-b border-gray-900 mb-4">
            <div className="flex items-center gap-2">
              <LineChart className="h-4.5 w-4.5 text-indigo-400" />
              <span className="font-bold text-gray-200 text-xs uppercase tracking-wider">Revenue Stream projections</span>
            </div>
            <span className="text-[10px] font-mono text-gray-500 bg-gray-900 border border-gray-800 px-2 py-0.5 rounded uppercase">
              {billingInterval} billing projection mode
            </span>
          </div>

          <div className="flex-1 min-h-[220px]">
            <SvgAnalyticsChart interval={billingInterval} />
          </div>
        </div>

        {/* Right: Active plan configurations card */}
        <div className="lg:col-span-4 p-5 rounded-2xl border border-gray-800 bg-gray-950/40 backdrop-blur-md flex flex-col justify-between shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-6 translate-x-6 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
          
          <div>
            <div className="flex items-center gap-2 pb-3.5 border-b border-gray-900 mb-4 text-xs font-bold text-gray-200 uppercase tracking-widest leading-none">
              <ShieldCheck className="h-4.5 w-4.5 text-indigo-400" />
              <span>Workspace tier</span>
            </div>

            <div className="space-y-2">
              <span className="text-[9px] uppercase font-mono font-bold text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 px-2 py-0.5 rounded-full">
                Active Profile Package
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight mt-1">{activePlan.name} Tier License</h3>
              <p className="text-xs text-gray-500 mt-1">
                Allocated pricing model: <span className="text-gray-300 font-semibold">${billingInterval === 'monthly' ? activePlan.priceMonthly : Math.floor(activePlan.priceYearly/12)}/mo</span>
              </p>
            </div>

            {/* Simulated usages limit tracks */}
            <div className="mt-6 space-y-4">
              <div>
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 leading-none">
                  <span>API Volume usages</span>
                  <span className="text-indigo-400 font-mono">14.2% (14,200 / 100K)</span>
                </div>
                <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full w-[14.2%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 leading-none">
                  <span>SSL Certificate Seals</span>
                  <span className="text-emerald-400 font-mono">40.0% (2 / 5 limits)</span>
                </div>
                <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[40.0%]" />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigateTo('/pricing')}
            className="w-full text-center py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer transition-colors mt-6"
          >
            Upgrade active workspace licenses
          </button>
        </div>
      </div>

      {/* Grid: Recent entries vs Activity log ticker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* Recent receipts list */}
        <div className="p-5 rounded-2xl border border-gray-800 bg-gray-950/40 backdrop-blur-md shadow-lg">
          <div className="flex items-center justify-between pb-4 border-b border-gray-900 mb-3.5">
            <span className="font-bold text-gray-200 text-xs uppercase tracking-wider">Dynamic billing receipts</span>
            <button
              onClick={() => navigateTo('/invoices')}
              className="text-[10px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              See all invoices
            </button>
          </div>

          <div className="divide-y divide-gray-900">
            {recentInvoices.map((inv) => (
              <div key={inv.id} className="py-3 items-center flex justify-between gap-4 text-xs font-sans">
                <div>
                  <p className="font-semibold text-gray-200 leading-none">{inv.invoiceNumber}</p>
                  <p className="text-[10px] text-gray-500 mt-1 font-mono">{inv.userEmail}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-gray-100 font-mono">${inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                  <span className={`inline-flex items-center gap-1 font-mono text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase mt-1 leading-none ${
                    inv.status === 'Paid'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15'
                      : inv.status === 'Overdue'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/15'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/15'
                  }`}>
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Console audit logs */}
        <div className="p-5 rounded-2xl border border-gray-800 bg-gray-950/40 backdrop-blur-md shadow-lg">
          <div className="flex items-center justify-between pb-4 border-b border-gray-900 mb-3.5">
            <span className="font-bold text-gray-200 text-xs uppercase tracking-wider">Authentication Core Audit Log</span>
            <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest font-mono select-none">PERSISTENT CACHE</span>
          </div>

          <div className="space-y-4 max-h-[200px] overflow-y-auto pr-1">
            {recentLogs.map((log) => (
              <div key={log.id} className="text-xs flex gap-3">
                <span className="shrink-0 font-bold block h-1.5 w-1.5 rounded-full bg-indigo-500 mt-1.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline gap-2">
                    <p className="font-semibold text-gray-300 truncate leading-none">{log.action}</p>
                    <span className="text-[9px] text-gray-500 shrink-0 font-mono leading-none">{log.timestamp.split(' ')[1]}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 leading-normal">{log.details}</p>
                  <p className="text-[8px] text-gray-600 mt-0.5 font-mono leading-none uppercase">Executor: {log.userName} ({log.userRole})</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
