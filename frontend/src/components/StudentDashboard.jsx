import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileLink from '../components/ProfileLink';
import './StudentDashboard.css'; 

const StudentDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [studentName, setStudentName] = useState('');

    useEffect(() => {
        const fetchProfileAndRequests = async () => {
            const token = localStorage.getItem('token');
            try {
                // Fetch profile
                const profileResponse = await axios.get('https://du-backend.onrender.com/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setStudentName(profileResponse.data.name);

                // Fetch session requests
                const requestsResponse = await axios.get('https://du-backend.onrender.com/api/sessions/student/sessions', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setRequests(requestsResponse.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProfileAndRequests();
    }, []);

    return (
        <div className="student-dashboard">
            <h1>Welcome {studentName} to your dashboard (student)</h1>
            <table className="requests-table">
                <thead>
                    <tr>
                        <th>S. No</th>
                        <th>Teacher Name</th>
                        <th>Session Details</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request, index) => (
                        <tr key={request.teachers[0]._id}>
                            <td>{index + 1}</td>
                            <td>
                                <ProfileLink id={request.teachers[0]._id} name={request.teachers[0].name} userType="teacher" />
                            </td>
                            <td>{request.suggestedTimes.join(', ')}</td>
                            <td>{request.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentDashboard;
