'use client';

import React, { useState } from 'react';
import { SiteConfig } from '@/config';
import { Youtube, Music, Mail, ArrowRight } from 'lucide-react';

interface MediaEmbedsProps {
  embeds: SiteConfig['embeds'];
  onNotifySuccess: (msg: string) => void;
}

export default function MediaEmbeds({ embeds, onNotifySuccess }: MediaEmbedsProps) {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onNotifySuccess('Subscribed! Welcome to the inner circle.');
    setEmail('');
  };

  return (
    <div className="flex flex-col gap-5">
      {/* 1. YouTube Showcase */}
      {embeds.youtube.enabled && (
        <section className="liquid-glass rounded-3xl p-4 sm:p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-300">
            <Youtube className="w-4 h-4 text-rose-500" />
            <span>{embeds.youtube.title}</span>
          </div>
          <div className="relative w-full overflow-hidden rounded-2xl aspect-video bg-black/40 border border-white/10">
            <iframe
              src={`https://www.youtube.com/embed/${embeds.youtube.videoId}`}
              title={embeds.youtube.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
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
