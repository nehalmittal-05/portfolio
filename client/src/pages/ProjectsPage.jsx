import React from 'react';
import Projects from '../components/Projects';
import { usePortfolio } from '../context/PortfolioContext';

const ProjectsPage = () => {
  const { portfolioData, loading } = usePortfolio();
  return <Projects projects={portfolioData.projects} loading={loading} />;
};

export default ProjectsPage;
