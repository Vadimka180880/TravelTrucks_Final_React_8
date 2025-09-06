import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './CamperCard.module.css';

import AutomaticIcon from '../assets/icon_catalog/diagram.svg';
import FuelIcon from '../assets/icon_catalog/Petrol.svg';
import ACIcon from '../assets/icon_catalog/wind.svg';
import KitchenIcon from '../assets/icon_catalog/cup-hot.svg';
import RadioIcon from '../assets/icon_catalog/Radio.svg';
import MicrowaveIcon from '../assets/icon_catalog/lucide_microwave.svg';
import GasIcon from '../assets/icon_catalog/hugeicons_gas-stove.svg';
import WaterIcon from '../assets/icon_catalog/ion_water-outline.svg';

import Heart from '../assets/icon_catalog/heart.svg';
import HeartFilled from '../assets/icon_catalog/heart-filled.svg';
import Star from '../assets/icon_catalog/star.svg';
import { formatPrice } from '../utils/formatPrice';

const CamperCard = ({ camper, isFavorite, toggleFavorite }) => {
  const imageUrl = camper.gallery?.[0]?.thumb || 'default-image.jpg';

  const displayLocation = React.useMemo(() => {
    if (!camper.location) return '';
    const parts = camper.location.split(',').map(p => p.trim());
    if (parts.length === 2 && parts[0].toLowerCase() === 'ukraine') {
      return `${parts[1]}, Ukraine`;
    }
    return camper.location;
  }, [camper.location]);

  const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

  const features = [
    camper.transmission && { icon: AutomaticIcon, label: capitalize(camper.transmission), isSvg: true },
    camper.engine && { icon: FuelIcon, label: (camper.engine || 'Fuel'), isSvg: true },
    camper.AC && { icon: ACIcon, label: 'AC', isSvg: true },
    camper.kitchen && { icon: KitchenIcon, label: 'Kitchen', isSvg: true },
  camper.radio && { icon: RadioIcon, label: 'Radio', isSvg: true },
    camper.microwave && { icon: MicrowaveIcon, label: 'Microwave', isSvg: true },
    camper.gas && { icon: GasIcon, label: 'Gas', isSvg: true },
    camper.water && { icon: WaterIcon, label: 'Water', isSvg: true },
  ].filter(Boolean);

  return (
    <div className={styles.camperCard}>
      <img src={imageUrl} alt={camper.name} className={styles.camperImage} />
      <div className={styles.camperInfo}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{camper.name}</h2>
          <div className={styles.priceFavoriteWrapper}>
            <p className={styles.price}>€{formatPrice(camper.price)}</p>
            <img
              src={isFavorite ? HeartFilled : Heart}
              alt="Favorite"
              className={styles.heartIcon}
              onClick={() => toggleFavorite(camper.id)}
            />
          </div>
        </div>
        <div className={styles.ratingRow}>
          <img src={Star} alt="Rating" className={styles.starIcon} />
          <span className={styles.rating}>{camper.rating}</span>
          <span className={styles.reviewCount}>({camper.reviews?.length || 0} Reviews)</span>
          <span className={styles.location}>{displayLocation}</span>
        </div>
        <p className={styles.description}>
          The pictures shown here are example vehicles of the respective...
        </p>
        <div className={styles.features}>
          {features.map((f, idx) => {
            const isPng = (typeof f.icon === 'string' && f.icon.endsWith('.png'));
            const classes = [styles.icon];
            if (isPng) classes.push(styles.rasterIcon);
            if (f.icon === RadioIcon) classes.push(styles.radio);
            if (f.icon === FuelIcon) classes.push(styles.petrol);
            return (
              <div className={styles.featureItem} key={idx}>
                {f.isComponent ? (
                  <f.icon className={classes.join(' ')} />
                ) : (
                  <img src={f.icon} alt={f.label || ''} className={classes.join(' ')} />
                )}
                {f.label && <span className={styles.label}>{f.label}</span>}
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
