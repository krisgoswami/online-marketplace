import mongoose from "mongoose";
import { itemSchema } from "./itemModel";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    listed_items: [itemSchema]
});

export const User = mongoose.model('User', userSchema);