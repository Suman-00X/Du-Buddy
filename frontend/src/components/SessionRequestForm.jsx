import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SessionRequestForm = () => {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeachers, setSelectedTeachers] = useState([]);
    const [suggestedTimes, setSuggestedTimes] = useState(['']);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/users/teachers');
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
            await axios.post('http://localhost:3001/api/sessions', {
                teacherIds: selectedTeachers,
                suggestedTimes
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    const addSuggestedTime = () => {
        setSuggestedTimes([...suggestedTimes, '']);
    };

    const handleTimeChange = (index, value) => {
        const times = [...suggestedTimes];
        times[index] = value;
        setSuggestedTimes(times);
    };

    return (
        <form onSubmit={handleSubmit}>
            <select multiple onChange={(e) => setSelectedTeachers([...e.target.selectedOptions].map(option => option.value))}>
                {teachers.map(teacher => (
                    <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                ))}
            </select>
            {suggestedTimes.map((time, index) => (
                <input key={index} type="datetime-local" value={time} onChange={(e) => handleTimeChange(index, e.target.value)} required />
            ))}
            <button type="button" onClick={addSuggestedTime}>Add Time</button>
            <button type="submit">Request Session</button>
        </form>
    );
};

export default SessionRequestForm;
