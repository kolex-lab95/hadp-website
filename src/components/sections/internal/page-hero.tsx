import Image from 'next/image';
import {Container} from '@/components/ui/container';

type Props = Readonly<{
  eyebrow: string;
  title: string;
  description: string;
  image: {src: string; width: number; height: number; alt: string};
  className?: string;
}>;

export function PageHero({eyebrow, title, description, image, className}: Props) {
  return <section className={`internal-hero ${className ?? ''}`}>
    <Container className="internal-hero-grid">
      <div className="internal-hero-copy">
        <p className="eyebrow text-brand-yellow">{eyebrow}</p>
        <h1 className="internal-hero-title mt-4">{title}</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">{description}</p>
      </div>
      <figure className="internal-hero-media">
        <Image src={image.src} width={image.width} height={image.height} alt={image.alt} priority
          sizes="(max-width: 1023px) 100vw, 48vw" className="h-full w-full object-cover" />
      </figure>
    </Container>
  </section>;
}
