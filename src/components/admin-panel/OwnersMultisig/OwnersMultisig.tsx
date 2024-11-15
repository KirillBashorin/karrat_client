'use client';

import React, { FC, useState } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { isAddress, decodeFunctionData } from 'viem';
import { useShallow } from 'zustand/react/shallow';

import { EarningPoolContract, AccessRolesContract, OwnersMultisigContract } from '@/contracts';
import { Button, Input } from '@/components/ui';
import { minifyAddress } from '@/utils';
import { useErrorStore } from '@/stores';

import styles from './OwnersMultisig.module.scss';

const contracts = [
  { ...EarningPoolContract, name: 'EarningPool' },
  { ...AccessRolesContract, name: 'AccessRoles' },
  { ...OwnersMultisigContract, name: 'OwnersMultisig' },
];

const TransactionItem: FC<{ txId: number }> = ({ txId }) => {
  const { setErrorMessage } = useErrorStore(
    useShallow(state => ({
      setErrorMessage: state.setErrorMessage,
    }))
  );

  const account = useAccount();

  const getTransaction = useReadContract({
    address: OwnersMultisigContract.address,
    abi: OwnersMultisigContract.abi,
    functionName: 'getTransaction',
    args: [txId, account.address],
    query: {
      refetchInterval: 3000,
    },
  });

  const { writeContract } = useWriteContract();

  if (!getTransaction.isSuccess || !Array.isArray(getTransaction.data) || getTransaction.data.length < 7) return null;

  const targetAddress = getTransaction.data[0];
  const targetContract = contracts.find(item => item.address === targetAddress);
  const value = Number(getTransaction.data[1]);
  const data = getTransaction.data[2];
  const creator = getTransaction.data[3];
  const executed = Boolean(getTransaction.data[4]);
  const confirmationsCount = Number(getTransaction.data[5]);
  const alreadySigned = Boolean(getTransaction.data[6]);

  if (confirmationsCount === 0) return null;

  const decodeData = (data: `0x${string}`) => {
    if (!targetContract || !data) return;

    let result = data;

    const decodedData =
      targetContract &&
      decodeFunctionData({
        abi: targetContract.abi,
        data: data,
      });

    if (!decodedData) return result;

    result += `\n\nfunctionName: ${decodedData.functionName}`;

    if (!decodedData.args) return result;

    const targetItem = targetContract.abi.find(
      item => item.type === 'function' && item.name === decodedData.functionName
    );

    if (!targetItem || targetItem.type !== 'function') return result;

    result += '\n\nargs:';
    decodedData.args.forEach((item, index) => {
      result += `\n${targetItem.inputs[index].name} - ${item}`;
    });

    return result;
  };

  const ownersMultisigContractData = {
    address: OwnersMultisigContract.address,
    abi: OwnersMultisigContract.abi,
  };

  const acceptTransaction = () => {
    writeContract(
      {
        ...ownersMultisigContractData,
        functionName: 'acceptTransaction',
        args: [txId],
      },
      {
        onError: error => setErrorMessage(String(error)),
      }
    );
  };

  const revokeTransaction = () => {
    writeContract(
      {
        ...ownersMultisigContractData,
        functionName: 'revokeTransaction',
        args: [txId],
      },
      {
        onError: error => setErrorMessage(String(error)),
      }
    );
  };

  return (
    <div className={styles.transactionItem}>
      <div>
        {targetContract?.name || minifyAddress(targetAddress)}
        <div className={styles.itemInfo}>{targetAddress}</div>
      </div>
      <div>{value}</div>
      <div>
        {data.slice(0, 8)}..
        <div className={styles.itemInfo}>{decodeData(data)}</div>
      </div>
      <div>
        {minifyAddress(creator)}
        <div className={styles.itemInfo}>{creator}</div>
      </div>
      <div>{String(executed)}</div>
      <div>{confirmationsCount}</div>
      <div>
        {!executed && !alreadySigned && (
          <Button className={styles.signButton} onClick={acceptTransaction} disabled={alreadySigned}>
            {alreadySigned ? 'Signed' : 'Sign'}
          </Button>
        )}
        {!executed && alreadySigned && (
          <Button className={styles.signButton} onClick={revokeTransaction} disabled={!alreadySigned}>
            Revoke
          </Button>
        )}
        {executed && alreadySigned && (
          <Button className={styles.signButton} onClick={acceptTransaction} disabled={alreadySigned}>
            Signed
          </Button>
        )}
      </div>
    </div>
  );
};

const OwnersMultisig: FC = () => {
  const [checkAddressValue, setCheckAddressValue] = useState('');

  const signers = useReadContract({
    address: OwnersMultisigContract.address,
    abi: OwnersMultisigContract.abi,
    functionName: 'signers',
    args: [checkAddressValue],
  });

  const signersCount = useReadContract({
    address: OwnersMultisigContract.address,
    abi: OwnersMultisigContract.abi,
    functionName: 'signersCount',
  });

  const txsCount = useReadContract({
    address: OwnersMultisigContract.address,
    abi: OwnersMultisigContract.abi,
    functionName: 'txsCount',
  });

  return (
    <div className={styles.root}>
      <div className={styles.item}>Count of signers - {signersCount.isSuccess && String(signersCount.data)}</div>

      <div className={styles.item}>
        <span className={styles.itemTitle}>Check the address for signers rights</span>
        <Input
          className={styles.input}
          placeholder={'Enter address'}
          value={checkAddressValue}
          onChange={evt => setCheckAddressValue(evt.target.value)}
          isInvalid={checkAddressValue ? !isAddress(checkAddressValue) : false}
        />
        {isAddress(checkAddressValue) && signers.isSuccess && (
          <span>{signers.data === true ? 'Signer' : 'Not signer'}</span>
        )}
      </div>

      {txsCount.isSuccess && typeof txsCount.data === 'bigint' && (
        <div className={styles.transactions}>
          <span className={styles.transactionsTitle}>Transactions list</span>
          <div className={styles.transactionsList}>
            <div className={styles.transactionsListHeader}>
              <div>Target</div>
              <div>Value</div>
              <div>Data</div>
              <div>Creator</div>
              <div>Executed</div>
              <div>Confirmations count</div>
              <div>Sign</div>
            </div>
            {Array.from({ length: Number(txsCount.data) })
              .map((_, index) => <TransactionItem txId={index + 1} key={'transactionItem' + index} />)
              .reverse()}
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnersMultisig;
