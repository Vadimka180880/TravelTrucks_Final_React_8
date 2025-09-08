import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import mainPhotoJpg from '../assets/images/banner.jpg';
import mainPhotoWebp from '../assets/images/banner.webp';
const HomePage = () => {
  return (
    <div className={styles.homePage}>
        <div className={styles.heroWrapper}>
          <div className={styles.heroSection}>
            <picture>
              <source srcSet={mainPhotoWebp} type="image/webp" />
              <img src={mainPhotoJpg} alt="Campers" className={styles.heroImage} />
            </picture>
            <div className={styles.heroContent}>
              <h1>Campers of Your Dreams</h1>
              <p>You can find everything you want in our catalog</p>
              <Link to="/catalog" className={styles.ctaButton}>
                View Now
              </Link>
            </div>
          </div>
        </div>
    </div>
  );
};

export default HomePage;
