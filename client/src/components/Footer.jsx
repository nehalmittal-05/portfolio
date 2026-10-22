import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  Mail,
  ArrowUp,
  Heart,
  Server,
  Layers,
  Database,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { useTheme } from '../context/ThemeContext';
import { checkApiHealth } from '../services/api';

export const Footer = ({ profile }) => {
  const { isDark } = useTheme();
  const [apiStatus, setApiStatus] = useState({ online: false, mode: 'Checking...' });

  useEffect(() => {
    checkApiHealth().then((res) => {
      if (res.online) {
        setApiStatus({
          online: true,
          mode: res.database?.mode || 'Online',
        });
      } else {
        setApiStatus({
          online: false,
          mode: 'Offline',
        });
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`border-t transition-colors duration-300 py-14 ${
        isDark
          ? 'bg-[#0d100d] border-[#202720] text-[#8a9687]'
          : 'bg-[#eff2ec] border-[#e2e6df] text-[#525f50]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand & Description (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#161a16] border border-[#262f26] flex items-center justify-center text-[#a5c9af] shadow-sm">
                <Code className="w-5 h-5 text-[#a5c9af]" />
              </div>
              <span className={`font-bold text-lg tracking-tight ${isDark ? 'text-[#f4f5f2]' : 'text-[#1c221c]'}`}>
                {profile?.name || 'Nehal Mittal'}
              </span>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed max-w-md">
              Portfolio of Nehal Mittal &bull; B.Tech in Computer Science and Engineering at JK Lakshmipat University, Jaipur. Focus on Software Development, Machine Learning, and AI.
            </p>

            {/* System Status Pill */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${isDark ? 'bg-[#161a16] border-[#262f26]' : 'bg-white border-[#d8ded4]'}`}>
              <span
                className={`w-2 h-2 rounded-full ${
                  apiStatus.online ? 'bg-[#a5c9af] animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span className={`text-[11px] ${isDark ? 'text-[#c6ccc3]' : 'text-[#2c362a]'}`}>
                API Status: {apiStatus.online ? `Online (${apiStatus.mode})` : 'Standby / Client Hybrid'}
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <p className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-[#f4f5f2]' : 'text-[#1c221c]'}`}>
              Quick Links
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-[#a5c9af] transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link to="/skills" className="hover:text-[#a5c9af] transition-colors">
                  Skills &amp; Expertise
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#a5c9af] transition-colors">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link to="/experience" className="hover:text-[#a5c9af] transition-colors">
                  Education &amp; Experience
                </Link>
              </li>
              <li>
                <Link to="/experience" className="hover:text-[#a5c9af] transition-colors">
                  Certifications &amp; Honors
                </Link>
              </li>
              <li>
                <Link to="/experience" className="hover:text-[#a5c9af] transition-colors">
                  Resume Downloads
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#a5c9af] transition-colors">
                  Contact Form
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Social Profiles */}
          <div>
            <p className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-[#f4f5f2]' : 'text-[#1c221c]'}`}>
              Connect With Me
            </p>
            <div className="flex items-center gap-2 mb-4">
              {profile?.github && profile.github.trim() !== '' && profile.github !== '#' && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-xl transition-all btn-tactile ${
                    isDark
                      ? 'bg-[#161a16] hover:bg-[#1f261f] text-[#c6ccc3] hover:text-[#f4f5f2] border border-[#262f26]'
                      : 'bg-white hover:bg-[#e2e6df] text-[#2c362a] border border-[#d8ded4]'
                  }`}
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}

              {profile?.linkedin && profile.linkedin.trim() !== '' && profile.linkedin !== '#' && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-xl transition-all btn-tactile ${
                    isDark
                      ? 'bg-[#161a16] hover:bg-[#1f261f] text-[#c6ccc3] hover:text-[#f4f5f2] border border-[#262f26]'
                      : 'bg-white hover:bg-[#e2e6df] text-[#2c362a] border border-[#d8ded4]'
                  }`}
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}

              {profile?.email && profile.email.trim() !== '' && (
                <a
                  href={`mailto:${profile.email}`}
                  className={`p-2.5 rounded-xl transition-all btn-tactile ${
                    isDark
                      ? 'bg-[#161a16] hover:bg-[#1f261f] text-[#c6ccc3] hover:text-[#f4f5f2] border border-[#262f26]'
                      : 'bg-white hover:bg-[#e2e6df] text-[#2c362a] border border-[#d8ded4]'
                  }`}
                  aria-label="Email Me"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
            <p className="text-[11px] text-[#768273]">
              Open for full-time graduate roles, internships, and collaborative software projects.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${isDark ? 'border-[#202720]' : 'border-[#d8ded4]'}`}>
          <p>
            &copy; {currentYear} <span className={`font-semibold ${isDark ? 'text-[#f4f5f2]' : 'text-[#1c221c]'}`}>{profile?.name || 'Nehal Mittal'}</span> &bull; JK Lakshmipat University.
            All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors cursor-pointer btn-tactile ${
              isDark
                ? 'bg-[#161a16] hover:bg-[#1f261f] text-[#c6ccc3] hover:text-[#f4f5f2] border border-[#262f26]'
                : 'bg-white hover:bg-[#e2e6df] text-[#2c362a] border border-[#d8ded4]'
            }`}
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#a5c9af]" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
