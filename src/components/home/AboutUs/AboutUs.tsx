import React, { FC } from 'react';
import Image from 'next/image';

import { Wrapper } from '@/components/layout';
import { Button, Title } from '@/components/ui';

import ArrowCircleIcon from '/public/images/icons/arrow-circle.svg';

import styles from './AboutUs.module.scss';

const AboutUs: FC = () => {
  const list = [
    {
      value: '>2k',
      text: 'Satisfied investors',
    },
    {
      value: '25%',
      text: 'Average yield for\u00a012\u00a0months',
    },
    {
      value: '>500',
      text: 'Families have found their home with Karrat\u00a0Estates',
    },
    {
      value: '>12',
      text: 'Years\u00a0of\u00a0experience',
    },
  ];

  return (
    <section className={styles.root}>
      <Image
        className={styles.vector}
        src={'/images/construction-vector-5.png'}
        width={'300'}
        height={'150'}
        alt={''}
      />
      <Wrapper>
        <div className={styles.inner}>
          <Title className={styles.title} size={'medium'} as={'h2'}>
            Каррат это —{' '}
          </Title>
          <div className={styles.container}>
            <div className={styles.group}>
              <p className={styles.subtitle}>
                Accredited real estate agency in UAE. With over 500 properties passing through us every year. selling
                both affordable and unique properties in the Arab Emirates.
              </p>
              <Button className={styles.button} isTransparent={true}>
                Узнать больше
                <ArrowCircleIcon />
              </Button>
            </div>

            <div className={styles.description}>
              <p className={styles.text}>
                In 2023 we decided to launch our real estate tokenization project, you can now purchase UAE real estate
                from anywhere in the world from 1&nbsp;square foot in the form of NFT.
              </p>
              <p className={styles.text}>
                As the owner of an NFT space, you start earning recurring income from renting that space in the in the
                real world. You also receive income if you sell this object to a buyer in the real world.
              </p>

              <ul className={styles.list}>
                {list &&
                  list.length > 0 &&
                  list.map(item => (
                    <li className={styles.item} key={item.text}>
                      <span className={styles.itemValue}>{item.value}</span>
                      <span className={styles.itemText}>{item.text}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default AboutUs;
