import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaWifi,
  FaPlug,
  FaPaw,
  FaSun,
  FaVolumeMute,
  FaCoffee,
  FaClock,
  FaPhone,
  FaLink,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

function CafeDetailPage() {
  const { id } = useParams(); // ID DE LA URL
  const navigate = useNavigate(); // hook para navegar
  const [cafe, setCafe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCafeDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3001/api/cafes/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Cafetería no encontrada.");
          }
          throw new Error(`Error HTTP! status: ${response.status}`);
        }
        const data = await response.json();
        setCafe(data);
      } catch (err) {
        console.error("Error fetching cafe details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCafeDetails();
    }
  }, [id]); // Se vuelve a ejecutar si el ID en la URL cambia

  if (loading) {
    return (
      <div className="detail-page-container loading">
        Cargando detalles de la cafetería...
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-page-container error">
        <p style={{ color: "red" }}>Error: {error}</p>
        <button onClick={() => navigate("/")} className="back-button">
          Volver a la lista
        </button>
      </div>
    );
  }

  if (!cafe) {
    return (
      <div className="detail-page-container not-found">
        <p>No se encontraron detalles para esta cafetería.</p>
        <button onClick={() => navigate("/")} className="back-button">
          Volver a la lista
        </button>
      </div>
    );
  }

  // Función icono de amenidad
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

  return (
    <div className="detail-page-container">
      <button onClick={() => navigate("/")} className="back-button">
        ← Volver a la lista
      </button>

      <div className="cafe-detail-card">
        <div className="detail-header">
          <img
            src={
              cafe.imageURL ||
              "https://via.placeholder.com/600x400?text=Cafe+Image"
            }
            alt={cafe.name}
            className="detail-image"
          />
          <div className="detail-info-overlay">
            <h1 className="detail-name">{cafe.name}</h1>
            <div className="detail-rating">★ {cafe.wifiSpeed || "N/A"} </div>
            <div className="detail-neighborhood">
              <MdLocationOn /> {cafe.address.split(",").pop().trim()}{" "}
            </div>
          </div>
        </div>

        <div className="detail-content">
          <p className="detail-description">{cafe.description}</p>

          <div className="detail-section">
            <h3>
              <FaMapMarkerAlt /> Dirección
            </h3>
            <p>{cafe.address}</p>
            {cafe.googleMapsLink && (
              <a
                href={cafe.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-link"
              >
                Ver en Google Maps <FaLink />
              </a>
            )}
          </div>

          <div className="detail-section">
            <h3>
              <FaClock /> Horario
            </h3>
            <p>{cafe.openingHours || "No disponible"}</p>
          </div>

          {cafe.phone && (
            <div className="detail-section">
              <h3>
                <FaPhone /> Contacto
              </h3>
              <p>
                <a href={`tel:${cafe.phone}`} className="detail-link">
                  {cafe.phone}
                </a>
              </p>
            </div>
          )}

          <div className="detail-section">
            <h3>Amenidades</h3>
            <div className="detail-amenities-grid">
              {cafe.wifiAvailability && (
                <span className="amenity-tag detail-amenity-tag">
                  {renderAmenityIcon("Wifi")} Wifi
                </span>
              )}
              {cafe.powerOutlets && (
                <span className="amenity-tag detail-amenity-tag">
                  {renderAmenityIcon("Enchufes")} Enchufes
                </span>
              )}
              {cafe.isPetFriendly && (
                <span className="amenity-tag detail-amenity-tag">
                  {renderAmenityIcon("Pet friendly")} Pet friendly
                </span>
              )}
              {cafe.hasTerrace && (
                <span className="amenity-tag detail-amenity-tag">
                  {renderAmenityIcon("Terraza")} Terraza
                </span>
              )}
              {cafe.isQuiet && (
                <span className="amenity-tag detail-amenity-tag">
                  {renderAmenityIcon("Silencioso")} Silencioso
                </span>
              )}
              {cafe.hasCoffee && (
                <span className="amenity-tag detail-amenity-tag">
                  {renderAmenityIcon("Café especialidad")} Café especialidad
                </span>
              )}
            </div>
          </div>

          {cafe.specialties && (
            <div className="detail-section">
              <h3>Especialidades</h3>
              <p>{cafe.specialties}</p>
            </div>
          )}

          {/* Contáctanos al final, todavia no funciona */}
          <div className="detail-actions">
            <a href={`tel:${cafe.phone}`} className="contact-button">
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CafeDetailPage;
