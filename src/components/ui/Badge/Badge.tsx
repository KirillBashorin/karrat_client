import React, { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

import styles from './Badge.module.scss';

interface BadgeProps extends PropsWithChildren {
  className?: string;
  isBright?: boolean;
  size?: 'medium' | 'small';
}

const Badge: FC<BadgeProps> = ({ className, children, isBright, size = 'medium' }) => {
  return <span className={clsx(className, styles.root, styles[size], isBright && styles.bright)}>{children}</span>;
};

export default Badge;
