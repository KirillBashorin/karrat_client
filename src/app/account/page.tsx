'use client';

import React, { FC } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';

import { Hero, Support } from '@/components/common';

const AccountPage: FC = () => {
  const { open } = useWeb3Modal();
  const account = useAccount();

  if (account.isConnected)
    return (
      <>
        <div>Your NFT&apos;s</div>
        <Support text={'24/7 dedicated support \nservice for holders'} isDark={true} />
      </>
    );

  if (!account.isConnected)
    return (
      <Hero
        title={'Log into the Karrat marketplace'}
        subtitle={'Get guaranteed income from owning space from anywhere in the world'}
        backgroundSrc={'/images/market-hero.png'}
        vectorVariant={2}
        button={{ text: 'Connect wallet', onClick: open }}
        buttonTransparent={{ text: 'Personal account demo' }}
        isCentered={true}
      />
    );
};

export default AccountPage;
