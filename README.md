# Aryan Rai — Portfolio

A from-scratch React + TypeScript single-page portfolio with a monochrome space-tech direction, smooth scrolling, parallax-ready sections, live GitHub telemetry, and an optimized canvas black hole.

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- shadcn/ui-compatible structure
- Lenis for smooth scrolling
- lucide-react for interface icons
- Canvas renderer for the black-hole hero

## Run locally

```bash
npm install
npm run dev
```

## shadcn structure

The project uses `src/components/ui` as the canonical component directory and `@/components/ui/*` imports. This matters because shadcn's CLI and registry convention write reusable primitives there; keeping it consistent prevents imports and generated components from drifting into arbitrary folders.

For a fresh setup, the current shadcn Vite flow is:

```bash
npm create vite@latest
npm install tailwindcss @tailwindcss/vite
npx shadcn@latest init
```

Choose React + TypeScript when creating the Vite app. Tailwind v4 uses `@import "tailwindcss";` and the Vite plugin. The `@/*` alias is configured in both TypeScript configs and `vite.config.ts`.

## Content to replace in v2

- Project cards currently use Unsplash imagery as a visual placeholder layer.
- Replace each project card URL/text with the user's real projects and case studies.
- Add the final Code Blooded URL/logo when its preferred public destination is supplied.
- Add the music track as an opt-in audio control rather than autoplaying audio.
- Replace the LinkedIn URL if the user's canonical profile differs.
