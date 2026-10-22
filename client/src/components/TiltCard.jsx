import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * TiltCard adds a gentle 3D tilt (max 3 degrees) and a localized mouse-following highlight.
 * Designed with restraint to feel refined, tactile, and responsive.
 */
export const TiltCard = ({ children, className = '', ...props }) => {
  const { isDark } = useTheme();
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [canTilt, setCanTilt] = useState(true);

  useEffect(() => {
    // Disable on touch screens or if reduced motion is requested
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion || isTouch) {
      setCanTilt(false);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (!canTilt || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    // Restrained tilt: strictly limited to ±3 degrees max
    const rotateY = (x * 6).toFixed(2);
    const rotateX = (-y * 6).toFixed(2);

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;
    cardRef.current.style.setProperty('--card-x', `${(e.clientX - rect.left).toFixed(1)}px`);
    cardRef.current.style.setProperty('--card-y', `${(e.clientY - rect.top).toFixed(1)}px`);

    if (!isHovered) setIsHovered(true);
  };

  const handleMouseEnter = () => {
    if (canTilt) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    setIsHovered(false);
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      {/* Localized mouse-following radial highlight */}
      {canTilt && (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: isDark
              ? 'radial-gradient(350px circle at var(--card-x, 50%) var(--card-y, 50%), rgba(165, 201, 175, 0.08), transparent 80%)'
              : 'radial-gradient(350px circle at var(--card-x, 50%) var(--card-y, 50%), rgba(165, 201, 175, 0.18), transparent 80%)',
          }}
        />
      )}
      {children}
    </div>
  );
};

export default TiltCard;
