import jwt from 'jsonwebtoken';

// Middleware to authenticate users using JWT
export const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        console.log("token", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'Token is not valid' });
    }
};


