import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Small custom cursor on desktop that expands subtly over links and buttons.
 * Preserves native cursors for text input and disables custom cursor effects on touch devices.
 */
export const CustomCursor = () => {
  const { isDark } = useTheme();
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // Disable on touch devices and if user prefers reduced motion
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const canHover = window.matchMedia('(hover: hover)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasCoarsePointer || !canHover || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const onPointerMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check element under cursor
      const target = e.target;
      if (!target) return;

      // Preserve native cursor for text inputs
      const isInput =
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        (target.tagName === 'INPUT' &&
          !['button', 'submit', 'checkbox', 'radio'].includes(target.type));

      setIsTextInput(isInput);

      // Check if hovering interactive element (links, buttons, tabs)
      const interactive =
        target.closest('a, button, [role="button"], input[type="submit"], input[type="button"], label, .interactive') !== null;

      setIsHovered(interactive && !isInput);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    const animate = () => {
      // Direct positioning for dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      // Smooth trailing positioning for outer ring
      const factor = 0.2;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * factor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * factor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!enabled) return null;

  // Hide custom cursor completely over text inputs so the native I-beam cursor is preserved
  const showCursor = isVisible && !isTextInput;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      aria-hidden="true"
      style={{
        opacity: showCursor ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }}
    >
      {/* Outer trailing ring */}
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 rounded-full pointer-events-none transition-all duration-200 ease-out ${
          isHovered
            ? 'w-10 h-10 -ml-5 -mt-5 border border-[#a5c9af]/60 bg-[#a5c9af]/10'
            : isDark
            ? 'w-7 h-7 -ml-3.5 -mt-3.5 border border-[#a5c9af]/35 bg-transparent'
            : 'w-7 h-7 -ml-3.5 -mt-3.5 border border-[#4d7058]/40 bg-transparent'
        }`}
      />

      {/* Inner precise dot */}
      <div
        ref={dotRef}
        className={`absolute top-0 left-0 rounded-full pointer-events-none transition-transform duration-100 ${
          isHovered
            ? 'w-2 h-2 -ml-1 -mt-1 scale-125'
            : 'w-1.5 h-1.5 -ml-[3px] -mt-[3px]'
        } ${isDark ? 'bg-[#a5c9af]' : 'bg-[#4d7058]'}`}
      />
    </div>
  );
};

export default CustomCursor;
