/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppState } from '../context/StateContext';
import { InvoiceModal } from '../components/InvoiceModal';
import {
  DollarSign,
  Download,
  AlertCircle,
  TrendingDown,
  Landmark,
  Search,
  Receipt,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Invoice } from '../types';

export const FinancePage: React.FC = () => {
  const {
    invoices,
    transactions,
    refundInvoice,
    addToast,
  } = useAppState();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  
  // Active Invoice selected for popup audit modal
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Compile totals
  const totalReceived = transactions
    .filter((tx) => tx.status === 'Success')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const pendingCollection = invoices
    .filter((inv) => inv.status === 'Pending')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const defaultedLoss = invoices
    .filter((inv) => inv.status === 'Overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);

  // Filter transactions list
  const filteredTx = transactions.filter((tx) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      tx.userName.toLowerCase().includes(query) ||
      tx.userEmail.toLowerCase().includes(query) ||
      tx.id.toLowerCase().includes(query) ||
      tx.invoiceId.toLowerCase().includes(query);

    const matchesStatus = filterStatus === 'All' || tx.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Simulated CSV/JSON database backup exporting of full transactions database
  const triggerBackupsExport = () => {
    const contentStr = JSON.stringify(transactions, null, 2);
    const blob = new Blob([contentStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SkyGrid_Transactions_Statement_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Statement Exported Successfully', 'A localized statement JSON file has been packed & downloaded.', 'success');
  };

  const handleInvoiceOpenFromTx = (invoiceId: string) => {
    const match = invoices.find((inv) => inv.id === invoiceId);
    if (match) {
      setSelectedInvoice(match);
    } else {
      addToast('Draft invoice has no active representation', 'The associated transactional invoice draft does not have full models.', 'error');
    }
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Landmark className="h-5.5 w-5.5 text-indigo-400" />
            <span>Financial Ledger Statements</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Reconcile payments, track transaction failures, audit invoice breakdowns, and download compliance statement datasets.
          </p>
        </div>

        <button
          onClick={triggerBackupsExport}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-400 text-xs font-semibold cursor-pointer transition-colors"
        >
          <Download className="h-4 w-4 shrink-0" />
          <span>Export Compliance Ledger</span>
        </button>
      </div>

      {/* Aggregate metrics for financial audits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Metric 1 */}
        <div className="p-4 rounded-xl border border-gray-900 bg-gray-950/40 backdrop-blur-md ">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Received Receipts Volume</p>
          <p className="text-xl font-bold text-white font-mono mt-2">${totalReceived.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          <span className="text-[9px] text-emerald-400 mt-1 font-mono tracking-wide leading-none block">✓ Reconciled securely</span>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-xl border border-gray-900 bg-gray-950/40 backdrop-blur-md">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Due Collection Backlog</p>
          <p className="text-xl font-bold text-white font-mono mt-2">${pendingCollection.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          <span className="text-[9px] text-amber-500 mt-1 font-mono tracking-wide leading-none block">⚠ Awaiting cyclical collection trigger</span>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-xl border border-gray-900 bg-gray-950/40 backdrop-blur-md">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Overdue Default Rates</p>
          <p className="text-xl font-bold text-rose-400 font-mono mt-2">${defaultedLoss.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          <span className="text-[9px] text-rose-500 mt-1 font-mono tracking-wide leading-none block">✖ High margin retry triggers</span>
        </div>
      </div>

      {/* Filters ledger parameters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch justify-between bg-gray-900/10 p-4 rounded-xl border border-gray-900 bg-gray-950/20">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search transactions, customer emails, raw references..."
            className="w-full pl-9 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-xs text-gray-300 placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Status toggles */}
        <div className="flex items-center gap-1.5 bg-gray-900/60 border border-gray-800 p-1 rounded-lg self-start">
          {['All', 'Success', 'Processing', 'Failed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                filterStatus === status
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Ledger lists compilation table */}
      <div className="overflow-hidden rounded-2xl border border-gray-850 bg-gray-950/40 backdrop-blur-xl shadow-lg shadow-black/8 w-full">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full text-xs text-left text-gray-400 border-collapse table-auto">
            <thead>
              <tr className="bg-gray-950 text-[9px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-900/40">
                <th className="px-6 py-3.5">Tx ID</th>
                <th className="px-6 py-3.5">Customer Client Account</th>
                <th className="px-6 py-3.5 text-center">Receipt Reference</th>
                <th className="px-6 py-3.5">Settled Amount</th>
                <th className="px-6 py-3.5">Method</th>
                <th className="px-6 py-3.5">Settlement Status</th>
                <th className="px-6 py-3.5 text-right">Invoicing Controls</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-900/60">
              {filteredTx.length > 0 ? (
                filteredTx.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-900/15 transition-colors font-sans">
                    {/* Tx id column */}
                    <td className="px-6 py-4.5 whitespace-nowrap font-mono text-indigo-400 font-semibold">
                      {tx.id}
                    </td>

                    {/* Customer columns */}
                    <td className="px-6 py-4.5 whitespace-nowrap">
                      <div>
                        <p className="font-semibold text-gray-200">{tx.userName}</p>
                        <p className="text-[10px] text-gray-500 font-mono mt-0.5">{tx.userEmail}</p>
                      </div>
                    </td>

                    {/* Associated Invoice */}
                    <td className="px-6 py-4.5 whitespace-nowrap text-center text-indigo-400 font-mono">
                      <button
                        onClick={() => handleInvoiceOpenFromTx(tx.invoiceId)}
                        className="hover:underline font-semibold cursor-pointer py-1"
                        title="Open receipt PDF mockup"
                      >
                        {tx.invoiceId.toUpperCase()}
                      </button>
                    </td>

                    {/* Settled amounts */}
                    <td className="px-6 py-4.5 whitespace-nowrap font-mono font-bold text-gray-100 text-sm">
                      ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>

                    {/* Payment methods */}
                    <td className="px-6 py-4.5 whitespace-nowrap text-gray-400 font-medium">
                      {tx.paymentMethod}
                    </td>

                    {/* Dynamic statuses */}
                    <td className="px-6 py-4.5 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        tx.status === 'Success'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15'
                          : tx.status === 'Failed'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/15'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/15'
                      }`}>
                        {tx.status}
                      </span>
                    </td>

                    {/* Involing controls */}
                    <td className="px-6 py-4.5 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleInvoiceOpenFromTx(tx.invoiceId)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-850 bg-gray-900/50 hover:bg-gray-900 text-[10px] font-medium text-gray-400 hover:text-white transition-all cursor-pointer"
                        title="Display Receipt Details"
                      >
                        <Receipt className="h-3.5 w-3.5" />
                        <span>Receipt</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-gray-500 font-sans">
                    No transactions matching filtration indices.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Embedded interactive audit instructions */}
      <div className="p-4 rounded-xl border border-gray-900 bg-gray-950/20 text-xs flex items-start gap-3">
        <AlertCircle className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <p className="font-semibold text-gray-200">Simulating Bank Audits</p>
          <p className="text-gray-500 mt-1">
            As a sandbox auditor, you can review client transaction references and access live generated invoice records. Click reference ID links or "Receipt" buttons to print or check layout compatibility in depth.
          </p>
        </div>
      </div>

      {/* Floating Modal Receipt render overlay */}
      {selectedInvoice && (
        <InvoiceModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          onRefund={refundInvoice}
          showRefundButton={true}
        />
      )}

    </div>
  );
};
