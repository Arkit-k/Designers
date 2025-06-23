# designers

## 3.0.1

### Patch Changes

- Update author information to arkit karmokar

  Updated all package.json files and documentation to properly credit arkit karmokar as the author of the Designers design system packages.

- Updated dependencies
  - designers-core@2.0.1
  - designers-cli@2.0.1
  - designers-react@2.0.1
  - designers-animations@2.0.1
  - designers-integrations@2.0.1
  - designers-tailwind-plugin@2.0.1

## 3.0.0

### Major Changes

- Add main meta-package for easy installation

  Added a new main package `designers` that includes all individual packages as dependencies. Users can now install the entire design system with a single command:

  ```bash
  npm install designers
  ```

  This package provides:
  - All individual packages as dependencies
  - Convenient re-exports for easy access
  - CLI binary for project initialization
  - Comprehensive documentation and examples

  Usage:

  ```typescript
  // Import everything
  import designers from 'designers';

  // Import specific modules
  import { tokens } from 'designers/core';
  import { useTheme } from 'designers/react';
  import { fadeIn } from 'designers/animations';
  ```
