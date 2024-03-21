import React, { FC } from 'react';
import Link from 'next/link';
import Wrapper from '@/components/layout/Wrapper';

const Home: FC = () => {
  return (
    <>
      <section>
        <Wrapper>
          <button>connect wallet</button>
          <Link href="/admin-panel">Admin panel</Link>
        </Wrapper>
      </section>
    </>
  );
};

export default Home;
