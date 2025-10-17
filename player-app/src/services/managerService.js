// import axios from 'axios';


// const API_BASE_URL = 'http://localhost:5034/api/Managers';

// const managerService = {
//     getAllManagers: async () =>
//     {
//         try 
//         {
//             const response = await axios.get(API_BASE_URL);
//             return response.data;    
//         } catch (error) 
//         {
//             console.error('Error fetching Managers:', error);
//             throw error; 
//         }
//     },
//     getManagerById: async (id) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/${id}`);
//       return response.data;
//     }
//     catch (error) 
//     {
//       console.error(`Error fetching Manager with ID ${id}:`, error);
//       throw error;
//     }
//   },
//     _buildPlayerFormData: (managerCreateUpdateDto, isUpdate = false) => 
//         {
//             const formData = new FormData();

//             if (isUpdate) {
//                 formData.append('ManagerId', managerCreateUpdateDto.ManagerId);
//             }

//             formData.append('Name', managerCreateUpdateDto.Name);
//             formData.append('Dob', managerCreateUpdateDto.Dob ?? '');
            
//             if (managerCreateUpdateDto.pictureFile) {
//                 formData.append('PictureFile', managerCreateUpdateDto.pictureFile);
//             }
//             if (isUpdate && managerCreateUpdateDto.ImageUrl && !managerCreateUpdateDto.pictureFile) {
//                 formData.append('ImageUrl', managerCreateUpdateDto.ImageUrl);
//             }
//             formData.append('ContactNumber', managerCreateUpdateDto.ContactNumber);
//             formData.append('Email', managerCreateUpdateDto.Email ?? '');
//             formData.append('IsActive', managerCreateUpdateDto.IsActive ?? false);           

//             formData.append(
//                 'ManagerTrainersJson',
//                 JSON.stringify(managerCreateUpdateDto.ManagerTrainerAssignments || [])
//             );

//             return formData;
//         },

//     createManager : async (managerCreateUpdateDto) =>
//     {
//         try 
//         {
//             const formData = managerService._buildPlayerFormData(managerCreateUpdateDto,false);
//             const response = await axios.post(`${API_BASE_URL}`,formData,
//             {
//                 headers:
//                 {
//                     'Content-Type':'multipart/form-data',
//                 },
//             });
//             return response.data;
//         }
//         catch (error)
//         {
//            console.error('Error creating Manager:', error.response ? error.response.data : error.message);
//            throw error;
//         }
//     },

//     updateManager: async (id, managerCreateUpdateDto) =>
//     {
//         try
//         {
//             const formData = managerService._buildPlayerFormData(managerCreateUpdateDto,true);
//             const response = await axios.put(`${API_BASE_URL}/${id}`,formData,
//             {
//                 headers:
//                 {
//                     'Content-Type':'multipart/form-data',
//                 },
//             });
//             return response.data;
//         }
//         catch (error) 
//         {
//             console.error(`Error updating Manager with ID ${id}:`, error.response ? error.response.data : error.message);
//             throw error;
//         }
//     },

//     deleteManager: async (id)=>
//     {
//         try
//         {
//             const response = await axios.delete(`${API_BASE_URL}/${id}`);
//             return response.data;    
//         }
//         catch (error)
//         {
//             console.error(`Error deleting Manager with ID ${id}:`, error.response ? error.response.data : error.message);
//             throw error;
//         }
//     }
    
// };
// export default managerService;

import axios from 'axios';


const API_BASE_URL = 'http://localhost:5034/api';

const managerService = {


  getAllManagers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Managers`); // Corrected endpoint path
      return response.data;
    } catch (error) {
      console.error('Error fetching managers:', error);
      throw error;
    }
  },

 
  getManagerById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Managers/${id}`); // Corrected endpoint path
      return response.data;
    } catch (error) {
      console.error(`Error fetching manager with ID ${id}:`, error);
      throw error;
    }
  },


  createManager: async (managerCreateUpdateDto) => {
    try {
      const formData = managerService.buildManagerFormData(managerCreateUpdateDto);
      const response = await axios.post(`${API_BASE_URL}/Managers`, formData, { // Corrected endpoint path
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating manager:', error.response?.data || error.message);
      throw error;
    }
  },


  updateManager: async (id, managerCreateUpdateDto) => {
    try {
      const formData = managerService.buildManagerFormData(managerCreateUpdateDto);
      const response = await axios.put(`${API_BASE_URL}/Managers/${id}`, formData, { // Corrected endpoint path
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating manager with ID ${id}:`, error.response?.data || error.message);
      throw error;
    }
  },


  deleteManager: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/Managers/${id}`); // Corrected endpoint path
      return response.data;
    } catch (error) {
      console.error(`Error deleting manager with ID ${id}:`, error);
      throw error;
    }
  },


  buildManagerFormData: (managerData) => {
    const formData = new FormData();

    for (const key in managerData) {
      
      if (managerData[key] === null || managerData[key] === undefined) {
        
        if (key === 'ImageUrl') {
          formData.append(key, '');
        }
        continue; 
      }

      
      if (key === 'ManagerTrainerAssignments') {
       
        formData.append('ManagerTrainerAssignmentsJson', JSON.stringify(managerData[key]));
      }
      // Special handling for PictureFile (the actual File object)
      else if (key === 'PictureFile' && managerData[key] instanceof File) {
        formData.append('PictureFile', managerData[key]);
      }
      
      else if (key === 'ImageUrl' && !managerData.PictureFile) {
        if (managerData[key] !== '') {
          formData.append('ImageUrl', managerData[key]);
        }
      }
      
      else if (typeof managerData[key] === 'boolean') {
        formData.append(key, String(managerData[key]));
      }
      
      else if (key === 'Dob') {
         
         const dateValue = typeof managerData[key] === 'string' && managerData[key].includes('T')
             ? managerData[key]
             : new Date(managerData[key]).toISOString();
         formData.append(key, dateValue);
      }
      
      else {
        formData.append(key, managerData[key]);
      }
    }
    return formData;
  },
};

export default managerService;






