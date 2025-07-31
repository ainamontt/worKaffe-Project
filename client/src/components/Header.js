import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import "./Header.css";

const cafeImages = [
  "/worka2.webp",
  "/workaf1.webp",
  "/work3.webp",
  "/ba.png",
  "/bar.jpg",
];

const appLogo = "/logoWorkaff.png";
function Header({ favoriteCount }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // carrusel de imágenes de fondo
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % cafeImages.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="main-header">
      <div className="header-top-bar">
        <div className="logo-name-container">
          <img src={appLogo} alt="WorKaffe Logo" className="header-logo" />
          <h1 className="app-name"></h1>
        </div>
        <nav className="header-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Inicio
              </Link>
            </li>
            <li className="nav-item favorite-nav-item">
              <Link to="/favorites" className="nav-link favorite-link">
                <FaHeart />
                {favoriteCount > 0 && (
                  <span className="favorite-count">{favoriteCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="hero-section">
        <div
          className="hero-image-carousel"
          style={{ backgroundImage: `url(${cafeImages[currentImageIndex]})` }}
        ></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-slogan">
            “Discover the best places to work, connect, and enjoy in Barcelona —
            one café at a time.”
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
