import axios from 'axios';

const BASE_URL = 'https://content.guardianapis.com';
const API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;

export const fetchGuardianNews = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: {
        'api-key': API_KEY,
        'page-size': 10, // Limit the results to 10 posts
      },
    });
    return response.data.response.results;
  } catch (error) {
    console.error('Error fetching Guardian data:', error);
    throw error;
  }
};
