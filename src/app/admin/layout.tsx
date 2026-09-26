import type {Metadata} from 'next';
import type {CSSProperties} from 'react';
import '@/styles/globals.css';

const adminFonts = {'--font-inter': 'Arial, sans-serif', '--font-manrope': 'Arial, sans-serif'} as CSSProperties;

export const metadata: Metadata = {robots: {index: false, follow: false}, title: 'Administration HADP'};
export default function AdminRootLayout({children}: {children: React.ReactNode}) {
  return <html lang="fr" style={adminFonts}><body>{children}</body></html>;
}
