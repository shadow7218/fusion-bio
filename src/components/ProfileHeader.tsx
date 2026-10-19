'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, MapPin, Copy, QrCode } from 'lucide-react';
import { SiteConfig } from '@/config';

interface ProfileHeaderProps {
  profile: SiteConfig['profile'];
  onShareClick: () => void;
  onCopyUrl: () => void;
}

export default function ProfileHeader({
  profile,
  onShareClick,
  onCopyUrl,
}: ProfileHeaderProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="liquid-glass rounded-3xl p-6 sm:p-7 flex flex-col items-center text-center relative overflow-hidden"
    >
      {/* Top ambient refraction bar */}
      <div
        aria-hidden="true"
        className="w-24 h-1 rounded-full bg-gradient-to-r from-transparent via-sky-300/60 to-transparent mb-5"
      />

      {/* Avatar in Multi-Layered Frosted Frame */}
      <div className="relative group mb-4">
        <div
          aria-hidden="true"
          className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-sky-400 via-blue-600 to-cyan-300 opacity-75 blur-md group-hover:opacity-100 transition duration-500"
        />
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 liquid-glass overflow-hidden">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        {/* Live pulsing status dot */}
        <span
          title="Active"
          className="absolute bottom-1.5 right-1.5 flex h-4 w-4 items-center justify-center"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#071638]" />
        </span>
      </div>

      {/* Name + Verified Badge */}
      <div className="flex items-center justify-center gap-1.5">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {profile.name}
        </h1>
        {profile.verified && (
          <BadgeCheck
            className="w-6 h-6 text-sky-400 fill-sky-400/20 shrink-0"
            aria-label="Verified Creator"
          />
        )}
      </div>

      {/* Handle & Location */}
      <div className="flex items-center gap-2 text-xs opacity-75 mt-1 font-medium">
        <span>{profile.handle}</span>
        <span>•</span>
        <span className="flex items-center gap-0.5">
          <MapPin className="w-3 h-3 text-sky-400" />
          {profile.location}
        </span>
      </div>

      {/* Tagline */}
      <p className="mt-3 text-xs sm:text-sm font-semibold text-sky-300/95 tracking-wide">
        {profile.tagline}
      </p>

      {/* Bio */}
      <p className="mt-2 text-xs sm:text-sm opacity-80 max-w-md leading-relaxed">
        {profile.bio}
      </p>

      {/* Status Pill + Quick Actions */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 w-full">
        <div className="glass-pill px-3.5 py-1.5 rounded-full text-[11px] font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span>{profile.statusText}</span>
        </div>

        <button
          onClick={onCopyUrl}
          className="glass-pill px-3 py-1.5 rounded-full text-[11px] font-medium flex items-center gap-1.5 active:scale-95"
          title="Copy page URL"
        >
          <Copy className="w-3 h-3 text-sky-400" />
          <span>Copy URL</span>
        </button>

        <button
          onClick={onShareClick}
          className="glass-pill px-3 py-1.5 rounded-full text-[11px] font-medium flex items-center gap-1.5 active:scale-95"
          title="Show QR Code"
        >
          <QrCode className="w-3 h-3 text-sky-400" />
          <span>QR Code</span>
        </button>
      </div>
    </motion.section>
  );
}
