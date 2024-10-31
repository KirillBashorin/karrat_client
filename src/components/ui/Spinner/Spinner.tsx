import React, { FC } from 'react';
import clsx from 'clsx';

import SpinnerIcon from '/public/images/icons/spinner.svg';

import styles from './Spinner.module.scss';

interface SpinnerProps {
  className?: string;
}

const Spinner: FC<SpinnerProps> = ({ className }) => {
  return <SpinnerIcon className={clsx(className, styles.root)} />;
};

export default Spinner;
