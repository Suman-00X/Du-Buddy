import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css'; // Import the CSS file

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        roll: '',
        bio: '',
        email: '',
        password: '',
        type: 'student'
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://du-backend.onrender.com/api/users/register', formData);
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="registration-form-container">
            <form className="registration-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="roll"
                    placeholder="Roll Number"
                    value={formData.roll}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="bio"
                    placeholder="Bio"
                    value={formData.bio}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
