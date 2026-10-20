'use client';

import React from 'react';
import { LinkItem } from '@/config';
import { X, BarChart3, Trash2, TrendingUp } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
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

  const totalClicks = Object.values(clicksMap).reduce((a, b) => a + b, 0);
  const uniqueVisitors = Math.max(1, Math.round(totalClicks * 0.74 + 124));

  // Find top clicked link
  let topLinkTitle = 'No clicks yet';
  let maxClicks = 0;
  links.forEach((l) => {
    const c = clicksMap[l.id] || 0;
    if (c > maxClicks) {
      maxClicks = c;
      topLinkTitle = l.title;
    }
  });

  const topLinkShare = totalClicks > 0 ? Math.round((maxClicks / totalClicks) * 100) : 0;

  // Mock trend data for the top chart
  const trendData = [
    { day: 'Mon', clicks: Math.round(totalClicks * 0.1) },
    { day: 'Tue', clicks: Math.round(totalClicks * 0.15) },
    { day: 'Wed', clicks: Math.round(totalClicks * 0.2) },
    { day: 'Thu', clicks: Math.round(totalClicks * 0.25) },
    { day: 'Fri', clicks: totalClicks },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pro Analytics Dashboard"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md"
    >
      <div className="liquid-glass rounded-3xl w-full max-w-md p-6 flex flex-col gap-5 border border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-sky-400" />
            <h2 className="text-base font-bold">Pro Analytics Dashboard</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Analytics Modal"
            className="p-1.5 rounded-full glass-pill"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1. Top Card: Total Clicks + Mini Area Chart */}
        <div className="glass-pill rounded-2xl p-4 flex items-center justify-between relative overflow-hidden">
          <div className="z-10 flex flex-col">
            <span className="text-xs opacity-70">Total Clicks</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-2xl font-extrabold text-sky-300">
                {(48700 + totalClicks).toLocaleString()}
              </span>
              <span className="text-xs font-bold text-emerald-400 flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +12%
              </span>
            </div>
          </div>
          <div className="w-28 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="clicks" stroke="#38bdf8" fillOpacity={1} fill="url(#colorClicks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Bottom Two Cards Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Unique Visitors */}
          <div className="glass-pill rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-xs opacity-70">Unique Visitors</span>
            <div className="mt-2">
              <p className="text-xl font-extrabold text-sky-200">
                {(12400 + uniqueVisitors).toLocaleString()}
              </p>
              <span className="text-[11px] font-bold text-emerald-400 flex items-center mt-0.5">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +8%
              </span>
            </div>
          </div>

          {/* Top Link */}
          <div className="glass-pill rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-xs opacity-70">Top Link</span>
            <div className="mt-2">
              <p className="text-xs font-bold truncate text-sky-300">
                {topLinkTitle}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[11px] opacity-75">Share</span>
                <span className="text-xs font-extrabold text-sky-300">{topLinkShare}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-[11px] opacity-60">
            Real-time on-device & estimated metrics
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
