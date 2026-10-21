# AppScribe

A React + Vite blog and publishing app with a Tailwind UI and an Appwrite backend — write, review, and manage posts from one clean dashboard.

**Live:** https://app-scribe-dns.vercel.app/

## Features

- Email authentication powered by Appwrite (sign up, sign in, sign out)
- Create, edit, and delete posts, with featured-image uploads to Appwrite storage
- TinyMCE rich-text editor for post content
- Public post browsing for everyone, with live search by title or content
- Dark mode with a theme toggle (system-aware)
- Lenis smooth scrolling, GSAP scroll-reveal animations, and Motion page transitions
- Responsive UI built with Tailwind CSS and shadcn/ui components, Lucide icons throughout

## Tech stack

- React 19 + Vite
- React Router
- Redux Toolkit
- Tailwind CSS
- shadcn/ui (Radix)
- GSAP
- Lenis
- Motion (Framer Motion)
- Appwrite
- TinyMCE

## Getting started

```bash
git clone https://github.com/dns-18/AppScribe.git
cd AppScribe
npm install
cp .env.example .env
```

Fill in the environment variables in `.env`:

- `VITE_APPWRITE_URL`
- `VITE_APPWRITE_PROJECT_ID`
- `VITE_APPWRITE_DATABASE_ID`
- `VITE_APPWRITE_COLLECTION_ID`
- `VITE_APPWRITE_BUCKET_ID`
- `VITE_TINYMCE_API_KEY`

Then start the dev server:

```bash
npm run dev
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the app for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint over the project |

## Deployment

AppScribe is deployed on Vercel. The `vercel.json` in the project root contains an SPA rewrite (`/(.*)` → `/index.html`) so deep links and page refreshes on routes like `/login` and `/all-posts` resolve to the app instead of returning a 404.
