/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppState } from '../context/StateContext';
import { InvoiceModal } from '../components/InvoiceModal';
import { Receipt, Search, Filter, Printer, ExternalLink } from 'lucide-react';
import { Invoice } from '../types';

export const InvoicesPage: React.FC = () => {
  const { invoices } = useAppState();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('All');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Filter invoice collections
  const filteredInvoices = invoices.filter((inv) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(query) ||
      inv.userName.toLowerCase().includes(query) ||
      inv.userEmail.toLowerCase().includes(query);

    const matchesStatus = activeTab === 'All' || inv.status === activeTab;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 font-sans">
      
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Receipt className="h-5.5 w-5.5 text-indigo-400" />
          <span>Invoices Directory Files</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Review generated compliance statements, retrieve past invoice settlements, print ledger breakdowns, or track outstanding defaults.
        </p>
      </div>

      {/* Tabs list & search bars */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch justify-between bg-gray-900/10 p-4 rounded-xl border border-gray-900 bg-gray-950/20">
        
        {/* Search queries bar */}
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search invoice number, names, subscriber email..."
            className="w-full pl-9 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-xs text-gray-300 placeholder-gray-500 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Status flags filter tabs */}
        <div className="flex items-center gap-1.5 bg-gray-900/60 border border-gray-800 p-1 rounded-lg self-start">
          {['All', 'Paid', 'Pending', 'Overdue'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Directory list Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-850 bg-gray-950/40 backdrop-blur-xl shadow-lg shadow-black/8 w-full">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full text-xs text-left text-gray-400 border-collapse table-auto">
            <thead>
              <tr className="bg-gray-950 text-[9px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-900/40">
                <th className="px-6 py-3.5">Invoice Number</th>
                <th className="px-6 py-3.5">Billed Representative</th>
                <th className="px-6 py-3.5 text-center">Reference Plan License</th>
                <th className="px-6 py-3.5">Due Date</th>
                <th className="px-6 py-3.5">Statement Total</th>
                <th className="px-6 py-3.5">Invoice Status</th>
                <th className="px-6 py-3.5 text-right">Receipt Controls</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-900/60">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-gray-900/15 transition-colors font-sans"
                  >
                    {/* Invoice ID/Number column */}
                    <td className="px-6 py-4.5 whitespace-nowrap font-semibold text-indigo-400">
                      {inv.invoiceNumber}
                    </td>

                    {/* Target Representative */}
                    <td className="px-6 py-4.5 whitespace-nowrap">
                      <div>
                        <p className="font-semibold text-gray-200">{inv.userName}</p>
                        <p className="text-[10px] text-gray-500 font-mono mt-0.5">{inv.userEmail}</p>
                      </div>
                    </td>

                    {/* Connected licencing category */}
                    <td className="px-6 py-4.5 whitespace-nowrap text-center font-medium">
                      <span className="text-gray-300 bg-gray-900 px-2 py-0.5 rounded border border-gray-850">
                        {inv.planName}
                      </span>
                    </td>

                    {/* Expirations due dates */}
                    <td className="px-6 py-4.5 whitespace-nowrap text-gray-500 font-mono">
                      {inv.dueDate}
                    </td>

                    {/* Aggregated amounts */}
                    <td className="px-6 py-4.5 whitespace-nowrap font-mono font-bold text-sm text-gray-100">
                      ${inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>

                    {/* Paid vs pending statuses */}
                    <td className="px-6 py-4.5 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15'
                          : inv.status === 'Overdue'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/15'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/15'
                      }`}>
                        {inv.status}
                      </span>
                    </td>

                    {/* Interactive controls */}
                    <td className="px-6 py-4.5 whitespace-nowrap text-right">
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-850 bg-gray-900/50 hover:bg-gray-900 text-[10px] text-gray-400 hover:text-indigo-400 hover:border-indigo-950 transition-all font-medium cursor-pointer"
                        title="Display Printable Statement Specifications"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>Audit Statement</span>
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-gray-500 font-sans">
                    No generated invoices match current tabular filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Modal Receipt render overlay */}
      {selectedInvoice && (
        <InvoiceModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}

    </div>
  );
};
