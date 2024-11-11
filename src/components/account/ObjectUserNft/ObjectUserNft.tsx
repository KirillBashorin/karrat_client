import React, { FC } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useAccount, useReadContract } from 'wagmi';
import { useShallow } from 'zustand/react/shallow';
import { formatUnits } from 'viem';

import { Badge, Button, ProgressBar, Title } from '@/components/ui';
import { ObjectType } from '@/types';
import { EarningPool, Object } from '@/contracts';

import VoteIcon from '/public/images/icons/important.svg';

import { useTransactionsTokenStore } from '@/stores';

import styles from './ObjectUserNft.module.scss';

interface ObjectUserNftProps {
  object: ObjectType;
  id: number;
}

const ObjectUserNft: FC<ObjectUserNftProps> = ({ object, id }) => {
  const account = useAccount();

  const { transactionsToken } = useTransactionsTokenStore(
    useShallow(state => ({
      transactionsToken: state.transactionsToken,
    }))
  );

  const objectContractData = {
    address: object.contractAddress,
    abi: Object.abi,
  };

  const earningPoolContractData = {
    address: EarningPool.address,
    abi: EarningPool.abi,
  };

  const tokenShares = useReadContract({
    ...objectContractData,
    functionName: 'tokenShares',
    args: [id],
  });

  const maxShares = useReadContract({
    ...objectContractData,
    functionName: 'maxShares',
  });

  const mintedShares = useReadContract({
    ...objectContractData,
    functionName: 'mintedShares',
  });

  const currentStage = useReadContract({
    ...objectContractData,
    functionName: 'currentStage',
  });

  const stageSaleStopTimestamp = useReadContract({
    ...objectContractData,
    functionName: 'stageSaleStopTimestamp',
    args: [currentStage.data],
  });

  const estimateBuySharesToken = useReadContract({
    ...objectContractData,
    functionName: 'estimateBuySharesToken',
    args: [account.address, Number(tokenShares.data), transactionsToken?.address],
  });

  const estimateClaimObjectRewardsToken = useReadContract({
    ...earningPoolContractData,
    functionName: 'estimateClaimObjectRewardsToken',
    args: [object.contractAddress, id, transactionsToken?.address],
  });

  return (
    <div className={styles.root}>
      <div className={styles.group}>
        <Image className={styles.image} src={'/images/preview.png'} width={'300'} height={'100'} alt={' '} />
        <Badge className={styles.badge} isBright={object.type === 'rent'} size={'small'}>
          {object.type}
        </Badge>
        <Title className={styles.title} size={'small'}>
          {object.title}
        </Title>
      </div>

      <div className={clsx(styles.group, styles.details)}>
        <div>
          <span className={styles.detailsItemTitle}>Quantity</span>
          <span className={styles.detailsItemValue}>{tokenShares.isSuccess && String(tokenShares.data)}</span>
          <span className={styles.detailsItemUnit}>ft²</span>
        </div>
        <div>
          <span className={styles.detailsItemTitle}>% Areas</span>
          <span className={styles.detailsItemValue}>
            {Math.round((Number(tokenShares.data) / Number(maxShares.data)) * 100)}
          </span>
          <span className={styles.detailsItemUnit}>%</span>
        </div>
        <div>
          <span className={styles.detailsItemTitle}>Price</span>
          <span className={styles.detailsItemValue}>
            {transactionsToken &&
              transactionsToken?.decimals &&
              typeof estimateBuySharesToken.data === 'bigint' &&
              Number(formatUnits(estimateBuySharesToken.data, transactionsToken.decimals)).toFixed(2)}
          </span>
          <span className={styles.detailsItemUnit}>USDT</span>
        </div>
        {transactionsToken &&
          transactionsToken?.decimals &&
          typeof estimateClaimObjectRewardsToken.data === 'bigint' && (
            <div>
              <span className={styles.detailsItemTitle}>Revenue</span>
              <span className={styles.detailsItemValue}>
                {Number(estimateClaimObjectRewardsToken.data) > 0
                  ? Number(formatUnits(estimateClaimObjectRewardsToken.data, transactionsToken.decimals)).toFixed(2)
                  : 'Not estimated'}
              </span>
              <span className={styles.detailsItemUnit}>
                {Number(estimateClaimObjectRewardsToken.data) > 0 ? transactionsToken.symbol : ''}
              </span>
            </div>
          )}
      </div>

      <div className={styles.group}>
        <div className={styles.readiness}>
          <span>Readiness to rent</span>
          <span>{Math.round((Number(mintedShares.data) / Number(maxShares.data)) * 100)}%</span>
          <ProgressBar
            className={styles.progress}
            progress={Math.round((Number(mintedShares.data) / Number(maxShares.data)) * 100)}
          />
        </div>

        {stageSaleStopTimestamp.isSuccess && stageSaleStopTimestamp.data !== BigInt(0) && (
          <div className={styles.stageInfo}>
            <span>End of stage</span>
            <span className={styles.stageValue}>
              {new Date(Number(stageSaleStopTimestamp.data)).toLocaleDateString('ru-RU')}
            </span>
          </div>
        )}

        <div className={styles.buttons}>
          <Button className={styles.claimButton} isTransparent={true} isBright={true} disabled={true}>
            Claim
          </Button>
          {/*{true && (*/}
          {/*  <Button className={styles.voteButton}>*/}
          {/*    <VoteIcon />*/}
          {/*  </Button>*/}
          {/*)}*/}
          <button className={styles.sellButton} type={'button'} disabled={true}>
            Sell NFT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ObjectUserNft;
