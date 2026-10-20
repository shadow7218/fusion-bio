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
      case 'pinterest':
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z"/>
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
