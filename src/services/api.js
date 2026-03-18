import axios from 'axios';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// We can create an axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

export const mealService = {
  // Search meals by name (e.g., Arrabiata)
  searchMeals: async (query) => {
    try {
      const response = await api.get(`/search.php?s=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching meals:', error);
      throw error;
    }
  },

  // Get single random meal
  getRandomMeal: async () => {
    try {
      const response = await api.get('/random.php');
      return response.data;
    } catch (error) {
      console.error('Error fetching random meal:', error);
      throw error;
    }
  },

  // List all meal categories
  getCategories: async () => {
    try {
      const response = await api.get('/categories.php');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Lookup full meal details by id
  getMealById: async (id) => {
    try {
      const response = await api.get(`/lookup.php?i=${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching meal details:', error);
      throw error;
    }
  },

  // Filter by category
  getMealsByCategory: async (category) => {
    try {
      const response = await api.get(`/filter.php?c=${category}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching meals by category:', error);
      throw error;
    }
  }
};
