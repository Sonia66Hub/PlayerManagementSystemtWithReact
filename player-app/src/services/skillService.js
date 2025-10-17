// src/services/skillService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5034/api/Skills';

const skillService = {
  // সব স্কিলের তালিকা পাবে
  getAllSkills: async () => {
    try 
    {
      const response = await axios.get(API_BASE_URL);
      return response.data; // List<SkillReadDto>
    } catch (error) {
      console.error("Error fetching skills:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  // নির্দিষ্ট ID অনুযায়ী স্কিল পাবে
  getSkillById: async (id) => {
    try 
    {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data; // SkillReadDto
    } catch (error) {
      console.error(`Error fetching skill with ID ${id}:`, error.response ? error.response.data : error.message);
      throw error;
    }
  },

  // নতুন স্কিল তৈরি
  createSkill: async (skillData) => {
    try {
      const response = await axios.post(API_BASE_URL, skillData);
      return response.data;
    } catch (error) {
      console.error("Error creating skill:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  // স্কিল আপডেট
  updateSkill: async (id, skillData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, skillData);
      return response.data;
    } catch (error) {
      console.error(`Error updating skill with ID ${id}:`, error.response ? error.response.data : error.message);
      throw error;
    }
  },

  // স্কিল ডিলিট
  deleteSkill: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting skill with ID ${id}:`, error.response ? error.response.data : error.message);
      throw error;
    }
  }
};

export default skillService;
