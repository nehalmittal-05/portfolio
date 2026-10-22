import React from 'react';
import Contact from '../components/Contact';
import { usePortfolio } from '../context/PortfolioContext';

const ContactPage = () => {
  const { portfolioData } = usePortfolio();
  return <Contact profile={portfolioData.profile} />;
};

export default ContactPage;
