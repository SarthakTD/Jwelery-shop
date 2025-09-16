import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % 3);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + 3) % 3);
    };

    const handleShopNow = () => {
        window.location.href = 'https://palmonas.com/collections/buy-1-get-1-free';
    };

    return (
        <section className="hero">
            <div className="container">
                <div className="hero-content">
                    <div className="hero-image">
                        <img
                            src="https://via.placeholder.com/600x700/8B4513/FFFFFF?text=Model+Image"
                            alt="Model wearing jewelry"
                            className="hero-model-image"
                        />
                    </div>
                    <div className="hero-text">
                        <div className="offer-card">
                            <h2 className="offer-title">BUY 1 GET 1</h2>
                            <h3 className="offer-subtitle">FREE</h3>
                            <p className="offer-code">CODE: B1G1</p>
                            <button className="shop-now-btn" onClick={handleShopNow}>
                                Shop Now
                            </button>
                            <p className="offer-terms">Apply code at checkout</p>
                        </div>
                    </div>
                </div>
            </div>

            <button className="hero-nav prev" onClick={prevSlide}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="hero-nav next" onClick={nextSlide}>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </section>
    );
};

export default Hero;
