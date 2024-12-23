'use client';

import React, { FC } from 'react';
import { useAppKit } from '@reown/appkit/react';
import { useAccount } from 'wagmi';

import { Hero, Support } from '@/components/common';
import { YourNft } from '@/components/account';

const AccountPage: FC = () => {
  const { open } = useAppKit();
  const account = useAccount();

  if (account.isConnected)
    return (
      <>
        <YourNft />
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
