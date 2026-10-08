import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bruno & Alice · Amor em foco',
  description: 'Dois anos, mil motivos.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
