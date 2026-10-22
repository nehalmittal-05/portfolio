import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchPortfolioData } from '../services/api';
import { personalInfo } from '../data/portfolio';

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState({
    profile: personalInfo,
    projects: [],
    skills: {},
    timeline: [],
    certificates: [],
    dbStatus: null,
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
            ...prev,
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
    <PortfolioContext.Provider value={{ portfolioData, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
};

export default PortfolioContext;
