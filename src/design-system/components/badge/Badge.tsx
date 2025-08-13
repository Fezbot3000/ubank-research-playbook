import React, { forwardRef } from 'react';
import { designTokens } from '../../tokens';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const badgeVariants = {
  primary: {
    backgroundColor: designTokens.colors.primary.lighter,
    color: designTokens.colors.primary.darker,
    border: `${designTokens.borders.width.thin} ${designTokens.borders.style.solid} ${designTokens.colors.primary.light}`,
  },
  secondary: {
    backgroundColor: 'var(--color-surface-secondary)',
    color: 'var(--color-text-primary)',
    border: `${designTokens.borders.width.thin} ${designTokens.borders.style.solid} var(--color-border-primary)`,
  },
  success: {
    backgroundColor: designTokens.colors.success.light,
    color: designTokens.colors.success.dark,
    border: `${designTokens.borders.width.thin} ${designTokens.borders.style.solid} ${designTokens.colors.success.vibrant}`,
  },
  warning: {
    backgroundColor: designTokens.colors.warning.light,
    color: designTokens.colors.warning.dark,
    border: `${designTokens.borders.width.thin} ${designTokens.borders.style.solid} ${designTokens.colors.warning.vibrant}`,
  },
  error: {
    backgroundColor: designTokens.colors.error.light,
    color: designTokens.colors.error.dark,
    border: `${designTokens.borders.width.thin} ${designTokens.borders.style.solid} ${designTokens.colors.error.vibrant}`,
  },
  info: {
    backgroundColor: designTokens.colors.info.light,
    color: designTokens.colors.info.dark,
    border: `${designTokens.borders.width.thin} ${designTokens.borders.style.solid} ${designTokens.colors.info.vibrant}`,
  },
} as const;

const badgeSizes = {
  sm: {
    padding: `${designTokens.semanticSpacing.inline.xs} ${designTokens.semanticSpacing.inline.sm}`,
    fontSize: designTokens.typography.fontSize.xs,
    lineHeight: designTokens.typography.lineHeight.tight,
  },
  md: {
    padding: `${designTokens.semanticSpacing.inline.sm} ${designTokens.semanticSpacing.inline.md}`,
    fontSize: designTokens.typography.fontSize.sm,
    lineHeight: designTokens.typography.lineHeight.tight,
  },
  lg: {
    padding: `${designTokens.semanticSpacing.inline.md} ${designTokens.semanticSpacing.inline.lg}`,
    fontSize: designTokens.typography.fontSize.base,
    lineHeight: designTokens.typography.lineHeight.tight,
  },
} as const;

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'secondary',
      size = 'md',
      children,
      style,
      className,
      ...props
    },
    ref
  ) => {
    const badgeStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: designTokens.typography.fontFamily.primary.join(', '),
      fontWeight: designTokens.typography.fontWeight.medium,
      borderRadius: designTokens.borders.radius.full,
      whiteSpace: 'nowrap' as const,
      verticalAlign: 'baseline',
      ...badgeVariants[variant],
      ...badgeSizes[size],
      ...style,
    };

    return (
      <span
        ref={ref}
        style={badgeStyles}
        className={className}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge'; 