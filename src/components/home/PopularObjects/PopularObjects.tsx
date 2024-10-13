import React, { FC } from 'react';
import Image from 'next/image';

import { ObjectsSwiper } from '@/components/common';
import { Wrapper } from '@/components/layout';
import { Title } from '@/components/ui';
import { MockObjects } from '@/mcoks/objects';

import styles from './PopularObjects.module.scss';

const PopularObjects: FC = () => {
  return (
    <section className={styles.root} id={'objects'}>
      <Image
        className={styles.vector}
        src={'/images/construction-vector-6.svg'}
        width={'300'}
        height={'100'}
        alt={' '}
      />
      <Wrapper>
        <div className={styles.inner}>
          <Title className={styles.title} size={'medium'} as={'h2'}>
            Most popular NFTs
          </Title>
          <ObjectsSwiper objects={MockObjects.slice(0, 10)} />
        </div>
      </Wrapper>
    </section>
  );
};

export default PopularObjects;
