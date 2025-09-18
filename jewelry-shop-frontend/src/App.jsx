import React from 'react';
import TopBanner from './components/TopBanner';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import CategoryShowcase from './components/CategoryShowcase';
import './App.css';

function App() {
    return (
        <div className="App">
            <TopBanner />
            <Header />
            <Navigation />
            <Hero />
            <CategoryShowcase />
        </div>
    );
}

export default App;