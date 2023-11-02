import mongoose from "mongoose";

export const itemSchema = new mongoose.Schema({
    item_name: {
        type: String,
        required: [true, "Name is required"],
    },
    item_type: {
        type: String,
        required: [true, "Item type is required"],
    },
    description: {
        type: String,
        required: [true, "description is required"],
    },
    bid_price: {
        type: Number,
        required: true,
    }
});

export const Item = mongoose.model('Item', itemSchema);