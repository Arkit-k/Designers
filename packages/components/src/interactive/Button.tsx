/**
 * 🔘 Button - Accessible, unstyled button component
 * 
 * Provides all the behavior and accessibility features,
 * you provide the styling. Works with any CSS framework.
 */

import React from 'react';
import type { ButtonProps } from '../types';

/**
 * Accessible button component with loading and disabled states.
 * 
 * @example
 * ```tsx
 * // Basic button
 * <Button onClick={() => console.log('clicked')}>
 *   Click me
 * </Button>
 * 
 * // Loading state
 * <Button loading loadingText="Saving...">
 *   Save
 * </Button>
 * 
 * // With custom styling
 * <Button className="btn btn-primary">
 *   Styled button
 * </Button>
 * 
 * // As a link
 * <Button as="a" href="/dashboard">
 *   Go to dashboard
 * </Button>
 * ```
 */
export function Button({
  children,
  as = 'button',
  type = 'button',
  disabled = false,
  loading = false,
  loadingText,
  leftIcon,
  rightIcon,
  size = 'md',
  variant = 'solid',
  colorScheme = 'blue',
  className,
  style,
  onClick,
  ...props
}: ButtonProps) {
  const Component = as;
  
  const isDisabled = disabled || loading;
  
  // Base button styles for accessibility and behavior
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    border: 'none',
    background: 'none',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    outline: 'none',
    transition: 'all 0.2s',
    userSelect: 'none',
    opacity: isDisabled ? 0.6 : 1,
    ...style,
  };
  
  const handleClick = (event: React.MouseEvent) => {
    if (isDisabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Handle Enter and Space for accessibility
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!isDisabled) {
        onClick?.(event as any);
      }
    }
  };
  
  return (
    <Component
      type={as === 'button' ? type : undefined}
      disabled={as === 'button' ? isDisabled : undefined}
      aria-disabled={isDisabled}
      aria-busy={loading}
      className={className}
      style={baseStyles}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isDisabled ? -1 : 0}
      role={as !== 'button' ? 'button' : undefined}
      {...props}
    >
      {/* Left icon */}
      {leftIcon && !loading && (
        <span aria-hidden="true">
          {leftIcon}
        </span>
      )}
      
      {/* Loading spinner */}
      {loading && (
        <span 
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: '1em',
            height: '1em',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
      )}
      
      {/* Button text */}
      <span>
        {loading && loadingText ? loadingText : children}
      </span>
      
      {/* Right icon */}
      {rightIcon && !loading && (
        <span aria-hidden="true">
          {rightIcon}
        </span>
      )}
      
      {/* Add keyframes for loading spinner */}
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Component>
  );
}
