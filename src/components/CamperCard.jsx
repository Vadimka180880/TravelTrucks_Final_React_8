import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './CamperCard.module.css';



import TransmissionIcon from '../assets/icon_catalog/bi_grid-1x2.svg';
import EngineIcon from '../assets/icon_catalog/bi_grid-3x3-gap.svg';
import ACIcon from '../assets/icon_catalog/wind.svg';
import KitchenIcon from '../assets/icon_catalog/cup-hot.svg';
import BathroomIcon from '../assets/icon_catalog/bathroom.svg';
import TVIcon from '../assets/icon_catalog/tv.svg';
import RadioIcon from '../assets/icon_catalog/bi_grid.svg';
import RefrigeratorIcon from '../assets/icon_catalog/solar_fridge-outline.svg';
import MicrowaveIcon from '../assets/icon_catalog/lucide_microwave.svg';
import GasIcon from '../assets/icon_catalog/hugeicons_gas-stove.svg';
import WaterIcon from '../assets/icon_catalog/ion_water-outline.svg';

import Heart from '../assets/icon_catalog/heart.svg';
import HeartFilled from '../assets/icon_catalog/heart-filled.svg';
import Star from '../assets/icon_catalog/star.svg';

const CamperCard = ({ camper, isFavorite, toggleFavorite }) => {
  const imageUrl = camper.gallery?.[0]?.thumb || 'default-image.jpg';

  // Формуємо масив бейджів-іконок згідно макету
  // Порядок іконок як у макеті
  const features = [
    camper.transmission && { icon: TransmissionIcon, label: camper.transmission === 'automatic' ? 'Automatic' : camper.transmission },
    camper.engine && { icon: EngineIcon, label: camper.engine },
    camper.AC && { icon: ACIcon, label: 'AC' },
    camper.kitchen && { icon: KitchenIcon, label: 'Kitchen' },
    camper.bathroom && { icon: BathroomIcon, label: 'Bathroom' },
    camper.TV && { icon: TVIcon, label: 'TV' },
    camper.radio && { icon: RadioIcon, label: 'Radio' },
    camper.refrigerator && { icon: RefrigeratorIcon, label: 'Fridge' },
    camper.microwave && { icon: MicrowaveIcon, label: 'Microwave' },
    camper.gas && { icon: GasIcon, label: 'Gas' },
    camper.water && { icon: WaterIcon, label: 'Water' },
  ].filter(Boolean);

  return (
    <div className={styles.camperCard}>
      <img src={imageUrl} alt={camper.name} className={styles.camperImage} />
      <div className={styles.camperInfo}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{camper.name}</h2>
          <div className={styles.priceFavoriteWrapper}>
            <p className={styles.price}>€{camper.price.toFixed(2)}</p>
            <img
              src={isFavorite ? HeartFilled : Heart}
              alt="Favorite"
              className={styles.heartIcon}
              onClick={() => toggleFavorite(camper.id)}
            />
          </div>
        </div>
        <p className={styles.location}>{camper.location}</p>
        <div className={styles.ratingRow}>
          <img src={Star} alt="Rating" className={styles.starIcon} />
          <span className={styles.rating}>{camper.rating}</span>
          <span className={styles.reviewCount}>({camper.reviews?.length || 0} Reviews)</span>
        </div>
        <div className={styles.features}>
          {features.map((f, idx) => {
            const isBathroom = f.label === 'Bathroom';
            return (
              <div className={styles.featureItem} key={f.label + idx}>
                <img src={f.icon} alt={f.label} className={isBathroom ? `${styles.icon} ${styles.iconBathroom}` : styles.icon} />
                <span className={styles.label}>{f.label}</span>
              </div>
            );
          })}
        </div>
        <Link to={`/catalog/${camper.id}`} className={styles.detailsLink}>
          Show more
        </Link>
      </div>
    </div>
  );
};

CamperCard.propTypes = {
  camper: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool,
  toggleFavorite: PropTypes.func,
};

export default CamperCard;
