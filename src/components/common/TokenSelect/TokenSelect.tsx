'use client';

import React, { FC, HTMLAttributes, DetailedHTMLProps } from 'react';
import Select from 'react-select';
import { useShallow } from 'zustand/react/shallow';
import Image from 'next/image';
import clsx from 'clsx';
import { Address } from 'viem';

import { useTransactionsTokenStore } from '@/stores';

import TriangleIcon from '/public/images/icons/triangle.svg';

import styles from './TokenSelect.module.scss';

interface ITokenItem {
  icon: string;
  symbol: string;
}

const TokenItem: FC<ITokenItem> = ({ icon, symbol }) => {
  return (
    <div className={styles.tokenItem}>
      <Image className={styles.icon} src={icon} width={'20'} height={'20'} alt={symbol} />
      {symbol}
    </div>
  );
};

interface ICustomIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  innerProps: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  hasValue: boolean;
}

const CustomIndicator: FC<ICustomIndicatorProps> = ({ innerProps, hasValue }) => {
  return (
    <div className={clsx(styles.dropdownIndicator, styles.dropdownIndicatorFocused)} {...innerProps}>
      {hasValue && <TriangleIcon />}
    </div>
  );
};

type OptionType = {
  value: Address;
  label: React.ReactNode;
};

const TokenSelect: FC = () => {
  const { transactionsTokensList, transactionsToken, setTransactionsToken } = useTransactionsTokenStore(
    useShallow(state => ({
      transactionsTokensList: state.transactionsTokensList,
      transactionsToken: state.transactionsToken,
      setTransactionsToken: state.setTransactionsToken,
    }))
  );

  const options =
    transactionsTokensList &&
    Object.values(transactionsTokensList).map(item => ({
      value: item.address,
      label: <TokenItem icon={item.icon} symbol={item.symbol} />,
    }));

  const handleChange = (selectedOption: OptionType | null) => {
    if (!transactionsTokensList || !selectedOption) return;

    const selectedToken = Object.values(transactionsTokensList)
      .slice()
      .find(item => item.address === selectedOption.value);

    if (!selectedToken) return;

    setTransactionsToken(selectedToken);
  };

  return (
    <Select
      isLoading={!options}
      className={styles.root}
      isSearchable={false}
      options={options || undefined}
      classNames={{
        control: state => clsx(styles.control, state.isFocused && styles.controlFocused),
        indicatorSeparator: () => styles.indicatorSeparator,
        singleValue: () => styles.singleValue,
        menu: () => styles.menu,
        option: state =>
          clsx(styles.option, state.isSelected && styles.optionSelected, state.isFocused && styles.optionFocused),
      }}
      onChange={handleChange}
      value={
        transactionsToken && {
          value: transactionsToken.address as Address,
          label: <TokenItem icon={transactionsToken.icon} symbol={transactionsToken.symbol} />,
        }
      }
      components={{ DropdownIndicator: CustomIndicator }}
      placeholder={'Loading'}
    />
  );
};

export default TokenSelect;
