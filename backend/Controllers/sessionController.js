import Session from '../Database/SessionDB.js';
import User from '../Database/UserDB.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Nodemailer service
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Create a session request
export const createSessionRequest = async (req, res) => {
    const { teacherIds, suggestedTimes } = req.body;
    const studentId = req.user.id;

    try {
        const student = await User.findById(studentId);
        if (!student || student.type !== 'student') {
            return res.status(400).json({ message: 'Invalid student' });
        }

        const teacherEmails = await User.find({
            _id: { $in: teacherIds },
            type: 'teacher'
        }).select('email');

        const teacherNames = await User.find({
            _id: { $in: teacherIds },
            type: 'teacher'
        }).select('name');

        const session = new Session({
            student: studentId,
            teachers: teacherIds,
            suggestedTimes,
            status: 'pending'
        });

        await session.save();

        console.log("transporter-2", transporter);


        teacherEmails.forEach(({ email }, index) => {
            transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'New Session Request',
                text: `Hi ${teacherNames[index].name},\n\nYou have a new session request from ${student.name}. Session details can be seen in the app. You can accept/reject the session according to your choice.\n\nThanks and Regards,\nTeam Du-Buddy`
            });
        });

        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: student.email,
            subject: 'New Session Request',
            text: `Hi ${student.name},\n\nYour request has been sent. You will be notified soon whether your request has been accepted or rejected based on teacher availability.\n\nThanks and Regards,\nTeam Du-Buddy`
        });

        res.status(201).json({ message: 'Session request created' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Get all session requests for a teacher
export const getAllRequests = async (req, res) => {
    const teacherId = req.user.id;

    try {
        const requests = await Session.find({ teachers: teacherId });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Respond to a session request
export const respondToRequest = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const teacherId = req.user.id;

    try {
        const session = await Session.findById(id);
        if (!session || !session.teachers.includes(teacherId)) {
            return res.status(400).json({ message: 'Invalid request' });
        }

        session.status = status;
        await session.save();

        const student = await User.findById(session.student);

        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: student.email,
            subject: `Session Request ${status}`,
            text: `Hi ${student.name},\n\nYour session request has been ${status}.\n\nThanks & Regards,\nTeam Du-Buddy`
        });

        res.status(200).json({ message: `Session request ${status}` });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Get all session requests for a student
export const getStudentRequests = async (req, res) => {
    const studentId = req.user.id;

    try {
        const sessions = await Session.find({ student: studentId }).populate('teachers', 'name');
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Get all teachers
export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await User.find({ type: 'teacher' }).select('name email bio');
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};
