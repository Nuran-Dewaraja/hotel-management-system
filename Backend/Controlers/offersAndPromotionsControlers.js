const OffersAndPromotions = require('../Model/offersAndPromotionsModel');

// Get all promotions
const getPromotions = async (req, res, next) => {
    let promotions;
    try {
        promotions = await OffersAndPromotions.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error fetching promotions" });
    }

    if (!promotions || promotions.length === 0) {
        return res.status(404).json({ message: "No Promotions Found" });
    }

    return res.status(200).json({ promotions });
}; 

// Get promotion by ID
const getPromotionById = async (req, res, next) => {
    const { id } = req.params;

    let promotion;
    try {
        promotion = await OffersAndPromotions.findOne({ promotion_id: id });
    } catch (err) {
        console.error("Fetch Error:", err);
        return res.status(500).json({ message: "Error fetching promotion", error: err.message });
    }

    if (!promotion) {
        return res.status(404).json({ message: "Promotion not found" });
    }

    return res.status(200).json({ promotion });
};

// Add a new promotion
const addPromotions = async (req, res, next) => {
    const { promotion_id, title, description, start_date, end_date, discount_type, discount_value, status } = req.body;

    if (!promotion_id || !title || !description || !start_date || !end_date || !discount_type || !discount_value) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    let existingPromotion;
    try {
        existingPromotion = await OffersAndPromotions.findOne({ promotion_id });
    } catch (err) {
        console.error("Find Error:", err);
        return res.status(500).json({ message: "Error checking existing promotion" });
    }

    if (existingPromotion) {
        return res.status(400).json({ message: "Promotion with this ID already exists" });
    }

    const newPromotion = new OffersAndPromotions({
        promotion_id,
        title,
        description,
        start_date,
        end_date,
        discount_type,
        discount_value,
        status
    });

    try {
        await newPromotion.save();
    } catch (err) {
        console.error("Save Error:", err);
        return res.status(500).json({ message: "Error adding promotion", error: err.message });
    }

    return res.status(201).json({ message: "Promotion added successfully", promotion: newPromotion });
};

// Update a promotion
const updatePromotion = async (req, res, next) => {
    const { id } = req.params; 
    const { title, description, start_date, end_date, discount_type, discount_value, status } = req.body;

    let updatedPromotion;
    try {
        updatedPromotion = await OffersAndPromotions.findOneAndUpdate(
            { promotion_id: id },
            { title, description, start_date, end_date, discount_type, discount_value, status, updated_at: Date.now() },
            { new: true, runValidators: true }
        );
    } catch (err) {
        console.error("Update Error:", err);
        return res.status(500).json({ message: "Error updating promotion", error: err.message });
    }

    if (!updatedPromotion) {
        return res.status(404).json({ message: "Promotion not found" });
    }

    return res.status(200).json({ message: "Promotion updated successfully", promotion: updatedPromotion });
};

// Delete a promotion
const deletePromotion = async (req, res, next) => {
    const { id } = req.params; 

    let deletedPromotion;
    try {
        deletedPromotion = await OffersAndPromotions.findOneAndDelete({ promotion_id: id });
    } catch (err) {
        console.error("Delete Error:", err);
        return res.status(500).json({ message: "Error deleting promotion", error: err.message });
    }

    if (!deletedPromotion) {
        return res.status(404).json({ message: "Promotion not found" });
    }

    return res.status(200).json({ message: "Promotion deleted successfully", promotion: deletedPromotion });
};

exports.getPromotions = getPromotions;
exports.getPromotionById = getPromotionById;
exports.addPromotions = addPromotions;
exports.updatePromotion = updatePromotion;
exports.deletePromotion = deletePromotion;
