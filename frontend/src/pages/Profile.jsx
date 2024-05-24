import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState({ name: '', bio: '', email: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('https://du-backend.onrender.com/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.patch('https://du-backend.onrender.com/api/users/profile', profile, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setIsEditing(false);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Profile</h1>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label style={styles.label}>Name:</label>
                        <input
                            style={styles.input}
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label style={styles.label}>Bio:</label>
                        <input
                            style={styles.input}
                            type="text"
                            name="bio"
                            value={profile.bio}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label style={styles.label}>Email:</label>
                        <input
                            style={styles.input}
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button style={styles.button} type="submit">Save</button>
                </form>
            ) : (
                <div>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Bio:</strong> {profile.bio}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <button style={styles.editButton} onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        padding: '8px',
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
    editButton: {
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
};

export default Profile;
