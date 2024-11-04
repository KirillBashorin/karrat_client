import React, { FC } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useShallow } from 'zustand/react/shallow';
import { useReadContract } from 'wagmi';
import { formatEther } from 'viem';
import { useAccount } from 'wagmi';

import { Badge, Spinner, Title } from '@/components/ui';
import { useModalStore } from '@/stores';
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

  const account = useAccount();

  const currentPriceOneShare = useReadContract({
    address: object.contractAddress,
    abi: Object.abi,
    functionName: 'currentPriceOneShare',
  });

  const priceForCurrentUser = useReadContract({
    address: object.contractAddress,
    abi: Object.abi,
    functionName: 'getPriceForUser',
    args: [account.address],
  });

  return (
    <div
      className={clsx(className, styles.root, isSmall && styles.small)}
      onClick={currentPriceOneShare ? () => openPurchaseModal(object.contractAddress) : undefined}
    >
      <Image className={styles.image} src={object.image} width={'300'} height={'100'} alt={''} />
      <Badge className={styles.badge} isBright={object.type === 'rent'} size={'small'}>
        {object.type}
      </Badge>
      <Title className={styles.title} size={'small'} as={'h3'}>
        {object.title}
      </Title>
      {currentPriceOneShare.isFetching && <Spinner className={styles.priceSpinner} />}
      {currentPriceOneShare.isSuccess && (
        <p className={styles.details}>
          <span className={styles.price}>
            {priceForCurrentUser.data && currentPriceOneShare.data
              ? formatEther(priceForCurrentUser.data as bigint)
              : formatEther(currentPriceOneShare.data as bigint)}
            usdt
          </span>
          <span> / 1 ft²</span>
        </p>
      )}
    </div>
  );
};

export default ObjectPreview;
