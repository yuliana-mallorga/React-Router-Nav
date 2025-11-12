# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Router learning project built with Vite, React 19, and React Router v6. The application demonstrates routing, authentication patterns, role-based access control, and post management using Context API for state management.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run lint` - Run ESLint checks
- `npm run preview` - Preview production build locally

## Architecture

### Context-Based State Management

The application uses React Context API with two main providers:

1. **AuthProvider** (`src/components/auth/AuthProvider.jsx`)
   - Wraps the entire app in App.jsx
   - Manages user authentication state and role assignments
   - Provides `login()` and `logout()` functions via AuthContext
   - Role assignment is based on username matching against predefined lists in `roleList.js`
   - Roles: `isAdmin`, `isEditor`, `isBetaTester`

2. **PostProvider** (`src/components/post/PostProvider.jsx`)
   - Manages blog post CRUD operations
   - Uses localStorage for persistence
   - Provides draft state for create/edit operations
   - Auto-generates slugs from titles using `turnIntoSlug()` function
   - Post fields: id, title, slug, content, author, createAt, updateAt

### Routing Structure

The app uses HashRouter with the following route hierarchy:

- `/` - HomePage
- `/login` - LoginPage (public)
- `/logout` - LogoutPage (protected by AuthRoute)
- `/profile` - ProfilePage (protected by AuthRoute)
- `/blog` - BlogPage with nested routes
  - `/blog/:slug` - BlogPost (nested route using Outlet)

**Protected Routes**: Use the `<AuthRoute>` component which redirects unauthenticated users to `/login`.

### Key Patterns

**Custom Hooks**:
- `useAuth()` - Access AuthContext (user, login, logout)
- `usePost()` - Access PostContext (posts, draft, CRUD operations)

**PostForm Component**:
- Reusable form component with two modes: 'create' and 'edit'
- Controlled via `mode` prop and `targetIdOrSlug` for editing
- Handles form state through PostContext's draft system

**Role-Based Authorization**:
- User roles are assigned during login based on username
- Role lists defined in `src/components/auth/roleList.js`
- Format: `export const adminList = ['Username1', 'Username2']`

### Important Implementation Notes

**Bug in PostProvider.jsx**: Line 49 incorrectly assigns `draft.title.trim()` to the `author` variable - should be `draft.author.trim()`. Same bug exists on line 76.

**Slug Generation**: Posts automatically generate URL-friendly slugs from titles. If a slug collision occurs, a timestamp suffix is added.

**localStorage Key**: Posts are stored under the key 'posts', but line 30 in PostProvider has a bug - it uses `localStorage.getItem()` instead of `localStorage.setItem()`, preventing persistence.

## File Organization

```
src/
├── App.jsx                          # Root component with router setup
├── main.jsx                         # React app entry point
├── components/
│   ├── auth/
│   │   ├── AuthContext.jsx          # Context definition
│   │   ├── AuthProvider.jsx         # Context provider with logic
│   │   ├── AuthRoute.jsx            # Protected route wrapper
│   │   ├── useAuth.js               # Custom hook
│   │   └── roleList.js              # Role definitions
│   ├── post/
│   │   ├── PostContext.jsx          # Context definition
│   │   ├── PostProvider.jsx         # Context provider with CRUD
│   │   └── usePost.js               # Custom hook
│   ├── PostForm.jsx                 # Reusable create/edit form
│   ├── BlogPage.jsx                 # Blog list with Outlet
│   ├── BlogPost.jsx                 # Individual post view
│   ├── blogData.js                  # Initial blog data
│   └── [other page components]
```

## Adding New Features

**New Protected Route**: Wrap the route element with `<AuthRoute>` component.

**New Role**: Add to `roleList.js` and update the `login()` function in AuthProvider to check the new role list.

**Accessing User Info**: Use `const auth = useAuth()` then access `auth.user.username`, `auth.user.isAdmin`, etc.

**Post Operations**: Use `const { posts, createPost, updatePost, deletePost } = usePost()` in components.
