import React, { FC } from 'react';
import Link from 'next/link';

import Wrapper from '@/components/layout/Wrapper';
import WalletConnectButton from '@/components/ui/WalletConnectButton';

const Home: FC = () => {
  return (
    <>
      <section>
        <Wrapper>
          <WalletConnectButton />
          <Link href="/admin-panel">Admin panel</Link>
        </Wrapper>
      </section>
    </>
  );
};

export default Home;
