'use client';

import React, { FC, useState } from 'react';
import { useReadContract, useWriteContract } from 'wagmi';
import { isAddress, encodeFunctionData } from 'viem';
import { useShallow } from 'zustand/react/shallow';

import { Button, Input } from '@/components/ui';
import { AccessRolesContract, OwnersMultisigContract } from '@/contracts';
import { useAdminPanelStore, useErrorStore } from '@/stores';

import styles from './AccessRoles.module.scss';

const AccessRoles: FC = () => {
  const [checkAddressValue, setCheckAddressValue] = useState('');
  const [configurableAddressValue, setConfigurableAddressValue] = useState('');
  const [isAddAdminRights, setIsAddAdminRights] = useState(false);

  const { isSigner } = useAdminPanelStore(
    useShallow(state => ({
      isSigner: state.isSigner,
    }))
  );

  const { setErrorMessage } = useErrorStore(
    useShallow(state => ({
      setErrorMessage: state.setErrorMessage,
    }))
  );

  const administrators = useReadContract({
    address: AccessRolesContract.address,
    abi: AccessRolesContract.abi,
    functionName: 'administrators',
    args: [checkAddressValue],
  });

  const { writeContract } = useWriteContract();

  const handleSetAdministratorClick = () => {
    if (!isAddress(configurableAddressValue)) return;

    const setAdministratorData = encodeFunctionData({
      abi: AccessRolesContract.abi,
      functionName: 'setAdministrator',
      args: [configurableAddressValue, isAddAdminRights],
    });

    writeContract(
      {
        address: OwnersMultisigContract?.address,
        abi: OwnersMultisigContract.abi,
        functionName: 'submitTransaction',
        args: [AccessRolesContract.address, 0, setAdministratorData],
      },
      {
        onError: error => setErrorMessage(String(error)),
      }
    );
  };

  return (
    <div className={styles.root}>
      <div className={styles.item}>
        <span className={styles.itemTitle}>Check the address for administrator rights</span>
        <Input
          className={styles.input}
          placeholder={'Enter address'}
          value={checkAddressValue}
          onChange={evt => setCheckAddressValue(evt.target.value)}
          isInvalid={checkAddressValue ? !isAddress(checkAddressValue) : false}
        />
        {isAddress(checkAddressValue) && administrators.isSuccess && (
          <span>{administrators.data === true ? 'Admin' : 'User'}</span>
        )}
      </div>

      {isSigner && (
        <div className={styles.item}>
          <span className={styles.itemTitle}>Set administrator rights for the address</span>
          <Input
            className={styles.input}
            placeholder={'Enter address'}
            value={configurableAddressValue}
            onChange={evt => setConfigurableAddressValue(evt.target.value)}
            isInvalid={configurableAddressValue ? !isAddress(configurableAddressValue) : false}
          />
          <Button
            isTransparent={true}
            isBright={isAddAdminRights}
            onClick={() => setIsAddAdminRights(!isAddAdminRights)}
          >
            Admin
          </Button>
          <Button disabled={!isAddress(configurableAddressValue)} onClick={handleSetAdministratorClick}>
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccessRoles;
