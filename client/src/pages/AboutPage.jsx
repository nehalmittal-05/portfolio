import React from 'react';
import About from '../components/About';
import { usePortfolio } from '../context/PortfolioContext';

const AboutPage = () => {
  const { portfolioData } = usePortfolio();
  return <About profile={portfolioData.profile} />;
};

export default AboutPage;
