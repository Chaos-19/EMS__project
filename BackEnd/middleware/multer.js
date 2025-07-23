import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads folder exists
const uploadPath = path.join("uploads/");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Optional: File filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

// Multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter, // uncomment this to filter non-images
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export const uploadSingle = upload.single("image");      // form field name: image
export const uploadMultiple = upload.array("images", 10); // form field name: images
