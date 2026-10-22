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

export const Home = ({ data, loading, error }) => {
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
        {/* Database / Backend Connection Notice (shown only when backend/MongoDB is unavailable) */}
        {error && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-2">
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-200 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                <span>
                  <strong>Database Notice:</strong> {error}
                </span>
              </div>
              <span className="hidden sm:inline-block text-[11px] font-mono text-amber-300/80 uppercase tracking-wider bg-amber-500/20 px-2 py-0.5 rounded">
                Live Data Only
              </span>
            </div>
          </div>
        )}

        {/* 2. Hero Section */}
        <Hero profile={profile} />

        {/* 3. About Me Section */}
        <About profile={profile} />

        {/* 4. Skills Section */}
        <Skills skillsData={skills} loading={loading} />

        {/* 5. Projects Section */}
        <Projects projects={projects} loading={loading} />

        {/* 6. Education and Experience Timeline */}
        <ExperienceTimeline timelineItems={timeline} loading={loading} />

        {/* 7. Certifications & Achievements Section */}
        <Certifications certificates={certificates} loading={loading} />

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
