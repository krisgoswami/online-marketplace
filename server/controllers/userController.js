import jwt from 'jsonwebtoken';
import { User } from "../models/userModel.js";
import { Item } from '../models/itemModel.js';
import { Transaction } from '../models/transactionModel.js';

// *********user registration*********

export const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        //validations
        if (!username || !email || !password) {
            return res.status(400).send({
                message: "please fill all fields",
                success: false,
            });
        };

        //check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                message: "User already exists",
                success: false,
            });
        };

        //save user to database
        const user = new User({
            username: username,
            email: email,
            password: password,
        });
        await user.save();

        //create token upon sign up
        const token = jwt.sign({ email, role: "user" }, process.env.SECRET, { expiresIn: '1d' });
        return res.status(200).send({
            message: "User registered successfully",
            success: true,
            user,
            token,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error registering user',
            success: false,
            error,
        });
    }
}

// *********user login*********

export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        //validations
        if (!email || !password) {
            return res.status(400).send({
                message: "please fill all fields",
                success: false,
            });
        };

        //validation to check if credentials are correct
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(403).send({
                message: "Email or password incorrect",
                success: false,
            });
        }
        const token = jwt.sign({ email, role: "user" }, process.env.SECRET, { expiresIn: "1h" });
        res.status(200).send({
            message: "successfully logged in",
            success: true,
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error logging in',
            success: false,
            error,
        });
    }
}

// *********create item to list for sale*********

export const createItem = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).send({
                message: 'User not found',
                success: false,
                error,
            });
        }
        const item = new Item({
            ...req.body,
            createdBy: user.username,
        });
        await item.save();

        //saving item to the user who created it
        user.listed_items.push(item);
        await user.save();

        res.status(200).send({
            message: "Item added successfully",
            success: true,
            item,
            itemId: item.id,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error creating item',
            success: false,
            error,
        });
    }
}

// *********update item*********

export const updateItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) {
            return res.status(404).send({
                message: "Item not found",
                success: false,
            });
        }
        res.status(200).send({
            message: "Item updated succefully",
            success: true,
            item,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error updating item',
            success: false,
            error,
        });
    }
}

// *********delete item*********

export const deleteItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const user = await User.findOne({ email: req.user.email });
        const item = await Item.findByIdAndDelete(itemId);
        if (!item) {
            return res.status(404).send({
                message: "Item not found",
                success: false,
            });
        }

        //removing the item from the users listed items array and saving it
        user.listed_items.pull(item);
        await user.save();

        res.status(200).send({
            message: "Item deleted",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error deleting item',
            success: false,
            error,
        });
    }
}

// *********purchase item*********

export const purchase = async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await Item.findById(itemId);
        if (item) {
            const user = await User.findOne({ email: req.user.email });
            // console.log(user);
            // console.log(course);

            if (user) {
                user.purchasedItems.push(item);
                await user.save();

                const transaction = new Transaction({
                    user: user.username,
                    item,
                })
                await transaction.save();
                res.status(200).send({
                    message: "Item purchased successfully",
                    success: true,
                    user,
                });
            } else {
                return res.status(403).send({
                    message: "User not found",
                    success: false,
                });
            }

        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: 'Course not found',
            success: false,
            error,
        });
    }
}

// *********display purchased items*********

export const purchasedItems = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).populate('purchasedItems');

        if (user) {
            res.status(200).send({
                purchasedItems: user.purchasedItems || [],
                success: true,
            });
        } else {
            return res.status(400).send({
                message: "User not found",
                success: false,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: 'No items',
            success: false,
            error,
        });
    }
}