import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faHeart, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [placeholderText, setPlaceholderText] = useState('');
    const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showCursor, setShowCursor] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Array of search suggestions
    const searchSuggestions = [
        'Search for mangalsutra...',
        'Search for ganthan...',
        'Search for necklaces...',
        'Search for earrings...',
        'Search for rings...',
        'Search for bangles...',
        'Search for anklets...',
        'Search for pendants...',
        'Search for bracelets...',
        'Search for nose pins...'
    ];

    // Typing animation logic (same as before)
    useEffect(() => {
        const currentSuggestion = searchSuggestions[currentSuggestionIndex];

        const typeTimeout = setTimeout(() => {
            if (!isDeleting && currentCharIndex < currentSuggestion.length) {
                setPlaceholderText(currentSuggestion.substring(0, currentCharIndex + 1));
                setCurrentCharIndex(currentCharIndex + 1);
            } else if (!isDeleting && currentCharIndex === currentSuggestion.length) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && currentCharIndex > 0) {
                setPlaceholderText(currentSuggestion.substring(0, currentCharIndex - 1));
                setCurrentCharIndex(currentCharIndex - 1);
            } else if (isDeleting && currentCharIndex === 0) {
                setIsDeleting(false);
                setCurrentSuggestionIndex((prevIndex) =>
                    (prevIndex + 1) % searchSuggestions.length
                );
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(typeTimeout);
    }, [currentCharIndex, currentSuggestionIndex, isDeleting, searchSuggestions]);

    // Cursor blinking effect
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);

        return () => clearInterval(cursorInterval);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Search query:', searchQuery);
    };

    const handleInputFocus = () => {
        setPlaceholderText('Search Gifts for your dearest...');
    };

    const handleInputBlur = () => {
        if (!searchQuery) {
            setCurrentCharIndex(0);
            setIsDeleting(false);
        }
    };

    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <h1>Rokadeshwar Jewellers</h1>
                </div>

                {/* Mobile: Search and Actions side by side */}
                <div className={`search-and-actions ${isMobile ? 'mobile-layout' : ''}`}>
                    <form className="search-container" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder={placeholderText + (showCursor && !searchQuery ? '|' : '')}
                            className="search-input animated-placeholder"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        />
                        <button type="submit" className="search-btn">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </form>

                    <div className="header-actions">
                        <button className="action-btn">
                            <FontAwesomeIcon icon={faUser} />
                            <span className="badge">0</span>
                        </button>
                        <button className="action-btn">
                            <FontAwesomeIcon icon={faHeart} />
                            <span className="badge">0</span>
                        </button>
                        <button className="action-btn">
                            <FontAwesomeIcon icon={faShoppingBag} />
                            <span className="badge">0</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
