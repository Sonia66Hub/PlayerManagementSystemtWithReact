import axios from 'axios';
import React from 'react'


const API_BASE_URL = 'http://localhost:5034/api/EvaluationCategories';

const evaluationCategoryService = 
{
    getAllEvaluationCategories: async ()=>
    {
        try
        {
            const response = await axios.get(API_BASE_URL);
            return response.data
        }
        catch(error)
        {
            console.error('Error fetching evaluation categories:',error);
            throw error;
        }
    },
    getEvaluationCategoryById: async (id) =>
    {
        try
        {
            const response = await axios.get(`${API_BASE_URL}/${id}`)
            return response.data
        }
        catch(error)
        {
            console.error('Error fetching evaluation category with Id:',error);
            throw error;
        }
    }
};
export default evaluationCategoryService;