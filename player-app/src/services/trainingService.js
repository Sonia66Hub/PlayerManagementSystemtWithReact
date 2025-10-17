import axios from 'axios';
import React from 'react'


const API_BASE_URL = 'http://localhost:5034/api/Trainings';

const trainingService = 
{
    getAllTrainings: async ()=>
    {
        try
        {
            const response = await axios.get(API_BASE_URL);
            return response.data
        }
        catch(error)
        {
            console.error('Error fetching trainings:',error);
            throw error;
        }
    },
    getTrainingById: async (id) =>
    {
        try
        {
            const response = await axios.get(`${API_BASE_URL}/${id}`)
            return response.data
        }
        catch(error)
        {
            console.error('Error fetching training with Id:',error);
            throw error;
        }
    }
};
export default trainingService;