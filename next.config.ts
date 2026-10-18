import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const config: NextConfig = {
  poweredByHeader: false,
  images: {formats: ['image/avif', 'image/webp'], remotePatterns: [{protocol: 'https', hostname: '*.supabase.co'}]},
  turbopack: {root: process.cwd()},
};

export default createNextIntlPlugin('./src/i18n/request.ts')(config);
