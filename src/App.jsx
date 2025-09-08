import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import React, { Suspense, lazy } from 'react';
const HomePage = lazy(() => import('./pages/HomePage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const CamperDetailsPage = lazy(() => import('./pages/CamperDetailsPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
import styles from './App.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <Layout>
        <div className={styles.container}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/catalog/:id" element={<CamperDetailsPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </Suspense>
        </div>
      </Layout>
      <ToastContainer position="top-right" autoClose={2000} />
    </Router>
  );
};

export default App;
