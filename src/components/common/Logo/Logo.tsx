import React, { FC } from 'react';
import clsx from 'clsx';

import LogoSVG from '/public/images/logo.svg';

import styles from './Logo.module.scss';

interface LogoProps {
  size?: 'normal | big';
}

const Logo: FC<LogoProps> = ({ size = 'normal' }) => {
  return (
    <a className={clsx(styles.root, styles[size])} href={'/'}>
      <LogoSVG />
    </a>
  );
};

export default Logo;
