# Designers Documentation

This is the official documentation site for the Designers design system, built with Next.js 14, Tailwind CSS, and Framer Motion.

## Features

- 🎨 **Beautiful Design** - Modern, clean interface inspired by the best documentation sites
- 🌙 **Advanced Theme Modes** - Light, Dark, Midnight (SaaS-style), and System modes with seamless switching
- 🌌 **Premium Effects** - Glass morphism, floating orbs, and glow effects in Midnight mode
- 📱 **Responsive** - Fully responsive design that works on all devices
- ⚡ **Fast** - Built with Next.js 14 and optimized for performance
- 🎭 **Animations** - Smooth animations powered by Framer Motion
- 🔍 **Search** - Full-text search across all documentation
- 📝 **Syntax Highlighting** - Beautiful code blocks with copy functionality
- 🧭 **Navigation** - Intuitive sidebar navigation with active states

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
apps/docs/
├── app/                    # Next.js 14 app directory
│   ├── docs/              # Documentation pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── code-block.tsx     # Syntax highlighted code blocks
│   ├── feature-card.tsx   # Feature showcase cards
│   ├── navigation.tsx     # Main navigation
│   └── theme-provider.tsx # Theme context provider
├── lib/                   # Utility functions
└── public/               # Static assets
```

## Customization

### Styling

The documentation uses Tailwind CSS with a custom design system that matches the Designers brand:

- **Colors**: Custom color palette with dark mode support
- **Typography**: Inter font family with custom font weights
- **Components**: Reusable component classes in `globals.css`

### Content

Documentation content is written in TypeScript/JSX for maximum flexibility:

- **Pages**: Located in `app/docs/`
- **Components**: Reusable UI components in `components/`
- **Code Examples**: Syntax highlighted with Prism.js

### Navigation

The sidebar navigation is configured in `app/docs/layout.tsx`:

```typescript
const navigation = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Installation', href: '/docs/installation' },
      // ...
    ],
  },
  // ...
]
```

## Deployment

The documentation is optimized for deployment on Vercel:

```bash
# Build and deploy
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run dev`
5. Submit a pull request

## License

MIT © arkit karmokar
