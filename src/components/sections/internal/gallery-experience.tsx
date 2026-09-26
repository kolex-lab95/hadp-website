'use client';

import Image from 'next/image';
import {ChevronLeft, ChevronRight, X} from 'lucide-react';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

type GalleryImage = Readonly<{src: string; width: number; height: number; alt: string; unoptimized?: boolean}>;
type GalleryGroup = Readonly<{id: string; title: string; imageCaption?: string; images: readonly GalleryImage[]}>;
type GalleryLabels = Readonly<{openImage: string; close: string; previous: string; next: string; image: string}>;

export function GalleryExperience({groups, labels}: {groups: readonly GalleryGroup[]; labels: GalleryLabels}) {
  const allImages = useMemo(() => groups.flatMap((group) => group.images.map((image) => ({...image, groupTitle: group.title}))), [groups]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const startX = useRef<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement | null>(null);
  const activeImage = activeIndex === null ? null : allImages[activeIndex];
  const close = useCallback(() => setActiveIndex(null), []);
  const previous = useCallback(() => setActiveIndex((index) => index === null ? null : (index - 1 + allImages.length) % allImages.length), [allImages.length]);
  const next = useCallback(() => setActiveIndex((index) => index === null ? null : (index + 1) % allImages.length), [allImages.length]);

  useEffect(() => { if (activeIndex === null) return; window.requestAnimationFrame(() => closeButton.current?.focus()); const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); if (event.key === 'ArrowLeft') previous(); if (event.key === 'ArrowRight') next(); }; const previousOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden'; window.addEventListener('keydown', onKeyDown); return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', onKeyDown); }; }, [activeIndex, close, next, previous]);
  useEffect(() => { if (activeIndex === null) opener.current?.focus(); }, [activeIndex]);

  return <><div className="gallery-experience">{groups.map((group, groupIndex) => { const offset = groups.slice(0, groupIndex).reduce((total, item) => total + item.images.length, 0); return <section key={group.id} className={`gallery-activity gallery-activity--${group.id}`} aria-labelledby={`gallery-group-${group.id}`}><div className="gallery-activity-heading"><h2 id={`gallery-group-${group.id}`} className="heading-section mt-3">{group.title}</h2></div><div className={`gallery-page-grid gallery-page-grid--${group.id}`}>{group.images.map((image, index) => <button key={image.src} type="button" className={`gallery-page-item gallery-page-item--${index + 1}`} onClick={(event) => { opener.current = event.currentTarget; setActiveIndex(offset + index); }} aria-label={`${labels.openImage} ${offset + index + 1} / ${allImages.length}`}><span className="gallery-page-index" aria-hidden="true">{String(offset + index + 1).padStart(2, '0')}</span><Image src={image.src} width={image.width} height={image.height} alt={image.alt} unoptimized={image.unoptimized} sizes={index === 0 ? '(max-width: 767px) 100vw, 62vw' : '(max-width: 767px) 100vw, 38vw'} className="h-full w-full object-cover" />{group.imageCaption && index === 0 ? <span className="gallery-page-caption" aria-hidden="true">{group.imageCaption}</span> : null}</button>)}</div></section>; })}</div>{activeImage ? <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`${activeImage.groupTitle}, ${labels.image} ${(activeIndex ?? 0) + 1} / ${allImages.length}`} onClick={close} onPointerDown={(event) => { startX.current = event.clientX; }} onPointerUp={(event) => { if (startX.current === null) return; const distance = event.clientX - startX.current; startX.current = null; if (Math.abs(distance) > 42) { if (distance > 0) previous(); else next(); } }}><div className="gallery-lightbox-panel" onClick={(event) => event.stopPropagation()}><div className="gallery-lightbox-top"><span>{(activeIndex ?? 0) + 1} / {allImages.length}</span><button type="button" className="gallery-lightbox-close" onClick={close} ref={closeButton}><X aria-hidden="true" /><span>{labels.close}</span></button></div><button type="button" className="gallery-lightbox-nav gallery-lightbox-nav--previous" onClick={previous} aria-label={labels.previous}><ChevronLeft aria-hidden="true" /></button><figure className="gallery-lightbox-image"><Image src={activeImage.src} width={activeImage.width} height={activeImage.height} alt={activeImage.alt} unoptimized={activeImage.unoptimized} sizes="100vw" priority /></figure><button type="button" className="gallery-lightbox-nav gallery-lightbox-nav--next" onClick={next} aria-label={labels.next}><ChevronRight aria-hidden="true" /></button></div></div> : null}</>;
}
