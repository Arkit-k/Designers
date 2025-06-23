/**
 * 🔧 Component types for maximum TypeScript happiness
 */

import React from 'react';

// Base props that all components can accept
export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// Design system spacing values
export type SpacingValue = 0 | 'px' | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 52 | 56 | 60 | 64 | 72 | 80 | 96;

// Color values
export type ColorValue = string; // e.g., "blue.500", "red.100", etc.

// Border radius values
export type RadiusValue = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

// Shadow values
export type ShadowValue = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner' | 'none';

// Box component props
export interface BoxProps extends BaseProps {
  as?: keyof JSX.IntrinsicElements;
  
  // Spacing props
  p?: SpacingValue;
  px?: SpacingValue;
  py?: SpacingValue;
  pt?: SpacingValue;
  pr?: SpacingValue;
  pb?: SpacingValue;
  pl?: SpacingValue;
  m?: SpacingValue;
  mx?: SpacingValue;
  my?: SpacingValue;
  mt?: SpacingValue;
  mr?: SpacingValue;
  mb?: SpacingValue;
  ml?: SpacingValue;
  
  // Color props
  bg?: ColorValue;
  color?: ColorValue;
  
  // Border radius props
  rounded?: RadiusValue;
  roundedTop?: RadiusValue;
  roundedBottom?: RadiusValue;
  roundedLeft?: RadiusValue;
  roundedRight?: RadiusValue;
  
  // Border props
  border?: string;
  borderTop?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderRight?: string;
  
  // Shadow props
  shadow?: ShadowValue;
  
  // Layout props
  display?: React.CSSProperties['display'];
  position?: React.CSSProperties['position'];
  top?: SpacingValue | string;
  right?: SpacingValue | string;
  bottom?: SpacingValue | string;
  left?: SpacingValue | string;
  width?: SpacingValue | string;
  height?: SpacingValue | string;
  minWidth?: SpacingValue | string;
  minHeight?: SpacingValue | string;
  maxWidth?: SpacingValue | string;
  maxHeight?: SpacingValue | string;
  
  // Flexbox props
  flex?: React.CSSProperties['flex'];
  flexDirection?: React.CSSProperties['flexDirection'];
  flexWrap?: React.CSSProperties['flexWrap'];
  alignItems?: React.CSSProperties['alignItems'];
  justifyContent?: React.CSSProperties['justifyContent'];
  gap?: SpacingValue;
  
  // Grid props
  gridColumn?: React.CSSProperties['gridColumn'];
  gridRow?: React.CSSProperties['gridRow'];
  gridArea?: React.CSSProperties['gridArea'];
  
  // HTML props
  [key: string]: any;
}

// Stack component props
export interface StackProps extends Omit<BoxProps, 'flexDirection'> {
  spacing?: SpacingValue | string;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  divider?: React.ReactNode;
}

// Cluster component props
export interface ClusterProps extends BoxProps {
  spacing?: SpacingValue | string;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
}

// Grid component props
export interface GridProps extends BoxProps {
  columns?: number | string;
  rows?: number | string;
  gap?: SpacingValue | string;
  columnGap?: SpacingValue | string;
  rowGap?: SpacingValue | string;
  templateColumns?: string;
  templateRows?: string;
  templateAreas?: string;
}

// Container component props
export interface ContainerProps extends BoxProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | string;
  centerContent?: boolean;
}

// Button component props
export interface ButtonProps extends BaseProps {
  as?: 'button' | 'a' | keyof JSX.IntrinsicElements;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  colorScheme?: string;
  onClick?: (event: React.MouseEvent) => void;
  href?: string;
  target?: string;
  rel?: string;
  [key: string]: any;
}

// Input component props
export interface InputProps extends BaseProps {
  type?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

// Select component props
export interface SelectProps extends BaseProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  [key: string]: any;
}

// Checkbox component props
export interface CheckboxProps extends BaseProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  indeterminate?: boolean;
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

// Radio component props
export interface RadioProps extends BaseProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: string;
  value?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

// Alert component props
export interface AlertProps extends BaseProps {
  status?: 'info' | 'warning' | 'success' | 'error';
  variant?: 'subtle' | 'solid' | 'left-accent' | 'top-accent';
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  onClose?: () => void;
}

// Toast component props
export interface ToastProps extends AlertProps {
  id?: string;
  duration?: number;
  isClosable?: boolean;
  position?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';
}

// Spinner component props
export interface SpinnerProps extends BaseProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  thickness?: string;
  speed?: string;
  label?: string;
}

// Modal component props
export interface ModalProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';
  isCentered?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  trapFocus?: boolean;
  returnFocusOnClose?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
  finalFocusRef?: React.RefObject<HTMLElement>;
}

// Dropdown component props
export interface DropdownProps extends BaseProps {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  trigger?: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  offset?: [number, number];
  closeOnSelect?: boolean;
  closeOnBlur?: boolean;
}

// Tooltip component props
export interface TooltipProps extends BaseProps {
  label: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  offset?: [number, number];
  delay?: number;
  closeDelay?: number;
  hasArrow?: boolean;
  isDisabled?: boolean;
}

// Table component props
export interface TableProps extends BaseProps {
  variant?: 'simple' | 'striped' | 'unstyled';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: string;
}

// Card component props
export interface CardProps extends BoxProps {
  variant?: 'outline' | 'filled' | 'elevated' | 'unstyled';
  size?: 'sm' | 'md' | 'lg';
}
