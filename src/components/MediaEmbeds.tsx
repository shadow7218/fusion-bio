'use client';

import React, { useState } from 'react';
import { SiteConfig } from '@/config';
import { Sparkles, Music, Mail, ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface MediaEmbedsProps {
  embeds: SiteConfig['embeds'];
  onNotifySuccess: (msg: string) => void;
}

export default function MediaEmbeds({ embeds, onNotifySuccess }: MediaEmbedsProps) {
  const [email, setEmail] = useState('');
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const gallery = embeds.wallpaperGallery;

  const handleNext = () => {
    if (gallery && gallery.images && gallery.images.length > 0) {
      setActiveImgIndex((prev) => (prev + 1) % gallery.images.length);
    }
  };

  const handlePrev = () => {
    if (gallery && gallery.images && gallery.images.length > 0) {
      setActiveImgIndex((prev) => (prev - 1 + gallery.images.length) % gallery.images.length);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onNotifySuccess('Subscribed! Welcome to the inner circle.');
    setEmail('');
  };

  return (
    <div className="flex flex-col gap-5">
      {/* 1. Wallpaper Gallery Showcase Carousel */}
      {gallery && gallery.enabled && (
        <section className="liquid-glass rounded-3xl p-4 sm:p-5 flex flex-col gap-3.5 relative overflow-hidden">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-300">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Featured Showcase — {gallery.title}</span>
          </div>

          <div className="relative w-full overflow-hidden rounded-2xl aspect-[16/9] bg-black/40 border border-white/10 group">
            {gallery.images && gallery.images.length > 0 && (
              <img
                src={gallery.images[activeImgIndex]}
                alt="Wallpaper preview"
                className="w-full h-full object-cover transition-transform duration-500"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#071638]/80 via-transparent to-transparent" />

            <button
              onClick={handlePrev}
              aria-label="Previous wallpaper"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass-pill flex items-center justify-center opacity-80 hover:opacity-100 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next wallpaper"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass-pill flex items-center justify-center opacity-80 hover:opacity-100 active:scale-95"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex flex-col min-w-0">
              <h3 className="text-xs sm:text-sm font-bold truncate text-sky-200">
                {gallery.title}
              </h3>
              <p className="text-[11px] opacity-75 truncate">
                {gallery.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-semibold opacity-80">
                {activeImgIndex + 1}/{gallery.images?.length || 1}
              </span>
              <a
                href={gallery.viewAllUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-sky-400 hover:bg-sky-300 text-[#071638] font-bold text-xs flex items-center gap-1.5 shadow-lg active:scale-95 transition"
              >
                <span>View All</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 2. Spotify Embed */}
      {embeds.spotify.enabled && (
        <section className="liquid-glass rounded-3xl p-4 sm:p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-300">
            <Music className="w-4 h-4 text-emerald-400" />
            <span>{embeds.spotify.title}</span>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <iframe
              src={embeds.spotify.embedUrl}
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={embeds.spotify.title}
              className="rounded-2xl"
            />
          </div>
        </section>
      )}

      {/* 3. Newsletter Drop Alert */}
      {embeds.newsletter.enabled && (
        <section className="liquid-glass rounded-3xl p-5 sm:p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-300">
            <Mail className="w-4 h-4 text-sky-400" />
            <span>{embeds.newsletter.title}</span>
          </div>
          <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
            {embeds.newsletter.description}
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2 mt-1">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={embeds.newsletter.placeholder}
              aria-label="Email address for newsletter"
              className="flex-1 glass-pill rounded-xl px-3.5 py-2.5 text-xs sm:text-sm placeholder:opacity-50 focus:outline-none focus:border-sky-400"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-[#071638] font-bold text-xs sm:text-sm flex items-center gap-1.5 shrink-0 active:scale-95 transition"
            >
              <span>{embeds.newsletter.buttonText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
