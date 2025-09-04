
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers, setFilters, setVehicleType, toggleFavorite, nextPage } from '../store/slices/campersSlice';
import CamperCard from '../components/CamperCard';
import Loader from '../components/Loader';

import ACIcon from '../assets/icon_catalog/wind.svg';
import KitchenIcon from '../assets/icon_catalog/cup-hot.svg';
import AutomaticIcon from '../assets/icon_catalog/diagram.svg';
import BathroomIcon from '../assets/icon_catalog/bathroom.svg';
import TVIcon from '../assets/icon_catalog/tv.svg';
import RadioIcon from '../assets/icon_catalog/bi_grid.svg';
import FridgeIcon from '../assets/icon_catalog/solar_fridge-outline.svg';
import MicrowaveIcon from '../assets/icon_catalog/lucide_microwave.svg';
import GasIcon from '../assets/icon_catalog/hugeicons_gas-stove.svg';
import WaterIcon from '../assets/icon_catalog/ion_water-outline.svg';
import VanIcon from '../assets/icon_catalog/bi_grid-1x2.svg';
import FullyIntegratedIcon from '../assets/icon_catalog/bi_grid-3x3-gap.svg';
import AlcoveIcon from '../assets/icon_catalog/bi_grid.svg';
import styles from './CatalogPage.module.css';

const CatalogPage = () => {

  const dispatch = useDispatch();
  const { items: campers, status, favorites } = useSelector((state) => state.campers);
  const [visibleCount, setVisibleCount] = useState(4);
  const loading = status === 'loading';

  // Redux фільтри
  const filters = useSelector((state) => state.campers.filters);
  const vehicleType = useSelector((state) => state.campers.vehicleType);
  // Локальний стан для фільтрів
  const [localEquipment, setLocalEquipment] = useState(filters.equipment || []);
  const [localVehicleType, setLocalVehicleType] = useState(vehicleType || '');
  const [localLocation, setLocalLocation] = useState(filters.location || '');

  // Завантаження campers
  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  // Відновлення фільтрів з localStorage
  useEffect(() => {
    // Скидаємо фільтри при першому завантаженні
    dispatch(setFilters({ equipment: [], location: '' }));
    dispatch(setVehicleType(''));
    setLocalEquipment([]);
    setLocalVehicleType('');
    setLocalLocation('');
  }, [dispatch]);

  const equipmentList = [
    { key: 'AC', label: 'AC', icon: ACIcon },
    { key: 'automatic', label: 'Automatic', icon: AutomaticIcon },
    { key: 'kitchen', label: 'Kitchen', icon: KitchenIcon },
    { key: 'TV', label: 'TV', icon: TVIcon },
    { key: 'bathroom', label: 'Bathroom', icon: BathroomIcon },
    { key: 'radio', label: 'Radio', icon: RadioIcon },
    { key: 'refrigerator', label: 'Fridge', icon: FridgeIcon },
    { key: 'microwave', label: 'Microwave', icon: MicrowaveIcon },
    { key: 'gas', label: 'Gas', icon: GasIcon },
    { key: 'water', label: 'Water', icon: WaterIcon },
  ];

  // Swapped icons for Fully Integrated and Alcove per design correction
  const vehicleTypes = [
    { key: 'panelTruck', label: 'Van', icon: VanIcon },
    { key: 'fullyIntegrated', label: 'Fully Integrated', icon: AlcoveIcon },
    { key: 'alcove', label: 'Alcove', icon: FullyIntegratedIcon },
  ];

  const handleEquipmentClick = (key) => {
    setLocalEquipment((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleVehicleTypeClick = (type) => {
    setLocalVehicleType(type);
  };

  const handleSearch = () => {
    dispatch(setFilters({ equipment: localEquipment, location: localLocation }));
    dispatch(setVehicleType(localVehicleType));
    localStorage.setItem('filters', JSON.stringify({ ...filters, equipment: localEquipment, location: localLocation }));
    localStorage.setItem('vehicleType', localVehicleType);
    localStorage.setItem('location', localLocation);
  };

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  // Фільтрація campers
  console.log('Campers:', campers);
  // Фільтрація campers згідно реальних ключів з API
  console.log('vehicleType:', vehicleType);
  console.log('campers form:', campers.map(c => c.form));
  const filteredCampers = Array.isArray(campers) ? campers.filter((camper) => {
    // Тип кузова (alcove, ...)
    if (vehicleType && vehicleType !== '' && camper.form?.toLowerCase() !== vehicleType.toLowerCase()) return false;
    // Обладнання (AC, bathroom, kitchen, TV, ...)
    if (filters.equipment && Array.isArray(filters.equipment) && filters.equipment.length > 0) {
      for (let eq of filters.equipment) {
        // Спеціальна логіка для 'automatic' – це значення в camper.transmission
        if (eq === 'automatic') {
          if (!(camper.transmission && camper.transmission.toLowerCase() === 'automatic')) return false;
          continue;
        }
        if (!(camper[eq] || camper[eq?.toLowerCase?.()] || camper[eq?.toUpperCase?.()])) return false;
      }
    }
    // Локація
    if (filters.location && filters.location.length > 0) {
      if (!camper.location?.toLowerCase().includes(filters.location.toLowerCase())) return false;
    }
    return true;
  }) : [];

  return (
    <div className={styles.catalogPageWrapper}>
      <aside className={styles.filterSidebar}>
        {/* Location filter */}
        <div className={styles.filterBlock}>
          <div className={styles.filterLabel}>Location</div>
          <input
            className={styles.locationInput}
            placeholder="Kyiv, Ukraine"
            value={localLocation}
            onChange={e => setLocalLocation(e.target.value)}
          />
        </div>
        <h3 className={styles.filtersHeading}>Filters</h3>
        {/* Vehicle equipment */}
        <div className={styles.filterBlock}>
          <div className={styles.sectionTitle}>Vehicle equipment</div>
          <div className={styles.iconGrid}>
            {equipmentList.map((item) => (
              <button
                key={item.key}
                className={
                  styles.iconButton +
                  (localEquipment && localEquipment.includes(item.key) ? ' ' + styles.active : '')
                }
                type="button"
                onClick={() => handleEquipmentClick(item.key)}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className={item.key === 'bathroom' ? styles.bathroomIcon : ''}
                />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Vehicle type */}
        <div className={styles.filterBlock}>
          <div className={styles.sectionTitle}>Vehicle type</div>
          <div className={styles.vehicleTypeIcons}>
            {vehicleTypes.map((type) => (
              <button
                key={type.key}
                className={styles.typeBtn + (localVehicleType === type.key ? ' ' + styles.activeVehicleType : '')}
                onClick={() => handleVehicleTypeClick(type.key)}
              >
                <img src={type.icon} alt={type.label} style={{ width: 24, height: 24, marginBottom: 4 }} />
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Search Button */}
        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      </aside>
      <main className={styles.catalogMain}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className={styles.campersList}>
              {filteredCampers.length === 0 ? (
                <p>No results found. Try adjusting your filters.</p>
              ) : (
                filteredCampers.slice(0, visibleCount).map((camper, idx) => (
                  <CamperCard
                    key={camper.id || camper._id || idx}
                    camper={camper}
                    isFavorite={favorites.some(f => f.id === camper.id)}
                    toggleFavorite={handleToggleFavorite}
                  />
                ))
              )}
            </div>
            {visibleCount < filteredCampers.length && !loading && (
              <div className={styles.loadMoreContainer}>
                <button className={styles.loadMoreButton} onClick={handleLoadMore}>
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </main>

    </div>
  );
}

export default CatalogPage;
