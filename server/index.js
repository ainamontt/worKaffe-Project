const express = require("express");
const cors = require("cors");
const mongoose = require("./db");
const cafeRoutes = require("./routes/cafeRoutes");

const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 3001;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // envío de cookies o headers de autorización
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Middleware para parsear
app.use(express.json());

// Ruta de prueba inicial (la borraremos luego)
app.get("/", (req, res) => {
  res.status(200).json({ message: "¡Servidor WorKaffe funcionando!" });
});

// Rutas de la API
app.use("/api/cafes", cafeRoutes);
// const router = require('./routes/index'); //
// app.use('/api', router); //

// rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada 😞" });
});

// Iniciar el servidor
const server = app.listen(SERVER_PORT, (err) => {
  if (err) {
    console.error(`😞 Server is not working: ${err}`);
  } else {
    console.log(`🚀 WorKaffe Server working ${SERVER_PORT}!`);
  }
});

module.exports = server;
