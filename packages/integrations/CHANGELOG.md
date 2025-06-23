# @designers/integrations

## 2.0.1

### Patch Changes

- Update author information to arkit karmokar

  Updated all package.json files and documentation to properly credit arkit karmokar as the author of the Designers design system packages.

- Updated dependencies
  - designers-core@2.0.1
  - designers-react@2.0.1

## 2.0.0

### Major Changes

- Rename packages to remove scope

  Changed package names from scoped (@designers/_) to unscoped (designers-_) format to avoid npm scope issues:
  - @designers/core → designers-core
  - @designers/cli → designers-cli
  - @designers/react → designers-react
  - @designers/animations → designers-animations
  - @designers/integrations → designers-integrations
  - @designers/tailwind-plugin → designers-tailwind-plugin

### Patch Changes

- Updated dependencies
  - designers-core@2.0.0
  - designers-react@2.0.0

## 1.0.0

### Major Changes

- Initial release of the Designers design system

  This is the first release of the Designers design system, featuring:
  - **@designers/core**: Core design tokens and utilities
  - **@designers/cli**: Command-line interface for project initialization
  - **@designers/react**: React components and hooks
  - **@designers/animations**: Animation utilities for Framer Motion and GSAP
  - **@designers/integrations**: UI library integrations (shadcn, MUI, etc.)
  - **@designers/tailwind-plugin**: Tailwind CSS plugin for seamless integration

  Key features:
  - Headless design system architecture
  - Automatic Tailwind CSS integration
  - Support for popular UI libraries
  - TypeScript support throughout
  - Comprehensive animation utilities
  - CLI tool for easy project setup

### Patch Changes

- Updated dependencies
  - @designers/core@1.0.0
  - @designers/react@1.0.0
