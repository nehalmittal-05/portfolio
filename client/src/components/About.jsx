import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  MapPin,
  Mail,
  GraduationCap,
  Briefcase,
  Code2,
  Cpu,
  CheckCircle,
  Copy,
  Check,
  Award,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const About = ({ profile }) => {
  const { isDark } = useTheme();
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const candidateName = profile?.name || 'Nehal Mittal';
  const profileImageUrl = profile?.profileImage || '/images/profile.jpeg';

  const developerJson = `{
  "name": "${profile?.name || 'Nehal Mittal'}",
  "degree": "${profile?.degree || 'B.Tech in Computer Science and Engineering'}",
  "institution": "${profile?.institution || 'JK Lakshmipat University'}",
  "location": "${profile?.location || 'Jaipur, Rajasthan, India'}",
  "focusAreas": [
    "Software Development",
    "Machine Learning & AI",
    "Database Systems & MySQL"
  ],
  "status": "Student (Preparing for SDE Placements)"
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(developerJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="about"
      className={`py-24 transition-colors duration-300 relative ${
        isDark ? 'bg-[#111411] text-[#f4f5f2]' : 'bg-[#f8f9f6] text-[#1c221c]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 bg-[#a5c9af]/10 text-[#a5c9af] border border-[#a5c9af]/25">
            <User className="w-3.5 h-3.5" />
            <span>Profile & Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            About{' '}
            <span className="text-[#a5c9af]">
              Me
            </span>
          </h2>
          <p
            className={`mt-4 text-base sm:text-lg ${
              isDark ? 'text-[#a3aba1]' : 'text-[#525f50]'
            }`}
          >
            Computer Science and Engineering undergraduate at JK Lakshmipat University, Jaipur.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Bento Card 1: Avatar & Identity (1 col) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`md:col-span-1 p-6 rounded-2xl flex flex-col items-center text-center border backdrop-blur-md relative overflow-hidden group ${
              isDark
                ? 'bg-[#161a16]/90 border-[#262f26] hover:border-[#a5c9af]/40 shadow-lg'
                : 'bg-white border-[#e2e6df] hover:border-[#a5c9af] shadow-sm'
            }`}
          >
            {/* Subtle ambient glow backdrop */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#a5c9af]/5 rounded-full blur-2xl group-hover:bg-[#a5c9af]/10 transition-colors pointer-events-none" />

            {/* Real Profile Photo in Refined Portrait Frame */}
            <div className="relative mb-5">
              <div
                className={`w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-2xl p-1 transition-all duration-300 border ${
                  isDark
                    ? 'bg-[#181d18] border-[#2b352b] group-hover:border-[#a5c9af]/50 shadow-lg shadow-black/30'
                    : 'bg-[#edf2ea] border-[#d5ded3] group-hover:border-[#a5c9af] shadow-md shadow-[#a5c9af]/10'
                }`}
              >
                <div
                  className={`w-full h-full rounded-[14px] relative overflow-hidden flex items-center justify-center ${
                    isDark ? 'bg-[#111411]' : 'bg-[#f4f7f2]'
                  }`}
                >
                  {!imageError ? (
                    <img
                      src={profileImageUrl}
                      alt={`${candidateName} — Profile Portrait`}
                      loading="lazy"
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center">
                      <div className="w-12 h-12 rounded-full bg-[#a5c9af]/15 flex items-center justify-center text-[#a5c9af] mb-1 font-mono font-bold text-sm">
                        NM
                      </div>
                      <span className="text-[10px] font-semibold text-[#8a9687] uppercase tracking-wider">
                        {candidateName}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Student status indicator badge */}
              <div
                className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-[#528e67] border-2 border-white dark:border-[#111411] shadow-sm z-10"
                title="Active Student • JK Lakshmipat University"
              />
            </div>

            <h3 className="text-xl font-bold tracking-tight">
              {profile?.name || 'Nehal Mittal'}
            </h3>
            <p className="text-xs font-semibold text-[#a5c9af] mt-0.5">
              B.Tech CSE Student &bull; SDE Aspirant
            </p>

            <div className="mt-4 w-full space-y-2 text-xs">
              <div
                className={`flex items-center gap-2 p-2 rounded-lg ${
                  isDark ? 'bg-[#1a201a] text-[#c6ccc3]' : 'bg-[#eef2ec] text-[#2c362a]'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-[#a5c9af] shrink-0" />
                <span className="truncate">{profile?.location || 'Jaipur, Rajasthan, India'}</span>
              </div>
              <div
                className={`flex items-center gap-2 p-2 rounded-lg ${
                  isDark ? 'bg-[#1a201a] text-[#c6ccc3]' : 'bg-[#eef2ec] text-[#2c362a]'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#a5c9af] shrink-0" />
                <span className="truncate">{profile?.institution || 'JK Lakshmipat University'}</span>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 2: Professional Bio & Story (2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`md:col-span-2 lg:col-span-2 p-7 rounded-2xl border backdrop-blur-md flex flex-col justify-between ${
              isDark
                ? 'bg-[#161a16]/90 border-[#262f26] hover:border-[#a5c9af]/40 shadow-lg'
                : 'bg-white border-[#e2e6df] hover:border-[#a5c9af] shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#a5c9af] uppercase tracking-wider mb-2">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Professional Bio</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-4">
                Aspiring Software Engineer & Machine Learning Enthusiast
              </h3>
              <p
                className={`text-sm sm:text-base leading-relaxed mb-4 ${
                  isDark ? 'text-[#c6ccc3]' : 'text-[#3e483b]'
                }`}
              >
                {profile?.bio ||
                  'I am a Computer Science and Engineering undergraduate at JK Lakshmipat University, Jaipur. Passionate about software development, machine learning, and artificial intelligence, I focus on building robust applications, analyzing data-driven systems, and designing thoughtful software solutions.'}
              </p>
              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isDark ? 'text-[#8a9687]' : 'text-[#62705e]'
                }`}
              >
                {profile?.bioSecondParagraph ||
                  'My academic and project experience spans supervised machine learning classification, relational database design with MySQL, and exploratory deep learning for medical image analysis. I enjoy solving algorithmic problems, writing clean code, and preparing to make an immediate impact on real-world engineering teams.'}
              </p>
            </div>

            {/* Core Competency Tags */}
            <div className={`mt-6 pt-5 border-t ${isDark ? 'border-[#262f26]' : 'border-[#eef2ec]'} flex flex-wrap gap-2`}>
              {[
                'Python & C++',
                'Machine Learning',
                'MySQL & Databases',
                'Software Development',
                'Data Structures & Algorithms',
                'Deep Learning Concepts',
                'Git Version Control',
              ].map((pill) => (
                <span
                  key={pill}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                    isDark
                      ? 'bg-[#1a201a] text-[#c6ccc3] border border-[#262f26]'
                      : 'bg-[#eef2ec] text-[#2c362a] border border-[#d8ded4]'
                  }`}
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Bento Card 3: Metrics & Highlights (1 col) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`md:col-span-3 lg:col-span-1 p-6 rounded-2xl border backdrop-blur-md flex flex-col justify-between ${
              isDark
                ? 'bg-[#161a16]/90 border-[#262f26] hover:border-[#a5c9af]/40 shadow-lg'
                : 'bg-white border-[#e2e6df] hover:border-[#a5c9af] shadow-sm'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-bold text-[#a5c9af] uppercase tracking-wider mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>Academic Snapshot</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {(profile?.stats || [
                { label: 'Degree', value: 'B.Tech CSE' },
                { label: 'University', value: 'JKLU Jaipur' },
                { label: 'Focus Domains', value: 'SDE & ML' },
                { label: 'Key Projects', value: '3 Major' },
              ]).map((stat, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl border ${
                    isDark
                      ? 'bg-[#111411]/90 border-[#262f26]'
                      : 'bg-[#f4f5f2] border-[#e2e6df]'
                  }`}
                >
                  <p className="text-xl sm:text-2xl font-black text-[#a5c9af]">
                    {stat.value}
                  </p>
                  <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-[#8a9687]' : 'text-[#62705e]'}`}>{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bento Card 4: Developer Config / JSON Terminal (2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`md:col-span-2 p-5 rounded-2xl border font-mono text-xs overflow-hidden backdrop-blur-md ${
              isDark
                ? 'bg-[#0d100d] border-[#262f26] text-[#c6ccc3]'
                : 'bg-[#161a16] border-[#262f26] text-[#c6ccc3]'
            }`}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#262f26]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/70 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/70 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/70 inline-block" />
                <span className="text-[11px] text-[#8a9687] ml-2">nehal.profile.json</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1f261f] hover:bg-[#283228] text-[#c6ccc3] hover:text-[#f4f5f2] text-[11px] transition-colors cursor-pointer border border-[#2b352b] btn-tactile"
                title="Copy JSON config"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#a5c9af]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="overflow-x-auto text-[11px] leading-relaxed p-1 text-[#c6ccc3]">
              <code>{developerJson}</code>
            </pre>
          </motion.div>

          {/* Bento Card 5: Engineering Pillars (2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`md:col-span-2 p-6 rounded-2xl border backdrop-blur-md ${
              isDark
                ? 'bg-[#161a16]/90 border-[#262f26] shadow-lg'
                : 'bg-white border-[#e2e6df] shadow-sm'
            }`}
          >
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#a5c9af] mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Core Technical Principles</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {(profile?.corePrinciples || [
                { title: 'Data-Driven Engineering', description: 'Applying machine learning principles to extract insights from structured datasets.' },
                { title: 'Relational Integrity', description: 'Designing normalized schemas and reliable queries with MySQL.' },
                { title: 'Algorithmic Foundations', description: 'Strong grasp of core data structures, algorithms, and complexity analysis.' },
                { title: 'Continuous Learning', description: 'Actively expanding knowledge across modern AI research and software stacks.' },
              ]).map((principle, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#a5c9af] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold">{principle.title}</p>
                    <p className={`text-[11px] ${isDark ? 'text-[#8a9687]' : 'text-[#62705e]'}`}>
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
