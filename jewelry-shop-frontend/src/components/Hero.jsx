import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Import all images
import mangalsutraImg from '../assets/images/hero/mangalsutra.png';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [imageLoadStatus, setImageLoadStatus] = useState({});

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const slides = [
        {
            image: mangalsutraImg,
            title: "BUY 1 GET 1",
            subtitle: "FREE",
            code: "CODE: B1G1",
            description: "Apply code at checkout",
            buttonText: "Shop Now",
            url: "https://palmonas.com/collections/buy-1-get-1-free",
            bgColor: "linear-gradient(135deg, #8b7355, #a68968)"
        },
        {
            image: mangalsutraImg,
            title: "DISCOVER",
            subtitle: "Ganthan Styles",
            code: "UPTO 50% OFF",
            description: "Traditional designs reimagined",
            buttonText: "Explore Now",
            url: "https://palmonas.com/collections/ganthan",
            bgColor: "linear-gradient(135deg, #2c3e50, #4a6741)"
        },
        {
            image: mangalsutraImg,
            title: "ELEGANT",
            subtitle: "Necklaces",
            code: "NEW ARRIVALS",
            description: "Stunning pieces for every occasion",
            buttonText: "View Collection",
            url: "https://palmonas.com/collections/necklaces",
            bgColor: "linear-gradient(135deg, #27ae60, #2ecc71)"
        },
        {
            image: mangalsutraImg,
            title: "PREMIUM",
            subtitle: "Earrings",
            code: "LIMITED EDITION",
            description: "Handcrafted with precision",
            buttonText: "Shop Premium",
            url: "https://palmonas.com/collections/earrings",
            bgColor: "linear-gradient(135deg, #8e44ad, #9b59b6)"
        },
        {
            image: mangalsutraImg,
            title: "Ring",
            subtitle: "Collection",
            code: "BUY 2 GET 1 FREE",
            description: "Perfect for special moments",
            buttonText: "Discover More",
            url: "https://palmonas.com/collections/rings",
            bgColor: "linear-gradient(135deg, #d35400, #e67e22)"
        }
    ];

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    const goToSlide = useCallback((index) => {
        setCurrentSlide(index);
    }, []);

    const handleShopNow = useCallback(() => {
        window.open(slides[currentSlide].url, '_blank');
    }, [slides, currentSlide]);

    // Handle image load success
    const handleImageLoad = useCallback((index) => {
        console.log(`✅ Image ${index} loaded successfully on ${isMobile ? 'mobile' : 'desktop'}`);
        setImageLoadStatus(prev => ({ ...prev, [index]: 'loaded' }));
    }, [isMobile]);

    // Handle image load error
    const handleImageError = useCallback((index, imagePath) => {
        console.error(`❌ Image ${index} failed to load on ${isMobile ? 'mobile' : 'desktop'}:`, imagePath);
        setImageLoadStatus(prev => ({ ...prev, [index]: 'error' }));
    }, [isMobile]);

    useEffect(() => {
        const autoSlide = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(autoSlide);
    }, [nextSlide]);

    // Debug: Log image paths and mobile status
    useEffect(() => {
        console.log('Device type:', isMobile ? 'Mobile' : 'Desktop');
        console.log('Image load status:', imageLoadStatus);
    }, [isMobile, imageLoadStatus]);

    return (
        <section className="hero" style={{ background: slides[currentSlide].bgColor }}>
            <div className="container">
                <div className="hero-content">
                    <div className="hero-image">
                        <div className="slides-container">
                            {slides.map((slide, index) => (
                                <img
                                    key={index}
                                    src={slide.image}
                                    alt={`${slide.subtitle} collection`}
                                    className={`hero-model-image ${index === currentSlide ? 'active' : ''}`}
                                    style={{
                                        transform: `translateX(${(index - currentSlide) * 100}%)`,
                                        opacity: index === currentSlide ? 1 : 0,
                                        // Mobile-specific inline styles
                                        ...(isMobile && {
                                            objectFit: 'contain',
                                            maxWidth: '85%',
                                            maxHeight: '85%'
                                        })
                                    }}
                                    onLoad={() => handleImageLoad(index)}
                                    onError={() => handleImageError(index, slide.image)}
                                    loading="lazy"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="hero-text">
                        <div className="offer-card">
                            <h2 className="offer-title">{slides[currentSlide].title}</h2>
                            <h3 className="offer-subtitle">{slides[currentSlide].subtitle}</h3>
                            {slides[currentSlide].code && (
                                <p className="offer-code">{slides[currentSlide].code}</p>
                            )}
                            <button className="shop-now-btn" onClick={handleShopNow}>
                                {slides[currentSlide].buttonText}
                            </button>
                            <p className="offer-terms">{slides[currentSlide].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            {!isMobile && (
                <>
                    <button className="hero-nav prev" onClick={prevSlide}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button className="hero-nav next" onClick={nextSlide}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </>
            )}

            <div className="slide-indicators">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentSlide ? 'active' : ''} ${
                            imageLoadStatus[index] === 'error' ? 'error' : ''
                        }`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>

            <div className="slide-progress">
                <div
                    className="progress-bar"
                    style={{
                        width: `${((currentSlide + 1) / slides.length) * 100}%`
                    }}
                />
            </div>
        </section>
    );
};

export default Hero;
