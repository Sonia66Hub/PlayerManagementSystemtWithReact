// src/services/trainerService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5034/api/Trainers';

const trainerService = {
  // Fetch all trainers
  getAllTrainers: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data; // JSON list of trainers
    } catch (error) {
      console.error('Error fetching trainers:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  // Fetch single trainer by ID
  getTrainerById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data; // Single trainer object
    } catch (error) {
      console.error(`Error fetching trainer with ID ${id}:`, error.response ? error.response.data : error.message);
      throw error;
    }
  },

  // Internal helper to build FormData for create/update
  _buildTrainerFormData: (trainerData, isUpdate = false) => {
    const formData = new FormData();

    if (isUpdate) {
      formData.append('TrainerId', trainerData.trainerId);
    }

    formData.append('TrainerName', trainerData.trainerName); // এখানে পরিবর্তন করা হয়েছে
    formData.append('DateOfBirth', trainerData.dateOfBirth ?? ''); // এখানে পরিবর্তন করা হয়েছে
    formData.append('MobileNo', trainerData.mobileNo); // এখানে পরিবর্তন করা হয়েছে
    formData.append('Email', trainerData.email ?? ''); // এখানে পরিবর্তন করা হয়েছে
    formData.append('IsExperienced', trainerData.isExperienced ?? false); // এখানে পরিবর্তন করা হয়েছে

    if (trainerData.pictureFile) { // এখানে পরিবর্তন করা হয়েছে (pictureFile)
      formData.append('PictureFile', trainerData.pictureFile);
    } else if (isUpdate && trainerData.picture) { // এখানে পরিবর্তন করা হয়েছে (picture)
      formData.append('Picture', trainerData.picture); // keep existing image if no new file
    }

    formData.append(
      'TrainerSkillsJson',
      JSON.stringify(
        trainerData.trainerSkills?.map(skill => ({ // এখানে পরিবর্তন করা হয়েছে
          SkillId: skill.skillId,
          Experience: skill.experience
        })) || []
      )
    );

    return formData;
  },

  // Create trainer
  createTrainer: async (trainerData) => {
    try {
      const formData = trainerService._buildTrainerFormData(trainerData, false);
      const response = await axios.post(API_BASE_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating trainer:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  // Update trainer
  updateTrainer: async (id, trainerData) => {
    try {
      const formData = trainerService._buildTrainerFormData(trainerData, true);
      const response = await axios.put(`${API_BASE_URL}/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating trainer with ID ${id}:`, error.response ? error.response.data : error.message);
      throw error;
    }
  },

  // Delete trainer
  deleteTrainer: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting trainer with ID ${id}:`, error.response ? error.response.data : error.message);
      throw error;
    }
  }
};

export default trainerService;
