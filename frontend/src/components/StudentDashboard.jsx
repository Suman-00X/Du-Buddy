import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [studentName, setStudentName] = useState('');

    useEffect(() => {
        const fetchProfileAndRequests = async () => {
            const token = localStorage.getItem('token');
            console.log("token", token);
            try {
                // Fetch profile
                const profileResponse = await axios.get('http://localhost:3001/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setStudentName(profileResponse.data.name);

                // Fetch session requests
                const requestsResponse = await axios.get('http://localhost:3001/api/sessions/student/sessions', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(requestsResponse);
                setRequests(requestsResponse.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProfileAndRequests();
    }, []);

    return (
        <div>
            <h1>Welcome {studentName} to your dashboard (student)</h1>
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