import React, { FC } from 'react';

import styles from './PageLayout.module.css';

interface IPageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: FC<IPageLayoutProps> = ({ children }) => {
  return (
    <div className={styles.root}>
      <main>{children}</main>
    </div>
  );
};

export default PageLayout;
