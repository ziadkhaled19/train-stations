const express = require("express");
const {
  createComplaint,
  getAllComplaints,
  getComplaintById,
} = require("../controllers/complaintController");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.post("/",authorize("user"), createComplaint);
router.get("/", authorize("admin"), getAllComplaints);
router.get("/:id", authorize("admin"), getComplaintById);

module.exports = router;