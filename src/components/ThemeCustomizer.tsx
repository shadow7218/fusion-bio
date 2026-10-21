'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Moon, Sun, Info, Waves, Eye, Check } from 'lucide-react';

interface ThemeCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  themeMode: 'dark' | 'light';
  onThemeModeChange: (mode: 'dark' | 'light') => void;
  accent: string;
  onAccentChange: (accent: string) => void;
  blurLevel: 'sm' | 'md' | 'lg';
  onBlurLevelChange: (blur: 'sm' | 'md' | 'lg') => void;
}

const ACCENTS = [
  { id: 'royal', label: 'Ice Blue', color: '#38bdf8' },
  { id: 'cyan', label: 'Aqua', color: '#4dd0e1' },
  { id: 'violet', label: 'Purple', color: '#b388ff' },
  { id: 'emerald', label: 'Mint', color: '#4ade80' },
  { id: 'rose', label: 'Coral', color: '#fb7185' },
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
  const [transparency, setTransparency] = useState<number>(72);
  const [customBlurPx, setCustomBlurPx] = useState<number>(18);
  const [edgeHighlights, setEdgeHighlights] = useState<boolean>(true);
  const [dynamicReflections, setDynamicReflections] = useState<boolean>(true);
  const [previewOnPage, setPreviewOnPage] = useState<boolean>(true);

  const isLight = themeMode === 'light';

  // Load saved advanced glass preferences on mount
  useEffect(() => {
    try {
      const savedTrans = localStorage.getItem('fusion_glass_transparency');
      const savedBlurPx = localStorage.getItem('fusion_glass_blur_px');
      const savedEdge = localStorage.getItem('fusion_edge_highlights');
      const savedRefl = localStorage.getItem('fusion_dynamic_reflections');

      if (savedTrans) setTransparency(Number(savedTrans));
      if (savedBlurPx) setCustomBlurPx(Number(savedBlurPx));
      if (savedEdge !== null) setEdgeHighlights(savedEdge === 'true');
      if (savedRefl !== null) setDynamicReflections(savedRefl === 'true');
    } catch {}
  }, []);

  // Sync preset buttons (Subtle / Balanced / Ultra) with Blur Strength slider
  const handlePresetBlur = (level: 'sm' | 'md' | 'lg') => {
    onBlurLevelChange(level);
    const px = level === 'sm' ? 10 : level === 'md' ? 18 : 30;
    setCustomBlurPx(px);
  };

  // Apply real-time CSS variables to the page
  useEffect(() => {
    if (!previewOnPage) return;
    const root = document.documentElement;
    // Higher transparency % = more translucent glass
    const alpha = Math.max(0.18, Math.min(0.92, 1 - (transparency - 15) * 0.0075));
    root.style.setProperty('--glass-alpha', alpha.toFixed(2));
    root.style.setProperty('--glass-blur', `${customBlurPx}px`);
    root.setAttribute('data-edge', edgeHighlights ? 'on' : 'off');
    root.setAttribute('data-reflections', dynamicReflections ? 'on' : 'off');

    try {
      localStorage.setItem('fusion_glass_transparency', String(transparency));
      localStorage.setItem('fusion_glass_blur_px', String(customBlurPx));
      localStorage.setItem('fusion_edge_highlights', String(edgeHighlights));
      localStorage.setItem('fusion_dynamic_reflections', String(dynamicReflections));
    } catch {}
  }, [transparency, customBlurPx, edgeHighlights, dynamicReflections, previewOnPage]);

  const handleReset = () => {
    onThemeModeChange('dark');
    onAccentChange('royal');
    onBlurLevelChange('md');
    setTransparency(72);
    setCustomBlurPx(18);
    setEdgeHighlights(true);
    setDynamicReflections(true);
    setPreviewOnPage(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Frosted Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
          />

          {/* Glowing Liquid Glass Customizer Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className={`relative z-10 w-full max-w-[390px] rounded-[34px] p-5 sm:p-6 backdrop-blur-2xl transition-all duration-300 ${
              isLight
                ? 'bg-gradient-to-b from-[#e4f0fb]/90 via-[#d5e6f7]/85 to-[#c7ddf4]/90 text-[#071638] border-[1.5px] border-white/90 shadow-[0_0_45px_rgba(255,255,255,0.45),0_25px_50px_-12px_rgba(7,22,56,0.35),inset_0_2px_4px_rgba(255,255,255,0.95)]'
                : 'bg-gradient-to-b from-[#13285c]/90 via-[#0b1c44]/90 to-[#071330]/95 text-[#F4FEFF] border-[1.5px] border-sky-200/35 shadow-[0_0_45px_rgba(56,189,248,0.22),0_25px_50px_-12px_rgba(0,0,0,0.75),inset_0_1.5px_3px_rgba(255,255,255,0.4)]'
            }`}
          >
            {/* Top Specular Edge Glow */}
            <div className="pointer-events-none absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#29b6f6] drop-shadow-[0_0_8px_rgba(41,182,246,0.6)]" />
                <h2 className="text-[19px] font-bold tracking-tight">
                  Liquid Glass Customizer
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close customizer"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition active:scale-90 ${
                  isLight
                    ? 'bg-white/75 text-[#071638] shadow-sm border border-white'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* 1. Surface Mode (Segmented Pill) */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-xs font-semibold opacity-80">Surface Mode</span>
                  <Info className="w-3.5 h-3.5 opacity-45" />
                </div>
                <div
                  className={`grid grid-cols-2 p-1 rounded-2xl border ${
                    isLight
                      ? 'bg-white/55 border-white/80 shadow-inner'
                      : 'bg-slate-950/45 border-white/15'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onThemeModeChange('dark')}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      themeMode === 'dark'
                        ? 'bg-gradient-to-r from-[#29b6f6] to-[#38bdf8] text-[#071638] shadow-[0_4px_14px_rgba(56,189,248,0.45)]'
                        : 'opacity-75 hover:opacity-100'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>Deep Navy</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onThemeModeChange('light')}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      themeMode === 'light'
                        ? 'bg-gradient-to-r from-[#29b6f6] to-[#38bdf8] text-[#071638] shadow-[0_4px_14px_rgba(56,189,248,0.45)]'
                        : 'opacity-75 hover:opacity-100'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>Ice Daylight</span>
                  </button>
                </div>
              </div>

              {/* 2. Glass Transparency Slider */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-xs font-semibold opacity-80">Glass Transparency</span>
                  <Info className="w-3.5 h-3.5 opacity-45" />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={20}
                    max={90}
                    value={transparency}
                    onChange={(e) => setTransparency(Number(e.target.value))}
                    style={{
                      background: `linear-gradient(to right, #29b6f6 0%, #29b6f6 ${
                        ((transparency - 20) / 70) * 100
                      }%, rgba(148, 163, 184, 0.35) ${
                        ((transparency - 20) / 70) * 100
                      }%, rgba(148, 163, 184, 0.35) 100%)`,
                    }}
                    className="custom-range flex-1 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold min-w-[48px] text-center border ${
                      isLight
                        ? 'bg-white/65 border-white text-[#071638]'
                        : 'bg-white/10 border-white/20 text-white'
                    }`}
                  >
                    {transparency}%
                  </span>
                </div>
              </div>

              {/* 3. Refraction Glow Swatches with Labels */}
              <div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <span className="text-xs font-semibold opacity-80">Refraction Glow</span>
                  <Info className="w-3.5 h-3.5 opacity-45" />
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {ACCENTS.map((item) => {
                    const isSelected = accent === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => onAccentChange(item.id)}
                        className="flex flex-col items-center gap-1.5 group focus:outline-none"
                      >
                        <div
                          className={`w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-200 ${
                            isSelected
                              ? 'scale-105 ring-[2.5px] ring-white shadow-[0_0_16px_rgba(56,189,248,0.65)]'
                              : 'opacity-85 hover:opacity-100 hover:scale-105 border border-white/50'
                          }`}
                          style={{ backgroundColor: item.color }}
                        />
                        <span
                          className={`text-[11px] font-medium tracking-tight ${
                            isSelected ? 'font-bold opacity-100' : 'opacity-75'
                          }`}
                        >
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Frosted Glass Refraction (Segmented Pill) */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-xs font-semibold opacity-80">
                    Frosted <strong className="font-bold">Glass Refraction</strong>
                  </span>
                  <Info className="w-3.5 h-3.5 opacity-45" />
                </div>
                <div
                  className={`grid grid-cols-3 p-1 rounded-2xl border ${
                    isLight
                      ? 'bg-white/55 border-white/80 shadow-inner'
                      : 'bg-slate-950/45 border-white/15'
                  }`}
                >
                  {(
                    [
                      { id: 'sm', label: 'Subtle' },
                      { id: 'md', label: 'Balanced' },
                      { id: 'lg', label: 'Ultra' },
                    ] as const
                  ).map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => handlePresetBlur(b.id)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        blurLevel === b.id
                          ? 'bg-gradient-to-r from-[#29b6f6] to-[#38bdf8] text-[#071638] shadow-[0_4px_12px_rgba(56,189,248,0.4)]'
                          : 'opacity-75 hover:opacity-100'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Blur Strength Slider */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-xs font-semibold opacity-80">Blur Strength</span>
                  <Info className="w-3.5 h-3.5 opacity-45" />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={4}
                    max={40}
                    value={customBlurPx}
                    onChange={(e) => setCustomBlurPx(Number(e.target.value))}
                    style={{
                      background: `linear-gradient(to right, #29b6f6 0%, #29b6f6 ${
                        ((customBlurPx - 4) / 36) * 100
                      }%, rgba(148, 163, 184, 0.35) ${
                        ((customBlurPx - 4) / 36) * 100
                      }%, rgba(148, 163, 184, 0.35) 100%)`,
                    }}
                    className="custom-range flex-1 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold min-w-[48px] text-center border ${
                      isLight
                        ? 'bg-white/65 border-white text-[#071638]'
                        : 'bg-white/10 border-white/20 text-white'
                    }`}
                  >
                    {customBlurPx}px
                  </span>
                </div>
              </div>

              {/* 6. Interactive Toggle Rows */}
              <div
                className={`flex flex-col divide-y ${
                  isLight ? 'divide-[#071638]/10' : 'divide-white/10'
                } border-t border-b ${
                  isLight ? 'border-[#071638]/10' : 'border-white/10'
                }`}
              >
                {/* Edge Highlights */}
                <div className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        isLight
                          ? 'bg-white/70 border-white text-[#071638]'
                          : 'bg-white/10 border-white/15 text-sky-300'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold leading-tight">Edge Highlights</p>
                      <p className="text-[11px] opacity-65 truncate">
                        Adds subtle edge lighting for a premium look.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={edgeHighlights}
                    onClick={() => setEdgeHighlights(!edgeHighlights)}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 flex items-center ${
                      edgeHighlights ? 'bg-[#29b6f6]' : 'bg-slate-400/40'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                        edgeHighlights ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Dynamic Reflections */}
                <div className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        isLight
                          ? 'bg-white/70 border-white text-[#071638]'
                          : 'bg-white/10 border-white/15 text-sky-300'
                      }`}
                    >
                      <Waves className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold leading-tight">Dynamic Reflections</p>
                      <p className="text-[11px] opacity-65 truncate">
                        Real-time light and movement reflections.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={dynamicReflections}
                    onClick={() => setDynamicReflections(!dynamicReflections)}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 flex items-center ${
                      dynamicReflections ? 'bg-[#29b6f6]' : 'bg-slate-400/40'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                        dynamicReflections ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Preview on page */}
                <div className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        isLight
                          ? 'bg-white/70 border-white text-[#071638]'
                          : 'bg-white/10 border-white/15 text-sky-300'
                      }`}
                    >
                      <Eye className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold leading-tight">Preview on page</p>
                      <p className="text-[11px] opacity-65 truncate">
                        See changes in real time.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={previewOnPage}
                    onClick={() => setPreviewOnPage(!previewOnPage)}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 flex items-center ${
                      previewOnPage ? 'bg-[#29b6f6]' : 'bg-slate-400/40'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                        previewOnPage ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* 7. Footer Actions (Reset & Apply Changes) */}
              <div className="flex items-center justify-between gap-4 pt-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-2xl text-xs font-bold opacity-80 hover:opacity-100 active:scale-95 transition"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-[#29b6f6] to-[#38bdf8] text-[#071638] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(41,182,246,0.45)] border border-white/50 active:scale-95 transition"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Apply Changes</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
