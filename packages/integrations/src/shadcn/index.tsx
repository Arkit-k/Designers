/**
 * shadcn/ui integration for Designers
 */

import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import type { ComponentDefinition, UILibraryAdapter } from '../types';

// Button component with shadcn/ui styling
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-semantic-interactive-primary text-semantic-text-inverse hover:bg-semantic-interactive-primary-hover',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        outline: 'border border-semantic-border-primary bg-transparent hover:bg-semantic-background-secondary',
        secondary: 'bg-semantic-background-secondary text-semantic-text-primary hover:bg-semantic-background-tertiary',
        ghost: 'hover:bg-semantic-background-secondary',
        link: 'text-semantic-interactive-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

// Card component
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border border-semantic-border-primary bg-semantic-background-primary text-semantic-text-primary shadow-sm',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-semantic-text-secondary', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

// Input component
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-semantic-border-primary bg-semantic-background-primary px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-semantic-text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-semantic-border-focus focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

// Badge component
const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-semantic-interactive-primary text-semantic-text-inverse hover:bg-semantic-interactive-primary-hover',
        secondary: 'border-transparent bg-semantic-background-secondary text-semantic-text-primary hover:bg-semantic-background-tertiary',
        destructive: 'border-transparent bg-red-500 text-white hover:bg-red-600',
        outline: 'text-semantic-text-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

// Component definitions for the registry
export const shadcnComponents: Record<string, ComponentDefinition> = {
  Button: {
    component: Button,
    library: 'shadcn',
    category: 'form',
    variants: {
      default: { variant: 'default' },
      destructive: { variant: 'destructive' },
      outline: { variant: 'outline' },
      secondary: { variant: 'secondary' },
      ghost: { variant: 'ghost' },
      link: { variant: 'link' },
    },
    sizes: {
      sm: { size: 'sm' },
      default: { size: 'default' },
      lg: { size: 'lg' },
      icon: { size: 'icon' },
    },
    tags: ['button', 'interactive', 'form'],
  },
  Card: {
    component: Card,
    library: 'shadcn',
    category: 'layout',
    variants: {
      default: {},
    },
    tags: ['card', 'container', 'layout'],
  },
  Input: {
    component: Input,
    library: 'shadcn',
    category: 'form',
    variants: {
      default: {},
    },
    tags: ['input', 'form', 'text'],
  },
  Badge: {
    component: Badge,
    library: 'shadcn',
    category: 'display',
    variants: {
      default: { variant: 'default' },
      secondary: { variant: 'secondary' },
      destructive: { variant: 'destructive' },
      outline: { variant: 'outline' },
    },
    tags: ['badge', 'status', 'label'],
  },
};

// shadcn/ui adapter
export const shadcnAdapter: UILibraryAdapter = {
  name: 'shadcn',
  transformProps: (props, definition) => {
    // shadcn/ui uses className-based styling, so we don't need to transform much
    return props;
  },
  generateTheme: (designTokens) => {
    // Generate CSS variables for shadcn/ui
    return {
      ':root': {
        '--background': designTokens.semantic.background.primary,
        '--foreground': designTokens.semantic.text.primary,
        '--card': designTokens.semantic.background.primary,
        '--card-foreground': designTokens.semantic.text.primary,
        '--popover': designTokens.semantic.background.primary,
        '--popover-foreground': designTokens.semantic.text.primary,
        '--primary': designTokens.semantic.interactive.primary,
        '--primary-foreground': designTokens.semantic.text.inverse,
        '--secondary': designTokens.semantic.background.secondary,
        '--secondary-foreground': designTokens.semantic.text.primary,
        '--muted': designTokens.semantic.background.tertiary,
        '--muted-foreground': designTokens.semantic.text.tertiary,
        '--accent': designTokens.semantic.background.secondary,
        '--accent-foreground': designTokens.semantic.text.primary,
        '--destructive': designTokens.colors.error[500],
        '--destructive-foreground': designTokens.semantic.text.inverse,
        '--border': designTokens.semantic.border.primary,
        '--input': designTokens.semantic.border.primary,
        '--ring': designTokens.semantic.border.focus,
        '--radius': '0.5rem',
      },
    };
  },
};

// Export individual components
export {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Badge,
};

// Export compound components
export const ShadcnCard = {
  Root: Card,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
};
