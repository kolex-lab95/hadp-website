'use client';

import Image from 'next/image';
import {ChevronLeft, ChevronRight, Pause, Play} from 'lucide-react';
import {useCallback, useEffect, useRef, useState} from 'react';

type AlbumImage = Readonly<{src: string; width: number; height: number; alt: string}>;
type AlbumLabels = Readonly<{previous: string; next: string; pause: string; resume: string; navigation: string; viewImage: string}>;

export function ActionMediaAlbum({images, labels}: {images: readonly AlbumImage[]; labels: AlbumLabels}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const startX = useRef<number | null>(null);
  const total = images.length;
  const goTo = useCallback((index: number) => setActiveIndex((index + total) % total), [total]);
  const previous = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => { const query = window.matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setReducedMotion(query.matches); update(); query.addEventListener('change', update); return () => query.removeEventListener('change', update); }, []);
  useEffect(() => { if (paused || reducedMotion || total < 2) return; const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % total), 6200); return () => window.clearInterval(timer); }, [paused, reducedMotion, total]);

  return <div className="action-media-album" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }} onPointerDown={(event) => { startX.current = event.clientX; }} onPointerUp={(event) => { if (startX.current === null) return; const distance = event.clientX - startX.current; startX.current = null; if (Math.abs(distance) > 42) { if (distance > 0) previous(); else next(); } }} aria-roledescription="carousel">
    <div className="action-media-album-stage">{images.map((image, index) => <Image key={image.src} src={image.src} width={image.width} height={image.height} alt={image.alt} sizes="(max-width: 1023px) 100vw, 35vw" className="action-media-album-image" data-active={index === activeIndex} priority={index === 0} />)}</div>
    <button type="button" onClick={previous} className="album-control album-control--previous" aria-label={labels.previous}><ChevronLeft aria-hidden="true" /></button>
    <button type="button" onClick={next} className="album-control album-control--next" aria-label={labels.next}><ChevronRight aria-hidden="true" /></button>
    <div className="action-media-album-controls"><div className="action-media-album-dots" aria-label={labels.navigation}>{images.map((image, index) => <button key={image.src} type="button" onClick={() => goTo(index)} className="album-dot" aria-label={`${labels.viewImage} ${index + 1} / ${total}`} aria-current={index === activeIndex ? 'true' : undefined} />)}</div><button type="button" onClick={() => setPaused((value) => !value)} className="album-control album-control--pause" aria-label={paused ? labels.resume : labels.pause}>{paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}</button></div>
  </div>;
}
