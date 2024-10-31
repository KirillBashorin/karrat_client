import React, { FC } from 'react';
import clsx from 'clsx';

import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  className?: string;
  size?: 'medium' | 'small';
  progress: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ className, progress, size = 'small' }) => {
  const progressWidth = `${progress <= 100 ? Math.round(progress) : 100}%`;

  return (
    <div className={clsx(className, styles.root, styles[size])}>
      <div className={styles.progress} style={{ width: progressWidth }} />
    </div>
  );
};

export default ProgressBar;
