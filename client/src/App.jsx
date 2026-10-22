import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { fetchPortfolioData } from './services/api';
import { personalInfo } from './data/portfolio';

export function App() {
  const [portfolioData, setPortfolioData] = useState({
    profile: personalInfo,
    projects: [],
    skills: {},
    timeline: [],
    certificates: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchPortfolioData()
      .then((data) => {
        if (isMounted && data) {
          setPortfolioData({
            profile: data.profile || personalInfo,
            projects: Array.isArray(data.projects) ? data.projects : [],
            skills: data.skills || {},
            timeline: Array.isArray(data.timeline) ? data.timeline : [],
            certificates: Array.isArray(data.certificates) ? data.certificates : [],
            dbStatus: data.dbStatus || null,
          });
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn('Portfolio data fetch note:', err.message);
          setError(err.message || 'Unable to connect to database or backend server.');
          setPortfolioData((prev) => ({
            profile: prev.profile,
            projects: [],
            skills: {},
            timeline: [],
            certificates: [],
            dbStatus: { connected: false },
          }));
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home data={portfolioData} loading={loading} error={error} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
