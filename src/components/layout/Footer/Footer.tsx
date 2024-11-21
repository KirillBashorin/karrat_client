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
                <MapPinIcon /> Dubai, Business Bay, The Court Tower, office 803
              </p>
              <a className={styles.contactItem} href='tel:+971585779091'>
                <PhoneIcon /> +971 58 577 90 91
              </a>
              <a className={styles.contactItem} href='mailto:info@karratestates.ae'>
                <EmailIcon /> info@karratestates.ae
              </a>
            </div>
          </div>

          <div className={styles.group}>
            <Socials list={['telegram', 'whatsapp', 'discord']} isTransparent={true} />
            <p className={styles.privacy}>© 2024 Karratestates. All rights reserved</p>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
