import React, { FC } from 'react';

import { ObjectsGrid } from '@/components/common';
import { Wrapper } from '@/components/layout';
import { MockObjects } from '@/mcoks/objects';
import { Title } from '@/components/ui';

import styles from './MarketObjectTabs.module.scss';

const MarketObjectTabs: FC = () => {
  return (
    <section className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          <div className={styles.heading}>
            <Title size={'medium'} as={'h2'}>
              Objects
            </Title>
          </div>
          <ObjectsGrid objects={MockObjects} />
        </div>
      </Wrapper>
    </section>
  );
};

export default MarketObjectTabs;
