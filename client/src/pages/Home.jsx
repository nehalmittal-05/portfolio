import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import ExperienceTimeline from '../components/ExperienceTimeline';
import Certifications from '../components/Certifications';
import ResumeSection from '../components/ResumeSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Spotlight from '../components/Spotlight';
import CustomCursor from '../components/CustomCursor';

export const Home = ({ data, loading }) => {
  const { profile, projects, skills, timeline, certificates } = data;

  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#a5c9af]/30 selection:text-[#f4f5f2]">
      {/* Interactive mouse-following ambient spotlight */}
      <Spotlight />

      {/* Subtle responsive custom cursor (desktop only, disabled on touch & text inputs) */}
      <CustomCursor />

      {/* 1. Navbar */}
      <Navbar profileName={profile?.name} />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        {/* 2. Hero Section */}
        <Hero profile={profile} />

        {/* 3. About Me Section */}
        <About profile={profile} />

        {/* 4. Skills Section */}
        <Skills skillsData={skills} />

        {/* 5. Projects Section */}
        <Projects projects={projects} />

        {/* 6. Education and Experience Timeline */}
        <ExperienceTimeline timelineItems={timeline} />

        {/* 7. Certifications & Achievements Section */}
        <Certifications certificates={certificates} />

        {/* 8. Resume Section */}
        <ResumeSection profile={profile} />

        {/* 9. Contact Section */}
        <Contact profile={profile} />
      </main>

      {/* 10. Footer Section */}
      <Footer profile={profile} />
    </div>
  );
};

export default Home;
