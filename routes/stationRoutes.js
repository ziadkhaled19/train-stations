const express = require("express");
const {
  getAllStations,
  getStationByQuery,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
  getNearestStations,
} = require("../controllers/stationController");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// public
router.use(protect);
router.get("/", getAllStations);
router.get("/search", getStationByQuery);
router.get("/:id", getStationById);
router.get("/tours-nearest/:latlng", getNearestStations);

// admin only 
router.use(authorize("admin"));
router.post("/", createStation);
router.patch("/:id", updateStation);
router.delete("/:id", deleteStation);

module.exports = router;
