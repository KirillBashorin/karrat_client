'use client';

import React, { FC, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import Image from 'next/image';

import { useObjectsStore } from '@/stores';
import { ObjectsSwiper } from '@/components/common';
import { Wrapper } from '@/components/layout';
import { Title } from '@/components/ui';

import styles from './PopularObjects.module.scss';

const PopularObjects: FC = () => {
  const { objectsList, getObjectsList } = useObjectsStore(
    useShallow(state => ({ objectsList: state.objectsList, getObjectsList: state.getObjectsList }))
  );

  useEffect(() => {
    getObjectsList();
  }, []);

  if (!objectsList) return null;

  return (
    <section className={styles.root} id={'objects'}>
      <Image
        className={styles.vector}
        src={'/images/construction-vector-6.svg'}
        width={300}
        height={100}
        alt={'Construction vector illustration'}
      />
      <Wrapper>
        <div className={styles.inner}>
          <Title className={styles.title} size={'medium'} as={'h2'}>
            Most popular NFTs
          </Title>
          <ObjectsSwiper objects={objectsList.slice(0, 10)} />
        </div>
      </Wrapper>
    </section>
  );
};

export default PopularObjects;
