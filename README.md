# React Router - Learning Project

Educational blog application developed as part of Platzi's React Router course. Demonstrates the use of React Router v6, state management with Context API, authentication, and post CRUD operations.

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Architecture](#️-architecture)
- [Project Structure](#-project-structure)
- [Using Custom Hooks](#-using-custom-hooks)
- [Creating a New Post](#-creating-a-new-post)
- [Protecting a Route](#-protecting-a-route)
- [React Router Concepts](#-react-router-concepts-demonstrated)
- [Resources](#-resources)
- [License](#-license)
- [Author](#-author)

## 🚀 Features

- **Authentication System**
  - User login/logout
  - Role-based access control (Admin, Editor, Beta Tester)
  - Protected routes with automatic redirection

- **Post Management**
  - Create, edit, and delete posts
  - Automatic SEO-friendly slug generation
  - Draft system for forms
  - Persistence with localStorage

- **Advanced Navigation**
  - React Router v6 with nested routes
  - HashRouter for compatibility
  - Outlet for child route rendering

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Routing
- **Context API** - State management
- **localStorage** - Data persistence

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** - Version 18.x or higher
  - Check version: `node --version`
  - Download: [https://nodejs.org/](https://nodejs.org/)

- **npm** - Version 9.x or higher (comes with Node.js)
  - Check version: `npm --version`

- **Git** - For cloning the repository
  - Check version: `git --version`
  - Download: [https://git-scm.com/](https://git-scm.com/)

- **A modern web browser** - Chrome, Firefox, Safari, or Edge (latest version)

- **Code Editor** (recommended) - VS Code, WebStorm, or similar

## ⚡ Quick Start

Get up and running in 3 simple steps:

```bash
# 1. Clone the repository (if you haven't already)
git clone <your-repository-url>
cd React-Router-nav

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The application will open automatically in your browser at **http://localhost:5173/**

### 🎯 Try it out:

1. **Navigate to the Blog** - Click on "Blog" in the menu
2. **Login** - Go to `/login` and enter any username (e.g., "Username1" for admin access)
3. **Create a Post** - Once logged in, try creating a new blog post
4. **Test Protected Routes** - Try accessing `/profile` before and after logging in

## 📦 Installation

### Detailed Installation Steps

```bash
# Install dependencies
npm install

# Start development server (opens at http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint checks
npm run lint
```

### Development Server

When you run `npm run dev`, Vite starts a development server with:
- **Hot Module Replacement (HMR)** - Changes reflect instantly
- **Fast refresh** - Preserves component state
- **Default port**: 5173 (configurable in `vite.config.js`)

## 🏗️ Architecture

### Context Providers

The project uses two main contexts:

1. **AuthProvider** - Manages authentication and user roles
2. **PostProvider** - Manages post CRUD with draft system

### Route Structure

```
/                   → HomePage (public)
/login              → LoginPage (public)
/logout             → LogoutPage (protected)
/profile            → ProfilePage (protected)
/blog               → BlogPage (public)
  └─ /blog/:slug    → BlogPost (nested route)
```

### User Roles

Roles are automatically assigned based on username configured in `src/components/auth/roleList.js`:

- **Admin** - Full access
- **Editor** - Can edit posts
- **Beta Tester** - Access to experimental features

```javascript
// Role configuration example
export const adminList = ['Username1', 'Username2']
export const editorList = ['Username3', 'Username4']
export const betaTesterList = ['Username5', 'Username6']
```

## 📁 Project Structure

```
src/
├── App.jsx                          # Root component with router
├── main.jsx                         # Entry point
├── components/
│   ├── auth/
│   │   ├── AuthContext.jsx          # Authentication context
│   │   ├── AuthProvider.jsx         # Provider with logic
│   │   ├── AuthRoute.jsx            # HOC for protected routes
│   │   ├── useAuth.js               # Custom hook
│   │   └── roleList.js              # Role configuration
│   ├── post/
│   │   ├── PostContext.jsx          # Post context
│   │   ├── PostProvider.jsx         # Provider with CRUD
│   │   └── usePost.js               # Custom hook
│   ├── PostForm.jsx                 # Reusable form
│   ├── BlogPage.jsx                 # Post list
│   ├── BlogPost.jsx                 # Individual post view
│   └── [other components]
```

## 🔧 Using Custom Hooks

### useAuth

```javascript
import useAuth from './components/auth/useAuth'

function MyComponent() {
  const { user, login, logout } = useAuth()

  // Access user data
  const isAdmin = user?.isAdmin
  const username = user?.username
}
```

### usePost

```javascript
import { usePost } from './components/post/usePost'

function MyComponent() {
  const {
    posts,
    draft,
    createPost,
    updatePost,
    deletePost,
    setDraftField
  } = usePost()
}
```

## 📝 Creating a New Post

```javascript
// The form uses the draft system
<PostForm
  mode="create"
  onSuccess={() => navigate('/blog')}
/>

// For editing
<PostForm
  mode="edit"
  targetIdOrSlug={slug}
  onSuccess={() => navigate(`/blog/${slug}`)}
/>
```

## 🔒 Protecting a Route

```javascript
import { AuthRoute } from './components/auth/AuthRoute'

<Route
  path="/protected"
  element={
    <AuthRoute>
      <ProtectedComponent />
    </AuthRoute>
  }
/>
```

## 🎓 React Router Concepts Demonstrated

- ✅ HashRouter and BrowserRouter
- ✅ Routes and nested Routes
- ✅ Outlet for child routes
- ✅ useNavigate for programmatic navigation
- ✅ Route params with :slug
- ✅ Protected routes with redirection
- ✅ Navigate component for redirects

## 📚 Resources

- [React Router Documentation](https://reactrouter.com/)
- [React Router Course on Platzi](https://platzi.com/)
- [Vite Documentation](https://vitejs.dev/)

## 📄 License

This project is licensed under the **MIT License**.

### MIT License

```
MIT License

Copyright (c) 2024 [Yuliana]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

This means you can:
- ✅ Use this project for learning
- ✅ Modify and adapt the code
- ✅ Share with others
- ✅ Use in commercial projects

## 👤 Author

Educational project developed during Platzi's React Router course.

---

**Note**: This project uses HashRouter for compatibility. In production, consider using BrowserRouter with proper server configuration.
