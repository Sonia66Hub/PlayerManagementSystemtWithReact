import axios from 'axios';

const API_BASE_URL = 'http://localhost:5034/api/Matches';

const matchService = {
  getAllMatches: async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  },

  getMatchById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },
_buildPlayerFormData: (matchCreateUpdateDTO, isUpdate = false) => 
        {
            const formData = new FormData();

            if (isUpdate) {
                formData.append('MatchId', matchCreateUpdateDTO.MatchId);
            }
            formData.append('Title', matchCreateUpdateDTO.Title);
            formData.append('MatchDate', matchCreateUpdateDTO.MatchDate ?? '');
            formData.append('Venue', matchCreateUpdateDTO.Venue ?? '');
            formData.append('TeamA', matchCreateUpdateDTO.TeamA ?? '');
            formData.append('TeamB', matchCreateUpdateDTO.TeamB ?? '');
            formData.append('Result', matchCreateUpdateDTO.Result ?? '');
            formData.append('MatchFormatId', matchCreateUpdateDTO.MatchFormatId);
           
            return formData;
        },
  createMatch: async (matchCreateUpdateDTO) => {
    try 
            {
                const formData = matchService._buildPlayerFormData(matchCreateUpdateDTO,false);
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
               console.error('Error creating Match:', error.response ? error.response.data : error.message);
               throw error;
            }
  },

updateMatch: async (id, matchCreateUpdateDTO) =>
    {
        try
        {
            const formData = matchService._buildPlayerFormData(matchCreateUpdateDTO,true);
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
            console.error(`Error updating Match with ID ${id}:`, error.response ? error.response.data : error.message);
            throw error;
        }
    },

  
  deleteMatch: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  }
};

export default matchService;
