const express = require("express");
const { getUser, getAllUsers } = require("../controllers/userController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// all are admin only
router.use(protect);
router.use(authorize("admin"));

router.get("/", getAllUsers);
router.get("/:id", getUser);

module.exports = router;
