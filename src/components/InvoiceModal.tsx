/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { X, Printer, Download, Receipt, Sparkles, Building2, Check, CreditCard } from 'lucide-react';
import { Invoice } from '../types';

interface InvoiceModalProps {
  invoice: Invoice;
  onClose: () => void;
  onRefund?: (id: string) => void;
  showRefundButton?: boolean;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  invoice,
  onClose,
  onRefund,
  showRefundButton = false,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleSimulatedDownload = () => {
    // Elegant simulated downloading logic
    const link = document.createElement('a');
    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(invoice, null, 2)));
    link.setAttribute('download', `${invoice.invoiceNumber}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const calculateSubtotal = () => invoice.amount;
  const calculateTax = () => invoice.amount * 0.08; // 8% sales tax included
  const calculateTotal = () => calculateSubtotal() + calculateTax();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Main Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        id="invoice-modal-content"
        className="relative max-w-2xl w-full rounded-2xl border border-gray-800 bg-gray-900 shadow-2xl overflow-hidden text-gray-200"
      >
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-violet-600/10 rounded-full blur-[80px]" />

        {/* Modal Header Controls */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-indigo-400" />
            <span className="font-semibold text-gray-200 text-sm">Receipt Statement</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-800 hover:border-gray-700 bg-gray-900 hover:bg-gray-850 text-gray-300 hover:text-white text-xs font-medium transition-all"
              title="Print Invoice"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={handleSimulatedDownload}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-all"
              title="Download Data"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Ledger</span>
            </button>
            {showRefundButton && invoice.status === 'Paid' && onRefund && (
              <button
                onClick={() => {
                  onRefund(invoice.id);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-950/55 hover:bg-rose-900/60 border border-rose-800/65 text-rose-200 text-xs font-medium transition-all"
              >
                Refund Ledger
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all ml-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Invoice Printable View */}
        <div className="p-8 overflow-y-auto max-h-[75vh]" id="printable-invoice">
          {/* Top Brand Section */}
          <div className="flex flex-col md:flex-row md:justify-between gap-6 pb-6 border-b border-gray-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Sparkles className="h-4.5 w-4.5 text-white" />
                </div>
                <span className="font-bold text-lg text-white tracking-tight">skygrid.io</span>
              </div>
              <p className="text-xs text-gray-400">SkyGrid Cloud Computing Corp.</p>
              <p className="text-xs text-gray-500">100 Pine Street, Suite 2400</p>
              <p className="text-xs text-gray-500">San Francisco, CA 94111, USA</p>
            </div>

            <div className="text-left md:text-right">
              <h2 className="text-3xl font-bold tracking-tight text-white">{invoice.invoiceNumber}</h2>
              <div className="mt-2 text-xs">
                <span className="text-gray-400">Date Issued:</span> <span className="text-gray-300 font-medium">{invoice.billingDate}</span>
              </div>
              <div className="text-xs">
                <span className="text-gray-400">Payment Status:</span>{' '}
                <span
                  className={`inline-flex items-center gap-1 font-semibold ml-1 px-2 py-0.5 rounded-full text-[10px] leading-3 ${
                    invoice.status === 'Paid'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : invoice.status === 'Overdue'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  <span className={`h-1 w-1 rounded-full ${invoice.status === 'Paid' ? 'bg-emerald-400' : invoice.status === 'Overdue' ? 'bg-rose-400' : 'bg-amber-400'}`} />
                  {invoice.status}
                </span>
              </div>
            </div>
          </div>

          {/* Billing Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 text-xs border-b border-gray-800">
            <div>
              <p className="text-gray-500 uppercase tracking-widest font-semibold text-[10px] mb-2 leading-none">Billed To</p>
              <p className="text-sm font-semibold text-white mb-0.5">{invoice.userName}</p>
              <p className="text-gray-400 font-mono text-[11px] mb-1">{invoice.userEmail}</p>
              <div className="flex items-center gap-1 text-[11px] text-gray-500">
                <Building2 className="h-3.5 w-3.5" />
                <span>Default Organization Seat</span>
              </div>
            </div>

            <div className="md:text-right">
              <p className="text-gray-500 uppercase tracking-widest font-semibold text-[10px] mb-2 leading-none">Subscription Profile</p>
              <p className="text-sm font-semibold text-white mb-0.5">{invoice.planName}</p>
              <p className="text-gray-400 mb-1">Due Date: <span className="text-gray-300 font-medium">{invoice.dueDate}</span></p>
              <div className="flex items-center md:justify-end gap-1 text-[11px] text-gray-500">
                <CreditCard className="h-3.5 w-3.5" />
                <span>Simulated VISA Card (•••• 1337)</span>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="py-6 border-b border-gray-800 text-xs">
            <div className="grid grid-cols-12 pb-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
              <div className="col-span-8 text-left">Description</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>

            <div className="space-y-4">
              {invoice.items && invoice.items.length > 0 ? (
                invoice.items.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 items-center text-sm py-1">
                    <div className="col-span-8">
                      <p className="font-semibold text-gray-200">{item.description}</p>
                      <p className="text-xs text-gray-500 mt-0.5">High Performance Elastic Clusters Provisioning License</p>
                    </div>
                    <div className="col-span-2 text-center text-gray-400 font-mono">1</div>
                    <div className="col-span-2 text-right text-gray-200 font-mono font-medium">
                      ${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="grid grid-cols-12 items-center text-sm py-1">
                  <div className="col-span-8">
                    <p className="font-semibold text-gray-200">{invoice.planName}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Core Subscription Package Account Licence</p>
                  </div>
                  <div className="col-span-2 text-center text-gray-400 font-mono">1</div>
                  <div className="col-span-2 text-right text-gray-200 font-mono font-medium">
                    ${invoice.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Totals Section */}
          <div className="pt-6 flex justify-end">
            <div className="w-full max-w-xs space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-mono text-gray-300">
                  ${calculateSubtotal().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sales Tax (8% Cloud Sync Devise)</span>
                <span className="font-mono text-gray-300">
                  ${calculateTax().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-800 text-sm">
                <span className="font-semibold text-white">Total Amount Due</span>
                <span className="font-mono font-bold text-lg text-indigo-400 bg-indigo-500/5 px-2.5 py-1 rounded-lg border border-indigo-500/10">
                  ${calculateTotal().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Footer Info */}
          <div className="mt-12 text-center border-t border-gray-800/60 pt-6">
            <div className="flex justify-center mb-2">
              <span className="inline-flex items-center gap-1 text-[10px] uppercase font-semibold text-gray-400 bg-gray-950 px-2 py-0.5 rounded border border-gray-800">
                <Check className="h-3 w-3 text-emerald-400" /> Fully Reconciled Ledger
              </span>
            </div>
            <p className="text-[10px] text-gray-500 leading-normal">
              Thank you for trusting SkyGrid. All simulated billing processes are handled cryptographically under standard TLS encryption layer.
              If you have inquiries regarding this, reach support at billing@skygrid.io.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
