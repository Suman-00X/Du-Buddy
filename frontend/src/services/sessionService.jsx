import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const createSession = async (teacherIds, suggestedTimes) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(
        `${API_URL}/sessions`,
        { teacherIds, suggestedTimes },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
};

const getSessions = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/sessions`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

const respondToSession = async (sessionId, status) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(
        `${API_URL}/sessions/${sessionId}`,
        { status },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
};

export default {
    createSession,
    getSessions,
    respondToSession
};
