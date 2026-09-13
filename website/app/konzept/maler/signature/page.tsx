import '@/components/signature/signature-foundation.css';
import './farbform-signature.css';
import { SignatureShell } from '@/components/signature/signature-shell';

export const metadata = { title: 'FARBFORM Signature · Räume, die sich gut anfühlen' };

export default function Page() {
  return <SignatureShell brand="FARBFORM" concept="Farbform · Maler & Raumgestaltung" className="farbform-signature" kicker="Mehr als Farbe" title={<>Räume, die sich gut <em>anfühlen.</em></>} intro="Wir gestalten Wohnräume mit Farbe, Struktur und Gefühl – individuell, hochwertig und zeitlos schön." coreBase="/konzept/maler/" cta="kontakt/" nav={[{label:'Leistungen',href:'/konzept/maler/leistungen/'},{label:'Inspiration',href:'/konzept/maler/gestaltung/'},{label:'Farbberatung',href:'/konzept/maler/kontakt/'}]} stages={[{id:'wall',label:'Wandfarbe',eyebrow:'Oberfläche',description:'Salbei bringt Ruhe und Tiefe in den Raum.'},{id:'floor',label:'Boden',eyebrow:'Material',description:'Natürliche Texturen erden die helle Komposition.'},{id:'light',label:'Licht',eyebrow:'Atmosphäre',description:'Tageslicht und warme Akzente verändern die Wirkung.'},{id:'compare',label:'Vorher / Nachher',eyebrow:'Vergleich',description:'Die Raumwirkung wird direkt nachvollziehbar.'}]} image={{src:'/images/raum-salbei.webp',src480:'/images/raum-salbei-480.webp',src960:'/images/raum-salbei-960.webp',alt:'Heller Wohnraum mit salbeigrüner Wand als statische Signature-Darstellung'}} metrics={[{value:'500+',label:'Illustrative Projekte'},{value:'100 %',label:'Persönliche Beratung'},{value:'Nachhaltig',label:'Materialbewusst'}]} />;
}

