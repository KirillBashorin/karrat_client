'use client';

import React, { FC } from 'react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { hardhat } from 'wagmi/chains';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const url = String(process.env.NEXT_PUBLIC_URL);

if (!projectId) throw new Error('Project ID is not defined');

const queryClient = new QueryClient();

const metadata = {
  name: 'KARRAT',
  description: 'NFT - Real estate',
  url: url,
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

interface IWeb3ModalProviderProps {
  children: React.ReactNode;
}

const Web3ModalProvider: FC<IWeb3ModalProviderProps> = ({ children }) => {
  const chains = [hardhat] as const;

  const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
  });

  createWeb3Modal({
    wagmiConfig: config,
    projectId,
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3ModalProvider;
