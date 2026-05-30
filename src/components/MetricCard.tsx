/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

interface MetricCardProps {
  id: string;
  title: string;
  value: string;
  indexInChart?: number;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  details?: string;
  sparklineData?: number[];
  colorTheme?: 'indigo' | 'emerald' | 'rose' | 'amber';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  id,
  title,
  value,
  trend,
  details,
  sparklineData = [10, 15, 8, 22, 14, 25, 18, 28],
  colorTheme = 'indigo',
}) => {
  // Theme styling helpers
  const themeClasses = {
    indigo: {
      shadow: 'hover:shadow-indigo-500/10',
      border: 'hover:border-indigo-500/30',
      text: 'text-indigo-400',
      bgGlow: 'bg-indigo-500/5',
      sparkline: '#818cf8',
    },
    emerald: {
      shadow: 'hover:shadow-emerald-500/10',
      border: 'hover:border-emerald-500/30',
      text: 'text-emerald-400',
      bgGlow: 'bg-emerald-500/5',
      sparkline: '#34d399',
    },
    rose: {
      shadow: 'hover:shadow-rose-500/10',
      border: 'hover:border-rose-500/30',
      text: 'text-rose-400',
      bgGlow: 'bg-rose-500/5',
      sparkline: '#f43f5e',
    },
    amber: {
      shadow: 'hover:shadow-amber-500/10',
      border: 'hover:border-amber-500/30',
      text: 'text-amber-400',
      bgGlow: 'bg-amber-500/5',
      sparkline: '#fbbf24',
    },
  }[colorTheme];

  // SVG calculations for a small clean sparkline
  const minVal = Math.min(...sparklineData);
  const maxVal = Math.max(...sparklineData);
  const dRange = maxVal - minVal || 1;
  const sWidth = 80;
  const sHeight = 32;
  const pts = sparklineData
    .map((val, idx) => {
      const x = (idx / (sparklineData.length - 1)) * sWidth;
      const y = sHeight - ((val - minVal) / dRange) * sHeight;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <motion.div
      id={`metric-card-${id}`}
      whileHover={{ y: -3 }}
      className={`group relative overflow-hidden rounded-xl border border-gray-800/80 bg-gray-950/40 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 ${themeClasses.border} ${themeClasses.shadow} ring-1 ring-white/5`}
    >
      {/* Dynamic Background Glow on Hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${themeClasses.bgGlow}`} />

      {/* Card Header */}
      <div className="flex justify-between items-start">
        <span className="text-xs font-medium text-gray-500 tracking-wider">
          {title}
        </span>
        {trend && (
          <span
            className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${
              trend.isPositive
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/25'
            }`}
          >
            {trend.isPositive ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            {trend.value}
          </span>
        )}
      </div>

      {/* Statistics Section */}
      <div className="mt-2.5 flex items-baseline justify-between gap-4">
        <h3 className="text-2xl font-bold tracking-tight text-white font-mono">
          {value}
        </h3>

        {/* Scaled Mini sparkline chart */}
        <div className="shrink-0 w-[80px] h-[32px] overflow-visible">
          <svg className="overflow-visible" width={sWidth} height={sHeight}>
            <polyline
              fill="none"
              stroke={themeClasses.sparkline}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={pts}
            />
          </svg>
        </div>
      </div>

      {/* Card Sub-metadata details */}
      {details && (
        <p className="mt-2.5 text-[11px] text-gray-400 font-sans leading-none flex items-center gap-1">
          <TrendingUp className="h-3.5 w-3.5 text-gray-600 group-hover:text-indigo-500 transition-colors" />
          <span>{details}</span>
        </p>
      )}
    </motion.div>
  );
};
