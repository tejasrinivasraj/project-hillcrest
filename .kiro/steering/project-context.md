# Project Hillcrest — Company & Product Context

## About the Company

**Name:** Project Hillcrest  
**Tagline:** Vibe solutions for everyday life  
**Type:** SaaS platform — AI-driven solutions for day-to-day human life  
**Target Audience:** General consumers — everyone who wants their daily routines to feel smoother and more intentional  

## Founders

- **Teja** — Co-Founder & CEO
- **Kabya** — Co-Founder & COO

## Mission

Build AI-powered tools that fit naturally into people's daily routines — helping them write, plan, focus, and live better without friction. Technology should feel like a natural extension of life, not another thing to manage.

## Vision

A world where AI enhances human connection rather than replacing it. Smart tools handle the mundane so people can focus on what matters. We're building that future, one vibe at a time.

## Product Portfolio (Planned)

These are the AI-driven products we're building for our customers:

| Product | Description | Status |
|---------|-------------|--------|
| **Vibe Writer** | AI-powered writing assistant that helps craft emails, documents, and creative content with the user's personal tone and style | Planned |
| **Smart Scheduler** | Intelligent calendar management that learns preferences and automatically optimizes daily schedules | Planned |
| **Life Planner** | Personal AI companion for setting goals, tracking habits, and building routines that stick | Planned |
| **Mood Mixer** | Curates personalized music, lighting, and ambient experiences based on current mood and energy levels | Planned |
| **Recipe Genius** | Generates custom meal plans and recipes based on fridge contents, dietary needs, and taste preferences | Planned |
| **Focus Flow** | Adaptive productivity tool that creates distraction-free work sessions tailored to attention patterns | Planned |

## Technical Foundation

- **Frontend:** React + Vite SPA deployed to GitHub Pages
- **Routing:** HashRouter (GitHub Pages compatible)
- **State Management:** Zustand
- **Styling:** CSS Modules with warm/approachable design system
- **Architecture:** Decoupled client — consumes REST/GraphQL APIs for dynamic data
- **Repo:** https://github.com/tejasrinivasraj/project-hillcrest
- **Live Site:** https://tejasrinivasraj.github.io/project-hillcrest/

## Design Principles

1. **Warm & approachable** — Friendly colors, rounded elements, welcoming feel
2. **Accessible** — Semantic HTML, ARIA attributes, keyboard navigable
3. **Scalable** — Feature-based directory structure, service layer abstraction, mock-to-real API swap
4. **Fast** — Vite builds, code splitting, minimal bundle size

## Development Context

This repo currently contains the company's public-facing marketing website (MVP). Future development will add:
- Individual product landing pages as products move from planned → in development
- Authentication and user accounts when backend APIs are ready
- Dashboard experiences for each product
- API integrations replacing the current mock service layer

When building new features in this repo, maintain the warm/approachable visual style, use the existing component library (Button, Card, etc.), and follow the service layer pattern for data fetching.
