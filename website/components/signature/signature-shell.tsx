/* oxlint-disable nextjs/no-html-link-for-pages -- Native links keep the static Pages export self-contained. */
/* oxlint-disable nextjs/no-img-element -- Local responsive fallbacks are pre-optimized WebP files. */
import { DemoBar } from '@/components/demo-bar';
import { SignatureRuntimeBridge } from './signature-runtime-bridge';
import { SignatureStoryVideo } from './signature-story-video';

export type SignatureStage = {
  id: string;
  label: string;
  eyebrow: string;
  description: string;
  icon?: React.ReactNode;
};

type SignatureShellProps = {
  brand: string;
  concept: string;
  className: string;
  kicker: string;
  title: React.ReactNode;
  intro: string;
  coreBase: string;
  cta: string;
  nav: Array<{ label: string; href: string }>;
  stages: SignatureStage[];
  image: { src: string; src480: string; src960: string; alt: string; width?: number; height?: number };
  metrics: Array<{ value: string; label: string }>;
  storyMedia?: { src: string; alt: string };
  storyVideo?: { src: string; poster: string; label: string };
  storyHref?: string;
  storyLinkLabel?: string;
  brandTagline?: string;
  ctaLabel?: string;
  initialStage?: string;
  children?: React.ReactNode;
};

export function SignatureShell({
  brand,
  concept,
  className,
  kicker,
  title,
  intro,
  coreBase,
  cta,
  nav,
  stages,
  image,
  metrics,
  storyMedia,
  storyVideo,
  storyHref,
  storyLinkLabel = 'Core-Website ansehen',
  brandTagline = 'Signature experience',
  ctaLabel = 'Projekt anfragen',
  initialStage,
  children,
}: SignatureShellProps) {
  const activeStage = stages.find((stage) => stage.id === initialStage) ?? stages[0];
  return (
    <>
      <DemoBar concept={`${concept} · Signature`} />
      <main
        className={`signature-page ${className}`}
        data-signature-page
        data-signature-brand={brand.toLowerCase()}
        data-signature-state={activeStage.id}
      >
        <SignatureRuntimeBridge />
        <header className="signature-header">
          <a className="signature-brand" href={coreBase} aria-label={`${brand} Core-Website`}>
            <strong>{brand}</strong>
            <span>{brandTagline}</span>
          </a>
          <nav aria-label={`${brand} Navigation`}>
            {nav.map((item) => (
              <a href={item.href} key={item.label}>{item.label}</a>
            ))}
          </nav>
          <a className="signature-cta" href={`${coreBase}${cta}`}>
            {ctaLabel} <span aria-hidden="true">→</span>
          </a>
        </header>

        <section className="signature-hero" aria-labelledby={`${brand}-signature-title`}>
          <picture className="signature-fallback">
            <source media="(max-width: 560px)" srcSet={image.src480} />
            <source media="(max-width: 1080px)" srcSet={image.src960} />
            <img src={image.src} alt={image.alt} width={image.width ?? 1536} height={image.height ?? 1024} fetchPriority="high" />
          </picture>
          <div className="signature-scrim" aria-hidden="true" />
          {children}
          <div className="signature-copy">
            <p className="signature-kicker">{kicker}</p>
            <h1 id={`${brand}-signature-title`}>{title}</h1>
            <span className="signature-rule" aria-hidden="true" />
            <p className="signature-intro">{intro}</p>
          </div>

          <div className="signature-rail" role="toolbar" aria-label="Ansicht auswählen">
            {stages.map((stage, index) => (
              <button
                type="button"
                key={stage.id}
                data-signature-state-target={stage.id}
                data-signature-eyebrow={stage.eyebrow}
                data-signature-description={stage.description}
                aria-pressed={stage.id === activeStage.id}
                tabIndex={stage.id === activeStage.id ? 0 : -1}
              >
                <span aria-hidden="true">{stage.icon ?? String(index + 1).padStart(2, '0')}</span>
                {stage.label}
              </button>
            ))}
          </div>

          <aside className="signature-story" aria-live="polite">
            {storyVideo
              ? <SignatureStoryVideo {...storyVideo} />
              : storyMedia && <img className="signature-story-media" src={storyMedia.src} alt={storyMedia.alt} width="120" height="88" loading="lazy" />}
            <div>
              <p data-signature-stage-eyebrow>{activeStage.eyebrow}</p>
              <strong data-signature-stage-description>{activeStage.description}</strong>
              <a href={storyHref ?? coreBase}>{storyLinkLabel} <span aria-hidden="true">→</span></a>
            </div>
          </aside>

          <dl className="signature-metrics">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.value}</dt>
                <dd>{metric.label}</dd>
              </div>
            ))}
          </dl>
          <a className="signature-scroll" href="#signature-details">
            <span aria-hidden="true">↓</span> Mehr entdecken
          </a>
        </section>

        <section className="signature-details" id="signature-details" aria-label="Hinweis zur Signature-Demo">
          <p>Interaktive Signature-Demonstration · fiktives Konzeptprojekt</p>
          <a href={coreBase}>Zur vollständigen Core-Website</a>
        </section>
      </main>
    </>
  );
}
