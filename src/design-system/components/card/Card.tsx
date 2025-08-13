import React, { forwardRef } from 'react';
import { designTokens } from '../../tokens';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

const cardVariants = {
  default: {
    backgroundColor: 'var(--color-surface-primary)',
    border: `${designTokens.borders.width.thin} ${designTokens.borders.style.solid} var(--color-border-primary)`,
    boxShadow: 'none',
  },
  elevated: {
    backgroundColor: 'var(--color-surface-primary)',
    border: 'none',
    boxShadow: designTokens.shadows.md,
  },
  outlined: {
    backgroundColor: 'transparent',
    border: `${designTokens.borders.width.thin} ${designTokens.borders.style.solid} var(--color-border-primary)`,
    boxShadow: 'none',
  },
  filled: {
    backgroundColor: 'var(--color-surface-secondary)',
    border: 'none',
    boxShadow: 'none',
  },
} as const;

const cardPadding = {
  none: '0',
  sm: designTokens.semanticSpacing.component.sm,
  md: designTokens.semanticSpacing.component.md,
  lg: designTokens.semanticSpacing.component.lg,
  xl: designTokens.semanticSpacing.component.xl,
} as const;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      children,
      style,
      className,
      ...props
    },
    ref
  ) => {
    const cardStyles = {
      borderRadius: designTokens.borders.radius.md,  // 12px per ubank spec for Cards and Action tiles
      transition: designTokens.animations.transition.all,
      ...cardVariants[variant],
      padding: cardPadding[padding],
      ...style,
    };

    return (
      <div
        ref={ref}
        style={cardStyles}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card'; 