import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [teacherName, setTeacherName] = useState('');

    useEffect(() => {
        const fetchProfileAndRequests = async () => {
            const token = localStorage.getItem('token');
            try {
                // Fetch profile
                const profileResponse = await axios.get('http://localhost:3001/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTeacherName(profileResponse.data.name);

                // Fetch session requests
                const requestsResponse = await axios.get('http://localhost:3001/api/sessions/sessions', {
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

    const respondToRequest = async (id, status) => {
        const token = localStorage.getItem('token');
        try {
            await axios.patch(`http://localhost:3001/api/sessions/sessions/${id}`, { status }, {
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
        <div>
            <h1>Welcome {teacherName} to your dashboard (teacher)</h1>
            <table>
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
                            <td>{request.student.name}</td>
                            <td>{request.suggestedTimes.join(', ')}</td>
                            <td>{request.status}</td>
                            <td>
                                <button onClick={() => respondToRequest(request._id, 'accepted')}>Accept</button>
                                <button onClick={() => respondToRequest(request._id, 'rejected')}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeacherDashboard;
