import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { fetchPortfolioData } from './services/api';
import {
  initialProfile,
  initialProjects,
  initialSkills,
  initialTimeline,
  initialCertificates,
} from './data/portfolio';

export function App() {
  const [portfolioData, setPortfolioData] = useState({
    profile: initialProfile,
    projects: initialProjects,
    skills: initialSkills,
    timeline: initialTimeline,
    certificates: initialCertificates,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchPortfolioData()
      .then((data) => {
        if (isMounted && data) {
          setPortfolioData((prev) => ({
            profile: data.profile || prev.profile,
            projects: data.projects || prev.projects,
            skills: data.skills || prev.skills,
            timeline: data.timeline || prev.timeline,
            certificates: data.certificates || prev.certificates,
          }));
        }
      })
      .catch((err) => {
        console.warn('Portfolio data fetch note:', err.message);
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
          <Route path="/" element={<Home data={portfolioData} loading={loading} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
