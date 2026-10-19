'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SocialItem } from '@/config';
import {
  Instagram,
  Github,
  Youtube,
  Send,
  Linkedin,
  Globe,
  MessageSquare,
  AtSign,
} from 'lucide-react';

interface SocialGridProps {
  socials: SocialItem[];
}

export default function SocialGrid({ socials }: SocialGridProps) {
  const renderIcon = (platform: SocialItem['platform']) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'youtube':
        return <Youtube className="w-5 h-5" />;
      case 'telegram':
        return <Send className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'threads':
        return <AtSign className="w-5 h-5" />;
      case 'discord':
        return <MessageSquare className="w-5 h-5" />;
      case 'x':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  return (
    <nav aria-label="Social Media Links" className="w-full">
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {socials.map((item, idx) => (
          <motion.a
            key={item.platform + idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            title={`${item.label} (${item.username})`}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05, type: 'spring', stiffness: 300 }}
            whileHover={{ y: -4, scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="liquid-glass liquid-glass-interactive liquid-sheen w-12 h-12 rounded-2xl flex items-center justify-center text-sky-200 hover:text-white"
          >
            {renderIcon(item.platform)}
          </motion.a>
        ))}
      </div>
    </nav>
  );
}
