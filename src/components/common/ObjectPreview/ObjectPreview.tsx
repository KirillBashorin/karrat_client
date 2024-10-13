import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge, Title } from '@/components/ui';

import DownloadIcon from '/public/images/icons/download.svg';

import styles from './ObjectPreview.module.scss';

import type { ObjectType } from '@/types';

interface ObjectPreviewProps {
  object: ObjectType;
}

const ObjectPreview: FC<ObjectPreviewProps> = ({ object }) => {
  return (
    <div className={styles.root}>
      <Image className={styles.image} src={object.image} width={'300'} height={'100'} alt={''} />
      <Badge className={styles.badge} isBright={object.type === 'rent'} size={'small'}>
        {object.type}
      </Badge>
      <div className={styles.info}>
        <Title className={styles.title} size={'small'} as={'h3'}>
          {object.title}
        </Title>
        <p className={styles.details}>
          <span className={styles.price}>{object.price} usdt</span>
          {' / '}
          <span>{object.share} ft²</span>
        </p>
        <Link className={styles.download} href={object.file} download={true} target={'_blank'}>
          <DownloadIcon />
        </Link>
      </div>
    </div>
  );
};

export default ObjectPreview;
