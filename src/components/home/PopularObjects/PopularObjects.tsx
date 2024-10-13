import React, { FC } from 'react';

import { ObjectsSwiper } from '@/components/common';
import { Wrapper } from '@/components/layout';
import { Title } from '@/components/ui';
import { ObjectType } from '@/types';

import styles from './PopularObjects.module.scss';

const PopularObjects: FC = () => {
  const objects: ObjectType[] = [
    {
      image: '/images/preview.png',
      title: 'Five Palms many chars in the title',
      price: 49.923,
      share: 1,
      type: 'rent',
      file: '/images/preview.png',
    },
    {
      image: '/images/preview.png',
      title: 'Five Palms 2',
      price: 49.923,
      share: 1,
      type: 'object',
      file: '/images/preview.png',
    },
    {
      image: '/images/preview.png',
      title: 'Five Palms 3',
      price: 49.923,
      share: 1,
      type: 'rent',
      file: '/images/preview.png',
    },
    {
      image: '/images/preview.png',
      title: 'Five Palms 4',
      price: 49.923,
      share: 1,
      type: 'object',
      file: '/images/preview.png',
    },
    {
      image: '/images/preview.png',
      title: 'Five Palms 5',
      price: 49.923,
      share: 1,
      type: 'rent',
      file: '/images/preview.png',
    },
    {
      image: '/images/preview.png',
      title: 'Five Palms 6',
      price: 49.923,
      share: 1,
      type: 'object',
      file: '/images/preview.png',
    },
    {
      image: '/images/preview.png',
      title: 'Five Palms 7',
      price: 49.923,
      share: 1,
      type: 'rent',
      file: '/images/preview.png',
    },
    {
      image: '/images/preview.png',
      title: 'Five Palms 8',
      price: 49.923,
      share: 1,
      type: 'object',
      file: '/images/preview.png',
    },
  ];

  return (
    <section className={styles.root} id={'objects'}>
      <Wrapper>
        <div className={styles.inner}>
          <Title className={styles.title} size={'medium'} as={'h2'}>
            Most popular NFTs
          </Title>
          <ObjectsSwiper objects={objects} />
        </div>
      </Wrapper>
    </section>
  );
};

export default PopularObjects;
