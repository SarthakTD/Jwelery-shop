import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faHeart, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholderText, setPlaceholderText] = useState('');
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        setCurrentSuggestionIndex((prevIndex) => (prevIndex + 1) % searchSuggestions.length);
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(typeTimeout);
  }, [currentCharIndex, currentSuggestionIndex, isDeleting, searchSuggestions]);

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

  const handleInputFocus = () => setPlaceholderText('Search Gifts for your dearest...');
  const handleInputBlur = () => {
    if (!searchQuery) {
      setCurrentCharIndex(0);
      setIsDeleting(false);
    }
  };

  return (
    <header className="header">
      <div className="container">
        {/* Brand -> home */}
        <div className="logo">
          <Link to="/" className="brand-link" aria-label="Go to home">
            <h1>Rokadeshwar Jewellers</h1>
          </Link>
        </div>

        {/* Search + Actions */}
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
            <button type="submit" className="search-btn" aria-label="Search">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>

          <div className="header-actions">
            {/* Admin Link */}
            <Link to="/admin/login" className="action-btn" aria-label="Admin">
              <FontAwesomeIcon icon={faUser} />
              <span className="badge">A</span>
            </Link>

            {/* Wishlist */}
            <button className="action-btn" aria-label="Wishlist">
              <FontAwesomeIcon icon={faHeart} />
              <span className="badge">0</span>
            </button>

            {/* Cart */}
            <button className="action-btn" aria-label="Cart">
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
