import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import CafeCard from "../components/CafeCard";
import {
  FaSearch,
  FaFilter,
  FaWifi,
  FaPlug,
  FaPaw,
  FaSun,
  FaVolumeMute,
  FaCoffee,
} from "react-icons/fa";
import "./CafeListPage.css";

function CafeListPage({
  cafes,
  favoriteCafeIds,
  onToggleFavorite,
  loading,
  error,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState("Todos los barrios");

  const [filterWifi, setFilterWifi] = useState(false);
  const [filterPlugs, setFilterPlugs] = useState(false);
  const [filterPetFriendly, setFilterPetFriendly] = useState(false);
  const [filterTerrace, setFilterTerrace] = useState(false);
  const [filterQuiet, setFilterQuiet] = useState(false);
  const [filterSpecialtyCoffee, setFilterSpecialtyCoffee] = useState(false);
  //barrios
  const neighborhoods = useMemo(() => {
    const uniqueNeighborhoods = new Set();
    // Recorrer los 'cafes'
    cafes.forEach((cafe) => {
      const parts = cafe.address ? cafe.address.split(",") : [];
      if (parts.length > 2) {
        uniqueNeighborhoods.add(parts[parts.length - 2].trim());
      }
    });
    return ["🏠 Barrios", ...Array.from(uniqueNeighborhoods).sort()];
  }, [cafes]);
  const filteredCafes = useMemo(() => {
    let currentCafes = cafes;
    // Filtro búsqueda
    if (searchTerm) {
      currentCafes = currentCafes.filter(
        (cafe) =>
          cafe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cafe.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (cafe.description &&
            cafe.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtro por barrio
    if (
      selectedNeighborhood &&
      selectedNeighborhood !== "Todos los barrios" &&
      selectedNeighborhood !== "🏠 Barrios"
    ) {
      currentCafes = currentCafes.filter((cafe) =>
        cafe.address.toLowerCase().includes(selectedNeighborhood.toLowerCase())
      );
    }

    // Filtros de amenidades
    if (filterWifi)
      currentCafes = currentCafes.filter((cafe) => cafe.wifiAvailability);
    if (filterPlugs)
      currentCafes = currentCafes.filter((cafe) => cafe.powerOutlets);
    if (filterPetFriendly)
      currentCafes = currentCafes.filter((cafe) => cafe.isPetFriendly);
    if (filterTerrace)
      currentCafes = currentCafes.filter((cafe) => cafe.hasTerrace);
    if (filterQuiet) currentCafes = currentCafes.filter((cafe) => cafe.isQuiet);
    if (filterSpecialtyCoffee)
      currentCafes = currentCafes.filter((cafe) => cafe.hasCoffee);

    return currentCafes;
  }, [
    cafes,
    searchTerm,
    selectedNeighborhood,
    filterWifi,
    filterPlugs,
    filterPetFriendly,
    filterTerrace,
    filterQuiet,
    filterSpecialtyCoffee,
  ]);

  if (loading) {
    return <div className="cafe-list-page loading">Cargando cafeterías...</div>;
  }

  if (error) {
    return (
      <div className="cafe-list-page error" style={{ color: "red" }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div className="cafe-list-page">
      <div className="search-filter-section">
        <div className="search-bar-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar cafés..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="neighborhood-filter-container">
          <select
            value={selectedNeighborhood}
            onChange={(e) => setSelectedNeighborhood(e.target.value)}
            className="neighborhood-select"
          >
            {neighborhoods.map((nb) => (
              <option key={nb} value={nb}>
                {nb}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="amenity-filters">
        <FaFilter className="filter-icon" />

        <button
          className={`filter-button ${filterWifi ? "active" : ""}`}
          onClick={() => setFilterWifi(!filterWifi)}
        >
          Wifi
        </button>
        <button
          className={`filter-button ${filterPlugs ? "active" : ""}`}
          onClick={() => setFilterPlugs(!filterPlugs)}
        >
          Enchufes
        </button>
        <button
          className={`filter-button ${filterPetFriendly ? "active" : ""}`}
          onClick={() => setFilterPetFriendly(!filterPetFriendly)}
        >
          Pet friendly
        </button>
        <button
          className={`filter-button ${filterTerrace ? "active" : ""}`}
          onClick={() => setFilterTerrace(!filterTerrace)}
        >
          Terraza
        </button>
        <button
          className={`filter-button ${filterQuiet ? "active" : ""}`}
          onClick={() => setFilterQuiet(!filterQuiet)}
        >
          Silencioso
        </button>
        <button
          className={`filter-button ${filterSpecialtyCoffee ? "active" : ""}`}
          onClick={() => setFilterSpecialtyCoffee(!filterSpecialtyCoffee)}
        >
          Café especialidad
        </button>
      </div>

      <h2>{filteredCafes.length} Cafés Encontrados</h2>

      <div className="cafe-cards-grid">
        {filteredCafes.length === 0 ? (
          <p>
            No se encontraron cafeterías con los criterios de búsqueda/filtro.
          </p>
        ) : (
          filteredCafes.map((cafe) => (
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
          ))
        )}
      </div>
    </div>
  );
}

export default CafeListPage;
