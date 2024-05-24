import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SessionRequestForm = () => {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeachers, setSelectedTeachers] = useState([]);
    const [suggestedTimes, setSuggestedTimes] = useState(['']);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3001/api/sessions/sessions/teachers', {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:3001/api/sessions/sessions', {
                teacherIds: selectedTeachers,
                suggestedTimes
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Session request submitted successfully!');
        } catch (error) {
            console.error(error);
            alert('Error submitting session request.');
        }
    };

    const handleTimeChange = (index, value) => {
        const times = [...suggestedTimes];
        times[index] = value;
        setSuggestedTimes(times);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="teachers">Select Teachers:</label>
            <select id="teachers" multiple onChange={(e) => setSelectedTeachers([...e.target.selectedOptions].map(option => option.value))}>
                {teachers.map(teacher => (
                    <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                ))}
            </select>
            <br />
            {suggestedTimes.map((time, index) => (
                <div key={index}>
                    <label htmlFor={`time-${index}`}>Suggested Time {index + 1}:</label>
                    <input id={`time-${index}`} type="datetime-local" value={time} onChange={(e) => handleTimeChange(index, e.target.value)} required />
                </div>
            ))}
            <br />
            <label>Selected Time:</label>
            <ul>
                {suggestedTimes.map((time, index) => (
                    <li key={index}>{time}</li>
                ))}
            </ul>
            <br />
            <button type="submit">Request Session</button>
        </form>
    );
};

export default SessionRequestForm;
