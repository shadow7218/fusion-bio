export interface LinkItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  category: 'Featured' | 'Projects' | 'Wallpapers' | 'Resources';
  icon: string;
  badge?: string;
  featured?: boolean;
}

export interface SocialItem {
  platform: 'instagram' | 'x' | 'github' | 'youtube' | 'telegram' | 'discord' | 'threads' | 'linkedin' | 'tiktok' | 'pinterest';
  url: string;
  label: string;
  username: string;
}

export interface SiteConfig {
  profile: {
    name: string;
    handle: string;
    tagline: string;
    bio: string;
    avatar: string;
    banner: string;
    verified: boolean;
    location: string;
    statusText: string;
  };
  theme: {
    defaultMode: 'dark' | 'light';
    defaultAccent: 'royal' | 'cyan' | 'violet' | 'emerald' | 'rose';
    defaultBlur: 'sm' | 'md' | 'lg';
  };
  socials: SocialItem[];
  categories: ('All' | 'Featured' | 'Projects' | 'Wallpapers' | 'Resources')[];
  links: LinkItem[];
  embeds: {
    wallpaperGallery?: {
      enabled: boolean;
      title: string;
      subtitle: string;
      viewAllUrl: string;
      images: string[];
    };
    spotify: {
      enabled: boolean;
      title: string;
      embedUrl: string; // e.g., https://open.spotify.com/embed/track/...
    };
    newsletter: {
      enabled: boolean;
      title: string;
      description: string;
      placeholder: string;
      buttonText: string;
      formActionUrl: string; // Substack, Beehiiv, or Web3Forms endpoint
    };
  };
  contact: {
    enabled: boolean;
    title: string;
    subtitle: string;
    // Get your free key in 10 seconds at https://web3forms.com/ (just enter your email)
    web3FormsAccessKey: string;
  };
  seo: {
    title: string;
    description: string;
    url: string;
    ogImage: string;
    keywords: string[];
  };
}

