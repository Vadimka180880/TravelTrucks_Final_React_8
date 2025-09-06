import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BookingForm from '../components/BookingForm';
import ImageModal from '../components/ImageModal';
import styles from './CamperDetailsPage.module.css';

import Star from '../assets/icon_catalog/star.svg';

import TransmissionIcon from '../assets/icon_catalog/diagram.svg';
import KitchenIcon from '../assets/icon_catalog/cup-hot.svg';
import ACIcon from '../assets/icon_catalog/wind.svg';
import BathroomIcon from '../assets/icon_catalog/bathroom.svg';
import TVIcon from '../assets/icon_catalog/tv.svg';
import RefrigeratorIcon from '../assets/icon_catalog/solar_fridge-outline.svg';
import MicrowaveIcon from '../assets/icon_catalog/lucide_microwave.svg';
import GasIcon from '../assets/icon_catalog/hugeicons_gas-stove.svg';
import WaterIcon from '../assets/icon_catalog/ion_water-outline.svg';
import PetrolIcon from '../assets/icon_catalog/Petrol.svg';
import RadioIcon from '../assets/icon_catalog/Radio.svg';
import { formatPrice } from '../utils/formatPrice';

const CamperDetailsPage = () => {
  const { id } = useParams();
  const camper = useSelector((state) =>
    state.campers.items.find((item) => item.id === id)
  );
  const [activeTab, setActiveTab] = useState('features');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!camper) return <p>Camper not found</p>;

  const features = [
    { icon: TransmissionIcon, label: camper.transmission || 'Automatic', isSvg: true },
    camper.AC && { icon: ACIcon, label: 'AC', isSvg: true },
    camper.kitchen && { icon: KitchenIcon, label: 'Kitchen', isSvg: true },
    camper.bathroom && { icon: BathroomIcon, label: 'Bathroom', isSvg: true },
    camper.TV && { icon: TVIcon, label: 'TV', isSvg: true },
    camper.refrigerator && { icon: RefrigeratorIcon, label: 'Fridge', isSvg: true },
  camper.microwave && { icon: MicrowaveIcon, label: 'Microwave', isSvg: true },
  camper.gas && { icon: GasIcon, label: 'Gas', isSvg: true },
  camper.water && { icon: WaterIcon, label: 'Water', isSvg: true },
  { icon: PetrolIcon, label: camper.engine || 'Engine', isSvg: true },
  ].filter(Boolean);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      (prev + 1) % camper.gallery.length
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      (prev - 1 + camper.gallery.length) % camper.gallery.length
    );
  };

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <Link to="/catalog" className={styles.backLink}>← Back to Catalog</Link>

      <div className={styles.header}>
        <h1 className={styles.name}>{camper.name}</h1>
        <div className={styles.ratingRow}>
          <img src={Star} alt="Rating" className={styles.starIcon} />
          <span className={styles.rating}>{camper.rating}</span>
          <span className={styles.reviewsCount}>({camper.reviews.length} Reviews)</span>
          <span className={styles.location}>📍 {
            (() => {
              const loc = (camper.location || '').split(',').map(s => s.trim());
              return loc.length === 2 ? `${loc[1]}, ${loc[0]}` : camper.location;
            })()
          }</span>
        </div>
  <p className={styles.price}>€{formatPrice(camper.price)}</p>
      </div>

      <div className={styles.imageGallery}>
        {camper.gallery.map((img, index) => (
          <img
            key={index}
            src={img.thumb}
            alt={`Gallery ${index + 1}`}
            className={styles.galleryImage}
            onClick={() => openModal(index)}
          />
        ))}
      </div>

      {isModalOpen && (
        <ImageModal
          src={camper.gallery[currentImageIndex].original}
          alt={`Camper ${currentImageIndex + 1}`}
          onClose={() => setIsModalOpen(false)}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
        />
      )}

      <p className={styles.description}>{camper.description}</p>

      <div className={styles.mainContent}>
        <div>
          <div className={styles.tabs}>
            <button
              className={activeTab === 'features' ? styles.activeTab : ''}
              onClick={() => setActiveTab('features')}
            >
              Features
            </button>
            <button
              className={activeTab === 'reviews' ? styles.activeTab : ''}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({camper.reviews.length})
            </button>
          </div>

          {activeTab === 'features' && (
            <>
              <div className={styles.featureList}>
                {features.map((f, idx) => {
                  const isBathroom = f.label === 'Bathroom';
                  const classNames = [styles.icon];
                  if (isBathroom) classNames.push(styles.iconLarge);
                  if (f.icon === PetrolIcon) classNames.push(styles.petrol);
                  return (
                        <div key={idx} className={styles.featureItem}>
                          {f.isComponent ? (
                            <f.icon className={classNames.join(' ')} />
                          ) : (
                            <img src={f.icon} alt={f.label} className={classNames.join(' ')} />
                          )}
                          <span className={styles.label}>{f.label}</span>
                        </div>
                  );
                })}
              </div>

              <table className={styles.detailsTable}>
                <tbody>
                  <tr><td>Form</td><td>{camper.form}</td></tr>
                  <tr><td>Length</td><td>{camper.length}</td></tr>
                  <tr><td>Width</td><td>{camper.width}</td></tr>
                  <tr><td>Height</td><td>{camper.height}</td></tr>
                  <tr><td>Tank</td><td>{camper.tank}</td></tr>
                  <tr><td>Consumption</td><td>{camper.consumption}</td></tr>
                </tbody>
              </table>
            </>
          )}

          {activeTab === 'reviews' && (
            <div className={styles.reviews}>
              {camper.reviews.map((r, i) => (
                <div key={i} className={styles.reviewItem}>
                  <p>⭐ {r.reviewer_rating}/5 - {r.reviewer_name}</p>
                  <p>{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.bookingSection}>
          <BookingForm camper={camper} />
        </div>
      </div>
    </div>
  );
};

export default CamperDetailsPage;