import express from "express";
import { addFood } from "../controllers/foodController.js";
import multer from "multer";

const FoodRoute = express.Router();

// Add food (expects JSON body; image should be uploaded via /uploadImage first)
FoodRoute.post("/addfood", addFood);

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
       return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Upload image endpoint
FoodRoute.post('/uploadImage', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    // respond with the filename so the frontend can reference it when creating the food item
    return res.json({ success: true, filename: req.file.filename, path: req.file.path });
});

export default FoodRoute;