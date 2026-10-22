import React from 'react';
import Skills from '../components/Skills';
import { usePortfolio } from '../context/PortfolioContext';

const SkillsPage = () => {
  const { portfolioData, loading } = usePortfolio();
  return <Skills skillsData={portfolioData.skills} loading={loading} />;
};

export default SkillsPage;
