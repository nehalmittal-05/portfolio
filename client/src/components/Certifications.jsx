import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  Trophy,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Certifications = ({ certificates = [], loading = false }) => {
  const { isDark } = useTheme();
  const [filter, setFilter] = useState('all');

  const filteredCerts = certificates.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <section
      id="certifications"
      className={`py-24 transition-colors duration-300 relative ${
        isDark ? 'bg-[#111411] text-[#f4f5f2]' : 'bg-[#f8f9f6] text-[#1c221c]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 bg-[#a5c9af]/10 text-[#a5c9af] border border-[#a5c9af]/25">
            <Trophy className="w-3.5 h-3.5" />
            <span>Honors & Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Certifications &{' '}
            <span className="text-[#a5c9af]">
              Achievements
            </span>
          </h2>
          <p
            className={`mt-4 text-base sm:text-lg ${
              isDark ? 'text-[#a3aba1]' : 'text-[#525f50]'
            }`}
          >
            Verified technical specializations, hackathon distinctions, and competitive milestones.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All Honors' },
            { id: 'certification', label: 'Certifications', icon: Award },
            { id: 'achievement', label: 'Achievements & Hackathons', icon: Trophy },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
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

        {/* Bento Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCerts.map((cert, index) => {
            const isCert = cert.type === 'certification';
            return (
              <motion.div
                key={cert._id || index}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden ${
                  isDark
                    ? 'bg-[#161a16]/90 border-[#262f26] hover:border-[#a5c9af]/40 hover:shadow-lg'
                    : 'bg-white border-[#e2e6df] hover:border-[#a5c9af] hover:shadow-md'
                }`}
              >
                {/* Glow accent */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-[#a5c9af]/5 rounded-full blur-xl group-hover:bg-[#a5c9af]/10 transition-colors pointer-events-none" />

                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#a5c9af]/10 text-[#a5c9af] border border-[#a5c9af]/30"
                    >
                      {isCert ? <Award className="w-3 h-3" /> : <Trophy className="w-3 h-3" />}
                      <span>{isCert ? 'Certification' : 'Achievement'}</span>
                    </span>

                    <span className="flex items-center gap-1 text-[11px] font-medium text-[#8a9687]">
                      <Calendar className="w-3 h-3 text-[#768273]" />
                      {cert.date}
                    </span>
                  </div>

                  {/* Title & Issuer */}
                  <h3 className="font-bold text-lg tracking-tight group-hover:text-[#a5c9af] transition-colors">
                    {cert.title}
                  </h3>

                  <p className={`text-xs font-semibold mt-1 mb-3 ${isDark ? 'text-[#8a9687]' : 'text-[#62705e]'}`}>
                    {cert.issuer}
                  </p>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                      isDark ? 'text-[#c6ccc3]' : 'text-[#3e483b]'
                    }`}
                  >
                    {cert.description}
                  </p>
                </div>

                {/* Footer Credential details */}
                <div className={`pt-4 border-t ${isDark ? 'border-[#262f26]' : 'border-[#eef2ec]'}`}>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-[#8a9687] truncate max-w-[60%]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#a5c9af] shrink-0" />
                      <span className="truncate font-mono text-[11px]">{cert.credentialId}</span>
                    </div>

                    {/* Only show Verify link if a valid credential URL is supplied */}
                    {cert.credentialUrl && cert.credentialUrl.trim() !== '' && cert.credentialUrl !== '#' ? (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-xs text-[#a5c9af] hover:text-[#c7e0ce] hover:underline"
                      >
                        <span>Verify</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-[11px] font-mono text-[#8a9687]">Verified</span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredCerts.length === 0 && (
          <div className="text-center py-16">
            <p className={`text-sm ${isDark ? 'text-[#8a9687]' : 'text-[#62705e]'}`}>
              {loading ? 'Loading credentials from database...' : 'No credentials available from database.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
