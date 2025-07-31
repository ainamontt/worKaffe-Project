const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");

const Cafe = require("../models/Cafe");
require("../db");
const csvFilePath = path.join(__dirname, "..", "cafeteria.csv"); //revisar nombre

const seedData = async () => {
  const cafes = [];

  fs.createReadStream(csvFilePath) //Para leer el archivo CSV
    .pipe(csv())
    .on("data", (data) => {
      cafes.push({
        name: data["Nombre"],
        address: data["Dirección"],
        description: data["Descripción"],
        openingHours: data["Horario Apertura"],
        imageURL: data["URL Imagen"], // CSV es "Image URL"?

        //mapeo
        location: {
          type: "Point", // Siempre "Point" para este tipo de ubicación
          coordinates: [
            parseFloat(data["Longitud"]),
            parseFloat(data["Latitud"]),
          ],
        },

        wifiAvailability:
          data["Disponibilidad Wi-Fi"] === "Yes" ||
          data["Disponibilidad Wi-Fi"] === "Sí",
        powerOutlets: data["Enchufes"] === "Yes" || data["Enchufes"] === "Sí",
        hasFood:
          data["Tiene Comida"] === "Yes" || data["Tiene Comida"] === "Sí",
        hasCoffee:
          data["Tiene Café Especialidad"] === "Yes" ||
          data["Tiene Café Especialidad"] === "Sí",
        isPetFriendly:
          data["Permite Mascotas"] === "Yes" ||
          data["Permite Mascotas"] === "Sí",
        hasTerrace:
          data["Tiene Terraza"] === "Yes" || data["Tiene Terraza"] === "Sí",
        isQuiet:
          data["Es Tranquilo"] === "Yes" || data["Es tranquilo"] === "Sí",
        phone: data["Teléfono"],
      });
    })
    .on("end", async () => {
      try {
        console.log(" seeding iniciado");
        console.log("Borrando datos existentes de cafeterías...");
        await Cafe.deleteMany({});
        console.log("Datos existentes borrados.");

        console.log("Insertando nuevas cafeterías...");
        // Insertar desde el CSV
        await Cafe.insertMany(cafes);
        console.log(`${cafes.length} cafeterías insertadas exitosamente.`);
        process.exit(0); // Termina el proceso con éxito
      } catch (err) {
        console.error(
          "Error al insertar datos durante el seeding:",
          err.message
        );
        process.exit(1); // Termina el proceso con error
      } finally {
      }
    });
};

seedData();
