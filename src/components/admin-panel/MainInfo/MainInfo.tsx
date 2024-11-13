'use client';

import React, { FC } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';

import { Wrapper } from '@/components/layout';
import { Button, Title } from '@/components/ui';
import { AccessRoles, OwnersMultisig } from '@/contracts';

import styles from './MainInfo.module.scss';

const MainInfo: FC = () => {
  const account = useAccount();
  const { open } = useAppKit();

  const isSigner = useReadContract({
    address: OwnersMultisig.address,
    abi: OwnersMultisig.abi,
    functionName: 'signers',
    args: [account.address],
  });

  const isAdmin = useReadContract({
    address: AccessRoles.address,
    abi: AccessRoles.abi,
    functionName: 'administrators',
    args: [account.address],
  });

  console.log('isSigner', isSigner.data);
  console.log('isAdmin', isAdmin.data);

  return (
    <section className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          {account.address && (
            <Title className={styles.title} size={'medium'} as={'h2'}>
              Hello,{' '}
              <span>
                {isSigner.isSuccess && isAdmin.isSuccess && (
                  <>
                    {isSigner.data && 'signer!'}
                    {isAdmin.data && 'admin!'}
                    {!isSigner.data && !isAdmin.data && 'user! Your are not allowed to this page'}
                  </>
                )}
              </span>
            </Title>
          )}

          {!account.address && (
            <Button className={styles.button} isTransparent={true} isBright={true} onClick={open}>
              Connect wallet
            </Button>
          )}
        </div>
      </Wrapper>
    </section>
  );
};

export default MainInfo;
