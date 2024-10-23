import React, { FC } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import { Badge, Title } from '@/components/ui';

import styles from './ObjectPreview.module.scss';

import type { ObjectType } from '@/types';

interface ObjectPreviewProps {
  className?: string;
  object: ObjectType;
  isSmall?: boolean;
}

const ObjectPreview: FC<ObjectPreviewProps> = ({ className, object, isSmall }) => {
  return (
    <div className={clsx(className, styles.root, isSmall && styles.small)}>
      <Image className={styles.image} src={object.image} width={'300'} height={'100'} alt={''} />
      <Badge className={styles.badge} isBright={object.type === 'rent'} size={'small'}>
        {object.type}
      </Badge>
      <Title className={styles.title} size={'small'} as={'h3'}>
        {object.title}
      </Title>
      <p className={styles.details}>
        <span className={styles.price}>49.923 usdt</span>
        {' / '}
        <span>1 ft²</span>
      </p>
    </div>
  );
};

export default ObjectPreview;
