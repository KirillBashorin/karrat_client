import React, { FC, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  href?: string;
  target?: string;
  disabled?: boolean;
  onClick?: () => void;
  isTransparent?: boolean;
}

const Button: FC<IButtonProps> = ({ className, onClick, children, href, target, type, disabled, isTransparent }) => {
  const classNames = clsx(className, styles.root, isTransparent && styles.transparent);

  return href ? (
    <Link className={classNames} onClick={onClick} href={href} target={target}>
      {children}
    </Link>
  ) : (
    <button className={classNames} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
