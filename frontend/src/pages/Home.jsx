import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentDashboard from '../components/StudentDashboard';
import TeacherDashboard from '../components/TeacherDashboard';

const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userType = token ? JSON.parse(atob(token.split('.')[1])).type : null;

    return (
        <div>
            <h1>Home</h1>
            {userType === 'student' ? (
                <>
                    <button onClick={() => navigate('/session-request')}>Request Session</button>
                    <StudentDashboard />
                </>
            ) : userType === 'teacher' ? (
                <TeacherDashboard />
            ) : (
                <p>Please log in to see your dashboard.</p>
            )}
        </div>
    );
};

export default Home;
