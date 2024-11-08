'use client';

import React, { FC, useState } from 'react';
import clsx from 'clsx';

import MinusIcon from '/public/images/icons/minus.svg';
import PlusIcon from '/public/images/icons/plus.svg';

import styles from './Counter.module.scss';

interface CounterProps {
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

const Counter: FC<CounterProps> = ({ className, min, max, step = 1, onChange }) => {
  const [value, setValue] = useState(min || 0);

  const increaseValue = () => {
    if (max !== undefined && value + step > max) return;

    setValue(value + step);
    onChange && onChange(value + step);
  };

  const decreaseValue = () => {
    if (min !== undefined && value - step < min) return;

    setValue(value - step);
    onChange && onChange(value - step);
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = Number(evt.currentTarget.value);

    if (max && min && (targetValue < min || targetValue > max)) return;

    setValue(targetValue);
    onChange && onChange(targetValue);
  };

  return (
    <div className={clsx(className, styles.root)}>
      <button className={styles.button} onClick={decreaseValue} disabled={min !== undefined && value - step < min}>
        <MinusIcon />
      </button>
      <input className={styles.input} type={'number'} min={min} max={max} value={value} onChange={handleChange} />
      <button className={styles.button} onClick={increaseValue} disabled={max !== undefined && value + step > max}>
        <PlusIcon />
      </button>
    </div>
  );
};

export default Counter;
