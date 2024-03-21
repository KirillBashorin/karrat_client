import React, { FC } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

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
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
};

export default RootLayout;
