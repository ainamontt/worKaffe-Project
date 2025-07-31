import React from "react";
import {
  FaWifi,
  FaPlug,
  FaPaw,
  FaSun,
  FaVolumeMute,
  FaCoffee,
  FaClock,
  FaHeart,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md"; // Importar MdLocationOn
import { Link } from "react-router-dom";
import "./botonFavorito.css";

function CafeCard({ cafe, isFavorite, onToggleFavorite }) {
  // Función para renderizar el icono de amenidad
  const renderAmenityIcon = (amenityName) => {
    switch (amenityName) {
      case "Wifi":
        return <FaWifi />;
      case "Enchufes":
        return <FaPlug />;
      case "Pet friendly":
        return <FaPaw />;
      case "Terraza":
        return <FaSun />;
      case "Silencioso":
        return <FaVolumeMute />;
      case "Café especialidad":
        return <FaCoffee />;

      default:
        return null;
    }
  };

  const amenitiesList = [];
  if (cafe.wifiAvailability) amenitiesList.push("Wifi");
  if (cafe.powerOutlets) amenitiesList.push("Enchufes");
  if (cafe.isPetFriendly) amenitiesList.push("Pet friendly");
  if (cafe.hasTerrace) amenitiesList.push("Terraza");
  if (cafe.isQuiet) amenitiesList.push("Silencioso");
  if (cafe.hasCoffee) amenitiesList.push("Café especialidad");

  // extraer el barrio de la dirección
  const getNeighborhood = (address) => {
    if (!address) return "";
    const parts = address.split(",").map((part) => part.trim());
    // Asumiendo que el barrio es el último o penúltimo componente si la ciudad está presente
    if (parts.length > 2) {
      const nei = parts[2];
      if (isNaN(nei) && nei.length === 5) {
        return "Barrio Desconocido";
      }
      return nei;
    } else if (parts.length === 1) {
      return parts[0];
    }
    return "Barrio Desconocido";
  };
  //manejador del click para la estrella de favorito
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onToggleFavorite(cafe._id);
  };

  return (
    <div className="cafe-card">
      <div className="cafe-card-image-container">
        <img
          src={cafe.imageURL || "https://via.placeholder.com/600x400?text=Cafe"}
          alt={cafe.name}
          className="cafe-card-image"
        />

        <div className="favorite-star-container" onClick={handleFavoriteClick}>
          <FaHeart
            className={`favorite-star-icon ${isFavorite ? "active" : ""}`}
          />
        </div>
        {/*<span className="cafe-rating-tag">★ {cafe.wifiSpeed || " "}</span>{" "}
        {/* Usando wifiSpeed como rating de ejemplo */}
        <span className="cafe-neighborhood-tag">
          {getNeighborhood(cafe.address)}
        </span>
      </div>

      <div className="cafe-card-content">
        <h3>{cafe.name}</h3>
        <p className="cafe-address">
          <MdLocationOn /> {cafe.address}
        </p>
        <p className="cafe-description">{cafe.description}</p>
        <p className="cafe-hours">
          <FaClock /> {cafe.openingHours || "Horario no disponible"}
        </p>
        <div className="cafe-amenities">
          {amenitiesList.map((amenity, index) => (
            <span key={index} className="amenity-tag">
              {renderAmenityIcon(amenity)} {amenity}
            </span>
          ))}
        </div>

        <div className="cafe-actions">
          <Link to={`/cafes/${cafe._id}`} className="contact-button">
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CafeCard;
