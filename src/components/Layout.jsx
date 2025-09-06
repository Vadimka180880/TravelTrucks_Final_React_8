import React from 'react';
import Header from './Header';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <>
      <div className={styles.headerWrapper}>
        <Header />
      </div>
      <div className={styles.pageContainer}>{children}</div>
    </>
  );
};

export default Layout;