export const siteConfig: SiteConfig = {
  profile: {
    name: 'FUSION',
    handle: '@fusionwallpaper',
    tagline: 'Digital Designer • Visual Aesthetics • Web Creator',
    bio: 'Crafting ultra-clean 4K mobile wallpapers, parametric 3D visuals, and modern web experiences straight from mobile.',
    avatar: '/IMG_20260329_192842.png',
    banner: '/20261020_205150.jpg',
    verified: true,
    location: 'USA',
    statusText: 'Dropping new 4K lockscreen packs weekly',
  },

  theme: {
    defaultMode: 'dark',
    defaultAccent: 'royal',
    defaultBlur: 'md',
  },

  socials: [
    {
      platform: 'telegram',
      url: 'https://t.me/fusionwallpaper',
      label: 'Telegram Channel',
      username: '@fusionwallpaper',
    },
    {
      platform: 'threads',
      url: 'https://www.threads.com/@fusionwallpaper',
      label: 'Threads',
      username: '@fusionwallpaper',
    },
    {
      platform: 'instagram',
      url: 'https://www.instagram.com/fusionwallpaper?cplk=MXdyYTFmeHQ2YXk4YQ==',
      label: 'Instagram',
      username: '@fusionwallpaper',
    },
    {
      platform: 'github',
      url: 'https://github.com/shadow7218',
      label: 'GitHub',
      username: 'github.com/shadow7218',
    },
    {
      platform: 'pinterest',
      url: 'https://pin.it/55ZLpAlDP',
      label: 'Pinterest',
      username: '@fusion',
    },
  ],

  categories: ['All', 'Featured', 'Wallpapers', 'Projects', 'Resources'],

  links: [
    {
      id: 'fusion-wallpapers',
      title: '4k Wallpapers — Official Telegram',
      subtitle: '4K anime and minimalist lockscreens',
      url: 'https://t.me/fusionwallvibe',
      category: 'Wallpapers',
      icon: '/my-logo.png.webp',
      badge: 'NEW DROP',
      featured: true,
    },
    {
      id: 'fusion-pc-wallpapers',
      title: 'PC Wallpapers — Official Telegram',
      subtitle: 'Ultra-wide & 4K desktop anime wallpapers',
      url: 'https://t.me/+JF18BTYzeb9lYjhl',
      category: 'Wallpapers',
      icon: 'Send',
      badge: 'PC 4K',
      featured: true,
    },
    {
      id: 'telegram-cloud-drops',
      title: 'Telegram 4K Wallpaper Vault',
      subtitle: 'Instant raw files, lockscreen setups & exclusive daily drops',
      url: 'https://t.me/username',
      category: 'Wallpapers',
      icon: 'Send',
      badge: 'FREE',
      featured: true,
    },
    {
      id: 'parametric-3d-studio',
      title: '3D Parametric Lampshade Generator',
      subtitle: 'Browser-based Three.js CAD tool with direct STL export for 3D printing',
      url: 'https://github.com/username/3d-generator',
      category: 'Projects',
      icon: 'Box',
    },
    {
      id: 'jdm-poster-series',
      title: 'Midnight Yokohama — GT-R R34 Poster Pack',
      subtitle: 'High-contrast silver & electric blue automotive graphic design series',
      url: 'https://instagram.com/username',
      category: 'Wallpapers',
      icon: 'Image',
    },
    {
      id: 'mobile-dev-workflow',
      title: 'Android-Only Web Dev Setup Guide',
      subtitle: 'How I build, test & deploy Next.js apps using only a smartphone',
      url: 'https://github.com/username',
      category: 'Resources',
      icon: 'Smartphone',
      badge: 'GUIDE',
    },
    {
      id: 'color-grading-luts',
      title: 'Mobile Photography & Sunbeam Presets',
      subtitle: 'My personal color grading parameters for outdoor & foliage shots',
      url: 'https://threads.net/@username',
      category: 'Resources',
      icon: 'Camera',
    },
  ],

    embeds: {
    wallpaperGallery: {
      enabled: true,
      title: 'Aesthetic Wallpapers Collection',
      subtitle: '5 wallpapers • 4K | Anime | Dark',
      viewAllUrl: 'https://t.me/fusionwallvibe',
      images: [
        '/Akane Kurokawa By @fusionwallvibe.jpg',
        '/Akane Sakuramori By @fusionwallvibe.jpg',
        '/Boa Hancock By @fusionwallvibe (1).jpg',
        '/Rei Ayanami By @fusionwallvibe.jpg',
        '/Marin Kitagawa By - @fusionwallvibe.jpg',
      ],
    },
    spotify: {
      enabled: true,
      title: 'Late Night Design Session Vibe',
      embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX8Uebhn9wzrS?utm_source=generator&theme=0',
    },
    newsletter: {
      enabled: true,
      title: 'Join the Inner Circle',
      description: 'Get notified whenever a new 4K wallpaper pack or open-source web tool drops. Zero spam.',
      placeholder: 'Enter your email address...',
      buttonText: 'Notify Me',
      formActionUrl: 'https://api.web3forms.com/submit',
    },
  },

  contact: {
    enabled: true,
    title: 'Direct Message & Collabs',
    subtitle: 'Have a custom design request, project idea, or question? Send a message straight to my inbox.',
    // Replace with your free key from https://web3forms.com
    web3FormsAccessKey: 'YOUR_WEB3FORMS_ACCESS_KEY_HERE',
  },

  seo: {
    title: 'FUSION | Official Links, 4K Wallpapers & Projects',
    description: 'Explore custom 4K anime wallpapers, digital graphic design, and mobile-first web projects.',
    url: 'https://username.github.io/liquid-glass-bio',
    ogImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    keywords: ['Fusion Wallpapers', 'Link in bio', 'Digital Design', '4K Anime Wallpapers', 'Next.js Liquid Glass'],
  },
};
