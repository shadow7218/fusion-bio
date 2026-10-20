'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LinkItem } from '@/config';
import {
  Sparkles,
  Send,
  Box,
  Image as ImageIcon,
  Smartphone,
  Camera,
  ExternalLink,
  Copy,
  Globe,
  Code,
  Zap,
} from 'lucide-react';

interface LinkCardProps {
  link: LinkItem;
  index: number;
  clickCount: number;
  onLinkClick: () => void;
  onCopyLink: (url: string) => void;
}

export default function LinkCard({
  link,
  index,
  clickCount,
  onLinkClick,
  onCopyLink,
}: LinkCardProps) {
      const renderIcon = (iconName: string) => {
    if (iconName.startsWith('/') || iconName.startsWith('http') || iconName.startsWith('./')) {
      return <img src={iconName} alt="" className="w-full h-full object-cover rounded-xl" />;
    }

    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-sky-300" />;
      case 'Send':
        return <Send className="w-5 h-5 text-sky-300" />;
      case 'Box':
        return <Box className="w-5 h-5 text-sky-300" />;
      case 'Image':
        return <ImageIcon className="w-5 h-5 text-sky-300" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-sky-300" />;
      case 'Camera':
        return <Camera className="w-5 h-5 text-sky-300" />;
      case 'Code':
        return <Code className="w-5 h-5 text-sky-300" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-sky-300" />;
      default:
        return <Globe className="w-5 h-5 text-sky-300" />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      whileHover={{ scale: 1.015, y: -2 }}
      whileTap={{ scale: 0.985 }}
      className={`liquid-glass liquid-glass-interactive liquid-sheen rounded-2xl p-4 sm:p-4.5 flex items-center justify-between gap-3.5 group ${
        link.featured ? 'border-sky-400/40' : ''
      }`}
    >
      {/* Main Clickable Area */}
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onLinkClick}
        className="flex items-center gap-3.5 flex-1 min-w-0"
      >
        {/* Frosted Icon Container */}
        <div className="w-12 h-12 rounded-xl glass-pill flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          {renderIcon(link.icon)}
        </div>

        {/* Text Metadata */}
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-sm sm:text-base font-bold truncate">
              {link.title}
            </h2>
            {link.badge && (
              <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-sky-400/20 text-sky-300 border border-sky-400/30">
                {link.badge}
              </span>
            )}
          </div>
          <p className="text-xs opacity-75 line-clamp-1 mt-0.5">
            {link.subtitle}
          </p>
          {clickCount > 0 && (
            <span className="text-[10px] text-sky-400/90 font-medium mt-1">
              {clickCount} {clickCount === 1 ? 'tap' : 'taps'}
            </span>
          )}
        </div>
      </a>

      {/* Right Action Buttons */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onCopyLink(link.url);
          }}
          aria-label={`Copy link for ${link.title}`}
          title="Copy link"
          className="p-2 rounded-xl glass-pill opacity-75 hover:opacity-100 active:scale-90"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>

        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onLinkClick}
          aria-label={`Open ${link.title}`}
          className="p-2 rounded-xl glass-pill opacity-75 group-hover:opacity-100 group-hover:text-sky-300"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}
