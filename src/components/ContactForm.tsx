'use client';

import React, { useState } from 'react';
import { SiteConfig } from '@/config';
import { MessageSquarePlus, Send, Loader2 } from 'lucide-react';

interface ContactFormProps {
  contact: SiteConfig['contact'];
  onSuccess: (msg: string) => void;
}

export default function ContactForm({ contact, onSuccess }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // If user hasn't configured Web3Forms key yet, simulate instant demo success
    if (
      !contact.web3FormsAccessKey ||
      contact.web3FormsAccessKey === 'YOUR_WEB3FORMS_ACCESS_KEY_HERE'
    ) {
      setTimeout(() => {
        setIsSubmitting(false);
        setName('');
        setEmail('');
        setMessage('');
        onSuccess('Message received! (Add your Web3Forms key in config.ts for live email delivery)');
      }, 600);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: contact.web3FormsAccessKey,
          name,
          email,
          message,
          subject: `New Message from ${name} via Liquid Glass Bio`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setName('');
        setEmail('');
        setMessage('');
        onSuccess('Message sent directly to my inbox!');
      } else {
        onSuccess('Could not send right now. Please reach out on Telegram/Socials.');
      }
    } catch {
      onSuccess('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="liquid-glass rounded-3xl p-5 sm:p-6 flex flex-col gap-4">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-300">
          <MessageSquarePlus className="w-4 h-4 text-sky-400" />
          <span>{contact.title}</span>
        </div>
        <p className="text-xs sm:text-sm opacity-80 mt-1">{contact.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            aria-label="Your Name"
            className="glass-pill rounded-xl px-3.5 py-2.5 text-xs sm:text-sm placeholder:opacity-50 focus:outline-none focus:border-sky-400"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            aria-label="Your Email"
            className="glass-pill rounded-xl px-3.5 py-2.5 text-xs sm:text-sm placeholder:opacity-50 focus:outline-none focus:border-sky-400"
          />
        </div>

        <textarea
          rows={3}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about your project, wallpaper request, or question..."
          aria-label="Your Message"
          className="glass-pill rounded-xl p-3.5 text-xs sm:text-sm placeholder:opacity-50 focus:outline-none focus:border-sky-400 resize-none"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-[#071638] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 active:scale-98 disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </section>
  );
}
