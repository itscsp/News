
import axios from 'axios';

const BASE_URL = 'https://content.guardianapis.com';

const API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;

export const fetchGuardianNews = async (endpoint, page = 1, pageSize = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: {
        'api-key': API_KEY,
        'page-size': pageSize,
        'page': page
      },
    });

    const { results, pages, currentPage } = response.data.response;

    return {
      articles: results,
      totalPages: pages,
      currentPage: currentPage,
      hasMore: currentPage < pages
    };
  } catch (error) {
    console.error('Error fetching Guardian data:', error);
    throw error;
  }
};