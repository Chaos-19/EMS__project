import express from "express";
import { uploadSingle, uploadMultiple } from "../middleware/multer.js";

const router = express.Router();

// Single image upload
router.post("/single", (req, res) => {
  uploadSingle(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    res.status(200).json({ message: "Image uploaded successfully", file: req.file });
  });
});

// Multiple image upload
router.post("/multiple", (req, res) => {
  uploadMultiple(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.files || req.files.length === 0) return res.status(400).json({ error: "No files uploaded" });

    res.status(200).json({ message: "Images uploaded successfully", files: req.files });
  });
});

export default router;
