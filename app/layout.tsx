import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/contexts/CartContext';

export const metadata: Metadata = {
  title: 'RE·DESIGN — Italian Design Lighting 1960–2000',
  description:
    'A private dealer of authored Italian lighting from the late post-war period through the early radical years and beyond. Documented pieces by Stilnovo, Arteluce, Arredoluce, Flos, O‑Luce. We do not list pieces we have not handled.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <CartProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
