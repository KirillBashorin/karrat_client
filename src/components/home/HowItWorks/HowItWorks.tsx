'use client';

import React, { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { Wrapper } from '@/components/layout';
import { Button, Title } from '@/components/ui';

import styles from './HowItWorks.module.scss';

const HowItWorks: FC = () => {
  const items = [
    `Go to our marketplace\u00a0page`,
    'Connect Metamask/TrustWallet',
    'Making a purchase using cryptocurrency',
    'You can see the status of objects in your personal account',
    'Once a month you get income on your wallet',
  ];

  return (
    <section className={styles.root}>
      <Wrapper>
        <motion.div
          className={styles.vector}
          initial='hidden'
          whileInView='visible'
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          <Image src={'/images/construction-vector-3.svg'} width={'587'} height={'599'} alt={''} />
        </motion.div>
        <div className={styles.inner}>
          <Title className={styles.title} size={'medium'} as={'h2'}>
            Simple steps to&nbsp;a&nbsp;stable&nbsp;income:
          </Title>

          <ol className={styles.list}>
            {items &&
              items.length > 0 &&
              items.map((item, index) => (
                <motion.li
                  className={styles.item}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: index * 0.3,
                    ease: 'easeInOut',
                  }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                  key={item}
                >
                  {item}
                </motion.li>
              ))}
          </ol>

          <div className={styles.buttonsWrapper}>
            <Button>Demo of the personal account</Button>
            <Button isTransparent={true} isBright={true}>
              Catalog
            </Button>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default HowItWorks;
