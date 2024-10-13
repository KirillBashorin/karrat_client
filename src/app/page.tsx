import React, { FC } from 'react';

import { Faq, Hero, Support, TokenTypes } from '@/components/common';
import { ObjectStage, HowItWorks, AboutUs, PopularObjects } from '@/components/home';

const Home: FC = () => {
  return (
    <>
      <Hero
        title={'NFT-Real Estate \nby Karrat'}
        subtitle={'Sale of tokenized real estate in\u00A0the\u00A0UAE'}
        text={'Get guaranteed income from owning space \nfrom anywhere in the world'}
        button={{
          text: 'NFT catalog',
          link: '/marketplace/',
        }}
        backgroundSrc={'/images/home-hero.jpg'}
        vectorVariant={0}
      />

      <AboutUs />

      <TokenTypes />

      <ObjectStage />

      <PopularObjects />

      <HowItWorks />

      <Faq />

      <Support />
    </>
  );
};

export default Home;
