import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Mail,
  Sparkles,
  Terminal,
  Database,
  Server,
  Layers,
  Cpu,
  ChevronDown,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { useTheme } from '../context/ThemeContext';

export const Hero = ({ profile }) => {
  const { isDark } = useTheme();

  const typewriterRoles = profile?.typewriterRoles || [
    'Software Developer',
    'Machine Learning Enthusiast',
    'CSE Student',
    'AI Enthusiast',
  ];

  // Typewriter effect logic
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(110);

  useEffect(() => {
    const fullText = typewriterRoles[roleIndex % typewriterRoles.length];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          // Pause at end of word
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        // Deleting
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => prev + 1);
        }
      }
    }, isDeleting ? 50 : typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, typewriterRoles, typingSpeed]);

  const handleScrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden ${
        isDark ? 'bg-[#111411] bg-fine-grid-dark text-[#f4f5f2]' : 'bg-[#f8f9f6] bg-fine-grid-light text-[#182018]'
      }`}
    >
      {/* Anchor for backward compatibility with #hero */}
      <span id="hero" className="sr-only" />
      {/* Soft, restrained ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-[#a5c9af]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center text-center z-10">
        {/* Availability Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-6 backdrop-blur-md shadow-sm ${
            isDark
              ? 'bg-[#181d18] text-[#a5c9af] border border-[#a5c9af]/30'
              : 'bg-[#edf2ea] text-[#3e6149] border border-[#3e6149]/25'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a5c9af] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a5c9af]"></span>
          </span>
          <span className="font-mono text-xs">
            {profile?.statusBadge || 'B.Tech CSE Student • JK Lakshmipat University • Available for SDE Opportunities'}
          </span>
        </motion.div>

        {/* Name & Headline Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4 max-w-4xl"
        >
          <p className={`text-sm sm:text-base font-semibold tracking-wider uppercase font-mono ${isDark ? 'text-[#a5c9af]' : 'text-[#3e6149]'}`}>
            Hi, I'm <span className="font-bold underline decoration-[#a5c9af]/50 underline-offset-4">{profile?.name || 'Nehal Mittal'}</span>
          </p>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            Building intelligent solutions{' '}
            <span className={`${isDark ? 'text-[#a5c9af]' : 'text-[#3e6149]'}`}>
              through code.
            </span>
          </h1>

          {/* Animated Typewriter Subtitle */}
          <div className="h-12 sm:h-16 flex items-center justify-center">
            <h2 className={`text-xl sm:text-2xl lg:text-3xl font-semibold flex items-center ${isDark ? 'text-[#d8ded6]' : 'text-[#2a342a]'}`}>
              <span>Passionate </span>
              <span className={`ml-2 font-mono border-b-2 pb-0.5 ${isDark ? 'text-[#a5c9af] border-[#a5c9af]/50' : 'text-[#3e6149] border-[#3e6149]/50'}`}>
                {currentText}
              </span>
              <span className={`animate-pulse ml-1 font-bold ${isDark ? 'text-[#a5c9af]' : 'text-[#3e6149]'}`}>|</span>
            </h2>
          </div>

          {/* Brief Bio Tagline */}
          <p
            className={`max-w-2xl mx-auto text-base sm:text-lg leading-relaxed ${
              isDark ? 'text-[#a2a8a0]' : 'text-[#525a52]'
            }`}
          >
            {profile?.tagline ||
              'B.Tech Computer Science and Engineering student at JK Lakshmipat University preparing for software engineering placements with an active interest in software development, machine learning, and AI.'}
          </p>
        </motion.div>

        {/* Two Required CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8 sm:mt-10"
        >
          {/* CTA 1: View Projects */}
          <button
            onClick={() => handleScrollTo('#projects')}
            className={`group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold btn-tactile cursor-pointer shadow-sm ${
              isDark
                ? 'bg-[#a5c9af] text-[#111411] hover:bg-[#b8d6bf] shadow-[#a5c9af]/15'
                : 'bg-[#3e6149] text-white hover:bg-[#34523e]'
            }`}
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* CTA 2: Get in Touch */}
          <button
            onClick={() => handleScrollTo('#contact')}
            className={`inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold btn-tactile cursor-pointer ${
              isDark
                ? 'bg-[#181d18] hover:bg-[#202720] text-[#f4f5f2] border border-[#283228] shadow-sm'
                : 'bg-white hover:bg-[#f0f3ee] text-[#182018] border border-[#d6ddd3] shadow-sm'
            }`}
          >
            <Mail className={`w-4 h-4 ${isDark ? 'text-[#a5c9af]' : 'text-[#3e6149]'}`} />
            <span>Get in Touch</span>
          </button>
        </motion.div>

        {/* Social Links Bar (Only renders non-empty links) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center gap-4 mt-8"
        >
          {profile?.github && profile.github.trim() !== '' && profile.github !== '#' && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className={`p-3 rounded-xl transition-all duration-200 btn-tactile ${
                isDark
                  ? 'bg-[#181d18] hover:bg-[#202720] text-[#a2a8a0] hover:text-[#a5c9af] border border-[#262f26]'
                  : 'bg-white hover:bg-[#f0f3ee] text-[#525a52] hover:text-[#3e6149] border border-[#d6ddd3]'
              }`}
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          )}

          {profile?.linkedin && profile.linkedin.trim() !== '' && profile.linkedin !== '#' && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className={`p-3 rounded-xl transition-all duration-200 btn-tactile ${
                isDark
                  ? 'bg-[#181d18] hover:bg-[#202720] text-[#a2a8a0] hover:text-[#a5c9af] border border-[#262f26]'
                  : 'bg-white hover:bg-[#f0f3ee] text-[#525a52] hover:text-[#3e6149] border border-[#d6ddd3]'
              }`}
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          )}

          {profile?.email && profile.email.trim() !== '' && (
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email Me"
              className={`p-3 rounded-xl transition-all duration-200 btn-tactile ${
                isDark
                  ? 'bg-[#181d18] hover:bg-[#202720] text-[#a2a8a0] hover:text-[#a5c9af] border border-[#262f26]'
                  : 'bg-white hover:bg-[#f0f3ee] text-[#525a52] hover:text-[#3e6149] border border-[#d6ddd3]'
              }`}
            >
              <Mail className="w-5 h-5" />
            </a>
          )}
        </motion.div>

        {/* Core Domains & Placement Focus Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className={`mt-14 p-4 rounded-2xl max-w-3xl w-full border backdrop-blur-md ${
            isDark
              ? 'bg-[#161a16]/90 border-[#262f26] shadow-xl shadow-black/20'
              : 'bg-white/90 border-[#e2e6df] shadow-sm'
          }`}
        >
          <div className={`text-xs uppercase font-mono tracking-wider font-semibold mb-3 ${isDark ? 'text-[#8e958d]' : 'text-[#5a625a]'}`}>
            Core Placement & Technical Focus Areas
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(profile?.focusAreas || [
              { title: 'Machine Learning', subtitle: 'Python & Scikit-Learn', iconName: 'Terminal' },
              { title: 'Databases & SQL', subtitle: 'MySQL & Schemas', iconName: 'Database' },
              { title: 'AI & Deep Learning', subtitle: 'Computer Vision & CNNs', iconName: 'Cpu' },
              { title: 'Software Dev', subtitle: 'DSA & Web Systems', iconName: 'Layers' },
            ]).map((area, idx) => {
              const renderIcon = () => {
                switch (area.iconName) {
                  case 'Database': return <Database className="w-4 h-4" />;
                  case 'Cpu': return <Cpu className="w-4 h-4" />;
                  case 'Layers': return <Layers className="w-4 h-4" />;
                  default: return <Terminal className="w-4 h-4" />;
                }
              };

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border ${
                    isDark ? 'bg-[#1a201a]/70 border-[#283228]' : 'bg-[#f4f7f2] border-[#e0e6dd]'
                  }`}
                >
                  <span
                    className={`p-2 rounded-lg ${
                      isDark ? 'bg-[#a5c9af]/10 text-[#a5c9af]' : 'bg-[#4d7058]/10 text-[#3e6149]'
                    }`}
                  >
                    {renderIcon()}
                  </span>
                  <div className="text-left">
                    <p className={`text-xs font-bold ${isDark ? 'text-[#f4f5f2]' : 'text-[#182018]'}`}>
                      {area.title}
                    </p>
                    <p className={`text-[10px] font-mono ${isDark ? 'text-[#8e958d]' : 'text-[#5a625a]'}`}>
                      {area.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className={`mt-12 cursor-pointer transition-colors ${isDark ? 'text-[#8e958d] hover:text-[#a5c9af]' : 'text-[#5a625a] hover:text-[#3e6149]'}`}
          onClick={() => handleScrollTo('#about')}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
