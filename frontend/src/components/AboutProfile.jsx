// AboutProfile.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './AboutProfile.css'; // Import the CSS file

const AboutProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://du-backend.onrender.com/api/users/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUser();
    }, [id]);

    if (!user) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="about-profile">
            <h2>User Details</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Roll:</strong> {user.roll}</p>
            <p><strong>Bio:</strong> {user.bio}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Type:</strong> {user.type}</p>
        </div>
    );
};

export default AboutProfile;
