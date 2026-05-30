/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, TrendingUp, DollarSign, Wallet } from 'lucide-react';

interface ChartDataPoint {
  label: string;
  revenue: number;
  signups: number;
}

const MONTHLY_STREAMS: ChartDataPoint[] = [
  { label: 'Jan', revenue: 14500, signups: 120 },
  { label: 'Feb', revenue: 18400, signups: 165 },
  { label: 'Mar', revenue: 23200, signups: 210 },
  { label: 'Apr', revenue: 21900, signups: 195 },
  { label: 'May', revenue: 29800, signups: 275 },
  { label: 'Jun', revenue: 34100, signups: 340 },
  { label: 'Jul', revenue: 32600, signups: 310 },
  { label: 'Aug', revenue: 41200, signups: 415 },
  { label: 'Sep', revenue: 44900, signups: 460 },
  { label: 'Oct', revenue: 49100, signups: 512 },
  { label: 'Nov', revenue: 56300, signups: 620 },
  { label: 'Dec', revenue: 64800, signups: 742 },
];

const YEARLY_STREAMS: ChartDataPoint[] = [
  { label: '2020', revenue: 45000, signups: 400 },
  { label: '2021', revenue: 112000, signups: 820 },
  { label: '2022', revenue: 185000, signups: 1540 },
  { label: '2023', revenue: 294000, signups: 2710 },
  { label: '2024', revenue: 415000, signups: 4100 },
  { label: '2025', revenue: 580000, signups: 5900 },
  { label: '2026', revenue: 765000, signups: 7850 },
];

