import React, { FC } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useShallow } from 'zustand/react/shallow';
import { useReadContract } from 'wagmi';
import { formatUnits, zeroAddress } from 'viem';
import { useAccount } from 'wagmi';

import { Badge, Spinner, Title } from '@/components/ui';
import { useModalStore, useTransactionsTokenStore } from '@/stores';
import { Object } from '@/contracts';

import styles from './ObjectPreview.module.scss';

import type { ObjectType } from '@/types';

interface ObjectPreviewProps {
  className?: string;
  object: ObjectType;
  isSmall?: boolean;
}

const ObjectPreview: FC<ObjectPreviewProps> = ({ className, object, isSmall }) => {
  const { openPurchaseModal } = useModalStore(
    useShallow(state => ({
      openPurchaseModal: state.openPurchaseModal,
    }))
  );

  const { transactionsToken } = useTransactionsTokenStore(
    useShallow(state => ({
      transactionsToken: state.transactionsToken,
    }))
  );

  const account = useAccount();

  const estimateBuySharesToken = useReadContract({
    address: object.contractAddress,
    abi: Object.abi,
    functionName: 'estimateBuySharesToken',
    args: [account.address || zeroAddress, 1, transactionsToken?.address],
  });

  return (
    <div
      className={clsx(className, styles.root, isSmall && styles.small)}
      onClick={estimateBuySharesToken ? () => openPurchaseModal(object.contractAddress) : undefined}
    >
      <Image className={styles.image} src={object.image} width={'300'} height={'100'} alt={''} />
      <Badge className={styles.badge} isBright={object.type === 'rent'} size={'small'}>
        {object.type}
      </Badge>
      <Title className={styles.title} size={'small'} as={'h3'}>
        {object.title}
      </Title>
      {estimateBuySharesToken.isFetching &&
        estimateBuySharesToken.isError &&
        !estimateBuySharesToken.data &&
        !transactionsToken?.decimals && <Spinner className={styles.priceSpinner} />}
      {estimateBuySharesToken.isSuccess && transactionsToken?.decimals && (
        <p className={styles.details}>
          <span className={styles.price}>
            {Number(formatUnits(estimateBuySharesToken.data as bigint, transactionsToken?.decimals)).toFixed(2)}{' '}
            {transactionsToken?.symbol}
          </span>
          <span> / 1 ft²</span>
        </p>
      )}
    </div>
  );
};

export default ObjectPreview;
