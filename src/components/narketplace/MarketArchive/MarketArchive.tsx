'use client';

import React, { FC, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { ObjectsGrid } from '@/components/common';
import { Wrapper } from '@/components/layout';
import { Button, TabButtons, Title } from '@/components/ui';
import { useObjectsStore } from '@/stores';
import { getTabItems, getFilteredObjects } from '@/utils';

import ArrowCircleIcon from '/public/images/icons/arrow-circle.svg';

import styles from './MarketArchive.module.scss';

const MarketArchive: FC = () => {
  const { objectsList, getObjectsList } = useObjectsStore(
    useShallow(state => ({ objectsList: state.objectsList, getObjectsList: state.getObjectsList }))
  );

  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  useEffect(() => {
    getObjectsList();
  }, [getObjectsList]);

  if (!objectsList) return null;

  return (
    <section className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          <div className={styles.heading}>
            <Title size={'medium'} as={'h2'}>
              Objects
            </Title>
            <TabButtons buttons={getTabItems(objectsList)} onClick={setCurrentItemIndex} defaultItemIndex={0} />
            <Button className={styles.howItWorksButton} isTransparent={true}>
              How it works <ArrowCircleIcon />
            </Button>
          </div>
          <ObjectsGrid objects={getFilteredObjects(objectsList, currentItemIndex)} />
        </div>
      </Wrapper>
    </section>
  );
};

export default MarketArchive;
