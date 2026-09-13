import '@/components/signature/signature-foundation.css';
import './aufschlag-signature.css';
import { SignatureShell } from '@/components/signature/signature-shell';

export const metadata = { title: 'AUFSCHLAG Signature · Sport verbindet' };

export default function Page() {
  return <SignatureShell brand="AUFSCHLAG" concept="Aufschlag · Tennis & Badminton" className="aufschlag-signature" kicker="Mehr als ein Spiel" title={<>Bewegung, Präzision und <em>Vereinsleben.</em></>} intro="Tennis und Badminton in einer besonderen Atmosphäre. Für Menschen, die mehr suchen als nur einen Platz zum Spielen." coreBase="/konzept/sportverein/" cta="probetraining/" nav={[{label:'Training',href:'/konzept/sportverein/training/'},{label:'Mitgliedschaft',href:'/konzept/sportverein/verein/'},{label:'Club',href:'/konzept/sportverein/verein/'}]} stages={[{id:'tennis',label:'Tennis',eyebrow:'Spiel',description:'Präzision, Dynamik und Raum für das nächste Match.'},{id:'badminton',label:'Badminton',eyebrow:'Tempo',description:'Schnelle Ballwechsel in einer klaren Trainingswelt.'},{id:'training',label:'Training',eyebrow:'Entwicklung',description:'Strukturiertes Coaching für jedes Spielniveau.'},{id:'membership',label:'Mitgliedschaft',eyebrow:'Gemeinschaft',description:'Sport und Clubleben als gemeinsames Erlebnis.'}]} image={{src:'/images/sportverein/tennis.webp',src480:'/images/sportverein/tennis-480.webp',src960:'/images/sportverein/tennis-960.webp',alt:'Tennisplatz im warmen Abendlicht als statische Signature-Darstellung'}} metrics={[{value:'200+',label:'Illustrative Mitglieder'},{value:'8 Plätze',label:'Fiktive Clubgröße'},{value:'Gemeinsam',label:'Sport das ganze Jahr'}]} />;
}

