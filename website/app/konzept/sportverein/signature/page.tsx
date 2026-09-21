import './aufschlag-signature.css';
import { DemoBar } from '@/components/demo-bar';
import { AufschlagSignatureExperience } from '@/components/sport/signature/aufschlag-signature-experience';

export const metadata = {
  title: 'AUFSCHLAG Signature · Zwei Flugbahnen. Ein Club.',
  description:
    'Interaktives Signature-Konzept für einen Tennis- und Badmintonclub: Training, Entwicklung und Gemeinschaft in einer sportlichen Clubwelt.',
};

export default function Page() {
  return (
    <>
      <DemoBar concept="AUFSCHLAG · Signature" />
      <AufschlagSignatureExperience />
    </>
  );
}
