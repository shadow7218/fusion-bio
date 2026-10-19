'use client';

import React from 'react';
import { LinkItem } from '@/config';
import { X, BarChart3, Trash2, MousePointerClick } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  links: LinkItem[];
  clicksMap: Record<string, number>;
  onReset: () => void;
}

export default function AnalyticsModal({
  isOpen,
  onClose,
  links,
  clicksMap,
  onReset,
}: AnalyticsModalProps) {
  if (!isOpen) return null;

  const chartData = links.map((l) => ({
    name: l.title.slice(0, 14) + (l.title.length > 14 ? '…' : ''),
    clicks: clicksMap[l.id] || 0,
  }));

  const totalClicks = Object.values(clicksMap).reduce((a, b) => a + b, 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Local Click Analytics"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md"
    >
      <div className="liquid-glass rounded-3xl w-full max-w-md p-6 flex flex-col gap-5 border border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-sky-400" />
            <h2 className="text-base font-bold">On-Device Click Analytics</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Analytics Modal"
            className="p-1.5 rounded-full glass-pill"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Summary Stat Box */}
        <div className="glass-pill rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs opacity-70">Total Recorded Link Taps</p>
            <p className="text-2xl font-extrabold text-sky-300 mt-0.5">
              {totalClicks}
            </p>
          </div>
          <MousePointerClick className="w-8 h-8 text-sky-400/60" />
        </div>

        {/* Recharts Bar Chart */}
        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 16 }}>
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                width={105}
                tick={{ fill: '#A9C0E0', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{
                  background: '#071638',
                  border: '1px solid rgba(244,254,255,0.2)',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="clicks" radius={[0, 8, 8, 0]}>
                {chartData.map((_, idx) => (
                  <Cell
                    key={idx}
                    fill={idx % 2 === 0 ? '#38bdf8' : '#60a5fa'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-[11px] opacity-60">
            Stored privately in browser localStorage
          </span>
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-medium"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}
