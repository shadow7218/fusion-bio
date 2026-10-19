'use client';

import React from 'react';
import { X, Sun, Moon, Sparkles } from 'lucide-react';

interface ThemeCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  themeMode: 'dark' | 'light';
  onThemeModeChange: (m: 'dark' | 'light') => void;
  accent: string;
  onAccentChange: (a: string) => void;
  blurLevel: 'sm' | 'md' | 'lg';
  onBlurLevelChange: (b: 'sm' | 'md' | 'lg') => void;
}

const ACCENTS = [
  { id: 'royal', label: 'Fusion Ice Blue', color: 'bg-sky-400' },
  { id: 'cyan', label: 'Cyber Cyan', color: 'bg-cyan-400' },
  { id: 'violet', label: 'Nebula Violet', color: 'bg-purple-500' },
  { id: 'emerald', label: 'Matrix Emerald', color: 'bg-emerald-400' },
  { id: 'rose', label: 'Crimson Rose', color: 'bg-rose-500' },
];

export default function ThemeCustomizer({
  isOpen,
  onClose,
  themeMode,
  onThemeModeChange,
  accent,
  onAccentChange,
  blurLevel,
  onBlurLevelChange,
}: ThemeCustomizerProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Theme Customizer"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md"
    >
      <div className="liquid-glass rounded-3xl w-full max-w-sm p-6 flex flex-col gap-5 border border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-400" />
            <h2 className="text-base font-bold">Liquid Glass Customizer</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Theme Customizer"
            className="p-1.5 rounded-full glass-pill"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1. Mode Switcher */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold opacity-75">Surface Mode</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onThemeModeChange('dark')}
              className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border ${
                themeMode === 'dark'
                  ? 'bg-sky-400 text-[#071638] border-sky-400'
                  : 'glass-pill border-transparent'
              }`}
            >
              <Moon className="w-4 h-4" />
              <span>Deep Navy</span>
            </button>
            <button
              onClick={() => onThemeModeChange('light')}
              className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border ${
                themeMode === 'light'
                  ? 'bg-sky-400 text-[#071638] border-sky-400'
                  : 'glass-pill border-transparent'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>Ice Daylight</span>
            </button>
          </div>
        </div>

        {/* 2. Accent Glow Picker */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold opacity-75">Refraction Glow</span>
          <div className="flex items-center justify-between gap-2">
            {ACCENTS.map((item) => (
              <button
                key={item.id}
                onClick={() => onAccentChange(item.id)}
                title={item.label}
                aria-label={item.label}
                className={`w-10 h-10 rounded-full ${item.color} transition-transform ${
                  accent === item.id
                    ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-[#071638]'
                    : 'opacity-70 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 3. Frosted Blur Depth */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold opacity-75">
            Frosted Glass Refraction
          </span>
          <div className="grid grid-cols-3 gap-2">
            {(['sm', 'md', 'lg'] as const).map((level) => (
              <button
                key={level}
                onClick={() => onBlurLevelChange(level)}
                className={`py-2 rounded-xl text-xs font-bold uppercase ${
                  blurLevel === level
                    ? 'bg-sky-400 text-[#071638]'
                    : 'glass-pill'
                }`}
              >
                {level === 'sm' ? 'Subtle' : level === 'md' ? 'Balanced' : 'Ultra'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

