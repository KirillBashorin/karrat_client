'use client';

import React, { FC, useState } from 'react';
import { useReadContract, useWriteContract } from 'wagmi';
import { isAddress, encodeFunctionData } from 'viem';

import { Button, Input } from '@/components/ui';
import { AccessRoles as AccessRolesContract, OwnersMultisig } from '@/contracts';

import styles from './AccessRoles.module.scss';

const AccessRoles: FC = () => {
  const [checkAddressValue, setCheckAddressValue] = useState('');
  const [configurableAddressValue, setConfigurableAddressValue] = useState('');
  const [isAddAdminRights, setIsAddAdminRights] = useState(false);

  const administrators = useReadContract({
    address: AccessRolesContract.address,
    abi: AccessRolesContract.abi,
    functionName: 'administrators',
    args: [checkAddressValue],
  });

  const { writeContract, failureReason: writeContractFailureReason } = useWriteContract();

  const handleSetAdministratorClick = () => {
    if (!isAddress(configurableAddressValue)) return;

    const setAdministratorData = encodeFunctionData({
      abi: AccessRolesContract.abi,
      functionName: 'setAdministrator',
      args: [configurableAddressValue, isAddAdminRights],
    });

    writeContract({
      address: OwnersMultisig.address,
      abi: OwnersMultisig.abi,
      functionName: 'submitTransaction',
      args: [AccessRolesContract.address, 0, setAdministratorData],
    });
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

      <div className={styles.item}>
        <span className={styles.itemTitle}>Set administrator rights for the address</span>
        <Input
          className={styles.input}
          placeholder={'Enter address'}
          value={configurableAddressValue}
          onChange={evt => setConfigurableAddressValue(evt.target.value)}
          isInvalid={configurableAddressValue ? !isAddress(configurableAddressValue) : false}
        />
        <Button isTransparent={true} isBright={isAddAdminRights} onClick={() => setIsAddAdminRights(!isAddAdminRights)}>
          Admin
        </Button>
        <Button disabled={!isAddress(configurableAddressValue)} onClick={handleSetAdministratorClick}>
          Submit
        </Button>
        {writeContractFailureReason && String(writeContractFailureReason)}
      </div>
    </div>
  );
};

export default AccessRoles;
