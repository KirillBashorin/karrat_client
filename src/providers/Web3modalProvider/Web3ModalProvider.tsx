'use client';

import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';
import { hardhat, mainnet } from '@reown/appkit/networks';
import { WagmiProvider, type Config } from 'wagmi';
import { createStorage } from '@wagmi/core';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const url = (typeof window !== 'undefined' && window.location.hostname) || '';

if (!projectId) throw new Error('Project ID is not defined');

const queryClient = new QueryClient();

const metadata = {
  name: 'KARRAT',
  description: 'NFT - Real estate',
  url: url,
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const networks = [hardhat];

const wagmiAdapter = new WagmiAdapter({
  storage: createStorage(typeof window !== 'undefined' ? { storage: localStorage } : {}),
  ssr: true,
  projectId,
  networks,
});

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, hardhat],
  defaultNetwork: mainnet,
  metadata: metadata,
  includeWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
  ],
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
  ],
  features: {
    email: false,
    socials: false,
    analytics: false,
  },
});

interface IWeb3ModalProviderProps {
  children: React.ReactNode;
}

const Web3ModalProvider: FC<IWeb3ModalProviderProps> = ({ children }) => {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3ModalProvider;
