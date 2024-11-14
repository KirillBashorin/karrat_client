'use client';

import React, { FC, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useErrorStore } from '@/stores';
import { ProgressBar } from '@/components/ui';

import styles from './ErrorBox.module.scss';

const ErrorBox: FC = () => {
  const DURATION = 10000;
  const [progress, setProgress] = useState(100);
  const { errorMessage, setErrorMessage } = useErrorStore(
    useShallow(state => ({
      errorMessage: state.errorMessage,
      setErrorMessage: state.setErrorMessage,
    }))
  );

  useEffect(() => {
    if (!errorMessage) return;

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.max(0, prev - 100 / (DURATION / 100)));
    }, 100);

    return () => {
      clearInterval(progressInterval);
    };
  }, [errorMessage]);

  useEffect(() => {
    if (progress !== 0) return;

    setErrorMessage(null);
    setProgress(100);
  }, [progress]);

  if (!errorMessage) return null;

  return (
    <section className={styles.root}>
      <ProgressBar className={styles.progress} progress={progress} />
      <div className={styles.inner}>{errorMessage}</div>
    </section>
  );
};

export default ErrorBox;
