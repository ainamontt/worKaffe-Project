import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import CafeListPage from "./pages/CafeListPage";
import CafeDetailPage from "./pages/CafeDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
//import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [favoriteCafeIds, setFavoriteCafeIds] = useState(() => {
    const savedFavorites = localStorage.getItem("favoriteCafeIds");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  useEffect(() => {
    localStorage.setItem("favoriteCafeIds", JSON.stringify(favoriteCafeIds));
  }, [favoriteCafeIds]);

  // Función para añadir/quitar un café de favoritos
  const handleToggleFavorite = (cafeId) => {
    setFavoriteCafeIds((prevIds) => {
      if (prevIds.includes(cafeId)) {
        return prevIds.filter((id) => id !== cafeId);
      } else {
        return [...prevIds, cafeId];
      }
    });
  };

  const [allCafes, setAllCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efecto para cargar todos los cafés desde la API
  useEffect(() => {
    const fetchAllCafes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://localhost:3001/api/cafes");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllCafes(data);
      } catch (e) {
        console.error("Error fetching all cafes:", e);
        setError("No se pudieron cargar los cafés.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllCafes();
  }, []);

  /*return (
    <Router>
      <div>
        <Header />
        {/*<nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Inicio
              </Link>
            </li>
          </ul>
        </nav>
        }
        <Routes>
          <Route path="/" element={<CafeListPage />} />
          <Route path="/cafes/:id" element={<CafeDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}*/
  return (
    <Router>
      <Header favoriteCount={favoriteCafeIds.length} />
      <Routes>
        <Route
          path="/"
          element={
            <CafeListPage
              cafes={allCafes}
              favoriteCafeIds={favoriteCafeIds}
              onToggleFavorite={handleToggleFavorite}
              loading={loading}
              error={error}
            />
          }
        />
        <Route
          path="/cafes/:id"
          element={<CafeDetailPage cafes={allCafes} />}
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              allCafes={allCafes}
              favoriteCafeIds={favoriteCafeIds}
              onToggleFavorite={handleToggleFavorite}
              loading={loading}
              error={error}
            />
          }
        />
      </Routes>
      {/*<Footer /> */}
    </Router>
  );
}

export default App;
