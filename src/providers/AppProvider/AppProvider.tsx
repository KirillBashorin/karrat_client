'use client';

import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useReadContract } from 'wagmi';
import { useShallow } from 'zustand/react/shallow';

import { useTransactionsTokenStore } from '@/stores';

const Web3ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const { getTokensList, transactionsToken, setDecimalsForTransactionsToken } = useTransactionsTokenStore(
    useShallow(state => ({
      getTokensList: state.getTokensList,
      transactionsToken: state.transactionsToken,
      setDecimalsForTransactionsToken: state.setDecimalsForTransactionsToken,
    }))
  );

  const tokenDecimals = useReadContract({
    address: transactionsToken?.address || undefined,
    abi: transactionsToken?.abi,
    functionName: 'decimals',
  });

  useEffect(() => {
    getTokensList();
  }, [getTokensList]);

  useEffect(() => {
    if (!tokenDecimals.data) return;

    setDecimalsForTransactionsToken(Number(tokenDecimals.data));
  }, [setDecimalsForTransactionsToken, tokenDecimals.isSuccess]);

  return <>{children}</>;
};

export default Web3ModalProvider;
