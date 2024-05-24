import React from 'react';
import { Link } from 'react-router-dom';

const ProfileLink = ({ id, name, userType }) => {
    return (
        <Link to={`/users/${id}`}>
            {userType === 'teacher' ? `${name}` : `${name}`}
        </Link>
    );
};

export default ProfileLink;
