'use client';
import React, { FC } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';

const WalletConnectButton: FC = () => {
  const { open } = useWeb3Modal();

  return <button onClick={() => open()}>Connect wallet</button>;
};

export default WalletConnectButton;
