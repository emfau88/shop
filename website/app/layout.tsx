import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: {
    default: 'Webdesign · persönlich umgesetzt',
    template: '%s · Webdesign',
  },
  description:
    'Unternehmenswebsites für Handwerk und lokale Betriebe. Private Vorschau mit transparentem Konzeptprojekt.',
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
