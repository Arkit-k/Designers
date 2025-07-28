/**
 * 📦 Box - The foundation of all layouts
 * 
 * A simple, unstyled div with design system props.
 * Works with any CSS framework or styling solution.
 */

import React from 'react';
import { ds } from 'designers';
import type { BoxProps } from '../types';

/**
 * The most fundamental layout component.
 * 
 * @example
 * ```tsx
 * // With inline styles
 * <Box p={4} bg="blue.50" rounded="lg">
 *   Content here
 * </Box>
 * 
 * // With CSS classes
 * <Box className="p-4 bg-blue-50 rounded-lg">
 *   Content here
 * </Box>
 * 
 * // With custom styling
 * <Box style={{ padding: ds.spacing[4] }}>
 *   Content here
 * </Box>
 * ```
 */
export function Box({
  children,
  as = 'div',
  className,
  style,
  
  // Design system props
  p, px, py, pt, pr, pb, pl,
  m, mx, my, mt, mr, mb, ml,
  bg, color,
  rounded, roundedTop, roundedBottom, roundedLeft, roundedRight,
  border, borderTop, borderBottom, borderLeft, borderRight,
  shadow,
  
  // Layout props
  display,
  position,
  top, right, bottom, left,
  width, height,
  minWidth, minHeight,
  maxWidth, maxHeight,
  
  // Flexbox props
  flex,
  flexDirection,
  flexWrap,
  alignItems,
  justifyContent,
  gap,
  
  // Grid props
  gridColumn,
  gridRow,
  gridArea,
  
  ...props
}: BoxProps) {
  const Component = as;
  
  // Build design system styles
  const dsStyles: React.CSSProperties = {};
  
  // Spacing
  if (p !== undefined) dsStyles.padding = ds.spacing[p];
  if (px !== undefined) {
    dsStyles.paddingLeft = ds.spacing[px];
    dsStyles.paddingRight = ds.spacing[px];
  }
  if (py !== undefined) {
    dsStyles.paddingTop = ds.spacing[py];
    dsStyles.paddingBottom = ds.spacing[py];
  }
  if (pt !== undefined) dsStyles.paddingTop = ds.spacing[pt];
  if (pr !== undefined) dsStyles.paddingRight = ds.spacing[pr];
  if (pb !== undefined) dsStyles.paddingBottom = ds.spacing[pb];
  if (pl !== undefined) dsStyles.paddingLeft = ds.spacing[pl];
  
  if (m !== undefined) dsStyles.margin = ds.spacing[m];
  if (mx !== undefined) {
    dsStyles.marginLeft = ds.spacing[mx];
    dsStyles.marginRight = ds.spacing[mx];
  }
  if (my !== undefined) {
    dsStyles.marginTop = ds.spacing[my];
    dsStyles.marginBottom = ds.spacing[my];
  }
  if (mt !== undefined) dsStyles.marginTop = ds.spacing[mt];
  if (mr !== undefined) dsStyles.marginRight = ds.spacing[mr];
  if (mb !== undefined) dsStyles.marginBottom = ds.spacing[mb];
  if (ml !== undefined) dsStyles.marginLeft = ds.spacing[ml];
  
  // Colors
  if (bg) {
    const [colorName, shade] = bg.split('.');
    dsStyles.backgroundColor = shade 
      ? ds.colors[colorName as keyof typeof ds.colors][shade as any]
      : ds.colors[colorName as keyof typeof ds.colors] as string;
  }
  if (color) {
    const [colorName, shade] = color.split('.');
    dsStyles.color = shade 
      ? ds.colors[colorName as keyof typeof ds.colors][shade as any]
      : ds.colors[colorName as keyof typeof ds.colors] as string;
  }
  
  // Border radius
  if (rounded) dsStyles.borderRadius = ds.radius[rounded];
  if (roundedTop) {
    dsStyles.borderTopLeftRadius = ds.radius[roundedTop];
    dsStyles.borderTopRightRadius = ds.radius[roundedTop];
  }
  if (roundedBottom) {
    dsStyles.borderBottomLeftRadius = ds.radius[roundedBottom];
    dsStyles.borderBottomRightRadius = ds.radius[roundedBottom];
  }
  if (roundedLeft) {
    dsStyles.borderTopLeftRadius = ds.radius[roundedLeft];
    dsStyles.borderBottomLeftRadius = ds.radius[roundedLeft];
  }
  if (roundedRight) {
    dsStyles.borderTopRightRadius = ds.radius[roundedRight];
    dsStyles.borderBottomRightRadius = ds.radius[roundedRight];
  }
  
  // Shadows
  if (shadow) dsStyles.boxShadow = ds.shadows[shadow];
  
  // Layout
  if (display) dsStyles.display = display;
  if (position) dsStyles.position = position;
  if (top !== undefined) dsStyles.top = typeof top === 'number' ? ds.spacing[top] : top;
  if (right !== undefined) dsStyles.right = typeof right === 'number' ? ds.spacing[right] : right;
  if (bottom !== undefined) dsStyles.bottom = typeof bottom === 'number' ? ds.spacing[bottom] : bottom;
  if (left !== undefined) dsStyles.left = typeof left === 'number' ? ds.spacing[left] : left;
  
  if (width !== undefined) dsStyles.width = typeof width === 'number' ? ds.spacing[width] : width;
  if (height !== undefined) dsStyles.height = typeof height === 'number' ? ds.spacing[height] : height;
  if (minWidth !== undefined) dsStyles.minWidth = typeof minWidth === 'number' ? ds.spacing[minWidth] : minWidth;
  if (minHeight !== undefined) dsStyles.minHeight = typeof minHeight === 'number' ? ds.spacing[minHeight] : minHeight;
  if (maxWidth !== undefined) dsStyles.maxWidth = typeof maxWidth === 'number' ? ds.spacing[maxWidth] : maxWidth;
  if (maxHeight !== undefined) dsStyles.maxHeight = typeof maxHeight === 'number' ? ds.spacing[maxHeight] : maxHeight;
  
  // Flexbox
  if (flex !== undefined) dsStyles.flex = flex;
  if (flexDirection) dsStyles.flexDirection = flexDirection;
  if (flexWrap) dsStyles.flexWrap = flexWrap;
  if (alignItems) dsStyles.alignItems = alignItems;
  if (justifyContent) dsStyles.justifyContent = justifyContent;
  if (gap !== undefined) dsStyles.gap = ds.spacing[gap];
  
  // Grid
  if (gridColumn) dsStyles.gridColumn = gridColumn;
  if (gridRow) dsStyles.gridRow = gridRow;
  if (gridArea) dsStyles.gridArea = gridArea;
  
  return (
    <Component
      className={className}
      style={{ ...dsStyles, ...style }}
      {...props}
    >
      {children}
    </Component>
  );
}
