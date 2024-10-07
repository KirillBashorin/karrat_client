import React, { FC } from 'react';
import Link from 'next/link';

import { Wrapper } from '@/components/layout';
import { Logo, Socials } from '@/components/common';

import MapPinIcon from '/public/images/icons/map-pin.svg';
import PhoneIcon from '/public/images/icons/phone.svg';
import EmailIcon from '/public/images/icons/mail.svg';

import styles from './Footer.module.scss';

const Footer: FC = () => {
  return (
    <footer className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          <div className={styles.group}>
            <Logo size={'big'} />
            <div className={styles.linksWrapper}>
              <Link className={styles.link} href={'#'}>
                Privacy policy
              </Link>
              <Link className={styles.link} href={'#'}>
                User agreement
              </Link>
            </div>
          </div>

          <div className={styles.group}>
            <div className={styles.contacts}>
              <p className={styles.contactItem}>
                <MapPinIcon /> 9 Harris Ways New Carrieview HU14 3EB
              </p>
              <a className={styles.contactItem} href='tel:+180800000000'>
                <PhoneIcon /> +1 8080 000 00 00
              </a>
              <a className={styles.contactItem} href='mailto:karratestates@mail.com'>
                <EmailIcon /> karratestates@mail.com
              </a>
            </div>
          </div>

          <div className={styles.group}>
            <Socials list={['telegram', 'whatsapp', 'viber', 'youtube']} isTransparent={true} />
            <p className={styles.privacy}>© 2024 Karratestates. All rights reserved</p>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
