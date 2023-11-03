import mongoose from "mongoose";

export const itemSchema = new mongoose.Schema({
    item_name: {
        type: String,
        required: [true, "Name is required"],
    },
    category: {
        type: String,
        required: [true, "category is required"]
    },
    item_type: {
        type: String,
        required: [true, "Item type is required"],
    },
    description: {
        type: String,
        required: [true, "description is required"],
    },
    price: {
        type: Number,
        required: [true, "price is required"],
    },
    image: {
        type: String,
    },
    published: {
        type: Boolean,
        required: [true, "published is required"],
    },
});

export const Item = mongoose.model('Item', itemSchema);