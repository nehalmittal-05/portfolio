import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Mouse-following radial spotlight using CSS variables updated with requestAnimationFrame.
 * Creates soft, human ambient lighting that responds smoothly to user movement.
 */
export const Spotlight = () => {
  const { isDark } = useTheme();
  const spotlightRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });
  const rafId = useRef(null);

  useEffect(() => {
    // Respect reduced motion and touch devices
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion || isTouchDevice) {
      return;
    }

    const handlePointerMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smoothly interpolate spotlight position with requestAnimationFrame
    const updatePosition = () => {
      // Gentle lerp for natural soft motion
      const factor = 0.15;
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * factor;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * factor;

      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty('--spotlight-x', `${currentPos.current.x.toFixed(1)}px`);
        spotlightRef.current.style.setProperty('--spotlight-y', `${currentPos.current.y.toFixed(1)}px`);
      }

      rafId.current = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    rafId.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  return (
    <div
      ref={spotlightRef}
      aria-hidden="true"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
      className={`fixed inset-0 pointer-events-none z-30 transition-opacity duration-500 ${
        isDark ? 'spotlight-dark' : 'spotlight-light'
      }`}
    />
  );
};

export default Spotlight;
