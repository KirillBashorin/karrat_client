'use client';

import React, { FC, useState } from 'react';

import { Wrapper } from '@/components/layout';
import { TabButtons } from '@/components/ui';

import styles from './ContractTabs.module.scss';

const ContractTabs: FC = () => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const tabs = [
    {
      button: 'Contract 1',
      content: <>123</>,
    },
    {
      button: 'Contract 2',
      content: <>345</>,
    },
    {
      button: 'Contract 3',
      content: <>678</>,
    },
  ];

  return (
    <section className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          <TabButtons
            className={styles.tabButtons}
            buttons={tabs.map(item => item.button)}
            onClick={setCurrentItemIndex}
          />
          <div className={styles.content}>{tabs[currentItemIndex].content}</div>
        </div>
      </Wrapper>
    </section>
  );
};

export default ContractTabs;
