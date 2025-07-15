const Complaint = require("../models/Complaint");

const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().populate('user');
        res.status(200).json({
            status:'success',
            data: complaints
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id).populate('user');
        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }
        res.status(200).json({
            status:'success',
            data: complaint
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.create({
            user: req.user.id,
            message: req.body.message
        });
        res.status(201).json({
            status:'success',
            message: "Complaint created successfully",
            data: complaint
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    getAllComplaints,
    getComplaintById,
    createComplaint
};