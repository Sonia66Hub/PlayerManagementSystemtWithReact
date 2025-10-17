import axios from 'axios';
import React from 'react'

const API_BASE_URL = 'http://localhost:5034/api/PlayerEvaluations';

const playerEvaluationService = {
    getAllPlayerEvaluations: async () =>
    {
        try 
        {
            const response = await axios.get(API_BASE_URL);
            return response.data;    
        } catch (error) 
        {
            console.error('Error fetching Player Evaluations:', error);
            throw error; 
        }
    },
    getPlayerEvaluationById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    }
    catch (error) 
    {
      console.error(`Error fetching Player Evaluation with ID ${id}:`, error);
      throw error;
    }
  },
    _buildPlayerEvaluationFormData: (playerEvaluationCreateUpdateDto, isUpdate = false) => 
        {
            const formData = new FormData();

            if (isUpdate) {
                formData.append('PlayerEvaluationId', playerEvaluationCreateUpdateDto.PlayerEvaluationId);
            }
            formData.append('EvaluationDate', playerEvaluationCreateUpdateDto.EvaluationDate ?? '');
            formData.append('PlayerId', playerEvaluationCreateUpdateDto.PlayerId);
            formData.append('TrainerId', playerEvaluationCreateUpdateDto.TrainerId);
            formData.append('IsCompleted', playerEvaluationCreateUpdateDto.IsCompleted);
            formData.append('Remarks', playerEvaluationCreateUpdateDto.Remarks ?? '');

            formData.append(
                'PlayerEvaluationDetailsJson',
                JSON.stringify(playerEvaluationCreateUpdateDto.PlayerEvaluationDetails || [])
            );
            return formData;
        },

    createPlayerEvaluation : async (playerEvaluationCreateUpdateDto) =>
    {
        try 
        {
            const formData = playerEvaluationService._buildPlayerEvaluationFormData(playerEvaluationCreateUpdateDto,false);
            const response = await axios.post(`${API_BASE_URL}`,formData,
            {
                headers:
                {
                    'Content-Type':'multipart/form-data',
                },
            });
            return response.data;
        }
        catch (error)
        {
           console.error('Error creating Player Evaluation:', error.response ? error.response.data : error.message);
           throw error;
        }
    },

    updatePlayerEvaluation: async (id, playerEvaluationCreateUpdateDto) =>
    {
        try
        {
            const formData = playerEvaluationService._buildPlayerEvaluationFormData(playerEvaluationCreateUpdateDto,true);
            const response = await axios.put(`${API_BASE_URL}/${id}`,formData,
            {
                headers:
                {
                    'Content-Type':'multipart/form-data',
                },
            });
            return response.data;
        }
        catch (error) 
        {
            console.error(`Error updating Player Evaluation with ID ${id}:`, error.response ? error.response.data : error.message);
            throw error;
        }
    },

    deletePlayerEvaluation: async (id)=>
    {
        try
        {
            const response = await axios.delete(`${API_BASE_URL}/${id}`);
            return response.data;    
        }
        catch (error)
        {
            console.error(`Error deleting Player Evaluation with ID ${id}:`, error.response ? error.response.data : error.message);
            throw error;
        }
    }
    
};
export default playerEvaluationService;


