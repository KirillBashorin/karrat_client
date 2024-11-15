import React, { FC, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useAccount, useReadContracts } from 'wagmi';

import { Wrapper } from '@/components/layout';
import { Button, TabButtons, Title } from '@/components/ui';
import { ObjectUserNft } from '@/components/account';
import { ObjectContract } from '@/contracts';

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

  const balanceOf = useReadContracts({
    contracts: objectsList?.map(item => ({
      address: item.contractAddress,
      abi: ObjectContract.abi,
      functionName: 'balanceOf',
      args: [account?.address],
    })),
  });

  const checkIsBalanceNotEmpty = () => {
    if (!balanceOf || !balanceOf?.data) return false;

    return balanceOf.data.some(item => item.result !== BigInt(0));
  };

  const filterObjectListByNotEmptyBalance = (objectsList: ObjectType[]) => {
    if (!balanceOf || !balanceOf.data) return objectsList;

    return objectsList.slice().filter((_, index) => Number(balanceOf.data[index].result) > 0);
  };

  useEffect(() => {
    getObjectsList();
  }, [getObjectsList]);

  return (
    <section className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          <div className={styles.heading}>
            <Title>
              {balanceOf && balanceOf.data && checkIsBalanceNotEmpty() ? 'Your NFT' : "You don't have any NFT yet"}
            </Title>
            {objectsList && balanceOf && balanceOf.data && checkIsBalanceNotEmpty() && (
              <TabButtons
                buttons={getTabItems(filterObjectListByNotEmptyBalance(objectsList))}
                onClick={setCurrentItemIndex}
                defaultItemIndex={0}
              />
            )}
            {balanceOf &&
              balanceOf.data &&
              balanceOf.data.slice().filter(item => Number(item.result) > 0).length > 1 && (
                <Button
                  className={styles.claimButton}
                  isTransparent={true}
                  isBright={true}
                  disabled={balanceOf.data.length <= 1}
                >
                  Claim all
                  <ArrowCircleIcon />
                </Button>
              )}
            {(!balanceOf || !checkIsBalanceNotEmpty()) && (
              <Button className={styles.claimButton} href={'/marketplace'} isTransparent={true} isBright={true}>
                Buy NFT
                <ArrowCircleIcon />
              </Button>
            )}
          </div>
          {balanceOf && balanceOf.data && checkIsBalanceNotEmpty() && objectsList && objectsList.length > 0 && (
            <div className={styles.list}>
              {getFilteredObjects(filterObjectListByNotEmptyBalance(objectsList), currentItemIndex).map(object =>
                Array.from({ length: Number(balanceOf.data[objectsList.indexOf(object)].result) }).map(
                  (_, tokenIndex) => (
                    <ObjectUserNft object={object} id={tokenIndex + 1} key={object.contractAddress + tokenIndex} />
                  )
                )
              )}
            </div>
          )}
        </div>
      </Wrapper>
    </section>
  );
};

export default YourNft;
