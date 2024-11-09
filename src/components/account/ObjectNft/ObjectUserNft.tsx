import React, { FC } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import { Badge, Button, ProgressBar, Title } from '@/components/ui';
import { ObjectType } from '@/types';

import VoteIcon from '/public/images/icons/important.svg';

import styles from './ObjectUserNft.module.scss';

interface ObjectUserNftProps {
  object: ObjectType;
  id: bigint;
}

const ObjectUserNft: FC<ObjectUserNftProps> = ({ object, id }) => {
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
          <span className={styles.detailsItemValue}>100</span>
          <span className={styles.detailsItemUnit}>ft²</span>
        </div>
        <div>
          <span className={styles.detailsItemTitle}>% Areas</span>
          <span className={styles.detailsItemValue}>45</span>
          <span className={styles.detailsItemUnit}>%</span>
        </div>
        <div>
          <span className={styles.detailsItemTitle}>Price</span>
          <span className={styles.detailsItemValue}>49.92</span>
          <span className={styles.detailsItemUnit}>USDT</span>
        </div>
        <div>
          <span className={styles.detailsItemTitle}>Revenue</span>
          <span className={styles.detailsItemValue}>19.92</span>
          <span className={styles.detailsItemUnit}>USDT</span>
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.readiness}>
          <span>Readiness to rent</span>
          <span>54%</span>
          <ProgressBar className={styles.progress} progress={54} />
        </div>
        <div className={styles.stageInfo}>
          <span>End of stage</span>
          <span className={styles.stageValue}>24.11.25</span>
        </div>
        <div className={styles.buttons}>
          <Button className={styles.claimButton} isTransparent={true} isBright={true} disabled={false}>
            Claim
          </Button>
          <Button className={styles.voteButton}>
            <VoteIcon />
          </Button>
          <button className={styles.sellButton} type={'button'} disabled={false}>
            Sell NFT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ObjectUserNft;
