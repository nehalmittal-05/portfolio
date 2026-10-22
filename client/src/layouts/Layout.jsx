import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Spotlight from '../components/Spotlight';
import CustomCursor from '../components/CustomCursor';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * Shared layout wrapping every route page.
 * Provides: sticky navbar, footer, spotlight glow, and custom cursor.
 */
const Layout = () => {
  const { portfolioData, error } = usePortfolio();
  const { profile } = portfolioData;
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#a5c9af]/30 selection:text-[#f4f5f2]">
      {/* Interactive mouse-following ambient spotlight */}
      <Spotlight />

      {/* Subtle responsive custom cursor (desktop only) */}
      <CustomCursor />

      {/* Persistent Navbar */}
      <Navbar profileName={profile?.name} />

      {/* Global DB / Backend notice banner */}
      {error && (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-2 pb-0 z-10">
          <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-200 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <span>
                <strong>Database Notice:</strong> {error}
              </span>
            </div>
            <span className="hidden sm:inline-block text-[11px] font-mono text-amber-300/80 uppercase tracking-wider bg-amber-500/20 px-2 py-0.5 rounded">
              Live Data Only
            </span>
          </div>
        </div>
      )}

      {/* Route page content */}
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>

      {/* Persistent Footer */}
      <Footer profile={profile} />
    </div>
  );
};

export default Layout;
