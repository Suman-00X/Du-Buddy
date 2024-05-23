import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Registation Controller
export const registerUser = async (req, res) => {
    const { name, roll, bio, email, password, type } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            roll,
            bio,
            email,
            password: hashedPassword,
            type
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id, type: newUser.type }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Login Controller
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Email' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Incorrect Password' });
        }

        const token = jwt.sign({ id: user._id, type: user.type }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};
