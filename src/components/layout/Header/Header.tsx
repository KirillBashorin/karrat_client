'use client';

import React, { FC, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useAccount } from 'wagmi';
import { useDisconnect } from 'wagmi';
import { MetaMaskAvatar } from 'react-metamask-avatar';

import LogoutIcon from '/public/images/icons/logout.svg';

import { Wrapper } from '@/components/layout';
import { Logo, TokenSelect } from '@/components/common';
import { Button } from '@/components/ui';

import ArrowCircleSVG from '/public/images/icons/arrow-circle.svg';

import styles from './Header.module.scss';

const AccountButton = () => {
  const account = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className={styles.account}>
      <Button href={'/account/'} isTransparent={true}>
        {account.isConnected && (
          <>
            <MetaMaskAvatar className={styles.avatar} address={account.address || ''} size={24} />
            <span>
              {account.address?.slice(0, 4)}..{account.address?.slice(-4, -1)}
            </span>
          </>
        )}
        {!account.isConnected && 'Account'}
      </Button>
      {account.isConnected && (
        <Button className={styles.logout} onClick={() => disconnect()} isTransparent={true}>
          <LogoutIcon />
        </Button>
      )}
    </div>
  );
};

const Header: FC = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    {
      title: 'About us',
      link: '/#about',
    },
    {
      title: 'Objects',
      link: '/#objects',
    },
    {
      title: 'FAQ',
      link: '/#faq',
    },
  ];

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    if (
      menuRef.current &&
      burgerRef.current &&
      (burgerRef.current.contains(target) || menuRef.current.contains(target))
    ) {
      return;
    }

    setIsMenuOpened(false);
  };

  useEffect(() => {
    if (isMenuOpened) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpened]);

  return (
    <header className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          <Logo />

          <button
            className={clsx(styles.burger, isMenuOpened && styles.active)}
            type='button'
            onClick={() => setIsMenuOpened(!isMenuOpened)}
            ref={burgerRef}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={clsx(styles.menu, isMenuOpened && styles.opened)} ref={menuRef}>
            <nav>
              <ul className={styles.navMenu}>
                {navItems &&
                  navItems.length > 0 &&
                  navItems.map(item => (
                    <li key={item.title + 'mobile'}>
                      <Link className={styles.navLink} href={item.link} tabIndex={isMenuOpened ? 0 : -1}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                <li>
                  <Button className={styles.menuButton} href={'/marketplace/'}>
                    Marketplace
                  </Button>
                </li>
                <li>
                  <AccountButton />
                </li>
              </ul>
            </nav>
          </div>

          <nav className={styles.desktopNav}>
            <ul className={styles.navList}>
              {navItems &&
                navItems.length > 0 &&
                navItems.map(item => (
                  <li key={item.title + 'mobile'}>
                    <Link className={styles.navLink} href={item.link} tabIndex={isMenuOpened ? 0 : -1}>
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <div className={styles.buttons}>
            <TokenSelect />
            <Button className={styles.marketButton} href={'/marketplace/'}>
              Marketplace
              <ArrowCircleSVG />
            </Button>
            <AccountButton />
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
