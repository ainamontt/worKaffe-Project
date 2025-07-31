// src/pages/FavoritesPage.js

import React, { useMemo } from "react";
import CafeCard from "../components/CafeCard";
import { Link } from "react-router-dom";

function FavoritesPage({
  allCafes,
  favoriteCafeIds,
  onToggleFavorite,
  loading,
  error,
}) {
  // Filtrar fav
  const favoriteCafes = useMemo(() => {
    if (!allCafes || allCafes.length === 0) return [];
    return allCafes.filter((cafe) => favoriteCafeIds.includes(cafe._id));
  }, [allCafes, favoriteCafeIds]);

  if (loading) {
    return (
      <div className="cafe-list-page loading">
        Cargando tus cafés favoritos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="cafe-list-page error">
        Error al cargar los favoritos: {error}
      </div>
    );
  }

  return (
    <div className="cafe-list-page">
      {" "}
      <h2>Tus Cafés Favoritos</h2>
      {favoriteCafes.length === 0 ? (
        <div className="no-favorites-message">
          <p>No tienes ningún café marcado como favorito todavía.</p>
          <p>¡Explora los cafés y marca tus preferidos para verlos aquí!</p>
          <Link to="/" className="back-to-home-button">
            Ver todos los cafés
          </Link>
        </div>
      ) : (
        <div className="cafe-cards-grid">
          {" "}
          {favoriteCafes.map((cafe) => (
            <Link
              to={`/cafes/${cafe._id}`}
              key={cafe._id}
              className="cafe-card-link"
            >
              <CafeCard
                cafe={cafe}
                isFavorite={favoriteCafeIds.includes(cafe._id)}
                onToggleFavorite={onToggleFavorite}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
