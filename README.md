# Webora - AI-Powered Website Builder

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Transform ideas into stunning websites in seconds with AI**

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## About

Webora is a cutting-edge AI-powered website builder that transforms simple text descriptions into beautiful, fully functional websites. The platform combines artificial intelligence with an intuitive visual editor, making professional web development accessible to everyone—no coding knowledge required.

This repository contains the **frontend client** built with React, TypeScript, and modern web technologies. For the backend API, visit [backend-server](https://github.com/JOSIAHTHEPROGRAMMER/backend-server).

### Key Capabilities

- **AI Website Generation**: Convert natural language descriptions into production-ready HTML/CSS/JavaScript
- **Real-time Preview**: Instant visual feedback with live code rendering
- **Visual Editor**: Click-to-edit interface with element-level customization
- **Version Control**: Track changes with full version history and rollback capability
- **Project Management**: Create, organize, and manage multiple website projects
- **Publishing**: Share your creations with public URLs
- **Community Gallery**: Explore websites created by other users

---

## Features

### AI-Powered Creation

- Natural language input for website generation
- Intelligent prompt processing
- Automatic Tailwind CSS styling
- Responsive design by default

### Advanced Editing

- Click-to-edit visual interface
- Modify text, colors, spacing, and styles in real-time
- Code preview with syntax highlighting
- Non-destructive editing workflow

### Project Management

- Comprehensive project dashboard
- Search and filter capabilities
- Version history and rollback
- Bulk operations (delete, export)

### User Experience

- Secure authentication with Better Auth
- Credit-based system for AI generations
- Stripe integration for credit purchases
- Responsive design across all devices
- Dark mode interface

### Publishing & Sharing

- One-click publishing to community gallery
- Public URLs for sharing
- Download complete HTML/CSS/JS code
- Preview before publishing

---

## Tech Stack

### Core Technologies

| Technology   | Version | Purpose                 |
| ------------ | ------- | ----------------------- |
| React        | 19.2.0  | UI Framework            |
| TypeScript   | 5.9.3   | Type Safety             |
| Vite         | 7.2.4   | Build Tool & Dev Server |
| React Router | 7.12.0  | Client-side Routing     |

### UI & Styling

| Technology   | Version | Purpose                     |
| ------------ | ------- | --------------------------- |
| Tailwind CSS | 4.1.18  | Utility-first CSS Framework |
| Lucide React | 0.562.0 | Icon Library                |
| Sonner       | 2.0.7   | Toast Notifications         |

### State & Data Management

| Technology     | Version | Purpose                   |
| -------------- | ------- | ------------------------- |
| Axios          | 1.13.2  | HTTP Client               |
| Better Auth UI | 3.3.15  | Authentication Components |

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or yarn/pnpm)
- **Git**: Latest version

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/JOSIAHTHEPROGRAMMER/Webora.git
cd Webora
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_BASEURL="http://localhost:3000"
```

For production, replace with your deployed backend URL:

```env
VITE_BASEURL="https://your-backend-url.vercel.app"
```

#### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

---

## Project Structure

```
Webora/
├── public/                    # Static assets
├── src/
│   ├── assets/               # Images, fonts, and media files
│   │   └── assets.ts        # Asset exports
│   ├── components/           # Reusable React components
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── Sidebar.tsx      # Project sidebar
│   │   ├── EditorPanel.tsx  # Visual element editor
│   │   ├── ProjectPreview.tsx # Website preview iframe
│   │   └── ...
│   ├── configs/              # Configuration files
│   │   └── axios.ts         # Axios HTTP client setup
│   ├── lib/                  # Utility libraries
│   │   ├── auth-client.ts   # Better Auth client
│   │   └── utils.ts         # Helper functions
│   ├── pages/                # Route pages
│   │   ├── Home.tsx         # Landing page
│   │   ├── Projects.tsx     # Project editor
│   │   ├── MyProjects.tsx   # User projects dashboard
│   │   ├── Community.tsx    # Published projects gallery
│   │   ├── Pricing.tsx      # Credit packages
│   │   ├── Careers.tsx      # Job listings
│   │   └── ...
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles
├── .env                       # Environment variables
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── vercel.json               # Vercel deployment config
```

---

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type check
npm run type-check
```

### Development Workflow

1. **Start the backend server** (see [backend-server](https://github.com/JOSIAHTHEPROGRAMMER/backend-server))
2. **Start the frontend dev server**: `npm run dev`
3. **Make changes** and see hot module replacement in action
4. **Test features** in the browser
5. **Commit changes** with meaningful messages

### Key Components

#### EditorPanel

The visual editor component that allows users to modify website elements by clicking on them in the preview.

```typescript
// Located at: src/components/EditorPanel.tsx
// Handles: Text editing, style modifications, color changes
```

#### ProjectPreview

Renders the generated website in an iframe with interactive editing capabilities.

```typescript
// Located at: src/components/ProjectPreview.tsx
// Handles: Code rendering, element selection, real-time updates
```

#### Sidebar

Project management sidebar with conversation history and version control.

```typescript
// Located at: src/components/Sidebar.tsx
// Handles: Chat interface, version history, project settings
```

---

## Deployment

### Deploy to Vercel

#### Step 1: Prepare for Deployment

Ensure your environment variables are configured for production:

```env
VITE_BASEURL="https://your-backend-url.vercel.app"
```

#### Step 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

#### Step 3: Deploy via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the `Webora` repository from GitHub
3. Configure project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `/`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variable:
   - **Key**: `VITE_BASEURL`
   - **Value**: Your backend URL
5. Click **Deploy**

#### Step 4: Configure Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to **Domains**
3. Add your custom domain
4. Update DNS records as instructed

### Build Optimization

The production build is optimized with:

- Code splitting for faster loading
- Asset optimization and compression
- Tree shaking to remove unused code
- Minification of JavaScript and CSS
- Modern ES modules for supported browsers

---

## Links

- **Frontend Repository**: [github.com/JOSIAHTHEPROGRAMMER/Webora](https://github.com/JOSIAHTHEPROGRAMMER/Webora)
- **Backend Repository**: [github.com/JOSIAHTHEPROGRAMMER/backend-server](https://github.com/JOSIAHTHEPROGRAMMER/backend-server)
- **Live Demo**: [Coming Soon]

---

## Acknowledgments

This project is built with the following open-source technologies:

- [React](https://reactjs.org/) - UI Framework
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Vite](https://vitejs.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Better Auth](https://github.com/better-auth/better-auth) - Authentication
- [Vercel](https://vercel.com/) - Deployment Platform

---

**Webora** - Transforming ideas into reality, one prompt at a time.
