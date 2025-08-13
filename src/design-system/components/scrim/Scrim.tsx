import React, { forwardRef } from 'react';
import { designTokens } from '../../tokens';

export interface ScrimProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether to apply blur effect (8px backdrop-filter blur) */
  blur?: boolean;
  /** Overlay opacity (0-1) */
  opacity?: number;
  /** Whether the scrim is visible */
  visible?: boolean;
  /** Content to render over the scrim */
  children?: React.ReactNode;
  /** Callback when scrim is clicked */
  onScrimClick?: () => void;
}

export const Scrim = forwardRef<HTMLDivElement, ScrimProps>(
  (
    {
      blur = false,
      opacity = 0.5,
      visible = true,
      children,
      onScrimClick,
      style,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    if (!visible) return null;

    const scrimStyles: React.CSSProperties = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: `rgba(0, 0, 0, ${opacity})`,
      backdropFilter: blur ? 'blur(8px)' : 'none', // ubank scrim-blur-1: 8px
      WebkitBackdropFilter: blur ? 'blur(8px)' : 'none', // Safari support
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: designTokens.animations.transition.all,
      ...style,
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      // If clicking on the scrim itself (not children), trigger onScrimClick
      if (e.target === e.currentTarget && onScrimClick) {
        onScrimClick();
      }
      onClick?.(e);
    };

    return (
      <div
        ref={ref}
        style={scrimStyles}
        className={className}
        onClick={handleClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Scrim.displayName = 'Scrim'; 