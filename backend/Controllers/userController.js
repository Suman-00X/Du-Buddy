import User from '../Database/UserDB.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Registation Controller
export const registerUser = async (req, res) => {

    console.log("registration controller hits");
    const { name, roll, bio, email, password, type } = req.body;

    console.log(name, roll, bio, email, password, type);

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


export const getProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId).select('-password'); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

export const updateProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, roll, bio, email, type } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        if (name) user.name = name;
        if (roll) user.roll = roll;
        if (bio) user.bio = bio;
        if (email) user.email = email;
        if (type) user.type = type;

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};
