import axios from 'axios';
import React from 'react'

const API_BASE_URL = 'http://localhost:5034/api/Players';

const playerService = {
    getAllPlayers: async () =>
    {
        try 
        {
            const response = await axios.get(API_BASE_URL);
            return response.data;    
        } catch (error) 
        {
            console.error('Error fetching Players:', error);
            throw error; 
        }
    },
    getPlayerById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    }
    catch (error) 
    {
      console.error(`Error fetching Player with ID ${id}:`, error);
      throw error;
    }
  },
    _buildPlayerFormData: (playerCreateUpdateDto, isUpdate = false) => 
        {
            const formData = new FormData();

            if (isUpdate) {
                formData.append('PlayerId', playerCreateUpdateDto.PlayerId);
            }

            formData.append('FirstName', playerCreateUpdateDto.FirstName);
            formData.append('LastName', playerCreateUpdateDto.LastName);
            formData.append('DateOfBirth', playerCreateUpdateDto.DateOfBirth ?? '');
            formData.append('FathersName', playerCreateUpdateDto.FathersName ?? '');
            formData.append('MothersName', playerCreateUpdateDto.MothersName ?? '');
            formData.append('MobileNo', playerCreateUpdateDto.MobileNo);

            if (playerCreateUpdateDto.pictureFile) {
                formData.append('PictureFile', playerCreateUpdateDto.pictureFile);
            }
            if (isUpdate && playerCreateUpdateDto.ImageName && !playerCreateUpdateDto.pictureFile) {
                formData.append('ImageName', playerCreateUpdateDto.ImageName);
            }
            formData.append('NidNumber', playerCreateUpdateDto.NidNumber ?? '');
            formData.append('Email', playerCreateUpdateDto.Email ?? '');
            formData.append('Height', playerCreateUpdateDto.Height ?? '');
            formData.append('PlayerWeight', playerCreateUpdateDto.PlayerWeight ?? '');
            formData.append('LastEducationalQualification', playerCreateUpdateDto.LastEducationalQualification ?? '');

            formData.append('SportsTypeId', playerCreateUpdateDto.SportsTypeId);
            formData.append('BloodGroupId', playerCreateUpdateDto.BloodGroupId);
            formData.append('ReligionId', playerCreateUpdateDto.ReligionId);
            formData.append('GenderId', playerCreateUpdateDto.GenderId);

            formData.append(
                'PlayerTrainingAssignmentsJson',
                JSON.stringify(playerCreateUpdateDto.PlayerTrainingAssignments || [])
            );

            return formData;
        },

    createPlayer : async (playerCreateUpdateDto) =>
    {
        try 
        {
            const formData = playerService._buildPlayerFormData(playerCreateUpdateDto,false);
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
           console.error('Error creating Player:', error.response ? error.response.data : error.message);
           throw error;
        }
    },

    updatePlayer: async (id, playerCreateUpdateDto) =>
    {
        try
        {
            const formData = playerService._buildPlayerFormData(playerCreateUpdateDto,true);
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
            console.error(`Error updating Player with ID ${id}:`, error.response ? error.response.data : error.message);
            throw error;
        }
    },

    deletePlayer: async (id)=>
    {
        try
        {
            const response = await axios.delete(`${API_BASE_URL}/${id}`);
            return response.data;    
        }
        catch (error)
        {
            console.error(`Error deleting Player with ID ${id}:`, error.response ? error.response.data : error.message);
            throw error;
        }
    }
    
};
export default playerService;


