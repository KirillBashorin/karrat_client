'use client';

import React, { FC, useState } from 'react';
import { useWriteContract } from 'wagmi';
import { useShallow } from 'zustand/react/shallow';
import { encodeFunctionData } from 'viem';

import { Button, Input } from '@/components/ui';
import { ObjectFactoryContract, OwnersMultisigContract } from '@/contracts';
import { useErrorStore } from '@/stores';

import styles from './ObjectFactory.module.scss';

const ObjectFactory: FC = () => {
  const [maxSharesStage, setMaxSharesStage] = useState('1');
  const [initialStageAvailableShares, setInitialStageAvailableShares] = useState('1');
  const [initialStageStopTimestamp, setInitialStageStopTimestamp] = useState(0);
  const [priceOneShareStage, setPriceOneShareStage] = useState('1');
  const [referralProgramEnabledStage, setReferralProgramEnabledStage] = useState(true);

  const [maxSharesFull, setMaxSharesFull] = useState('1');
  const [saleStopTimestampFull, setSaleStopTimestampFull] = useState(0);
  const [priceOneShareFull, setPriceOneShareFull] = useState('1');
  const [referralProgramEnabledFull, setReferralProgramEnabledFull] = useState(true);

  const { writeContract } = useWriteContract();

  const { setErrorMessage } = useErrorStore(
    useShallow(state => ({
      setErrorMessage: state.setErrorMessage,
    }))
  );

  const handleNumberInputChange = (evt: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    const value = evt.target.value;

    if (value !== '' && Number(value) < Number(evt.target.min)) return;

    setter(evt.target.value);
  };

  const handleDataChange = (evt: React.ChangeEvent<HTMLInputElement>, setter: (value: number) => void) => {
    const value = evt.target.value;

    if (!value) return;

    const date = new Date(value);
    const timestamp = date.getTime();
    setter(timestamp);
  };

  const OwnersMultisigContractData = {
    address: OwnersMultisigContract.address,
    abi: OwnersMultisigContract.abi,
  };

  const createStageSaleObject = () => {
    const createStageSaleObjectData = encodeFunctionData({
      abi: ObjectFactoryContract.abi,
      functionName: 'createStageSaleObject',
      args: [
        maxSharesStage,
        initialStageAvailableShares,
        initialStageStopTimestamp,
        priceOneShareStage,
        referralProgramEnabledStage,
      ],
    });

    writeContract(
      {
        ...OwnersMultisigContractData,
        functionName: 'submitTransaction',
        args: [ObjectFactoryContract.address, 0, createStageSaleObjectData],
      },
      {
        onSuccess: () => console.log('success'),
        onError: error => setErrorMessage(String(error)),
      }
    );
  };

  const createFullSaleObject = () => {
    const createFullSaleObjectData = encodeFunctionData({
      abi: ObjectFactoryContract.abi,
      functionName: 'createFullSaleObject',
      args: [maxSharesFull, saleStopTimestampFull, priceOneShareFull, referralProgramEnabledFull],
    });

    writeContract(
      {
        ...OwnersMultisigContractData,
        functionName: 'submitTransaction',
        args: [ObjectFactoryContract.address, 0, createFullSaleObjectData],
      },
      {
        onSuccess: () => console.log('success'),
        onError: error => setErrorMessage(String(error)),
      }
    );
  };

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.item}>
          <span className={styles.itemTitle}>Create stage sale object</span>
          <div className={styles.subItem}>
            <span>Max shares </span>
            <Input
              className={styles.input}
              min={'1'}
              step={'1'}
              type={'number'}
              value={maxSharesStage}
              onChange={evt => handleNumberInputChange(evt, setMaxSharesStage)}
            />
          </div>
          <div className={styles.subItem}>
            <span>Initial stage available shares </span>
            <Input
              className={styles.input}
              min={'1'}
              step={'1'}
              type={'number'}
              value={initialStageAvailableShares}
              onChange={evt => handleNumberInputChange(evt, setInitialStageAvailableShares)}
            />
          </div>
          <div className={styles.subItem}>
            <span>Initial stage sale stop timestamp </span>
            <Input
              className={styles.input}
              min={new Date().toISOString().split('T')[0]}
              type={'date'}
              onChange={evt => handleDataChange(evt, setInitialStageStopTimestamp)}
            />
          </div>
          <div className={styles.subItem}>
            <span>Price one share </span>
            <Input
              className={styles.input}
              min={'1'}
              step={'1'}
              type={'number'}
              value={priceOneShareStage}
              onChange={evt => handleNumberInputChange(evt, setPriceOneShareStage)}
            />
          </div>
          <div className={styles.subItem}>
            <span>Referral program </span>
            <Button
              className={styles.input}
              isTransparent={true}
              isBright={referralProgramEnabledStage}
              onClick={() => setReferralProgramEnabledStage(!referralProgramEnabledStage)}
            >
              {referralProgramEnabledStage ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
          <div className={styles.subItem}>
            <Button className={styles.createButton} onClick={createStageSaleObject}>
              Create
            </Button>
          </div>
        </div>

        <div className={styles.item}>
          <span className={styles.itemTitle}>Create full sale object</span>
          <div className={styles.subItem}>
            <span>Max shares </span>
            <Input
              className={styles.input}
              min={'1'}
              step={'1'}
              type={'number'}
              value={maxSharesFull}
              onChange={evt => handleNumberInputChange(evt, setMaxSharesFull)}
            />
          </div>
          <div className={styles.subItem}>
            <span>Sale stop timestamp </span>
            <Input
              className={styles.input}
              min={new Date().toISOString().split('T')[0]}
              type={'date'}
              onChange={evt => handleDataChange(evt, setSaleStopTimestampFull)}
            />
          </div>
          <div className={styles.subItem}>
            <span>Price one share </span>
            <Input
              className={styles.input}
              min={'1'}
              step={'1'}
              type={'number'}
              value={priceOneShareFull}
              onChange={evt => handleNumberInputChange(evt, setPriceOneShareFull)}
            />
          </div>
          <div className={styles.subItem}>
            <span>Referral program </span>
            <Button
              className={styles.input}
              isTransparent={true}
              isBright={referralProgramEnabledFull}
              onClick={() => setReferralProgramEnabledFull(!referralProgramEnabledFull)}
            >
              {referralProgramEnabledFull ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
          <div className={styles.subItem}>
            <Button className={styles.createButton} onClick={createFullSaleObject}>
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectFactory;
