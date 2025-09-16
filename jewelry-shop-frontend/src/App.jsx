import React from 'react';
import TopBanner from './components/TopBanner';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import './App.css';

function App() {
    return (
        <div className="App">
            <TopBanner />
            <Header />
            <Navigation />
            <Hero />
        </div>
    );
}

export default App;
