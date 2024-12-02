// NYTimesAPI.js
import axios from 'axios';

const BASE_URL = 'https://api.nytimes.com/svc/topstories/v2/home.json';

export const fetchTopStories = async (page = 1, limit = 12) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        'api-key': import.meta.env.VITE_NYT_API_KEY,
      },
    });

    // Calculate start and end indices for pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Slice results based on page and limit
    const paginatedResults = response.data.results.slice(startIndex, endIndex);
    
    return {
      articles: paginatedResults,
      totalArticles: response.data.results.length,
      currentPage: page,
      hasMore: endIndex < response.data.results.length
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};