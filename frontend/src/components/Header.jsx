import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Import the CSS file

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                {!token ? (
                    <>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </>
                ) : (
                    <>
                        <Link to="/profile">Profile</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
