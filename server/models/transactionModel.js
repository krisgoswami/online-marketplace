import mongoose from "mongoose";
import { itemSchema } from "./itemModel.js";

export const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
        required: true,
    },
    item: [itemSchema],
}, { timestamps: true });

export const Transaction = mongoose.model('Transaction', transactionSchema);