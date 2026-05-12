const BASE_URL = 'http://192.168.0.110:5000/api/notes';
import axios from 'axios';

export const getNotes = async () => {
    try {
        const response = await axios.get(BASE_URL);
        console.log('ress',response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
};


export const createNote = async (title, content) => {
    try {
        const response = await axios.post(BASE_URL, { title, content });
        return response.data;
    } catch (error) {
        console.error('Error creating note:', error);
        throw error;
    }
};

export const updateNote = async (id, title, content) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, { title, content });
        return response.data;
    } catch (error) {
        console.error('Error updating note:', error);
        throw error;
    }
};

export const deleteNote = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting note:', error);
        throw error;
    }
};