import mongoose from "mongoose";
import { userSchema } from "./userModel.js";
import { itemSchema } from "./itemModel.js";

export const transactionSchema = new mongoose.Schema({
    user: [userSchema],
    item: [itemSchema],
}, { timestamps: true });

export const Transaction = mongoose.model('Transaction', transactionSchema);