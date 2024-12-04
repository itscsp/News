import axios from 'axios';
import { NewsAPIRoot } from '../utils/helpers';

export const fetchArticlesByTopic = async (category) => {
  const url = `${NewsAPIRoot}/top-headlines?country=us&sortBy=publishedAt&category=${category}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error; 
  }
};
