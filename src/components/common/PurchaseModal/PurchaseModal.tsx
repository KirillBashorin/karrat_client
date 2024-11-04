'use client';

import React, { FC, useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import { useShallow } from 'zustand/react/shallow';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { parseEther, zeroAddress } from 'viem';

import CloseIcon from '/public/images/icons/cross.svg';
import MapPinIcon from '/public/images/icons/map-pin.svg';
import ArrowCircleIcon from '/public/images/icons/arrow-circle.svg';

import { formatEther } from 'viem';
import { useWeb3Modal } from '@web3modal/wagmi/react';

import { Wrapper } from '@/components/layout';
import { useAppStore, useModalStore } from '@/stores';
import { useObjectsStore } from '@/stores';
import { Badge, Title, Button, Gallery } from '@/components/ui';
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

  const { transactionsToken } = useAppStore(
    useShallow(state => ({
      transactionsToken: state.transactionsToken,
    }))
  );

  const [quantity, setQuantity] = useState(1);
  const innerRef = useRef<HTMLDivElement>(null);

  const { open } = useWeb3Modal();
  const account = useAccount();
  const { writeContract, error: writeContractError } = useWriteContract();

  const getMaxPayTokenAmount = () => {
    if (!estimateBuySharesToken.data || typeof estimateBuySharesToken.data !== 'bigint') return null;

    const slippage = parseEther(process.env.NEXT_PUBLIC_SLIPPAGE || '0.02');
    const priceInWei = estimateBuySharesToken.data;

    const totalPayableAmount = priceInWei * (parseEther('1') + slippage);

    return totalPayableAmount / parseEther('1');
  };

  const getApprove = () => {
    writeContract(
      {
        address: transactionsToken,
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
        args: [quantity, transactionsToken, getMaxPayTokenAmount(), zeroAddress],
      },
      {
        onError: () => console.error(writeContractError),
      }
    );
  };

  const currentObject = objectsList?.find(item => item.contractAddress === purchaseModalObjectAddress);

  const handleOutsideClick = (evt: React.MouseEvent) => {
    if (innerRef.current && !innerRef.current.contains(evt.target as Node)) closePurchaseModal();
  };

  const currentPriceOneShare = useReadContract({
    address: purchaseModalObjectAddress || undefined,
    abi: Object.abi,
    functionName: 'currentPriceOneShare',
  });

  const priceForCurrentUser = useReadContract({
    address: purchaseModalObjectAddress || undefined,
    abi: Object.abi,
    functionName: 'getPriceForUser',
    args: [account.address],
  });

  const estimateBuySharesToken = useReadContract({
    address: purchaseModalObjectAddress || undefined,
    abi: Object.abi,
    functionName: 'estimateBuySharesToken',
    args: [account.address, quantity, transactionsToken],
  });
  console.log(estimateBuySharesToken);

  // const maxShares = useReadContract({
  //   address: purchaseModalObjectAddress || undefined,
  //   abi: Object.abi,
  //   functionName: 'maxShares',
  // });
  //
  // const mintedShares = useReadContract({
  //   address: purchaseModalObjectAddress || undefined,
  //   abi: Object.abi,
  //   functionName: 'mintedShares',
  // });

  const handlerBuyNft = () => {
    if (!purchaseModalObjectAddress || !priceForCurrentUser.data) return;

    getApprove();

    getMaxPayTokenAmount(); // test
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
                    <span className={styles.readinessValue}>54%</span>
                    <ProgressBar className={styles.readinessProgress} progress={54} />
                  </div>
                  <div className={styles.yield}>
                    <Badge size={'small'}>Доходность ≈ 23 usdt / мес</Badge>
                  </div>
                </div>

                <div className={clsx(styles.item, styles.itemQuantity)}>
                  <span className={styles.quantityTitle}>Доступно к покупке: 1000 ft²</span>
                  <div className={styles.quantityContainer}>
                    <span className={styles.quantityText}>Вы покупаете:</span>
                    <div className={styles.quantitySelesctor}>Counter</div>
                    <span className={styles.quantityUnit}>ft²</span>
                  </div>
                </div>

                <div className={clsx(styles.item, styles.itemOrder)}>
                  <div className={styles.orderTextContainer}>
                    <span className={styles.orderTitle}>Стоимость:</span>
                    <span className={styles.orderPrice}>
                      <span className={styles.orderPriceValue}>
                        {priceForCurrentUser.data && currentPriceOneShare.data
                          ? formatEther(priceForCurrentUser.data as bigint)
                          : formatEther(currentPriceOneShare.data as bigint)}
                      </span>
                      <span className={styles.orderPriceUnit}> usdt</span>
                      <span> / ft²</span>
                    </span>
                  </div>
                  <Button
                    className={styles.orderButton}
                    isTransparent={true}
                    isBright={true}
                    onClick={account.address ? handlerBuyNft : open}
                    disabled={!purchaseModalObjectAddress || !currentPriceOneShare.data}
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
