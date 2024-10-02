import React, { FC } from 'react';
import Link from 'next/link';

import { Wrapper } from '@/components/layout';

const Home: FC = () => {
  return (
    <>
      <section>
        <Wrapper>
          <Link href='/admin-panel'>Admin panel</Link>
        </Wrapper>
      </section>
    </>
  );
};

export default Home;
