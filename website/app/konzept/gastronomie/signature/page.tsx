import '@/components/signature/signature-foundation.css';
import './lindenwirt-signature.css';
import { SignatureShell } from '@/components/signature/signature-shell';

export const metadata = { title: 'LINDENWIRT Signature · Besondere Atmosphäre' };

export default function Page() {
  return <SignatureShell brand="LINDENWIRT" concept="Lindenwirt · Gastronomie" className="lindenwirt-signature" kicker="Besondere Momente" title={<>Feiern in ganz besonderer <em>Atmosphäre.</em></>} intro="Ob Familienfeier, Hochzeit oder Firmenabend – im Lindenwirt schaffen wir den perfekten Rahmen für unvergessliche Momente." coreBase="/konzept/gastronomie/" cta="reservieren/" nav={[{label:'Restaurant',href:'/konzept/gastronomie/speisekarte/'},{label:'Veranstaltungen',href:'/konzept/gastronomie/feiern/'},{label:'Räume',href:'/konzept/gastronomie/haus/'}]} stages={[{id:'family',label:'Familienfeier',eyebrow:'Zusammenkommen',description:'Ein warmer Rahmen für besondere Familientage.'},{id:'wedding',label:'Hochzeit',eyebrow:'Feiern',description:'Atmosphäre, Menü und Raum greifen ineinander.'},{id:'business',label:'Firmenabend',eyebrow:'Begegnen',description:'Persönlicher Service für konzentrierte Anlässe.'},{id:'rooms',label:'Unsere Räume',eyebrow:'Ambiente',description:'Räume, die Geschichten einen Rahmen geben.'}]} image={{src:'/images/gastronomie/gesellschaft.webp',src480:'/images/gastronomie/gesellschaft-480.webp',src960:'/images/gastronomie/gesellschaft-960.webp',alt:'Warm beleuchtete Restaurantgesellschaft als statische Signature-Darstellung'}} metrics={[{value:'130+',label:'Illustrative Feiern'},{value:'100 %',label:'Regionale Idee'},{value:'Persönlich',label:'Individuelle Beratung'}]} />;
}

