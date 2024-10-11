import React, { FC } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

import { Wrapper } from '@/components/layout';
import { Title, Button } from '@/components/ui';
import { Socials } from '@/components/common';

import styles from './Support.module.scss';

interface SupportProps {
  title?: string;
  text?: string;
  isDark?: boolean;
  isVector?: boolean;
}

const Support: FC<SupportProps> = ({ title, text, isDark, isVector }) => {
  return (
    <section
      className={clsx(styles.root, isDark && styles.dark)}
      style={{ backgroundImage: 'url(/images/support-bg.jpg)' }}
    >
      <Wrapper>
        <div className={styles.inner}>
          {isVector && (
            <Image
              className={styles.vector}
              src={'/images/construction-vector-3.svg'}
              width={'300'}
              height={'100'}
              alt={''}
            />
          )}

          <div className={styles.card}>
            <Title className={styles.title} as={'h2'}>
              {title || 'Any questions?'}
            </Title>
            <p className={styles.text}>{text || 'Support service is available \non weekends'}</p>
            <div className={styles.buttonsWrapper}>
              <Button className={styles.button} href={'#'}>
                Ask a question
              </Button>
              <Socials className={styles.socials} list={['discord', 'telegram']} />
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Support;
