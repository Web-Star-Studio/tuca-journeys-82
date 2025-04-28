# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Framework
- This project is built with Lovable.dev platform
- Always refer to the [Lovable.dev documentation](https://docs.lovable.dev/) when generating or suggesting code
- Changes made via Lovable are automatically committed to the repository

## Build Commands
- Development: `npm run dev` - Start Vite development server
- Build: `npm run build` - Production build, `npm run build:dev` - Development build
- Lint: `npm run lint` - Run ESLint checks
- Preview: `npm run preview` - Preview production build locally

## Code Style Guidelines
- **TypeScript**: Relaxed typing - no strict mode, allows implicit any
- **Components**: Use functional components with React.FC typing
- **Imports**: Use path alias `@/` for project imports (e.g., `@/components`)
- **File Naming**: PascalCase for components, kebab-case for utilities
- **State Management**: Use React Context for global state, hooks for local state
- **Styling**: Tailwind CSS with shadcn/ui components
- **Error Handling**: Try/catch with console.error, use toast notifications for user feedback
- **API**: Use Supabase client from `@/lib/supabase`, handle errors with destructured error objects
- **Types**: Define interfaces for component props and contextual data