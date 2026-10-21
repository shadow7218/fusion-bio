'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { siteConfig } from '@/config';
import ProfileHeader from '@/components/ProfileHeader';
import SocialGrid from '@/components/SocialGrid';
import SearchAndFilter from '@/components/SearchAndFilter';
import LinkCard from '@/components/LinkCard';
import MediaEmbeds from '@/components/MediaEmbeds';
import ContactForm from '@/components/ContactForm';
import AnalyticsModal from '@/components/AnalyticsModal';
import ShareModal from '@/components/ShareModal';
import { BarChart3, Share2, CheckCircle2, Sparkles, Sun, Moon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [clicksMap, setClicksMap] = useState<Record<string, number>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Default to Dark Mode
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

  // Modals state
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  // Load saved local click analytics & theme mode on mount
  useEffect(() => {
    try {
      const storedClicks = localStorage.getItem('fusion_link_clicks');
      if (storedClicks) {
        setClicksMap(JSON.parse(storedClicks));
      }
      const savedTheme = localStorage.getItem('fusion_theme_mode') as 'dark' | 'light' | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeMode(savedTheme);
      }
    } catch {}
  }, []);

  // Apply Dark/Light theme and keep glass settings locked
  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    root.setAttribute('data-accent', siteConfig.theme.defaultAccent);
    root.setAttribute('data-blur', siteConfig.theme.defaultBlur);

    try {
      localStorage.setItem('fusion_theme_mode', themeMode);
    } catch {}
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2600);
  };

  const handleLinkClick = (id: string) => {
    setClicksMap((prev) => {
      const updated = { ...prev, [id]: (prev[id] || 0) + 1 };
      try {
        localStorage.setItem('fusion_link_clicks', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleResetAnalytics = () => {
    setClicksMap({});
    try {
      localStorage.removeItem('fusion_link_clicks');
    } catch {}
    triggerToast('Analytics data cleared');
  };

  const filteredLinks = useMemo(() => {
    return siteConfig.links.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden pb-20 pt-6 px-4 sm:px-6 flex flex-col items-center">
      {/* =================================================================
          FLOATING TOP UTILITY BAR (Pill Toggle Switch on Left)
          ================================================================= */}
      <header className="w-full max-w-xl flex items-center justify-between mb-6 z-20">
        {/* Sliding Dark/Light Pill Switch */}
        <button
          type="button"
          role="switch"
          aria-checked={themeMode === 'light'}
          aria-label="Toggle Dark or Light Mode"
          onClick={toggleTheme}
          className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-300 flex items-center shadow-md border ${
            themeMode === 'dark'
              ? 'bg-[#2b2d31] border-white/15'
              : 'bg-white border-slate-300 shadow-slate-300/60'
          }`}
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 32 }}
            className={`w-6 h-6 rounded-full flex items-center justify-center shadow-sm ${
              themeMode === 'dark'
                ? 'bg-white text-slate-900 translate-x-0'
                : 'bg-[#071638] text-white ml-auto'
            }`}
          >
            {themeMode === 'dark' ? (
              <Sun className="w-3.5 h-3.5 stroke-[2.4]" />
            ) : (
              <Moon className="w-3.5 h-3.5 fill-current" />
            )}
          </motion.div>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAnalyticsOpen(true)}
            aria-label="Open Local Click Analytics"
            className="glass-pill flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium active:scale-95"
          >
            <BarChart3 className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
            <span>Stats</span>
          </button>

          <button
            onClick={() => setIsShareOpen(true)}
            aria-label="Share Profile and QR Code"
            className="glass-pill flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
            <span>Share</span>
          </button>
        </div>
      </header>

      {/* =================================================================
          MAIN CONTENT CONTAINER
          ================================================================= */}
      <main className="w-full max-w-xl flex flex-col gap-6 z-10">
        {/* 1. Profile Header */}
        <ProfileHeader
          profile={siteConfig.profile}
          onShareClick={() => setIsShareOpen(true)}
          onCopyUrl={() => {
            navigator.clipboard.writeText(window.location.href);
            triggerToast('Profile link copied to clipboard!');
          }}
        />

        {/* 2. Social Icon Grid */}
        <SocialGrid socials={siteConfig.socials} />

        {/* 3. Search & Category Filter Bar */}
        <SearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categories={siteConfig.categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* 4. Interactive Liquid Glass Link Cards */}
        <section aria-label="Links List" className="flex flex-col gap-3.5">
          <AnimatePresence mode="popLayout">
            {filteredLinks.length > 0 ? (
              filteredLinks.map((link, index) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  index={index}
                  clickCount={clicksMap[link.id] || 0}
                  onLinkClick={() => handleLinkClick(link.id)}
                  onCopyLink={(url) => {
                    navigator.clipboard.writeText(url);
                    triggerToast(`Copied "${link.title}" link!`);
                  }}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="liquid-glass rounded-2xl p-8 text-center"
              >
                <p className="text-sm opacity-80">
                  No links match &ldquo;{searchQuery}&rdquo; in {activeCategory}.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="mt-3 text-xs font-semibold text-sky-500 dark:text-sky-400 underline underline-offset-4"
                >
                  Reset filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* 5. Embedded Rich Media */}
        <MediaEmbeds
          embeds={siteConfig.embeds}
          onNotifySuccess={(msg) => triggerToast(msg)}
        />

        {/* 6. Contact Form */}
        {siteConfig.contact.enabled && (
          <ContactForm
            contact={siteConfig.contact}
            onSuccess={(msg) => triggerToast(msg)}
          />
        )}
      </main>

      {/* =================================================================
          FOOTER
          ================================================================= */}
      <footer className="mt-14 text-center text-xs opacity-70 flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
          <span>{siteConfig.profile.name} • Liquid Glass Edition</span>
        </div>
        <p>Built & deployed 100% from Android</p>
      </footer>

      {/* =================================================================
          TOAST NOTIFICATION
          ================================================================= */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            role="status"
            className="fixed bottom-6 z-50 liquid-glass px-4 py-2.5 rounded-full flex items-center gap-2 text-xs font-semibold shadow-2xl border border-sky-400/40"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =================================================================
          MODALS (Analytics & Share only)
          ================================================================= */}
      <AnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        links={siteConfig.links}
        clicksMap={clicksMap}
        onReset={handleResetAnalytics}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        profile={siteConfig.profile}
        onCopySuccess={() => triggerToast('Link copied to clipboard!')}
      />
    </div>
  );
}
