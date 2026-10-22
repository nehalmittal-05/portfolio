import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Home, ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const NotFound = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        isDark ? 'bg-[#080d1a] text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div
        className={`max-w-md w-full p-8 rounded-3xl border text-center ${
          isDark ? 'bg-[#0e1628] border-slate-800' : 'bg-white border-slate-200 shadow-lg'
        }`}
      >
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-5 border border-rose-500/20">
          <Terminal className="w-8 h-8" />
        </div>
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-500">
          HTTP 404 Error
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight mt-1 mb-3">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          The requested URL path was not found on this developer portfolio server.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 shadow-md transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Portfolio</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
