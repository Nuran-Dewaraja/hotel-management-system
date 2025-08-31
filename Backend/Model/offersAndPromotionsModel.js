const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offersAndPromotionsSchema = new Schema({
    promotion_id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,   
        required: true
    },
    description: {
        type: String,   
        required: true
    },
    discount_type: {
        type: String,   
        required: true
    },
    discount_value: {
        type: Number,   
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'expired'],
        default: 'active',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    updated_at: {
        type: Date,
        default: Date.now,
        required: true
    }
});

/// Update `updated_at` before save
offersAndPromotionsSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model('OffersAndPromotions', offersAndPromotionsSchema);
