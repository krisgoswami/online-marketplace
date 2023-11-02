import jwt from 'jsonwebtoken';
import { User } from "../models/userModel.js";

// *********user registration*********

export const createUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        //validations
        if (!email || !password) {
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