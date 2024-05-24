import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <button onClick={handleLogout}>Logout</button>
            </nav>
        </header>
    );
};

export default Header;

