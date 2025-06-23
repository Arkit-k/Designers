/**
 * 📚 Stack - Vertical layout with consistent spacing
 * 
 * Perfect for forms, content sections, and any vertical layout.
 * Automatically handles spacing between children.
 */

import React from 'react';
import { Box } from './Box';
import type { StackProps } from '../types';

/**
 * Stack component for vertical layouts with consistent spacing.
 * 
 * @example
 * ```tsx
 * <Stack spacing={4}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * 
 * // With custom alignment
 * <Stack spacing={6} align="center">
 *   <Button>Primary</Button>
 *   <Button>Secondary</Button>
 * </Stack>
 * ```
 */
export function Stack({
  children,
  spacing = 4,
  align,
  justify,
  divider,
  className,
  style,
  ...props
}: StackProps) {
  const stackStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    ...(align && { alignItems: align }),
    ...(justify && { justifyContent: justify }),
    ...style,
  };

  // Convert children to array for processing
  const childrenArray = React.Children.toArray(children);
  
  return (
    <Box
      className={className}
      style={stackStyles}
      {...props}
    >
      {childrenArray.map((child, index) => (
        <React.Fragment key={index}>
          {/* Add spacing to all children except the first */}
          <Box
            style={{
              ...(index > 0 && { marginTop: typeof spacing === 'number' ? `var(--ds-spacing-${spacing}, 1rem)` : spacing }),
            }}
          >
            {child}
          </Box>
          
          {/* Add divider between items if provided */}
          {divider && index < childrenArray.length - 1 && (
            <Box style={{ marginTop: typeof spacing === 'number' ? `var(--ds-spacing-${spacing}, 1rem)` : spacing }}>
              {divider}
            </Box>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
}
