'use client';

import React, { FC, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { ObjectsGrid } from '@/components/common';
import { Wrapper } from '@/components/layout';
import { Title } from '@/components/ui';
import { useObjectsStore } from '@/stores';

import styles from './MarketObjectTabs.module.scss';

const MarketObjectTabs: FC = () => {
  const { objectsList, getObjectsList } = useObjectsStore(
    useShallow(state => ({ objectsList: state.objectsList, getObjectsList: state.getObjectsList }))
  );

  useEffect(() => {
    getObjectsList();
  }, []);

  if (!objectsList) return null;
  return (
    <section className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          <div className={styles.heading}>
            <Title size={'medium'} as={'h2'}>
              Objects
            </Title>
          </div>
          <ObjectsGrid objects={objectsList} />
        </div>
      </Wrapper>
    </section>
  );
};

export default MarketObjectTabs;
