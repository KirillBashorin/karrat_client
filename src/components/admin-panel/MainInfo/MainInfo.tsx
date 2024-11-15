'use client';

import React, { FC, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';
import { useShallow } from 'zustand/react/shallow';

import { Wrapper } from '@/components/layout';
import { Button, Title } from '@/components/ui';
import { AccessRolesContract, OwnersMultisigContract } from '@/contracts';
import { useAdminPanelStore } from '@/stores';

import styles from './MainInfo.module.scss';

const MainInfo: FC = () => {
  const account = useAccount();
  const { open } = useAppKit();

  const { isSigner, isAdmin, setIsSigner, setIsAdmin } = useAdminPanelStore(
    useShallow(state => ({
      isSigner: state.isSigner,
      isAdmin: state.isAdmin,
      setIsSigner: state.setIsSigner,
      setIsAdmin: state.setIsAdmin,
    }))
  );

  const signers = useReadContract({
    address: OwnersMultisigContract.address,
    abi: OwnersMultisigContract.abi,
    functionName: 'signers',
    args: [account.address],
  });

  const administrators = useReadContract({
    address: AccessRolesContract.address,
    abi: AccessRolesContract.abi,
    functionName: 'administrators',
    args: [account.address],
  });

  useEffect(() => {
    if (typeof signers.data !== 'boolean' || typeof administrators.data !== 'boolean') return;

    setIsSigner(signers.data);
    setIsAdmin(administrators.data);
  }, [signers.data, administrators.data]);

  return (
    <section className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          {account.address && typeof isSigner === 'boolean' && typeof isAdmin === 'boolean' && (
            <Title className={styles.title} size={'medium'} as={'h2'}>
              Hello,{' '}
              <span>
                {isSigner && 'signer!'}
                {isAdmin && 'admin!'}
                {!isSigner && !isAdmin && 'user! Your are not allowed to this page'}
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
