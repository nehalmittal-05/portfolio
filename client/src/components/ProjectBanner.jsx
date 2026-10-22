import React, { useState } from 'react';
import {
  Sparkles,
  Database,
  Activity,
  Layers,
  Cpu,
  Zap,
  Globe,
  Binary,
} from 'lucide-react';

export const ProjectBanner = ({ project, className = 'h-48', isModal = false }) => {
  const [imgError, setImgError] = useState(false);

  // Return custom iconography and styling based on project title or category
  const getBannerDetails = () => {
    const slug = (project.slug || project.title || '').toLowerCase();
    if (slug.includes('asteroid')) {
      return {
        gradient: 'from-[#171e17] via-[#111411] to-[#1a231a]',
        accentColor: 'text-[#a5c9af]',
        borderColor: 'border-[#a5c9af]/20',
        icon: Sparkles,
        label: 'Near-Earth Object Classifier',
        pattern: 'radial',
      };
    }
    if (slug.includes('power') || slug.includes('electricity')) {
      return {
        gradient: 'from-[#141d16] via-[#111411] to-[#17241a]',
        accentColor: 'text-[#90bfa3]',
        borderColor: 'border-[#90bfa3]/20',
        icon: Zap,
        label: 'Campus Energy Database System',
        pattern: 'grid',
      };
    }
    if (slug.includes('lung') || slug.includes('nodule') || slug.includes('medical')) {
      return {
        gradient: 'from-[#192019] via-[#111411] to-[#1d251d]',
        accentColor: 'text-[#b2cdb8]',
        borderColor: 'border-[#b2cdb8]/20',
        icon: Activity,
        label: 'Medical Imaging Deep Learning',
        pattern: 'scanner',
      };
    }
    return {
      gradient: 'from-[#161d16] via-[#111411] to-[#1a221a]',
      accentColor: 'text-[#a5c9af]',
      borderColor: 'border-[#a5c9af]/20',
      icon: Cpu,
      label: project.category || 'Software Engineering Project',
      pattern: 'default',
    };
  };

  const details = getBannerDetails();
  const IconComponent = details.icon;

  if (project.image && !imgError) {
    return (
      <div className={`relative w-full ${className} overflow-hidden bg-[#111411]`}>
        <img
          src={project.image}
          alt={project.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111411] via-transparent to-transparent opacity-80" />
      </div>
    );
  }

  // Fallback high-tech developer banner
  return (
    <div
      className={`relative w-full ${className} overflow-hidden bg-gradient-to-br ${details.gradient} border-b ${details.borderColor} flex flex-col justify-between p-6 select-none`}
    >
      {/* Decorative Grid SVG Background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={`grid-${project._id || 'banner'}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.8" className={details.accentColor} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${project._id || 'banner'})`} />
      </svg>

      {/* Decorative Orbit / Circuit accents */}
      <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full border border-white/10 blur-[1px] pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full border border-white/5 pointer-events-none" />

      {/* Top Banner Content */}
      <div className="relative z-10 flex items-center justify-between">
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-black/40 backdrop-blur-md border border-white/10 ${details.accentColor}`}>
          <IconComponent className="w-3.5 h-3.5" />
          <span>{details.label}</span>
        </div>
      </div>

      {/* Bottom Banner Branding */}
      <div className="relative z-10 mt-auto">
        <h4 className="text-white font-bold text-base sm:text-lg tracking-tight drop-shadow-sm line-clamp-1">
          {project.title}
        </h4>
        <p className="text-[11px] text-slate-300 font-mono mt-0.5 opacity-90 line-clamp-1">
          {project.tags?.slice(0, 3).join(' • ')}
        </p>
      </div>
    </div>
  );
};

export default ProjectBanner;
