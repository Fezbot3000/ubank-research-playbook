import React, { forwardRef, useState } from 'react';
import { buttonBaseStyles, buttonVariants, buttonSizes, iconButtonStyles, fullWidthStyles } from './button.styles';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  isLoading?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  isIconOnly?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loadingText?: string;
  children: React.ReactNode;
}

const LoadingSpinner: React.FC<{ size?: string }> = ({ size = '1em' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={{
      animation: 'spin 1s linear infinite',
    }}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeDasharray="16 16"
      fill="none"
    />
  </svg>
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      isDisabled = false,
      isFullWidth = false,
      isIconOnly = false,
      leftIcon,
      rightIcon,
      loadingText,
      children,
      style,
      className,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    const disabled = isDisabled || isLoading;
    const variantStyles = buttonVariants[variant];
    const sizeStyles = buttonSizes[size];

    // Determine current state styles
    const getStateStyles = () => {
      if (disabled) return variantStyles.disabled;
      if (isPressed) return variantStyles.active;
      if (isHovered) return variantStyles.hover;
      if (isFocused) return variantStyles.focus;
      return variantStyles.base;
    };

    const buttonStyles = {
      ...buttonBaseStyles,
      ...variantStyles.base,
      ...sizeStyles,
      ...getStateStyles(),
      ...(isIconOnly && iconButtonStyles),
      ...(isFullWidth && fullWidthStyles),
      ...style,
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) setIsHovered(true);
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        setIsHovered(false);
        setIsPressed(false);
      }
      onMouseLeave?.(e);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) setIsPressed(true);
      onMouseDown?.(e);
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) setIsPressed(false);
      onMouseUp?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
      if (!disabled) setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
      if (!disabled) setIsFocused(false);
      onBlur?.(e);
    };

    const content = isLoading ? (
      <>
        <LoadingSpinner />
        {loadingText && <span>{loadingText}</span>}
      </>
    ) : (
      <>
        {leftIcon && <span data-testid="button-left-icon">{leftIcon}</span>}
        {!isIconOnly && <span>{children}</span>}
        {isIconOnly && children}
        {rightIcon && <span data-testid="button-right-icon">{rightIcon}</span>}
      </>
    );

    return (
      <button
        ref={ref}
        style={buttonStyles}
        disabled={disabled}
        data-variant={variant}
        data-size={size}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button'; 