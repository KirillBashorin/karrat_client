import React, { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

import styles from './Title.module.scss';

interface TitleProps extends PropsWithChildren {
  className?: string;
  size?: 'big' | 'medium' | 'small';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Title: FC<TitleProps> = ({ children, className, size = 'medium', as: Tag = 'h2' }) => {
  return <Tag className={clsx(className, styles.root, styles[size])}>{children}</Tag>;
};

export default Title;
