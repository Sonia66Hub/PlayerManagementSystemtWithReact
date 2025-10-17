import axios from "axios";

const dropdownService = {
  getGenders: () => axios.get('http://localhost:5034/api/Genders').then(res => res.data),
  getSportsTypes: () => axios.get('http://localhost:5034/api/SportsTypes').then(res => res.data),
  getReligions: () => axios.get('http://localhost:5034/api/Religions').then(res => res.data),
  getBloodGroups: () => axios.get('http://localhost:5034/api/BloodGroups').then(res => res.data),
};

export default dropdownService;