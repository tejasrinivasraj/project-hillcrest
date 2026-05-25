# Project Hillcrest — Company & Product Context

## About the Company

**Name:** Project Hillcrest  
**Tagline:** Vibe solutions for everyday life  
**Type:** SaaS platform — AI-driven solutions for content creators and everyday life  
**Target Audience:** Content creators (mid-tier, 10K–500K followers) and general consumers  

## Founders

- **Teja** — Co-Founder & CEO
- **Kabya** — Co-Founder & COO

## Mission

Build AI-powered tools that fit naturally into people's daily routines — helping them create, earn, plan, focus, and live better without friction. Technology should feel like a natural extension of life, not another thing to manage.

## Vision

A world where AI enhances human connection rather than replacing it. Smart tools handle the mundane so people can focus on what matters. We're building that future, one vibe at a time.

## Product Portfolio

### Active Development

| Product | Description | Status | Repo |
|---------|-------------|--------|------|
| **AI Rate Card Generator** | Helps Instagram creators determine fair pricing for brand deals using real engagement data. Generates shareable media kit links. | In Development (MVP) | Separate repo (TBD) |

### Backlog

| Product | Description | Status |
|---------|-------------|--------|
| **Sponsorship Inbox** | Dead-simple CRM for brand deals — Kanban board for tracking sponsorship pipeline from pitch to payment | Backlog |

### Planned (Consumer Products)

| Product | Description | Status |
|---------|-------------|--------|
| **Vibe Writer** | AI-powered writing assistant that helps craft emails, documents, and creative content with the user's personal tone and style | Planned |
| **Smart Scheduler** | Intelligent calendar management that learns preferences and automatically optimizes daily schedules | Planned |
| **Life Planner** | Personal AI companion for setting goals, tracking habits, and building routines that stick | Planned |
| **Mood Mixer** | Curates personalized music, lighting, and ambient experiences based on current mood and energy levels | Planned |
| **Recipe Genius** | Generates custom meal plans and recipes based on fridge contents, dietary needs, and taste preferences | Planned |
| **Focus Flow** | Adaptive productivity tool that creates distraction-free work sessions tailored to attention patterns | Planned |

## AI Rate Card Generator — Product Summary

**Target:** Mid-tier Instagram creators (10K–500K followers) who undercharge for brand deals  
**Value Prop:** Connect Instagram → get data-driven pricing recommendations → share a professional media kit link with brands  
**Viral Loop:** Creators share media kit links with brands → organic product awareness  
**Monetization:** Freemium (basic rate card free; premium adds niche benchmarks + custom branding) — payments are post-MVP  

**MVP Scope:**
- Instagram-only (YouTube/TikTok planned for future)
- Free tier for all users (no paywall enforcement yet)
- No caching, payments, or email infrastructure
- Deterministic pricing algorithm (no black-box ML)

**Tech Stack (Rate Card Generator):**
- Next.js 14 (App Router) — full-stack
- PostgreSQL (Supabase) + Prisma ORM
- NextAuth.js (Instagram OAuth)
- Tailwind CSS
- Deployed on Vercel
- Property-based testing with fast-check

**Post-MVP (P1):**
- Upstash Redis (caching)
- Stripe (payments/subscriptions)
- Resend (transactional email)
- YouTube + TikTok connectors
- Sponsorship Inbox product

## Marketing Website (This Repo)

**Purpose:** Company's public-facing marketing website  
**Tech Stack:**
- Frontend: React + Vite SPA deployed to GitHub Pages
- Routing: HashRouter (GitHub Pages compatible)
- State Management: Zustand
- Styling: CSS Modules with warm/approachable design system
- Architecture: Decoupled client — consumes REST/GraphQL APIs for dynamic data

**Repo:** https://github.com/tejasrinivasraj/project-hillcrest  
**Live Site:** https://tejasrinivasraj.github.io/project-hillcrest/

## Design Principles

1. **Warm & approachable** — Friendly colors, rounded elements, welcoming feel
2. **Accessible** — Semantic HTML, ARIA attributes, keyboard navigable
3. **Scalable** — Feature-based directory structure, service layer abstraction, mock-to-real API swap
4. **Fast** — Vite builds, code splitting, minimal bundle size

## Market Research Context

**Creator Economy (2026):**
- $250B+ globally, ~30% CAGR
- 300M+ people producing content for income
- Mid-tier creators (10K–500K) converting at higher rates than macro influencers but most underserved
- Key pain: no business infrastructure — deals managed in DMs, no pricing data, income scattered across 4-6 streams
- Industry shifting toward treating creators as businesses, not just media placements

**Competitive Landscape:**
- Analytics tools (VidIQ, HypeAuditor) are mostly brand-facing, not creator-first
- Monetization tools (Patreon, Ko-fi) focus on one revenue type
- No dominant "all-in-one" creator business tool exists
- Gap: simple, focused tools that solve one pain point really well

## Development Context

**This repo (marketing site):** Maintain warm/approachable visual style, use existing component library (Button, Card, etc.), follow service layer pattern for data fetching.

**Rate Card Generator (separate repo):** Standalone Next.js app. Spec lives at `.kiro/specs/ai-rate-card-generator/` in this repo for now; will move to the product repo when created.
