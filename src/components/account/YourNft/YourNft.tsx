import React, { FC, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useAccount, useReadContracts } from 'wagmi';

import { Wrapper } from '@/components/layout';
import { Button, TabButtons, Title } from '@/components/ui';
import { ObjectUserNft } from '@/components/account';
import { Object } from '@/contracts';

import ArrowCircleIcon from '/public/images/icons/arrow-circle.svg';

import { getFilteredObjects, getTabItems } from '@/utils';
import { useObjectsStore } from '@/stores';
import { ObjectType } from '@/types';

import styles from './YourNft.module.scss';

const YourNft: FC = () => {
  const { objectsList, getObjectsList } = useObjectsStore(
    useShallow(state => ({ objectsList: state.objectsList, getObjectsList: state.getObjectsList }))
  );

  const account = useAccount();

  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [yourNftData, setYourNftData] = useState<{ object: ObjectType; balance: bigint }[] | null>(null);

  const filteredObjects = objectsList && getFilteredObjects(objectsList, currentItemIndex);

  const balanceOf = useReadContracts({
    contracts: filteredObjects?.map(item => ({
      address: item.contractAddress,
      abi: Object.abi,
      functionName: 'balanceOf',
      args: [account?.address],
    })),
  });

  useEffect(() => {
    getObjectsList();
  }, [getObjectsList]);

  useEffect(() => {
    if (!balanceOf?.data || !objectsList) return;

    const filteredArray = balanceOf.data.filter(item => item.result);

    if (filteredArray.length === 0) return;

    const fetchedYourNftData = filteredArray.map((item, index) => ({
      object: objectsList[index],
      balance: item.result as bigint,
    }));

    setYourNftData(fetchedYourNftData);
  }, [balanceOf?.data, objectsList, currentItemIndex]);

  return (
    <section className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          <div className={styles.heading}>
            <Title>{yourNftData ? 'Your NFT' : "You don't have any NFT yet"}</Title>
            {objectsList && yourNftData && (
              <TabButtons
                buttons={getTabItems(objectsList).map(item => item.name)}
                onClick={setCurrentItemIndex}
                defaultItemIndex={0}
              />
            )}
            {yourNftData && (
              <Button
                className={styles.claimButton}
                isTransparent={true}
                isBright={true}
                disabled={yourNftData.length <= 1}
              >
                Claim all
                <ArrowCircleIcon />
              </Button>
            )}
            {!yourNftData && (
              <Button className={styles.claimButton} href={'/marketplace'} isTransparent={true} isBright={true}>
                Buy NFT
                <ArrowCircleIcon />
              </Button>
            )}
          </div>
          {/*{yourNftData && yourNftData.length > 0 && (*/}
          {objectsList && objectsList.length > 0 && (
            <div className={styles.list}>
              {/*<ObjectUserNft object={yourNftData[0].object} id={BigInt(1)} />*/}
              <ObjectUserNft object={objectsList[0]} id={BigInt(1)} />
            </div>
          )}
        </div>
      </Wrapper>
    </section>
  );
};

export default YourNft;
