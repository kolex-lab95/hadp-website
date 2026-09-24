'use client';

import type {ReactNode} from 'react';
import {Music2, Play} from 'lucide-react';
import {socials, type SocialId} from '@/config/socials';

type SocialLinksProps = Readonly<{
  socialTitle: string;
  unavailableLabel: string;
  opensNewWindowLabel: string;
}>;

function SocialIcon({id}: {id: SocialId}): ReactNode {
  if (id === 'linkedin') return <span aria-hidden="true" className="social-letter social-letter--linkedin">in</span>;
  if (id === 'facebook') return <span aria-hidden="true" className="social-letter">f</span>;
  if (id === 'x') return <span aria-hidden="true" className="social-letter social-letter--x">X</span>;
  if (id === 'youtube') return <Play aria-hidden="true" />;
  return <Music2 aria-hidden="true" />;
}

export function SocialLinks({socialTitle, unavailableLabel, opensNewWindowLabel}: SocialLinksProps) {
  return <ul className="social-list" aria-label={socialTitle}>
    {socials.map((network) => <li key={network.id}>
      {network.url
        ? <a className="social-icon" href={network.url} target="_blank" rel="me noopener noreferrer"
            aria-label={`${network.label} — ${opensNewWindowLabel}`} title={network.label}>
            <SocialIcon id={network.id} />
          </a>
        : <button type="button" className="social-icon social-icon--unavailable"
            aria-label={`${network.label} — ${unavailableLabel}`} title={`${network.label} — ${unavailableLabel}`}>
            <SocialIcon id={network.id} />
          </button>}
    </li>)}
  </ul>;
}
