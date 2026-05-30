/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  toasts: {
    id: string;
    title: string;
    message: string;
    type: 'success' | 'error' | 'info';
  }[];
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onClose }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            id={`toast-${toast.id}`}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl border border-gray-800/80 bg-gray-950/95 backdrop-blur-xl shadow-2xl shadow-black/80 ring-1 ring-white/5"
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && (
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              )}
              {toast.type === 'error' && (
                <AlertCircle className="h-5 w-5 text-rose-400" />
              )}
              {toast.type === 'info' && (
                <Info className="h-5 w-5 text-blue-400" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-100 leading-tight">
                {toast.title}
              </h4>
              <p className="mt-1 text-xs text-gray-400 leading-normal">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => onClose(toast.id)}
              className="shrink-0 rounded-lg p-1 text-gray-500 hover:text-gray-300 transition-colors focus:ring-1 focus:ring-indigo-500"
              aria-label="Close Notification"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
