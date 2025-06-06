# Atlas AI Frontend

A Next.js application with Clerk authentication for the Atlas AI system.

## Features

- Next.js 14 with App Router
- Clerk Authentication
- Material-UI with Dark Theme
- TypeScript Support
- Protected Routes
- Responsive Design

## Getting Started

1. **Install Dependencies**

```bash
npm install
```

2. **Configure Environment Variables**

Create a `.env.local` file in the root directory and add your Clerk credentials:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

Get your API keys from the [Clerk Dashboard](https://dashboard.clerk.dev/).

3. **Run Development Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx    # Root layout with Clerk Provider
│   └── page.tsx      # Home page with protected content
├── middleware.ts     # Clerk authentication middleware
└── components/       # Shared components
```

## Authentication Flow

- Users can sign up or sign in using Clerk's modal interface
- Protected routes require authentication
- User session management is handled by Clerk
- Automatic redirects for unauthenticated users

## Development

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint