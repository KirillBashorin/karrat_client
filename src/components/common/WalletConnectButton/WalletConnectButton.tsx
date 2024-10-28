'use client';

import React, { FC } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';

import ArrowIcon from '/public/images/icons/arrow-circle.svg';

import { Button } from '@/components/ui';

const WalletConnectButton: FC = () => {
  const { open } = useWeb3Modal();

  return (
    <Button onClick={() => open()}>
      Connect wallet <ArrowIcon />
    </Button>
  );
};

export default WalletConnectButton;
