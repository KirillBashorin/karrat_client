import React, { FC } from 'react';
import Image from 'next/image';

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
        <div className={styles.vector}>
          <Image src={'/images/construction-vector-3.svg'} width={'587'} height={'599'} alt={''} />
        </div>
        <div className={styles.inner}>
          <Title className={styles.title} size={'medium'} as={'h2'}>
            Simple steps to&nbsp;a&nbsp;stable&nbsp;income:
          </Title>

          <ol className={styles.list}>
            {items &&
              items.length > 0 &&
              items.map(item => (
                <li className={styles.item} key={item}>
                  {item}
                </li>
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
