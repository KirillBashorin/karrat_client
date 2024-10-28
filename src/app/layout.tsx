import React, { FC, Suspense, StrictMode } from 'react';
import { Manrope } from 'next/font/google';

import { Web3ModalProvider } from '@/providers';
import { Header, Footer } from '@/components/layout';

import type { Metadata } from 'next';

import '@/styles/global.scss';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Karrat',
  description: 'Karrat app',
};

interface IRootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: FC<IRootLayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <body className={manrope.className}>
        <StrictMode>
          <Suspense fallback='Loading...'>
            <Web3ModalProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </Web3ModalProvider>
          </Suspense>
        </StrictMode>
      </body>
    </html>
  );
};

export default RootLayout;