export const SvgAnalyticsChart: React.FC<{ interval: 'monthly' | 'yearly' }> = ({ interval }) => {
  const points = interval === 'monthly' ? MONTHLY_STREAMS : YEARLY_STREAMS;
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 600, height: 260 });
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Handle Resize Fluidly
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        // Keep a minimum width of 300px
        setDims({
          width: Math.max(width, 300),
          height: 260,
        });
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Compute maximum parameters
  const maxRevenue = Math.max(...points.map((p) => p.revenue)) * 1.15; // 15% headroom
  const minRevenue = 0;

  // Chart padding
  const padding = { top: 20, right: 30, bottom: 35, left: 55 };
  const graphWidth = dims.width - padding.left - padding.right;
  const graphHeight = dims.height - padding.top - padding.bottom;

  // Compute pixel positions
  const mappedPoints = points.map((p, idx) => {
    const x = padding.left + (idx / (points.length - 1)) * graphWidth;
    const y = padding.top + graphHeight - ((p.revenue - minRevenue) / (maxRevenue - minRevenue)) * graphHeight;
    return { x, y, label: p.label, revenue: p.revenue, signups: p.signups };
  });

  // Create SVG path using Bezier control points
  const getLinePath = () => {
    if (mappedPoints.length === 0) return '';
    let path = `M ${mappedPoints[0].x} ${mappedPoints[0].y}`;
    for (let i = 0; i < mappedPoints.length - 1; i++) {
      const curr = mappedPoints[i];
      const next = mappedPoints[i + 1];
      // Control points
      const cpX1 = curr.x + (next.x - curr.x) / 3;
      const cpY1 = curr.y;
      const cpX2 = curr.x + (2 * (next.x - curr.x)) / 3;
      const cpY2 = next.y;
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${next.x} ${next.y}`;
    }
    return path;
  };

  // Create area fill path down to the grid floor
  const getAreaPath = () => {
    if (mappedPoints.length === 0) return '';
    const linePath = getLinePath();
    const firstPoint = mappedPoints[0];
    const lastPoint = mappedPoints[mappedPoints.length - 1];
    const floorY = padding.top + graphHeight;
    return `${linePath} L ${lastPoint.x} ${floorY} L ${firstPoint.x} ${floorY} Z`;
  };

  // Handle pointer tracking
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!containerRef.current) return;
    const svgRect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - svgRect.left;

    // Find the closest point index
    let closestIndex = 0;
    let minDiff = Infinity;
    mappedPoints.forEach((pt, idx) => {
      const diff = Math.abs(pt.x - mouseX);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    setHoverIndex(closestIndex);
    const activePoint = mappedPoints[closestIndex];
    setTooltipPos({
      x: activePoint.x,
      y: activePoint.y - 12,
    });
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const yTicks = 4;
  const tickAmount = (maxRevenue - minRevenue) / yTicks;

  return (
    <div ref={containerRef} className="w-full h-full relative" id="charts-interactive-section">
      <svg
        width={dims.width}
        height={dims.height}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="overflow-visible select-none cursor-crosshair"
      >
        <defs>
          {/* Glowing area fill gradient */}
          <linearGradient id="areaGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.32" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
          </linearGradient>

          {/* Stroke line glowing drop shadow */}
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Horizontal grid guide lines */}
        {Array.from({ length: yTicks + 1 }).map((_, idx) => {
          const val = minRevenue + idx * tickAmount;
          const yPos = padding.top + graphHeight - (idx / yTicks) * graphHeight;
          return (
            <g key={idx}>
              <line
                x1={padding.left}
                y1={yPos}
                x2={dims.width - padding.right}
                y2={yPos}
                stroke="#1f2937"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              <text
                x={padding.left - 10}
                y={yPos + 4}
                textAnchor="end"
                fill="#9ca3af"
                className="text-[10px] font-mono leading-none"
              >
                ${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        {mappedPoints.length > 0 && (
          <path d={getAreaPath()} fill="url(#areaGlow)" />
        )}

        {/* Glowing bezier stroke */}
        {mappedPoints.length > 0 && (
          <path
            d={getLinePath()}
            fill="none"
            stroke="#818cf8"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0px 8px 12px rgba(99, 102, 241, 0.45))' }}
          />
        )}

        {/* X-Axis labels */}
        {mappedPoints.map((pt, idx) => {
          // Label declutter: Show every tick for yearly, and every second label for monthly on mobile
          const isMobile = dims.width < 500;
          const showLabel = !isMobile || idx % 2 === 0 || interval === 'yearly';

          return (
            showLabel && (
              <text
                key={idx}
                x={pt.x}
                y={dims.height - 12}
                textAnchor="middle"
                fill="#9ca3af"
                className="text-[10px] font-mono leading-none"
              >
                {pt.label}
              </text>
            )
          );
        })}

        {/* Active hover crosshair vertical slicing rule */}
        {hoverIndex !== null && (
          <line
            x1={mappedPoints[hoverIndex].x}
            y1={padding.top}
            x2={mappedPoints[hoverIndex].x}
            y2={padding.top + graphHeight}
            stroke="#4b5563"
            strokeWidth="1.5"
            strokeDasharray="2 3"
          />
        )}

        {/* Glowing connector dots */}
        {mappedPoints.map((pt, idx) => {
          const isHovered = hoverIndex === idx;
          return (
            <circle
              key={idx}
              cx={pt.x}
              cy={pt.y}
              r={isHovered ? 6 : 4}
              fill={isHovered ? '#a5b4fc' : '#4f46e5'}
              stroke={isHovered ? '#6366f1' : '#111827'}
              strokeWidth={isHovered ? 3 : 2}
              className="transition-all duration-150"
            />
          );
        })}
      </svg>

      {/* Floating high contrast tooltip box */}
      <AnimatePresence>
        {hoverIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            transition={{ duration: 0.12 }}
            className="absolute z-10 pointer-events-none p-3.5 rounded-xl border border-gray-800 bg-gray-950/95 shadow-2xl text-xs flex flex-col gap-2 min-w-[150px]"
            style={{
              left: Math.min(tooltipPos.x - 75, dims.width - 165),
              top: Math.max(tooltipPos.y - 75, 10),
            }}
          >
            <div className="flex items-center justify-between gap-4 font-semibold text-[10px] text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-1">
              <span>{points[hoverIndex].label} Timeline</span>
              <Calendar className="h-3 w-3" />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-gray-400">
                <span>Revenue:</span>
                <span className="font-mono text-emerald-400 font-bold">
                  ${points[hoverIndex].revenue.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>Active Users:</span>
                <span className="font-mono text-indigo-400 font-semibold">
                  {points[hoverIndex].signups.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
