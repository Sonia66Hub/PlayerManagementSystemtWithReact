import axios from 'axios';
import React from 'react'


const API_BASE_URL = 'http://localhost:5034/api/EvaluationTypes';

const evaluationTypeService = 
{
    getAllEvaluationTypes: async ()=>
    {
        try
        {
            const response = await axios.get(API_BASE_URL);
            return response.data
        }
        catch(error)
        {
            console.error('Error fetching evaluation types:',error);
            throw error;
        }
    },
    getEvaluationTypeById: async (id) =>
    {
        try
        {
            const response = await axios.get(`${API_BASE_URL}/${id}`)
            return response.data
        }
        catch(error)
        {
            console.error('Error fetching evaluation type with Id:',error);
            throw error;
        }
    }
};
export default evaluationTypeService;