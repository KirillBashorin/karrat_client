'use client';

import React, { FC, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { Wrapper } from '@/components/layout';
import { TabButtons } from '@/components/ui';
import { AccessRoles, OwnersMultisig } from '@/components/admin-panel';
import { useAdminPanelStore } from '@/stores';

import styles from './ContractTabs.module.scss';

const ContractTabs: FC = () => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const { isSigner, isAdmin } = useAdminPanelStore(
    useShallow(state => ({
      isSigner: state.isSigner,
      isAdmin: state.isAdmin,
    }))
  );

  const signerTabs = [{ button: 'OwnersMultisig', content: <OwnersMultisig /> }];

  const tabs = [
    ...(isSigner ? signerTabs : []),
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

  if (!isSigner && !isAdmin) return null;

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
