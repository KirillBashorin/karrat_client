import React, { FC } from 'react';
import clsx from 'clsx';

import DiscordIcon from '/public/images/icons/discord.svg';
import TelegramTransparentIcon from '/public/images/icons/telegram-tr.svg';
import TelegramIcon from '/public/images/icons/telegram.svg';
import WhatsappTransparentIcon from '/public/images/icons/whatsapp-tr.svg';
import ViberTransparentIcon from '/public/images/icons/viber-tr.svg';
import YoutubeTransparentIcon from '/public/images/icons/youtube-tr.svg';

import styles from './Socials.module.scss';

interface SocialsProps {
  className?: string;
  list: ('discord' | 'telegram' | 'whatsapp' | 'viber' | 'youtube')[];
  isTransparent?: boolean;
}

const Socials: FC<SocialsProps> = ({ className, list, isTransparent }) => {
  const socials = {
    ['discord']: {
      link: '#ds',
      icons: {
        default: <DiscordIcon />,
        transparent: <DiscordIcon />,
      },
    },
    ['telegram']: {
      link: '#tg',
      icons: {
        default: <TelegramIcon />,
        transparent: <TelegramTransparentIcon />,
      },
    },
    ['whatsapp']: {
      link: '#wa',
      icons: {
        default: <WhatsappTransparentIcon />,
        transparent: <WhatsappTransparentIcon />,
      },
    },
    ['viber']: {
      link: '#vb',
      icons: {
        default: <ViberTransparentIcon />,
        transparent: <ViberTransparentIcon />,
      },
    },
    ['youtube']: {
      link: '#yt',
      icons: {
        default: <YoutubeTransparentIcon />,
        transparent: <YoutubeTransparentIcon />,
      },
    },
  };

  return (
    <ul className={clsx(className, styles.root, isTransparent && styles.transparent)}>
      {list &&
        list.length > 0 &&
        list.map(item => {
          return (
            <li key={socials[item].link}>
              <a className={styles.link} href={socials[item].link} target={'_blank'} rel='noopener noreferrer'>
                {isTransparent ? socials[item].icons.transparent : socials[item].icons.default}
              </a>
            </li>
          );
        })}
    </ul>
  );
};
export default Socials;
