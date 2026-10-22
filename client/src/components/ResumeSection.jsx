import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Download,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Copy,
  Check,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { API_BASE } from '../services/api';

export const ResumeSection = ({ profile }) => {
  const { isDark } = useTheme();
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadingFormat, setDownloadingFormat] = useState(null); // 'pdf' | 'docx' | null
  const [downloadStatus, setDownloadStatus] = useState(null); // { type: 'success' | 'error', message: string }

  // Serve file through real backend route: GET /api/resume/pdf or GET /api/resume/docx
  const handleDownload = async (format) => {
    const lowerFormat = format.toLowerCase();
    setDownloadingFormat(lowerFormat);
    setDownloadStatus(null);

    try {
      const endpoint = `${API_BASE}/resume/${lowerFormat}`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        let errorMessage = `Server returned HTTP ${response.status}`;
        try {
          const errData = await response.json();
          if (errData && errData.message) {
            errorMessage = errData.message;
            if (errData.instructions) {
              errorMessage += ` ${errData.instructions}`;
            }
          }
        } catch (_) {
          // If response was not JSON, retain default error message
        }
        throw new Error(errorMessage);
      }

      // Read binary file blob from backend
      const blob = await response.blob();

      // Extract filename from Content-Disposition header if provided by server
      const disposition = response.headers.get('Content-Disposition');
      let filename = `Resume_Nehal-Mittal.${lowerFormat}`;
      if (disposition && disposition.includes('filename=')) {
        const matches = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (matches && matches[1]) {
          filename = matches[1].replace(/['"]/g, '').trim();
        }
      }

      // Trigger actual native browser download
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      setDownloadStatus({
        type: 'success',
        message: `Successfully initiated download for ${filename} from backend.`,
      });
      setTimeout(() => setDownloadStatus(null), 6000);
    } catch (err) {
      console.error(`Resume download error (${lowerFormat}):`, err);
      setDownloadStatus({
        type: 'error',
        message: err.message || `Failed to download ${lowerFormat.toUpperCase()} resume from backend.`,
      });
    } finally {
      setDownloadingFormat(null);
    }
  };

  const handleCopyLink = () => {
    const directUrl = `${window.location.origin}/api/resume/pdf`;
    navigator.clipboard.writeText(directUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section
      id="resume"
      className={`py-24 transition-colors duration-300 relative ${
        isDark ? 'bg-[#111411] text-[#f4f5f2]' : 'bg-[#f8f9f6] text-[#1c221c]'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 bg-[#a5c9af]/10 text-[#a5c9af] border border-[#a5c9af]/25">
            <FileText className="w-3.5 h-3.5" />
            <span>Curriculum Vitae</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Developer{' '}
            <span className="text-[#a5c9af]">
              Resume
            </span>
          </h2>
          <p
            className={`mt-4 text-base sm:text-lg ${
              isDark ? 'text-[#a3aba1]' : 'text-[#525f50]'
            }`}
          >
            Download my comprehensive resume formatted for software engineering placement drives, served directly by Express backend routes.
          </p>
        </div>

        {/* Main Bento Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`p-8 sm:p-10 rounded-3xl border backdrop-blur-md relative overflow-hidden ${
            isDark
              ? 'bg-[#161a16]/90 border-[#262f26] shadow-xl'
              : 'bg-white border-[#e2e6df] shadow-md'
          }`}
        >
          {/* Subtle Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#a5c9af]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#a5c9af]/5 rounded-full blur-3xl pointer-events-none" />

          <div className={`relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8 pb-8 border-b ${isDark ? 'border-[#262f26]' : 'border-[#eef2ec]'}`}>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#a5c9af] mb-2">
                <FileCheck className="w-4 h-4" />
                <span>Placement-Ready Resume &bull; JKLU</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {profile?.name || 'Nehal Mittal'}
              </h3>
              <p className={`text-sm sm:text-base font-medium mt-1 ${isDark ? 'text-[#8a9687]' : 'text-[#62705e]'}`}>
                B.Tech in Computer Science and Engineering &bull; JK Lakshmipat University
              </p>
            </div>

            {/* Separate Backend Download Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* PDF Button - GET /api/resume/pdf */}
              <button
                onClick={() => handleDownload('pdf')}
                disabled={downloadingFormat !== null}
                className={`flex-1 md:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-[#111411] transition-all duration-200 cursor-pointer btn-tactile ${
                  downloadingFormat === 'pdf'
                    ? 'bg-[#a5c9af]/70 cursor-wait'
                    : 'bg-[#a5c9af] hover:bg-[#b8d6c0] shadow-md shadow-[#a5c9af]/20'
                }`}
                title="Download PDF resume served by GET /api/resume/pdf"
              >
                {downloadingFormat === 'pdf' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#111411]" />
                    <span>Serving PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-[#111411]" />
                    <span>Download PDF</span>
                  </>
                )}
              </button>

              {/* DOCX Button - GET /api/resume/docx */}
              <button
                onClick={() => handleDownload('docx')}
                disabled={downloadingFormat !== null}
                className={`flex-1 md:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer btn-tactile ${
                  isDark
                    ? 'bg-[#1f261f] hover:bg-[#283228] text-[#f4f5f2] border border-[#2b352b]'
                    : 'bg-[#eef2ec] hover:bg-[#e2e8df] text-[#2c362a] border border-[#d8ded4]'
                } ${downloadingFormat === 'docx' ? 'cursor-wait opacity-80' : ''}`}
                title="Download DOCX resume served by GET /api/resume/docx"
              >
                {downloadingFormat === 'docx' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#a5c9af]" />
                    <span>Serving DOCX...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-[#a5c9af]" />
                    <span>Download DOCX</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Download Feedback State Alert */}
          <AnimatePresence>
            {downloadStatus && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mb-6 p-4 rounded-xl text-xs flex items-start gap-3 ${
                  downloadStatus.type === 'error'
                    ? 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
                    : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                }`}
              >
                {downloadStatus.type === 'error' ? (
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 leading-relaxed">
                  <span className="font-semibold block mb-0.5">
                    {downloadStatus.type === 'error' ? 'Server Notice' : 'Download Complete'}
                  </span>
                  <span>{downloadStatus.message}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Resume Highlights Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div
              className={`p-5 rounded-2xl border ${
                isDark ? 'bg-[#111411]/90 border-[#262f26]' : 'bg-[#f4f5f2] border-[#e2e6df]'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#a5c9af] mb-2">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </div>
              <p className="text-sm font-bold">B.Tech in Computer Science and Engineering</p>
              <p className={`text-xs mt-1 ${isDark ? 'text-[#8a9687]' : 'text-[#62705e]'}`}>JK Lakshmipat University, Jaipur</p>
              <p className="text-xs font-semibold text-[#a5c9af] mt-2">Status: Student (Placement Aspirant)</p>
            </div>

            <div
              className={`p-5 rounded-2xl border ${
                isDark ? 'bg-[#111411]/90 border-[#262f26]' : 'bg-[#f4f5f2] border-[#e2e6df]'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#a5c9af] mb-2">
                <Briefcase className="w-4 h-4" />
                <span>Target Placement Roles</span>
              </div>
              <ul className={`text-xs space-y-1.5 ${isDark ? 'text-[#c6ccc3]' : 'text-[#3e483b]'}`}>
                {(profile?.targetRoles || [
                  'Software Development Engineer (SDE I / Graduate)',
                  'Machine Learning / AI Trainee',
                  'Full-Stack / Backend Developer Intern',
                ]).map((role, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#a5c9af]" />
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`p-5 rounded-2xl border ${
                isDark ? 'bg-[#111411]/90 border-[#262f26]' : 'bg-[#f4f5f2] border-[#e2e6df]'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#a5c9af] mb-2">
                <Layers className="w-4 h-4" />
                <span>Core Competencies</span>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-[#c6ccc3]' : 'text-[#3e483b]'}`}>
                {profile?.competenciesSummary ||
                  'Python, C/C++, MySQL, Relational Database Design, Machine Learning (Scikit-Learn), Deep Learning Concepts, Data Structures & Algorithms, Git, REST APIs.'}
              </p>
              <div className="mt-3">
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#a5c9af] hover:text-[#c7e0ce] transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3 h-3 text-[#a5c9af]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedLink ? 'Direct backend PDF URL copied' : 'Copy backend download endpoint'}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
