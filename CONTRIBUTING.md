# Contributing to Designers

Thank you for your interest in contributing to Designers! This document provides guidelines and information for contributors.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Release Process](#release-process)

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/designers.git
   cd designers
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build all packages**
   ```bash
   npm run build
   ```

4. **Start development mode**
   ```bash
   npm run dev
   ```

## Project Structure

This is a monorepo managed with Turbo and npm workspaces:

```
designers/
├── packages/
│   ├── core/              # Core design system logic
│   ├── cli/               # CLI tool for initialization
│   ├── react/             # React components and hooks
│   ├── animations/        # Animation utilities (Framer Motion & GSAP)
│   ├── integrations/      # UI library integrations (shadcn, MUI, etc.)
│   └── tailwind-plugin/   # Tailwind CSS plugin
├── apps/
│   ├── docs/              # Documentation site
│   └── playground/        # Development playground
└── examples/              # Usage examples
```

## Development Workflow

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the code standards below
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**
   ```bash
   npm run test
   npm run lint
   npm run type-check
   ```

4. **Build to ensure everything works**
   ```bash
   npm run build
   ```

### Working with Packages

- **Core package** (`packages/core`): Contains the main design system logic
- **CLI package** (`packages/cli`): The `npx designers init` command
- **React package** (`packages/react`): React-specific components and hooks
- **Animations package** (`packages/animations`): Animation utilities
- **Integrations package** (`packages/integrations`): UI library integrations
- **Tailwind plugin** (`packages/tailwind-plugin`): Tailwind CSS integration

## Code Standards

### TypeScript

- Use TypeScript for all new code
- Provide proper type definitions
- Export types for public APIs

### Code Style

- Use Prettier for formatting (configured in `.prettierrc`)
- Use ESLint for linting (configured in `.eslintrc.js`)
- Follow existing code patterns and conventions

### Naming Conventions

- Use camelCase for variables and functions
- Use PascalCase for components and classes
- Use kebab-case for file names
- Use UPPER_CASE for constants

### Documentation

- Add JSDoc comments for public APIs
- Update README files when adding new features
- Include examples in documentation

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests for specific package
npm run test --filter=@designers/core
```

### Writing Tests

- Write unit tests for all new functionality
- Use descriptive test names
- Include edge cases and error scenarios
- Test TypeScript types when applicable

## Submitting Changes

### Pull Request Process

1. **Ensure your branch is up to date**
   ```bash
   git checkout main
   git pull origin main
   git checkout your-branch
   git rebase main
   ```

2. **Create a changeset** (for version bumps)
   ```bash
   npm run changeset
   ```

3. **Push your branch**
   ```bash
   git push origin your-branch
   ```

4. **Create a Pull Request**
   - Use a clear, descriptive title
   - Include a detailed description of changes
   - Reference any related issues
   - Add screenshots for UI changes

### Pull Request Guidelines

- Keep PRs focused and atomic
- Include tests for new features
- Update documentation as needed
- Ensure all CI checks pass
- Request review from maintainers

## Release Process

This project uses Changesets for version management:

1. **Create changesets** for your changes:
   ```bash
   npm run changeset
   ```

2. **Version packages** (maintainers only):
   ```bash
   npm run version-packages
   ```

3. **Release** (maintainers only):
   ```bash
   npm run release
   ```

## Design System Guidelines

### Adding New Design Tokens

- Follow the existing token structure in `designers.config.json`
- Ensure tokens work with Tailwind CSS integration
- Add TypeScript types for new tokens
- Update documentation and examples

### Adding New Components

- Create components in the appropriate package
- Follow headless design principles
- Provide both styled and unstyled variants
- Include accessibility considerations
- Add Storybook stories if applicable

### Animation Guidelines

- Support both Framer Motion and GSAP
- Provide sensible defaults
- Allow customization through config
- Consider performance implications

## Getting Help

- Check existing issues and discussions
- Join our community discussions
- Reach out to maintainers for guidance

## Code of Conduct

Please be respectful and inclusive in all interactions. We're building this together!

---

Thank you for contributing to Designers! 🎨
