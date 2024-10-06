import React, { FC } from 'react';

import { Wrapper } from '@/components/layout';

import styles from './page.module.scss';

const Home: FC = () => {
  return (
    <>
      <section>
        <Wrapper>
          <div className={styles.test}>123</div>
        </Wrapper>
      </section>
    </>
  );
};

export default Home;
