
// Middleware to authorize teachers
export const authorizeTeacher = (req, res, next) => {
    if (req.user.type !== 'teacher') {
        return res.status(403).json({ message: 'Access denied, only teachers allowed' });
    }
    next();
};