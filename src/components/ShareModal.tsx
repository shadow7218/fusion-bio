'use client';

import React, { useEffect, useState } from 'react';
import { SiteConfig } from '@/config';
import { X, Share2, Copy, ExternalLink } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: SiteConfig['profile'];
  onCopySuccess: () => void;
}

export default function ShareModal({
  isOpen,
  onClose,
  profile,
  onCopySuccess,
}: ShareModalProps) {
  const [currentUrl, setCurrentUrl] = useState('https://github.com');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=10&color=071638&bgcolor=F4FEFF&data=${encodeURIComponent(
    currentUrl
  )}`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.name} — Official Hub`,
          text: profile.tagline,
          url: currentUrl,
        });
      } catch {}
    } else {
      navigator.clipboard.writeText(currentUrl);
      onCopySuccess();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Share Profile"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md"
    >
      <div className="liquid-glass rounded-3xl w-full max-w-sm p-6 flex flex-col items-center text-center gap-4 border border-white/20">
        <div className="w-full flex items-center justify-between">
          <span className="text-sm font-bold">Share {profile.name} Hub</span>
          <button
            onClick={onClose}
            aria-label="Close Share Modal"
            className="p-1.5 rounded-full glass-pill"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Instant Scannable QR Card */}
        <div className="p-3 rounded-2xl bg-[#F4FEFF] shadow-xl">
          <img
            src={qrCodeApiUrl}
            alt="Profile QR Code"
            width={200}
            height={200}
            className="rounded-xl"
          />
        </div>

        <p className="text-xs opacity-75">
          Point any phone camera at the QR code to open this page immediately.
        </p>

        <div className="grid grid-cols-2 gap-2.5 w-full mt-1">
          <button
            onClick={() => {
              navigator.clipboard.writeText(currentUrl);
              onCopySuccess();
            }}
            className="glass-pill py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Copy className="w-3.5 h-3.5 text-sky-400" />
            <span>Copy Link</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="py-2.5 rounded-xl bg-sky-400 text-[#071638] text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Sheet</span>
          </button>
        </div>
      </div>
    </div>
  );
}
