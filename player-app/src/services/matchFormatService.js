// src/services/matchFormatService.js
import axios from "axios";

const API_URL = "http://localhost:5034/api/MatchFormats"; // তোমার API URL অনুযায়ী পরিবর্তন করতে হবে

const getAllMatchFormats = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch match formats:", error);
    return [];
  }
};

export default { getAllMatchFormats };
