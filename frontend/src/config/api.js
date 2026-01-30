// API Configuration - Easy switch between localhost and production
const API_CONFIG = {
  // Change this to switch between local and production
  USE_LOCALHOST: false, // Set to true for local development, false for production
  
  LOCALHOST_URL: 'http://localhost:5000',
  PRODUCTION_URL: 'https://mern-user-app-ir5o.onrender.com'
};

// Export the active API URL
export const API_URL = API_CONFIG.USE_LOCALHOST 
  ? API_CONFIG.LOCALHOST_URL 
  : API_CONFIG.PRODUCTION_URL;

export default API_CONFIG;
