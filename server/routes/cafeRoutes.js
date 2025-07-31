const express = require("express");
const router = express.Router();
const cafeController = require("../controllers/cafeController");

router.get("/filter", cafeController.getFilterCafes);
router.get("/", cafeController.getAllCafes); // Ruta all caf
router.get("/:id", cafeController.getCafeById); // Ruta ID caf

router.post("/", cafeController.createCafe); // Ruta NEW caf, usare luego
router.put("/:id", cafeController.updateCafe);
router.delete("/:id", cafeController.deleteCafe);

module.exports = router;
