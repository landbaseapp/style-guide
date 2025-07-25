# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (runs on host with vite)
- **Build**: `npm run build` (uses cross-env with increased memory allocation)
- **Lint**: `npm run lint` (ESLint on src/ for ts,tsx files)
- **Fix linting**: `npm run lint:fix`
- **Type checking**: `npm run tslint` (runs `tsc`)

## Architecture Overview

This is a React + TypeScript UI component library/style guide built with:

- **Build Tool**: Vite with React plugin
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Component Library**: Radix UI primitives as foundation
- **Icons**: Phosphor Icons
- **Testing**: Vitest with Testing Library
- **Documentation**: Storybook for component showcases

Please use existing components that is in `components/ui`, do not make your own components.

### Project Structure

- `src/components/ui/` - All reusable UI components organized by component type
- `src/utils/` - Utility functions (mainly Tailwind utilities)
- `src/App.tsx` - Demo application showcasing all components
- Each component has its own folder with:
  - Main component file (e.g., `Button.tsx`)
  - Index file for exports
  - Sub-components and variants as needed

### Component Architecture

Components follow a consistent pattern:
- Built on Radix UI primitives where applicable
- Use `class-variance-authority` (cva) for variant management
- Custom design system with semantic color tokens
- Components export both individual parts and compound components
- All components use forwardRef for proper ref handling
- Always use phosphor icons for icons, do not make your own icons

### Alias Configuration

The project uses path aliases:
- `src/` maps to `./src` for imports
- Custom alias for react-virtualized
