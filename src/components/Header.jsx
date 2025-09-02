
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';
import logo from '../assets/images/logo.png';
import burgerIcon from '../assets/icon_catalog/burger.svg';
import closeIcon from '../assets/icon_catalog/close.svg';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const favorites = useSelector((state) => state.campers.favorites);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logoLink}>
            <img src={logo} alt="Logo" className={styles.logo} />
          </Link>
        </div>
        <button className={styles.burger} onClick={toggleMenu} aria-label="Toggle menu">
          <img
            src={isMobileMenuOpen ? closeIcon : burgerIcon}
            alt="Menu Icon"
            className={styles.icon}
          />
        </button>
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.open : ''}`}>
          <ul className={styles.navList}>
            <li>
              <Link to="/" className={styles.navLink} onClick={closeMenu}>Home</Link>
            </li>
            <li>
              <Link to="/catalog" className={styles.navLink} onClick={closeMenu}>Catalog</Link>
            </li>
            {favorites && favorites.length > 0 && (
              <li>
                <Link to="/favorites" className={styles.navLink} onClick={closeMenu}>Favorites</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;