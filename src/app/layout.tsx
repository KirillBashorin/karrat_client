import React, { FC, Suspense, StrictMode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Web3ModalProvider from '@/providers/Web3modalProvider';
import PageLayout from '@/components/layout/PageLayout';

import './styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Karrat',
  description: 'Karrat app',
};

interface IRootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: FC<IRootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StrictMode>
          <Suspense fallback="Loading...">
            <Web3ModalProvider>
              <PageLayout>{children}</PageLayout>
            </Web3ModalProvider>
          </Suspense>
        </StrictMode>
      </body>
    </html>
  );
};

export default RootLayout;
