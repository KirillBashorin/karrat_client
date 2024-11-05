'use client';

import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useTransactionsTokenStore } from '@/stores';

const Web3ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const { getTokensList } = useTransactionsTokenStore(
    useShallow(state => ({
      getTokensList: state.getTokensList,
    }))
  );

  useEffect(() => {
    getTokensList();
  }, []);

  return <>{children}</>;
};

export default Web3ModalProvider;
