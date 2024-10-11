'use client';

import React, { FC } from 'react';
import clsx from 'clsx';

import { Title } from '@/components/ui';

import TickIcon from '/public/images/icons/tick.svg';

import styles from './Accordion.module.scss';

interface AccordionItemProps {
  isOpened: boolean;
  onClick: () => void;
  title: string;
  text: string;
}

const AccordionItem: FC<AccordionItemProps> = ({ isOpened, onClick, title, text }) => {
  return (
    <li className={clsx(isOpened && styles.opened)}>
      <button className={styles.itemButton} type='button' onClick={onClick}>
        <Title className={styles.itemTitle} size={'small'} as={'h3'}>
          {title}
        </Title>
        <TickIcon width={24} height={24} />
      </button>
      <div className={styles.itemWrapper}>
        <div className={styles.itemContent}>
          <div className={styles.itemText}>{text}</div>
        </div>
      </div>
    </li>
  );
};

export default AccordionItem;
