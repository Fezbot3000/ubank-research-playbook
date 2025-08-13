import React, { forwardRef, useState } from 'react';
import { designTokens } from '../../tokens';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  isError?: boolean;
  isDisabled?: boolean;
  label?: string;
  helperText?: string;
  errorText?: string;
}

const inputVariants = {
  default: {
    base: {
      backgroundColor: 'var(--color-surface-primary)',
      border: `${designTokens.borders.width.thin} ${designTokens.borders.style.solid} var(--color-border-primary)`,
    },
    focus: {
      borderColor: 'var(--color-border-focus)',
      boxShadow: designTokens.shadows.focus,
    },
    error: {
      borderColor: 'var(--color-border-error)',
      boxShadow: designTokens.shadows['focus-error'],
    },
  },
  filled: {
    base: {
      backgroundColor: 'var(--color-surface-secondary)',
      border: `${designTokens.borders.width.thin} ${designTokens.borders.style.solid} transparent`,
    },
    focus: {
      backgroundColor: 'var(--color-surface-primary)',
      borderColor: 'var(--color-border-focus)',
      boxShadow: designTokens.shadows.focus,
    },
    error: {
      backgroundColor: 'var(--color-surface-primary)',
      borderColor: 'var(--color-border-error)',
      boxShadow: designTokens.shadows['focus-error'],
    },
  },
  outlined: {
    base: {
      backgroundColor: 'transparent',
      border: `${designTokens.borders.width.medium} ${designTokens.borders.style.solid} var(--color-border-primary)`,
    },
    focus: {
      borderColor: 'var(--color-border-focus)',
      boxShadow: designTokens.shadows.focus,
    },
    error: {
      borderColor: 'var(--color-border-error)',
      boxShadow: designTokens.shadows['focus-error'],
    },
  },
} as const;

const inputSizes = {
  sm: {
    padding: `${designTokens.semanticSpacing.inline.sm} ${designTokens.semanticSpacing.inline.md}`,
    fontSize: designTokens.typography.fontSize.sm,
    lineHeight: designTokens.typography.lineHeight.normal,
    minHeight: '2rem',
  },
  md: {
    padding: `${designTokens.semanticSpacing.inline.md} ${designTokens.semanticSpacing.inline.lg}`,
    fontSize: designTokens.typography.fontSize.base,
    lineHeight: designTokens.typography.lineHeight.normal,
    minHeight: '2.5rem',
  },
  lg: {
    padding: `${designTokens.semanticSpacing.inline.lg} ${designTokens.semanticSpacing.inline.xl}`,
    fontSize: designTokens.typography.fontSize.lg,
    lineHeight: designTokens.typography.lineHeight.normal,
    minHeight: '3rem',
  },
} as const;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      isError = false,
      isDisabled = false,
      label,
      helperText,
      errorText,
      style,
      className,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    
    const variantStyles = inputVariants[variant];
    const sizeStyles = inputSizes[size];
    
    const getStateStyles = () => {
      if (isError) return variantStyles.error;
      if (isFocused) return variantStyles.focus;
      return variantStyles.base;
    };

    const inputStyles = {
      width: '100%',
      fontFamily: designTokens.typography.fontFamily.primary.join(', '),
      fontWeight: designTokens.typography.fontWeight.normal,
      color: 'var(--color-text-primary)',
      borderRadius: designTokens.borders.radius.sm,  // 8px per ubank spec for Input, Select
      transition: designTokens.animations.transition.all,
      outline: 'none',
      ...sizeStyles,
      ...getStateStyles(),
      opacity: isDisabled ? 0.6 : 1,
      cursor: isDisabled ? 'not-allowed' : 'text',
      ...style,
    };

    const labelStyles = {
      display: 'block',
      fontSize: designTokens.typography.fontSize.sm,
      fontWeight: designTokens.typography.fontWeight.medium,
      color: 'var(--color-text-primary)',
      marginBottom: designTokens.semanticSpacing.component.xs,
    };

    const helperTextStyles = {
      fontSize: designTokens.typography.fontSize.xs,
      color: isError ? 'var(--color-border-error)' : 'var(--color-text-secondary)',
      marginTop: designTokens.semanticSpacing.component.xs,
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (!isDisabled) setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (!isDisabled) setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <div style={{ width: '100%' }}>
        {label && (
          <label style={labelStyles}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          style={inputStyles}
          disabled={isDisabled}
          className={className}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {(helperText || errorText) && (
          <div style={helperTextStyles}>
            {isError ? errorText : helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input'; 