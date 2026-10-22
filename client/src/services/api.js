import {
  initialProfile,
  initialProjects,
  initialSkills,
  initialTimeline,
  initialCertificates,
} from '../data/portfolio';

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
 * Fetch complete portfolio metadata (projects, skills, timeline, certificates)
 */
export const fetchPortfolioData = async () => {
  try {
    const res = await fetch(`${API_BASE}/portfolio-data`);
    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }
    const json = await res.json();
    if (json.success && json.data) {
      return json.data;
    }
    throw new Error('Invalid response format from portfolio-data endpoint');
  } catch (error) {
    console.warn('Backend API notice: Using client data fallback.', error.message);
    return {
      profile: initialProfile,
      projects: initialProjects,
      skills: initialSkills,
      timeline: initialTimeline,
      certificates: initialCertificates,
      dbStatus: { connected: false, mode: 'Local Client Fallback' },
    };
  }
};

/**
 * Fetch projects by category
 */
export const fetchProjects = async (category = 'All') => {
  try {
    const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    const res = await fetch(`${API_BASE}/projects${query}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data || initialProjects;
  } catch (error) {
    console.warn('Projects API notice:', error.message);
    if (category && category !== 'All') {
      return initialProjects.filter((p) => p.category === category);
    }
    return initialProjects;
  }
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
