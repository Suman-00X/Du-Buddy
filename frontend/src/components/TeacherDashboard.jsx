import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileLink from '../components/ProfileLink';
import './TeacherDashboard.css'; // Import the CSS file

const TeacherDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [teacherName, setTeacherName] = useState('');

    useEffect(() => {
        const fetchTeacherNameAndRequests = async () => {
            const token = localStorage.getItem('token');
            try {
                // Fetch teacher name
                const profileResponse = await axios.get('https://du-backend.onrender.com/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTeacherName(profileResponse.data.name);

                // Fetch session requests
                const requestsResponse = await axios.get('https://du-backend.onrender.com/api/sessions/sessions', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setRequests(requestsResponse.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTeacherNameAndRequests();
    }, []);

    const respondToRequest = async (id, status) => {
        const token = localStorage.getItem('token');
        try {
            await axios.patch(`https://du-backend.onrender.com/api/sessions/sessions/${id}`, { status }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setRequests(requests.map(request =>
                request._id === id ? { ...request, status } : request
            ));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="teacher-dashboard">
            <h1>Welcome, {teacherName}</h1>
            <h2>Your Dashboard</h2>
            <table className="requests-table">
                <thead>
                    <tr>
                        <th>S. No</th>
                        <th>Student Name</th>
                        <th>Session Details</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request, index) => (
                        <tr key={request._id}>
                            <td>{index + 1}</td>
                            <td>
                                <ProfileLink id={request.student._id} name={request.student.name} userType="student" />
                            </td>
                            <td>{request.suggestedTimes.join(', ')}</td>
                            <td>{request.status}</td>
                            <td>
                                {request.status === 'pending' && (
                                    <>
                                        <button className="action-button accept" onClick={() => respondToRequest(request._id, 'accepted')}>
                                            Accept
                                        </button>
                                        <button className="action-button reject" onClick={() => respondToRequest(request._id, 'rejected')}>
                                            Reject
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeacherDashboard;
