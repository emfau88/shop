import { DemoBar } from '@/components/demo-bar';
import { LindenwirtSignatureExperience } from '@/components/gastro/signature/lindenwirt-signature-experience';
import './lindenwirt-signature.css';

export const metadata = {
  title: 'LINDENWIRT Signature · Ankommen. Teilen. Bleiben.',
  description:
    'Eine atmosphärische Signature-Experience für eine moderne, regional geprägte Gaststätte.',
};

export default function Page() {
  return (
    <>
      <DemoBar concept="LINDENWIRT · Signature" />
      <LindenwirtSignatureExperience />
    </>
  );
}
