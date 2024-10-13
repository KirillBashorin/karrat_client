import React, { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

import styles from './Badge.module.scss';

interface BadgeProps extends PropsWithChildren {
  isBright?: boolean;
}

const Badge: FC<BadgeProps> = ({ children, isBright }) => {
  return <span className={clsx(styles.root, isBright && styles.bright)}>{children}</span>;
};

export default Badge;
