import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Layers, CheckCircle2, Cpu } from 'lucide-react';
import { GithubIcon } from './Icons';
import { useTheme } from '../context/ThemeContext';
import ProjectBanner from './ProjectBanner';

export const ProjectModal = ({ project, onClose }) => {
  const { isDark } = useTheme();

  // Handle Escape key and body scroll lock
  useEffect(() => {
    if (!project) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-sm"
      >
        {/* Backdrop dismiss */}
        <div
          className="fixed inset-0"
          onClick={onClose}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className={`relative max-w-2xl w-full rounded-2xl border p-6 sm:p-8 z-10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col ${
            isDark ? 'bg-[#161a16] border-[#262f26] text-[#f4f5f2]' : 'bg-white border-[#e2e6df] text-[#1c221c]'
          }`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close Modal"
            className={`absolute top-5 right-5 p-2 rounded-xl transition-colors cursor-pointer z-20 btn-tactile ${
              isDark ? 'bg-[#1f261f] text-[#c6ccc3] hover:text-[#f4f5f2] border border-[#2b352b]' : 'bg-[#eef2ec] text-[#2c362a] hover:text-[#1c221c] border border-[#d8ded4]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="mb-4 pr-10">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#a5c9af]/10 text-[#a5c9af] border border-[#a5c9af]/25">
              {project.category}
            </span>
            <h3 id="modal-project-title" className="text-2xl font-bold tracking-tight mt-2.5">
              {project.title}
            </h3>
            <p className={`text-xs sm:text-sm font-medium mt-1 ${isDark ? 'text-[#8a9687]' : 'text-[#62705e]'}`}>
              {project.tagline}
            </p>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto pr-2 space-y-5 text-sm custom-scrollbar">
            {/* Project Banner with fallback */}
            <div className={`rounded-xl overflow-hidden border ${isDark ? 'border-[#262f26]' : 'border-[#e2e6df]'}`}>
              <ProjectBanner project={project} className="h-48 sm:h-56" isModal />
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#a5c9af] mb-2">
                Overview & Architecture
              </h4>
              <p className={`leading-relaxed ${isDark ? 'text-[#c6ccc3]' : 'text-[#3e483b]'}`}>
                {project.description}
              </p>
            </div>

            {/* Key Technical Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#a5c9af] mb-2.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a5c9af]" />
                  <span>Key Implementations</span>
                </h4>
                <ul className="space-y-2">
                  {project.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                      <span className="text-[#a5c9af] font-bold">•</span>
                      <span className={isDark ? 'text-[#c6ccc3]' : 'text-[#2c362a]'}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack Pills */}
            <div>
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-[#8a9687]' : 'text-[#62705e]'}`}>
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                      isDark
                        ? 'bg-[#1a201a] text-[#c6ccc3] border border-[#262f26]'
                        : 'bg-[#eef2ec] text-[#2c362a] border border-[#d8ded4]'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer Buttons */}
          <div className={`mt-6 pt-4 border-t flex flex-wrap items-center justify-end gap-3 ${isDark ? 'border-[#262f26]' : 'border-[#e2e6df]'}`}>
            {/* Only show GitHub button if a valid repository URL is configured */}
            {project.githubUrl && project.githubUrl.trim() !== '' && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors btn-tactile ${
                  isDark
                    ? 'bg-[#1f261f] hover:bg-[#283228] text-[#c6ccc3] hover:text-[#f4f5f2] border border-[#2b352b]'
                    : 'bg-[#eef2ec] hover:bg-[#e2e8df] text-[#2c362a] border border-[#d8ded4]'
                }`}
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Code</span>
              </a>
            )}

            {/* Only show Live Application button if a valid live demo URL is configured */}
            {project.liveUrl && project.liveUrl.trim() !== '' && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#111411] bg-[#a5c9af] hover:bg-[#b8d6c0] shadow-sm btn-tactile"
              >
                <span>Live Application</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
