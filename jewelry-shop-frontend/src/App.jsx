import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TopBanner from './components/TopBanner';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import CategoryShowcase from './components/CategoryShowcase';

import BestSellerPage from './pages/BestSellerPage';
import NewArrivals from './components/NewArrivals.jsx';
import ProductDetailsPage from './pages/ProductDetailsPage';

// Admin entry
import AdminApp from './admin/AdminApp';

import './App.css';

const Home = () => (
  <>
    <Hero />
    <CategoryShowcase />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <TopBanner />
      <Header />
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/best-seller" element={<BestSellerPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
