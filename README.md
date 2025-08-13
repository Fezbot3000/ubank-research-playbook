# Ubank Research Playbook - Integrated Version

A comprehensive research methods playbook designed to help teams choose and implement the right research methods for their projects.

## Overview

This project combines:
- **Custom Design System**: A complete component library with TypeScript support
- **Research Playbook Content**: Interactive guide for UX research methodology
- **No External CSS Frameworks**: Uses only the custom design system (no Tailwind, Bootstrap, etc.)

## Features

- 🧭 **Interactive Decision Tree**: Helps users find the right research method
- 📋 **Comprehensive Method Guides**: Step-by-step instructions for each research method
- 📚 **Resource Library**: Downloadable templates and guides
- 🎨 **Custom Design System**: Consistent, accessible UI components
- 🌓 **Theme Support**: Light/dark mode with system preference detection

## Tech Stack

- React 18 with TypeScript
- Vite for fast development and building
- React Router for navigation
- Custom design system with CSS variables
- Design tokens for consistent styling

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
src/
├── design-system/      # Custom design system components
│   ├── components/     # UI components (Button, Card, etc.)
│   ├── tokens/         # Design tokens (colors, spacing, etc.)
│   ├── providers/      # Theme provider
│   └── styles/         # Global CSS and component styles
├── components/         # App-specific components
├── pages/             # Route components
├── data/              # JSON data files for methods
└── main.tsx           # Application entry point
```

## Design System Components

The project uses a custom design system with the following components:

- **Button**: Primary, secondary, ghost, and destructive variants
- **Card**: Container component with multiple variants
- **Badge**: Status and label indicators
- **Icon**: SVG icon system with 180+ icons
- **Input**: Form input component
- **Navigation**: Flexible navigation component
- **Scrim**: Modal backdrop component

## Available Routes

- `/` - Home page with method grid and decision tree
- `/methods/:slug` - Individual method detail pages
- `/resources` - Resource library with templates
- `/analysis` - Decision tree analysis overview

## Customization

### Theme Colors

The design system uses CSS variables that can be customized in the theme provider. Colors automatically adjust for light/dark themes.

### Adding New Methods

1. Create a new JSON file in `src/data/methods/`
2. Add the method to `src/data/methods.ts`
3. The method page will be automatically generated

## License

MIT 