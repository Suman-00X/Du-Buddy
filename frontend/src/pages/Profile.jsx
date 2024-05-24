import React from 'react';
import useAuth from '../hooks/useAuth';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div>
            <h2>Profile</h2>
            <p>Name: {user.name}</p>
            <p>Roll: {user.roll}</p>
            <p>Bio: {user.bio}</p>
            <p>Email: {user.email}</p>
            <p>Type: {user.type}</p>
        </div>
    );
};

export default Profile;
