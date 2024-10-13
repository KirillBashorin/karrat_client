import React, { FC } from 'react';
import Image from 'next/image';

import { Wrapper } from '@/components/layout';
import { Button, Title } from '@/components/ui';
import { FadeOut } from '@/components/common';

import styles from './ObjectStage.module.scss';

const ObjectStage: FC = () => {
  return (
    <section className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          <FadeOut className={styles.vector}>
            <Image src={'/images/construction-vector-4.svg'} width={'300'} height={'100'} alt={''} />
          </FadeOut>
          <div className={styles.container}>
            <Title className={styles.title} size={'medium'} as={'h2'}>
              What are the benefits of buying at the facility stage?
            </Title>
            <p className={styles.text}>
              In terms of price, the value of the NFT area of the finished property is much higher, especially if you
              bought the NFT area of the excavation at the very first stage.
            </p>
            <p className={styles.text}>
              Buyers of the excavation, of course, will have to wait for the construction of the object, but they get
              bonuses from subsequent buyers at later stages, as well as much more benefits from rent. The only
              difference is time, good investments take time to materialize.
            </p>
            <Button className={styles.button} href={'/marketplace/'}>
              Купить NFT
            </Button>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default ObjectStage;
