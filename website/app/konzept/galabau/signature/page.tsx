import '@/components/signature/signature-foundation.css';
import './gruenraum-signature.css';
import { SignatureShell } from '@/components/signature/signature-shell';

export const metadata = { title: 'GRÜNRAUM Signature · Außenräume, die Leben verändern' };

export default function Page() {
  return <SignatureShell brand="GRÜNRAUM" concept="Grünraum · Garten- & Landschaftsbau" className="gruenraum-signature" kicker="Aus Ideen wachsen Lebensräume" title={<>Außenräume, die Ihr Leben <em>verändern.</em></>} intro="Wir planen und realisieren individuelle Garten- und Außenanlagen – von der ersten Idee bis zu Ihrem persönlichen Wohlfühlort." coreBase="/konzept/galabau/" cta="anfrage/" nav={[{label:'Leistungen',href:'/konzept/galabau/leistungen/'},{label:'Projekte',href:'/konzept/galabau/gartenideen/'},{label:'Kontakt',href:'/konzept/galabau/anfrage/'}]} stages={[{id:'existing',label:'Bestand',eyebrow:'Ausgangslage',description:'Wir lesen Ort, Topografie und gewachsene Strukturen.'},{id:'design',label:'Entwurf',eyebrow:'Planung',description:'Wege, Räume und Bepflanzung werden klar gegliedert.'},{id:'build',label:'Umsetzung',eyebrow:'Handwerk',description:'Material und Pflanze fügen sich kontrolliert zusammen.'},{id:'result',label:'Ergebnis',eyebrow:'Lebensraum',description:'Ein Garten, der mit seinen Menschen weiterwächst.'}]} image={{src:'/images/galabau/garten.webp',src480:'/images/galabau/garten-480.webp',src960:'/images/galabau/garten-960.webp',alt:'Hochwertig gestalteter Garten als statische Signature-Darstellung'}} metrics={[{value:'250+',label:'Illustrative Projekte'},{value:'100 %',label:'Individuelle Planung'},{value:'Natürlich',label:'Mehr Lebensqualität'}]} />;
}

