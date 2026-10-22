/**
 * Configure API Base URL from VITE_API_URL environment variable.
 * Fallbacks to '/api' for Vite dev proxy or relative pathing in production.
 */
const rawEnvUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.trim() : '';

export const API_BASE = (() => {
  if (!rawEnvUrl) return '/api';
  // If user provided e.g. "http://localhost:5000/api" or "http://localhost:5000"
  if (rawEnvUrl.endsWith('/api')) return rawEnvUrl;
  return `${rawEnvUrl.replace(/\/$/, '')}/api`;
})();

/**
 * Fetch complete portfolio metadata from backend / MongoDB
 */
export const fetchPortfolioData = async () => {
  const res = await fetch(`${API_BASE}/portfolio-data`);
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || `Server returned HTTP ${res.status}`);
  }
  const json = await res.json();
  if (json.success && json.data) {
    return json.data;
  }
  throw new Error(json.message || 'Invalid response format from portfolio-data endpoint');
};

/**
 * Fetch projects by category from backend / MongoDB
 */
export const fetchProjects = async (category = 'All') => {
  const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
  const res = await fetch(`${API_BASE}/projects${query}`);
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || `HTTP ${res.status}`);
  }
  const json = await res.json();
  return json.data || [];
};

/**
 * Submit contact inquiry to real Express/MongoDB API (POST /api/contact)
 */
export const sendContactMessage = async (formData) => {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        status: res.status,
        message: json.message || `Request failed with HTTP status ${res.status}`,
        errors: json.errors || {},
      };
    }

    return {
      success: true,
      status: res.status,
      message: json.message || 'Message sent successfully!',
      data: json.data || null,
      notice: json.notice || null,
    };
  } catch (error) {
    console.error('Network / contact error:', error);
    return {
      success: false,
      status: 0,
      message: `Network error: Unable to connect to backend server at ${API_BASE}. Please verify the API server is running and reachable.`,
      errors: {},
    };
  }
};

/**
 * Health check for backend connectivity
 */
export const checkApiHealth = async () => {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) return { online: false, status: res.status };
    const data = await res.json();
    return { online: true, ...data };
  } catch (err) {
    return { online: false, error: err.message };
  }
};
