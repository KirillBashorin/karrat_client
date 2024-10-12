'use client';

import React, { FC, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { FadeOut } from '@/components/common';
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
  const itemRef = useRef<HTMLLIElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handlerClick = () => {
    onClick();
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;

    const handleTransitionEnd = () => {
      if (!isOpened || !itemRef.current) return;

      const itemTop = itemRef.current.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      if (itemTop < 0 || itemTop > viewportHeight) {
        itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (!wrapper) return;

    wrapper.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      if (!wrapper) return;

      wrapper.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [isOpened]);

  return (
    <FadeOut className={clsx(isOpened && styles.opened)} as={'li'} ref={itemRef}>
      <button className={styles.itemButton} type='button' onClick={handlerClick}>
        <Title className={styles.itemTitle} size={'small'} as={'h3'}>
          {title}
        </Title>
        <TickIcon width={24} height={24} />
      </button>
      <div className={styles.itemWrapper} ref={wrapperRef}>
        <div className={styles.itemContent}>
          <div className={styles.itemText}>{text}</div>
        </div>
      </div>
    </FadeOut>
  );
};

export default AccordionItem;
