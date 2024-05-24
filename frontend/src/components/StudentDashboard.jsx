import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:3001/api/sessions/student', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setRequests(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRequests();
    }, []);

    return (
        <div>
            <h1>Student Dashboard</h1>
            <table>
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
                        <tr key={request._id}>
                            <td>{index + 1}</td>
                            <td>{request.teachers.map(teacher => teacher.name).join(', ')}</td>
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
