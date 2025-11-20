// API Configuration
// This file centralizes all API endpoint configurations

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  },

  // Master Data endpoints
  SCHOOLS: `${API_BASE_URL}/schools`,
  INSTITUTES: `${API_BASE_URL}/institutes`,
  BRANCHES: `${API_BASE_URL}/branches`,
  STATES: `${API_BASE_URL}/states`,
  CITIES: `${API_BASE_URL}/cities`,
  ZONES: `${API_BASE_URL}/zones`,
  COUNTRIES: `${API_BASE_URL}/countries`,
  DIVISIONS: `${API_BASE_URL}/divisions`,
  CLASSES: `${API_BASE_URL}/classes`,
  BOARDS: `${API_BASE_URL}/boards`,
  CATEGORIES: `${API_BASE_URL}/categories`,
  SUBCATEGORIES: `${API_BASE_URL}/subcategories`,
  EMOTIONS: `${API_BASE_URL}/emotions`,
  IMPACTS: `${API_BASE_URL}/impacts`,
  PLEASANTNESS: `${API_BASE_URL}/pleasantness`,
  ACADEMIC_YEARS: `${API_BASE_URL}/academic-years`,
};

// Default export for base URL
export default API_BASE_URL;
