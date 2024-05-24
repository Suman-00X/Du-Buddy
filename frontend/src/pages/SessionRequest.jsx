import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SessionRequestForm from '../components/SessionRequestForm';
import axios from 'axios';

const SessionRequest = () => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchTeachers = async () => {
            try {
                const response = await axios.get('https://du-backend.onrender.com/api/sessions/sessions/teachers', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTeachers(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTeachers();
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.left}>
                <h1>Request a Session</h1>
                <SessionRequestForm />
            </div>
            <div style={styles.right}>
                <h1>Available Teachers</h1>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th>S. No</th>
                            <th>Teacher Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher, index) => (
                            <tr key={teacher._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <Link to={`/users/${teacher._id}`}>{teacher.name}</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: 'auto',
        padding: '20px',
    },
    left: {
        width: '45%',
    },
    right: {
        width: '45%',
    },
    table: {
        width: '100%',
        // borderCollapse: 'collapse',
        marginTop: '20px',
    },
};

export default SessionRequest;
