import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Server,
  Database,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const CATEGORIES = [
  'All',
  'Programming Languages',
  'Databases',
  'Backend',
  'Frontend',
  'Tools & Technologies',
];

export const Skills = ({ skillsData, loading = false }) => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Flatten or filter skills
  const allSkills = React.useMemo(() => {
    if (!skillsData) return [];
    if (Array.isArray(skillsData)) return skillsData;

    // Grouped object
    const list = [];
    Object.keys(skillsData).forEach((cat) => {
      if (Array.isArray(skillsData[cat])) {
        skillsData[cat].forEach((skill) => {
          list.push({ ...skill, category: cat });
        });
      }
    });
    return list;
  }, [skillsData]);

  const filteredSkills = React.useMemo(() => {
    if (selectedCategory === 'All') return allSkills;
    return allSkills.filter((s) => s.category === selectedCategory);
  }, [allSkills, selectedCategory]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Programming Languages':
        return <Code className="w-4 h-4 text-[#a5c9af]" />;
      case 'Databases':
        return <Database className="w-4 h-4 text-[#90bfa3]" />;
      case 'Backend':
        return <Server className="w-4 h-4 text-[#a5c9af]" />;
      case 'Frontend':
        return <Layers className="w-4 h-4 text-[#b2cdb8]" />;
      case 'Tools & Technologies':
        return <Terminal className="w-4 h-4 text-[#90bfa3]" />;
      default:
        return <Cpu className="w-4 h-4 text-[#a5c9af]" />;
    }
  };

  return (
    <section
      id="skills"
      className={`py-24 transition-colors duration-300 relative ${
        isDark ? 'bg-[#111411] text-[#f4f5f2]' : 'bg-[#f8f9f6] text-[#1c221c]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 bg-[#a5c9af]/10 text-[#a5c9af] border border-[#a5c9af]/25">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Skills &{' '}
            <span className="text-[#a5c9af]">
              Proficiencies
            </span>
          </h2>
          <p
            className={`mt-4 text-base sm:text-lg ${
              isDark ? 'text-[#a3aba1]' : 'text-[#525f50]'
            }`}
          >
            Core technical skills across programming languages, databases, machine learning, and software development.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer btn-tactile ${
                  isSelected
                    ? 'bg-[#a5c9af] text-[#111411] shadow-sm font-bold scale-102'
                    : isDark
                    ? 'bg-[#161a16] text-[#a3aba1] hover:text-[#f4f5f2] hover:bg-[#1f261f] border border-[#262f26]'
                    : 'bg-white text-[#525f50] hover:text-[#1c221c] border border-[#e2e6df] shadow-sm'
                }`}
              >
                {cat !== 'All' && getCategoryIcon(cat)}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filteredSkills.map((skill, index) => {
            const proficiency = skill.proficiency || 80;
            return (
              <motion.div
                key={skill.name + index}
                layout
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, delay: (index % 6) * 0.05 }}
                className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden ${
                  isDark
                    ? 'bg-[#161a16]/90 border-[#262f26] hover:border-[#a5c9af]/40 hover:shadow-lg'
                    : 'bg-white border-[#e2e6df] hover:border-[#a5c9af] hover:shadow-md'
                }`}
              >
                {/* Subtle Glow Accent */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-[#a5c9af]/5 rounded-full blur-xl group-hover:bg-[#a5c9af]/10 transition-colors pointer-events-none" />

                <div className="flex items-center justify-between mb-3 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-[#1a201a] text-[#a5c9af] border border-[#262f26] group-hover:scale-105 transition-transform">
                      {getCategoryIcon(skill.category)}
                    </div>
                    <div>
                      <h3 className="font-bold text-base tracking-tight group-hover:text-[#a5c9af] transition-colors">
                        {skill.name}
                      </h3>
                      <p className={`text-[11px] font-medium ${isDark ? 'text-[#8a9687]' : 'text-[#62705e]'}`}>
                        {skill.category}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                      isDark
                        ? 'bg-[#a5c9af]/10 text-[#a5c9af] border border-[#a5c9af]/30'
                        : 'bg-[#eef2ec] text-[#2c362a] border border-[#d8ded4]'
                    }`}
                  >
                    {skill.levelLabel || (proficiency >= 85 ? 'Proficient' : 'Intermediate')}
                  </span>
                </div>

                {/* Animated Progress Bar */}
                <div className="mt-4 relative z-10">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className={`text-[11px] font-medium ${isDark ? 'text-[#8a9687]' : 'text-[#62705e]'}`}>Working Knowledge</span>
                    <span className="font-mono text-xs font-bold text-[#a5c9af]">{proficiency}%</span>
                  </div>
                  <div
                    className={`w-full h-2 rounded-full overflow-hidden ${
                      isDark ? 'bg-[#1a201a]' : 'bg-[#e2e6df]'
                    }`}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${proficiency}%` }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.9, delay: 0.1 + (index % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-gradient-to-r from-[#4f7058] via-[#759e7f] to-[#a5c9af] rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-16">
            <p className={`text-sm ${isDark ? 'text-[#8a9687]' : 'text-[#62705e]'}`}>
              {loading ? 'Loading technical skills from database...' : 'No skills available from database.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
