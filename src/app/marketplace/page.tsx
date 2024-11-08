import React, { FC } from 'react';

import { Hero, Support, TokenTypes } from '@/components/common';
import { MarketArchive } from '@/components/narketplace';

const Market: FC = () => {
  return (
    <>
      <Hero
        title={'NFT-Real\u00a0Esate Marketplace'}
        subtitle={'Get guaranteed income from owning space from anywhere in the world'}
        backgroundSrc={'/images/market-hero.png'}
        vectorVariant={1}
        button={{ text: 'Personal account' }}
      />

      <MarketArchive />

      <TokenTypes />

      <Support isDark={true} isVector={true} />
    </>
  );
};

export default Market;
