import axios from 'axios';

export const fetchArticlesByTopic = async (category) => {
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error; 
  }
};
