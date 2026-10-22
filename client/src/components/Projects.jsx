import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderGit2,
  ExternalLink,
  Layers,
  Search,
  Sparkles,
  Info,
  ArrowUpRight,
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { useTheme } from '../context/ThemeContext';
import ProjectModal from './ProjectModal';
import ProjectBanner from './ProjectBanner';
import TiltCard from './TiltCard';

export const Projects = ({ projects = [], loading = false }) => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState(null);

  // Dynamically derive categories from projects dataset
  const categories = React.useMemo(() => {
    const cats = new Set(['All']);
    projects.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, [projects]);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' || project.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      (project.tags && project.tags.some((t) => t.toLowerCase().includes(query)));
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="projects"
      className={`py-24 transition-colors duration-300 relative ${
        isDark ? 'bg-[#111411] text-[#f4f5f2]' : 'bg-[#f8f9f6] text-[#1c221c]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 bg-[#a5c9af]/10 text-[#a5c9af] border border-[#a5c9af]/25">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Technical Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Academic &{' '}
            <span className="text-[#a5c9af]">
              ML Projects
            </span>
          </h2>
          <p
            className={`mt-4 text-base sm:text-lg ${
              isDark ? 'text-[#a3aba1]' : 'text-[#525f50]'
            }`}
          >
            Machine learning classification, database management systems, and deep learning research projects.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer btn-tactile ${
                  selectedCategory === cat
                    ? 'bg-[#a5c9af] text-[#111411] shadow-sm font-bold'
                    : isDark
                    ? 'bg-[#161a16] text-[#a3aba1] hover:text-[#f4f5f2] hover:bg-[#1f261f] border border-[#262f26]'
                    : 'bg-white text-[#525f50] hover:text-[#1c221c] border border-[#e2e6df]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#768273] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or tech..."
              className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#a5c9af] focus:border-[#a5c9af] ${
                isDark
                  ? 'bg-[#161a16] border border-[#262f26] text-[#f4f5f2] placeholder-[#768273]'
                  : 'bg-white border border-[#d8ded4] text-[#1c221c] placeholder-[#8a9687]'
              }`}
            />
          </div>
        </div>

        {/* Projects Grid with Restrained 3D TiltCard */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id || project.slug || index}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="h-full"
            >
              <TiltCard className="h-full">
                <div
                  className={`flex flex-col justify-between rounded-2xl border overflow-hidden transition-all duration-300 h-full group ${
                    isDark
                      ? 'bg-[#161a16]/90 border-[#262f26] hover:border-[#a5c9af]/40'
                      : 'bg-white border-[#e2e6df] hover:border-[#a5c9af] shadow-sm'
                  }`}
                >
                  {/* Image Thumbnail with Overlay */}
                  <div className="relative overflow-hidden">
                    <ProjectBanner project={project} className="h-48" />

                    {/* Category & Featured Pills */}
                    <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-[#a5c9af] border border-[#a5c9af]/30">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#2a3c2e] backdrop-blur-md text-[#d5e7d8] border border-[#a5c9af]/30">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg sm:text-xl tracking-tight group-hover:text-[#a5c9af] transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      <p className={`text-xs font-medium mt-1 line-clamp-1 ${isDark ? 'text-[#8a9687]' : 'text-[#62705e]'}`}>
                        {project.tagline}
                      </p>
                      <p
                        className={`text-xs sm:text-sm mt-3 line-clamp-3 leading-relaxed ${
                          isDark ? 'text-[#c6ccc3]' : 'text-[#3e483b]'
                        }`}
                      >
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className={`mt-5 pt-4 border-t ${isDark ? 'border-[#262f26]' : 'border-[#eef2ec]'}`}>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tags?.slice(0, 5).map((tag) => (
                          <span
                            key={tag}
                            className={`text-[11px] px-2.5 py-0.5 rounded font-medium ${
                              isDark
                                ? 'bg-[#1a201a] text-[#c6ccc3] border border-[#262f26]'
                                : 'bg-[#eef2ec] text-[#2c362a] border border-[#d8ded4]'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags?.length > 5 && (
                          <span className="text-[11px] px-1.5 py-0.5 text-[#8a9687]">
                            +{project.tags.length - 5}
                          </span>
                        )}
                      </div>

                      {/* Actions: GitHub, Live Demo, Details */}
                      <div className="flex items-center justify-between gap-2">
                        <button
                          onClick={() => setActiveModalProject(project)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer btn-tactile ${
                            isDark
                              ? 'bg-[#1f261f] hover:bg-[#283228] text-[#c6ccc3] hover:text-[#f4f5f2] border border-[#2b352b]'
                              : 'bg-[#eef2ec] hover:bg-[#e2e8df] text-[#2c362a] border border-[#d8ded4]'
                          }`}
                        >
                          <Info className="w-3.5 h-3.5 text-[#a5c9af]" />
                          <span>Details</span>
                        </button>

                        <div className="flex items-center gap-2">
                          {/* Only show GitHub button if a valid repository link is provided */}
                          {project.githubUrl && project.githubUrl.trim() !== '' && project.githubUrl !== '#' && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`p-2 rounded-lg transition-colors cursor-pointer btn-tactile ${
                                isDark
                                  ? 'bg-[#1f261f] hover:bg-[#283228] text-[#c6ccc3] hover:text-[#f4f5f2] border border-[#2b352b]'
                                  : 'bg-[#eef2ec] hover:bg-[#e2e8df] text-[#2c362a] border border-[#d8ded4]'
                              }`}
                              title="View GitHub Repository"
                            >
                              <GithubIcon className="w-4 h-4" />
                            </a>
                          )}

                          {/* Only show Demo button if a valid live demo URL is provided */}
                          {project.liveUrl && project.liveUrl.trim() !== '' && project.liveUrl !== '#' && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#111411] bg-[#a5c9af] hover:bg-[#b8d6c0] shadow-sm cursor-pointer btn-tactile"
                              title="View Live Demo"
                            >
                              <span>Demo</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className={`text-sm ${isDark ? 'text-[#8a9687]' : 'text-[#62705e]'}`}>
              {loading
                ? 'Loading projects from database...'
                : searchQuery || selectedCategory !== 'All'
                ? 'No projects found matching your criteria.'
                : 'No projects available from database.'}
            </p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
