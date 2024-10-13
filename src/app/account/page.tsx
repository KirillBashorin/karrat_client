import React, { FC } from 'react';

import { Hero } from '@/components/common';

const Account: FC = () => {
  return (
    <>
      <Hero
        title={'Log into the Karrat marketplace'}
        subtitle={'Get guaranteed income from owning space from anywhere in the world'}
        backgroundSrc={'/images/market-hero.png'}
        vectorVariant={2}
        button={{ text: 'Connect wallet' }}
        buttonTransparent={{ text: 'Personal account demo' }}
        isCentered={true}
      />
    </>
  );
};

export default Account;
