'use client';

import React, { FC, useState } from 'react';
import clsx from 'clsx';

import styles from './TabButtons.module.scss';

interface TabButtonsProps {
  buttons: [string | null];
  onClick: (index: number) => void;
  defaultItemIndex?: number;
}

const TabButtons: FC<TabButtonsProps> = ({ buttons, onClick, defaultItemIndex }) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(defaultItemIndex || 0);
  if (!buttons || !buttons.length) return null;
  // if (buttons.length < 3) return null;

  const handleButtonClick = (index: number) => {
    setCurrentItemIndex(index);

    onClick(index);
  };

  return (
    <div className={styles.root}>
      {buttons &&
        buttons.length > 0 &&
        buttons.map((item, index) => (
          <button
            className={clsx(styles.button, currentItemIndex === index && styles.active)}
            type={'button'}
            onClick={() => handleButtonClick(index)}
            key={item}
          >
            {item ? item : 'All'}
          </button>
        ))}
    </div>
  );
};

export default TabButtons;
