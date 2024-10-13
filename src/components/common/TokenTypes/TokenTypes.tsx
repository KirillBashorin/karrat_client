'use client';

import React, { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import ArrowCircleIcon from '/public/images/icons/arrow-circle.svg';

import { Wrapper } from '@/components/layout';
import { AccordionItem, Badge, Title } from '@/components/ui';

import styles from './TokenTypes.module.scss';

interface TokenItemProps {
  title: string;
  text: string;
  badge: {
    isBright: boolean;
    text: string;
  };
}

const TokenItem: FC<TokenItemProps> = ({ title, text, badge }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsWide(event.matches);
    };

    setIsWide(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  return (
    <li className={styles.item}>
      <div className={styles.buttonsWrapper}>
        <Badge isBright={badge.isBright}>{badge.text}</Badge>
        <Link className={styles.link} href={'/marketplace/'}>
          Market
          <ArrowCircleIcon />
        </Link>
      </div>
      <Title className={styles.itemTitle} size={'small'} as={'h3'}>
        {title}
      </Title>
      {isWide && <p className={styles.text}>{text}</p>}
      {!isWide && (
        <AccordionItem
          isOpened={isOpened}
          onClick={() => setIsOpened(!isOpened)}
          title={isOpened ? 'Show less' : 'Show more'}
          text={text}
          as={'div'}
          isDark={true}
        />
      )}
    </li>
  );
};

const TokenTypes: FC = () => {
  const items = [
    {
      title: 'These are the tokenized square feet of the property under construction.',
      text:
        "The object is sold in several stages. At the first stage the price of a separate NFT-area is the most favorable. Up to 40% of the object's area is available for purchase.\n\n" +
        'In the course of construction, 10% of the space is offered for sale, but its price gradually increases as the object approaches completion. While the object is under construction, all NFT holders receive income from the sale of space in subsequent stages.\n\n' +
        'If a buyer appears for the object under construction, all NFT holders vote whether or not to sell the object at the offered price. If the object is sold, users receive their funds + income from the sale of the object.\n\n' +
        'If the object is completed and not sold, it starts renting out, generating a recurring income for all NFT holders.\n\n' +
        'The finished object can be sold with a high markup, then NFT holders receive their money + income from the sale of the object + the amount of money they have already earned while renting out the object.',
      badge: {
        isBright: false,
        text: 'Object',
      },
    },
    {
      title: 'It is a tokenized area of an already constructed building in the UAE that is rented out.',
      text:
        'Users (NFT buyers) receive income from rental properties depending on the amount of NFT space they buy.\n\n' +
        'If a buyer appears for a rental property, all NFT holders vote whether or not to sell the property at the offered price.\n\n' +
        'If the object is sold, all NFT holders get their money back + income from the sale + the amount of money they have already earned while renting out the object.',
      badge: {
        isBright: true,
        text: 'Rent',
      },
    },
  ];

  return (
    <section className={styles.root}>
      <div className={styles.backgroundBottom}>
        <Image src={'/images/object-types-bg.jpg'} width={'300'} height={'150'} alt={''} />
      </div>
      <div className={styles.backgroundTop}>
        <Image src={'/images/city-transparent.png'} width={'300'} height={'150'} alt={''} />
      </div>
      <Wrapper>
        <div className={styles.inner}>
          <Title className={styles.title} size={'medium'} as={'h2'}>
            Token types
          </Title>
          <ul className={styles.list}>
            {items &&
              items.length > 0 &&
              items.map(item => <TokenItem title={item.title} text={item.text} badge={item.badge} key={item.title} />)}
          </ul>
        </div>
      </Wrapper>
    </section>
  );
};

export default TokenTypes;
