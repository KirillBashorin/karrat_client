'use client';

import React, { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import { Wrapper } from '@/components/layout';
import { Button, Title } from '@/components/ui';

import ArrowCircleIcon from '/public/images/icons/arrow-circle.svg';

import { Socials } from '@/components/common';

import styles from './Hero.module.scss';

interface HeroProps {
  title: string;
  subtitle: string;
  text?: string;
  backgroundSrc: string;
  vectorVariant: 0 | 1 | 2;
  button: {
    link?: string;
    onClick?: () => void;
    text: string;
  };
  buttonTransparent?: {
    link?: string;
    onClick?: () => void;
    text: string;
  };
  isCentered?: boolean;
}

const Hero: FC<HeroProps> = ({
  title,
  subtitle,
  text,
  backgroundSrc,
  vectorVariant,
  button,
  buttonTransparent,
  isCentered,
}) => {
  return (
    <section className={styles.root} style={{ backgroundImage: `url(${backgroundSrc})` }}>
      <Wrapper>
        <div className={styles.inner}>
          <div className={clsx(styles.info, isCentered && styles.centered)}>
            <Title className={styles.title} size={'big'} as={'h1'}>
              {title}
            </Title>
            <p className={styles.subtitle}>{subtitle}</p>
            {text && <p className={styles.text}>{text}</p>}
          </div>

          <div className={clsx(styles.buttonsWrapper, isCentered && styles.centered)}>
            <Button className={styles.button} href={button.link} onClick={button.onClick}>
              {button.text}
              <ArrowCircleIcon />
            </Button>
            {buttonTransparent && (
              <Button
                className={styles.button}
                href={buttonTransparent.link}
                onClick={buttonTransparent.onClick}
                isTransparent={true}
                isBright={true}
              >
                {buttonTransparent.text}
              </Button>
            )}
            <Socials
              className={clsx(styles.socials, buttonTransparent && styles.socialsDesktopOnly)}
              list={['discord', 'telegram']}
            />
          </div>
        </div>

        <motion.div
          className={clsx(styles.vector, styles[`vector${vectorVariant}`])}
          initial='hidden'
          whileInView='visible'
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <Image src={`/images/construction-vector-${vectorVariant}.svg`} height={300} width={300} alt={''} />
        </motion.div>
      </Wrapper>
    </section>
  );
};

export default Hero;
