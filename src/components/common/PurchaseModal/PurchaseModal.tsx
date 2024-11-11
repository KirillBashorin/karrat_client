'use client';

import React, { FC, useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import { useShallow } from 'zustand/react/shallow';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { formatUnits, parseUnits, zeroAddress } from 'viem';
import { useAppKit } from '@reown/appkit/react';

import CloseIcon from '/public/images/icons/cross.svg';
import MapPinIcon from '/public/images/icons/map-pin.svg';
import ArrowCircleIcon from '/public/images/icons/arrow-circle.svg';

import { Wrapper } from '@/components/layout';
import { useTransactionsTokenStore, useModalStore } from '@/stores';
import { useObjectsStore } from '@/stores';
import { Badge, Title, Button, Gallery, Spinner, Counter } from '@/components/ui';
import ProgressBar from '@/components/ui/ProgressBar/ProgressBar';
import { Object } from '@/contracts';

import styles from './PurchaseModal.module.scss';

const PurchaseModal: FC = () => {
  const { isPurchaseModalOpen, purchaseModalObjectAddress, closePurchaseModal } = useModalStore(
    useShallow(state => ({
      isPurchaseModalOpen: state.isPurchaseModalOpen,
      purchaseModalObjectAddress: state.purchaseModalObjectAddress,
      closePurchaseModal: state.closePurchaseModal,
    }))
  );

  const { objectsList } = useObjectsStore(
    useShallow(state => ({
      objectsList: state.objectsList,
    }))
  );

  const { transactionsToken } = useTransactionsTokenStore(
    useShallow(state => ({
      transactionsToken: state.transactionsToken,
    }))
  );

  const [quantity, setQuantity] = useState(1);
  const innerRef = useRef<HTMLDivElement>(null);

  const { open } = useAppKit();
  const account = useAccount();
  const { writeContract, error: writeContractError } = useWriteContract();

  const getMaxPayTokenAmount = () => {
    if (!estimateBuySharesToken.data || typeof estimateBuySharesToken.data !== 'bigint' || !transactionsToken?.decimals)
      return null;

    const price = estimateBuySharesToken.data;

    const slippageFraction =
      parseUnits('1', transactionsToken.decimals) +
      parseUnits(process.env.NEXT_PUBLIC_SLIPPAGE || '0.02', transactionsToken.decimals);

    return (price * slippageFraction) / parseUnits('1', transactionsToken.decimals);
  };

  const getApprove = () => {
    if (!transactionsToken) return;

    writeContract(
      {
        address: transactionsToken.address,
        abi: Object.abi,
        functionName: 'approve',
        args: [purchaseModalObjectAddress, getMaxPayTokenAmount()],
      },
      {
        onSuccess: mintNft,
        onError: () => console.error(writeContractError),
      }
    );
  };

  const mintNft = () => {
    if (!purchaseModalObjectAddress) return;

    writeContract(
      {
        address: purchaseModalObjectAddress,
        abi: Object.abi,
        functionName: 'buyShares',
        args: [quantity, transactionsToken?.address, getMaxPayTokenAmount(), zeroAddress],
      },
      {
        onSuccess: () => mintedShares.refetch(),
        onError: () => console.error(writeContractError),
      }
    );
  };

  const currentObject = objectsList?.find(item => item.contractAddress === purchaseModalObjectAddress);

  const handleOutsideClick = (evt: React.MouseEvent) => {
    if (innerRef.current && !innerRef.current.contains(evt.target as Node)) closePurchaseModal();
  };

  const contractData = {
    address: purchaseModalObjectAddress || undefined,
    abi: Object.abi,
  };

  const estimateBuySharesToken = useReadContract({
    ...contractData,
    functionName: 'estimateBuySharesToken',
    args: [account.address || zeroAddress, quantity, transactionsToken?.address],
  });

  const maxShares = useReadContract({
    ...contractData,
    functionName: 'maxShares',
  });

  const mintedShares = useReadContract({
    ...contractData,
    functionName: 'mintedShares',
  });

  const currentStage = useReadContract({
    ...contractData,
    functionName: 'currentStage',
  });

  const stageAvailableShares = useReadContract({
    ...contractData,
    functionName: 'stageAvailableShares',
    args: [currentStage.data],
  });

  const handlerBuyNft = () => {
    if (!purchaseModalObjectAddress || !estimateBuySharesToken.data) return;

    getApprove();
  };

  const getProgressValue = () => {
    const value = Math.round((Number(mintedShares.data) / Number(maxShares.data)) * 100);
    return value || 0;
  };

  useEffect(() => {
    document.body.style.overflowY = isPurchaseModalOpen ? 'hidden' : 'auto';
  }, [isPurchaseModalOpen]);

  return (
    <section className={clsx(isPurchaseModalOpen && styles.opened, styles.root)} onMouseUp={handleOutsideClick}>
      <Wrapper>
        <div className={styles.inner} ref={innerRef}>
          {currentObject && (
            <>
              <div className={styles.gallery}>
                <Badge className={styles.badge} isBright={currentObject.type === 'rent'} size={'small'}>
                  {currentObject.type === 'rent' && 'Rent'}
                  {currentObject.type === 'object' && 'Object'}
                </Badge>
                <Gallery images={currentObject.gallery} />
              </div>
              <div className={styles.info}>
                <div className={clsx(styles.item, styles.itemHeading)}>
                  <Title className={styles.title} size={'small'}>
                    {currentObject.title}
                  </Title>
                  <button className={styles.close} onClick={closePurchaseModal}>
                    <CloseIcon />
                  </button>
                </div>

                <div className={clsx(styles.item, styles.itemDetails)}>
                  <p className={styles.description}>{currentObject.description}</p>
                  <p className={styles.address}>
                    <MapPinIcon />
                    {currentObject.objectAddress}
                  </p>
                  <div className={styles.readiness}>
                    <span className={styles.readinessTitle}>Readiness to rent</span>
                    <span className={styles.readinessValue}>{getProgressValue()}%</span>
                    <ProgressBar className={styles.readinessProgress} progress={getProgressValue()} />
                  </div>
                  <div className={styles.yield}>
                    <Badge size={'small'} isBright={currentObject.type === 'rent'}>
                      Yield ≈ {currentObject.yield * quantity} USDT / month
                    </Badge>
                  </div>
                </div>

                <div className={clsx(styles.item, styles.itemQuantity)}>
                  <span className={styles.quantityTitle}>
                    Available to buy: {stageAvailableShares.isSuccess && Number(stageAvailableShares.data)} ft²
                  </span>
                  <div className={styles.quantityContainer}>
                    <span className={styles.quantityText}>You&apos;re buying:</span>
                    <Counter
                      className={styles.quantitySelesctor}
                      min={1}
                      max={(stageAvailableShares.isSuccess && Number(stageAvailableShares.data)) || 1}
                      onChange={value => setQuantity(value)}
                    />
                    <span className={styles.quantityUnit}>ft²</span>
                  </div>
                </div>

                <div className={clsx(styles.item, styles.itemOrder)}>
                  <div className={styles.orderTextContainer}>
                    <span className={styles.orderTitle}>Стоимость:</span>
                    <span className={styles.orderPrice}>
                      <span className={styles.orderPriceValue}>
                        {estimateBuySharesToken.isLoading && <Spinner />}
                        {transactionsToken &&
                          transactionsToken?.decimals &&
                          typeof estimateBuySharesToken.data === 'bigint' &&
                          Number(formatUnits(estimateBuySharesToken.data, transactionsToken.decimals)).toFixed(2)}
                      </span>
                      <span className={styles.orderPriceUnit}> {transactionsToken?.symbol}</span>
                      {quantity === 1 && <span> / ft²</span>}
                    </span>
                  </div>
                  <Button
                    className={styles.orderButton}
                    isTransparent={true}
                    isBright={true}
                    onClick={account.address ? handlerBuyNft : open}
                    disabled={!purchaseModalObjectAddress || !estimateBuySharesToken.data}
                  >
                    Buy <ArrowCircleIcon />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </Wrapper>
    </section>
  );
};

export default PurchaseModal;
