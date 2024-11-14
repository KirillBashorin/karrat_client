import React, { FC } from 'react';

import { MainInfo, ContractTabs } from '@/components/admin-panel';

const AdminPanel: FC = () => {
  return (
    <>
      <MainInfo />
      <ContractTabs />
    </>
  );
};

export default AdminPanel;
