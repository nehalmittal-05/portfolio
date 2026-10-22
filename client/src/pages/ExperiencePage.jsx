import React from 'react';
import ExperienceTimeline from '../components/ExperienceTimeline';
import Certifications from '../components/Certifications';
import ResumeSection from '../components/ResumeSection';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * Experience page — shows the Education/Experience timeline,
 * Certifications & Achievements, and the Resume download section.
 */
const ExperiencePage = () => {
  const { portfolioData, loading } = usePortfolio();
  const { profile, timeline, certificates } = portfolioData;

  return (
    <>
      <ExperienceTimeline timelineItems={timeline} loading={loading} />
      <Certifications certificates={certificates} loading={loading} />
      <ResumeSection profile={profile} />
    </>
  );
};

export default ExperiencePage;
