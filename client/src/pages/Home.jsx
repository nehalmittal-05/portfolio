import React from 'react';
import Hero from '../components/Hero';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * Home page — shows the Hero section only.
 * All other sections live on their own routes.
 */
const Home = () => {
  const { portfolioData } = usePortfolio();
  const { profile } = portfolioData;

  return <Hero profile={profile} />;
};

export default Home;
