'use client';

import React, { FC, useState } from 'react';

import { Wrapper } from '@/components/layout';
import { TabButtons } from '@/components/ui';
import { AccessRoles } from '@/components/admin-panel';

import styles from './ContractTabs.module.scss';

const ContractTabs: FC = () => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const tabs = [
    {
      button: 'AccessRoles',
      content: <AccessRoles />,
    },
    {
      button: 'ObjectFactory',
      content: <>ObjectFactory</>,
    },
    {
      button: 'Pause',
      content: <>Pause</>,
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
