import foodModel from "../models/foodModal.js";

// add food item
const addFood = async (req, res) => {
    // image can be provided either via req.file (if the image was uploaded here)
    // or via req.body.image (filename returned from /uploadImage endpoint)
    const image_filename = req.file ? req.file.filename : req.body.image;

    const { name, description, price, category } = req.body;
    if (!name || !description || !price || !category) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const food = new foodModel({
        name,
        description,
        price: Number(price),
        image: image_filename || '',
        category,
    });

    try {
        await food.save();
        res.json({ success: true, message: 'Food Added' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error saving food' });
    }
};

export { addFood };