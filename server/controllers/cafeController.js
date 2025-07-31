const Cafe = require("../models/Cafe");

const getAllCafes = async (req, res) => {
  try {
    const cafes = await Cafe.find({}); // Encuentra las caf
    res.status(200).json(cafes);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Error." });
  }
};

const getCafeById = async (req, res) => {
  try {
    const cafe = await Cafe.findById(req.params.id); // Busca por ID
    if (!cafe) {
      return res.status(404).json({ message: "Cafetería no encontrada." });
    }
    res.status(200).json(cafe);
  } catch (error) {
    console.error("Error al obtener cafetería por ID:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor al obtener la cafetería." });
  }
};

// Funcion para crear una cafetería
const createCafe = async (req, res) => {
  try {
    const newCafe = new Cafe(req.body);
    await newCafe.save();
    res.status(201).json(newCafe);
  } catch (error) {
    console.error("Error al crear cafetería:", error);
    res.status(400).json({
      message: "Datos de cafetería inválidos o faltantes.",
      error: error.message,
    });
  }
};

//funcion para actualizar una cafeteria por ID
const updateCafe = async (req, res) => {
  console.log("--- DEBUG: Dentro de updateCafe ---");
  console.log("req.params:", req.params);
  console.log("req.params.id:", req.params.id);
  console.log("req.body:", req.body);

  try {
    const foundAndUpdatedCafe = await Cafe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!foundAndUpdatedCafe) {
      return res
        .status(404)
        .json({ message: "Cafeteria no encontrada para actualizar" });
    }

    res.status(200).json(foundAndUpdatedCafe);
  } catch (error) {
    console.error("Error al actualizar cafetería:", error);
    res.status(400).json({
      message: "Error al actualizar la cafetería. Verifique los datos.",
      error: error.message,
    });
  }
};

const deleteCafe = async (req, res) => {
  console.log("--- DEBUG: Dentro de deleteCafe ---");
  console.log("req.params:", req.params);
  console.log("req.params.id:", req.params.id);

  try {
    const foundAndDeletedCafe = await Cafe.findByIdAndDelete(req.params.id);

    if (!foundAndDeletedCafe) {
      return res
        .status(404)
        .json({ message: "Cafeteria no encontrada para eliminar" });
    }

    res
      .status(200)
      .json({ message: "Cafeteria eliminada", cafe: foundAndDeletedCafe });
  } catch (error) {
    console.error("Error al eliminar cafeteria:", error);
    res.status(500).json({
      message: "Error interno del servidor al eliminar la cafetería.",
    });
  }
};
const getFilterCafes = async (req, res) => {
  try {
    const query = {};
    const { searchTerm } = req.query;
    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { address: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ];
    }
    //Filtro por barrio (neighborhood)
    const { neighborhood } = req.query;
    if (neighborhood && neighborhood !== "Todos los barrios") {
      query.address = { $regex: neighborhood, $options: "i" };
    }
    // Filtros(boolean)
    const { wifi, plugs, petFriendly, terrace, quiet, specialtyCoffee } =
      req.query;

    if (wifi === "true") query.wifiAvailability = true;
    if (plugs === "true") query.powerOutlets = true;
    if (petFriendly === "true") query.isPetFriendly = true;
    if (terrace === "true") query.hasTerrace = true;
    if (quiet === "true") query.isQuiet = true;
    if (specialtyCoffee === "true") query.hasCoffee = true;

    // Ejecuta la consulta a la base de datos
    const cafes = await Cafe.find(query);
    res.status(200).json(cafes);
  } catch (error) {
    console.error("Error al obtener cafeterías filtradas:", error);
    res.status(500).json({
      message: "Error al obtener las cafeterías filtradas",
      error: error.message,
    });
  }
};

module.exports = {
  getAllCafes,
  getCafeById,
  createCafe,
  updateCafe,
  deleteCafe,
  getFilterCafes,
};
