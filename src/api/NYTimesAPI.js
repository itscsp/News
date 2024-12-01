import axios from 'axios';

const BASE_URL = 'https://api.nytimes.com/svc/topstories/v2/home.json';

export const fetchTopStories = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        'api-key': import.meta.env.VITE_NYT_API_KEY,
      },
    });

    // Limit to 10 posts
    const limitedResults = response.data.results.slice(0, 9);
    return limitedResults;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
