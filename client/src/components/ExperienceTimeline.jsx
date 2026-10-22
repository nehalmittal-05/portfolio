import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ExperienceTimeline = ({ timelineItems = [] }) => {
  const { isDark } = useTheme();
  const [filterType, setFilterType] = useState('all');

  const filteredItems = timelineItems.filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  return (
    <section
      id="experience"
      className={`py-24 transition-colors duration-300 relative ${
        isDark ? 'bg-[#111411] text-[#f4f5f2]' : 'bg-[#f8f9f6] text-[#1c221c]'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 bg-[#a5c9af]/10 text-[#a5c9af] border border-[#a5c9af]/25">
            <Clock className="w-3.5 h-3.5" />
            <span>Career & Academic Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Education &{' '}
            <span className="text-[#a5c9af]">
              Experience
            </span>
          </h2>
          <p
            className={`mt-4 text-base sm:text-lg ${
              isDark ? 'text-[#a3aba1]' : 'text-[#525f50]'
            }`}
          >
            Chronological progression of technical roles, internships, and university education.
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-center gap-2 mb-14">
          {[
            { id: 'all', label: 'All Milestones' },
            { id: 'experience', label: 'Work & Internships', icon: Briefcase },
            { id: 'education', label: 'Academic Degrees', icon: GraduationCap },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = filterType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer btn-tactile ${
                  isSelected
                    ? 'bg-[#a5c9af] text-[#111411] shadow-sm font-bold'
                    : isDark
                    ? 'bg-[#161a16] text-[#a3aba1] hover:text-[#f4f5f2] hover:bg-[#1f261f] border border-[#262f26]'
                    : 'bg-white text-[#525f50] hover:text-[#1c221c] border border-[#e2e6df]'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#262f26] space-y-10 ml-4 sm:ml-8">
          {filteredItems.map((item, index) => {
            const isWork = item.type === 'experience';
            return (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline Node Icon centered exactly on the vertical line */}
                <div
                  className="absolute -left-[41px] sm:-left-[49px] top-1.5 w-8 h-8 rounded-full border-2 border-[#a5c9af] bg-[#161a16] text-[#a5c9af] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-md shadow-[#a5c9af]/10"
                >
                  {isWork ? (
                    <Briefcase className="w-4 h-4" />
                  ) : (
                    <GraduationCap className="w-4 h-4" />
                  )}
                </div>

                {/* Timeline Card */}
                <div
                  className={`p-6 sm:p-7 rounded-2xl border transition-all duration-200 hover:-translate-y-1 ${
                    isDark
                      ? 'bg-[#161a16]/90 border-[#262f26] hover:border-[#a5c9af]/40 hover:shadow-lg'
                      : 'bg-white border-[#e2e6df] hover:border-[#a5c9af] hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider w-fit bg-[#a5c9af]/10 text-[#a5c9af] border border-[#a5c9af]/30"
                    >
                      {isWork ? 'Work Experience' : 'Education'}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8a9687]">
                      <Calendar className="w-3.5 h-3.5 text-[#a5c9af]" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight group-hover:text-[#a5c9af] transition-colors">
                    {item.roleOrDegree}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium text-[#8a9687] mt-1 mb-4">
                    <span className={`font-semibold ${isDark ? 'text-[#f4f5f2]' : 'text-[#1c221c]'}`}>
                      {item.organization}
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1 text-[#8a9687]">
                        <MapPin className="w-3 h-3 text-[#768273]" />
                        {item.location}
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                      isDark ? 'text-[#c6ccc3]' : 'text-[#3e483b]'
                    }`}
                  >
                    {item.description}
                  </p>

                  {/* Bullet points */}
                  {item.points && item.points.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#a5c9af] shrink-0 mt-0.5" />
                          <span className={isDark ? 'text-[#c6ccc3]' : 'text-[#2c362a]'}>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Skills tags */}
                  {item.skills && item.skills.length > 0 && (
                    <div className={`flex flex-wrap gap-1.5 pt-3 border-t ${isDark ? 'border-[#262f26]' : 'border-[#eef2ec]'}`}>
                      {item.skills.map((s) => (
                        <span
                          key={s}
                          className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                            isDark
                              ? 'bg-[#1a201a] text-[#c6ccc3] border border-[#262f26]'
                              : 'bg-[#eef2ec] text-[#2c362a] border border-[#d8ded4]'
                          }`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
