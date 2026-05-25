# Implementation Plan: AI Rate Card Generator

## Overview

Build a Next.js 14 full-stack application that connects to Instagram via OAuth, retrieves engagement data, runs a deterministic pricing algorithm, generates rate cards, and serves shareable media kit pages via SSR. MVP is Instagram-only, free tier for all users, no caching/payments/email infrastructure.

## Tasks

- [ ] 1. Project scaffolding and database setup
  - [ ] 1.1 Initialize Next.js 14 project with App Router, TypeScript, Tailwind CSS, and Prisma
    - Run `npx create-next-app@14` with TypeScript and App Router enabled
    - Install dependencies: `prisma`, `@prisma/client`, `next-auth`, `fast-check` (dev)
    - Configure Tailwind CSS with a warm/approachable design system
    - Set up the directory structure per the design: `app/`, `lib/`, `components/`, `types/`
    - Create `.env.example` with required environment variables (Supabase URL, Instagram app credentials, NextAuth secret)
    - _Requirements: 8.1_

  - [ ] 1.2 Define Prisma schema and generate initial migration
    - Create `prisma/schema.prisma` with all entities: Creator, PlatformConnection, MetricSnapshot, RateCard, FormatRate, PricingFactor, MediaKit, MediaKitView
    - Configure Supabase PostgreSQL as the datasource
    - Add enums for Platform, ContentFormat, RateCardStatus, FollowerBracket
    - Store rates in cents (integer), tokens encrypted at application level
    - Generate and apply the initial migration
    - _Requirements: 9.1, 9.5_

  - [ ] 1.3 Set up Prisma client singleton and database helpers
    - Create `lib/db/client.ts` with singleton pattern for serverless environments
    - Create `lib/db/helpers.ts` with common query utilities
    - _Requirements: 8.1_

- [ ] 2. Authentication and Instagram OAuth
  - [ ] 2.1 Configure NextAuth.js with Instagram provider
    - Set up `app/api/auth/[...nextauth]/route.ts` with NextAuth
    - Configure Instagram OAuth provider with `instagram_business_basic` and `instagram_business_manage_insights` scopes
    - Implement session callback to include creator ID
    - Create or find Creator record on first sign-in
    - _Requirements: 1.1, 1.2, 9.2_

  - [ ] 2.2 Implement token encryption and storage
    - Create `lib/auth/encryption.ts` with AES-256-GCM encrypt/decrypt functions for OAuth tokens
    - Store encrypted access and refresh tokens in PlatformConnection table
    - Implement token refresh logic when tokens expire
    - _Requirements: 9.1, 1.3_

  - [ ] 2.3 Build OAuth callback and platform connection flow
    - Create `app/(auth)/login/page.tsx` with Instagram connect button
    - Create `app/(auth)/callback/page.tsx` to handle OAuth redirect
    - On successful auth: exchange code for tokens, fetch profile, store PlatformConnection
    - On failure: display descriptive error message with retry option
    - _Requirements: 1.1, 1.3, 1.4_

  - [ ] 2.4 Implement account disconnection and deletion
    - Create API route `app/api/instagram/disconnect/route.ts` to revoke token and remove PlatformConnection
    - Create API route `app/api/account/delete/route.ts` to permanently remove all creator data (engagement data, tokens, rate cards, media kit, views)
    - _Requirements: 1.5, 9.3_

- [ ] 3. Instagram data retrieval
  - [ ] 3.1 Build Instagram API client
    - Create `lib/instagram/client.ts` implementing the PlatformConnector interface
    - Implement `getProfile()` — fetch user metadata (followers, bio, username)
    - Implement `getMediaInsights()` — paginate through media from last 90 days, fetch per-media insights (reach, impressions, engagement, saves, shares)
    - Implement `getAudienceDemographics()` — fetch audience city, country, gender/age breakdown
    - Handle rate limits (200 calls/user/hour) with exponential backoff
    - _Requirements: 2.1, 2.3_

  - [ ] 3.2 Implement engagement metrics aggregation
    - Create `lib/instagram/metrics.ts` to process raw API responses into MetricSnapshot format
    - Calculate per-format engagement rates (post, story, reel, carousel)
    - Calculate follower growth rate from account insights
    - Classify each media item by ContentFormat
    - Flag formats with fewer than 5 posts as insufficient data
    - Apply recency weighting: last 30 days weighted higher than days 31–90
    - _Requirements: 2.1, 2.2, 2.4, 2.5_

  - [ ] 3.3 Create data retrieval API route
    - Create `app/api/instagram/sync/route.ts` to orchestrate full data fetch
    - Store resulting MetricSnapshot in database
    - Return aggregated metrics to caller
    - Handle partial failures gracefully (some metrics unavailable)
    - _Requirements: 2.1, 2.3_

- [ ] 4. Pricing engine implementation
  - [ ] 4.1 Implement niche detection
    - Create `lib/pricing/niche-detection.ts`
    - Extract keywords from creator bio and recent captions
    - Match against predefined niche taxonomy (fitness, beauty, tech, food, travel, fashion, finance, lifestyle, parenting, gaming)
    - Assign primary niche based on highest keyword density
    - Fall back to "lifestyle" if no clear match
    - _Requirements: 4.1_

  - [ ] 4.2 Implement core pricing algorithm
    - Create `lib/pricing/engine.ts` implementing the PricingEngine interface
    - Implement base rate calculation: `FollowerCount × CPM_by_Niche × FormatMultiplier`
    - Implement engagement multiplier with clamping between 0.6 and 2.5
    - Implement audience quality score (GeoScore 0.4, GrowthScore 0.3, AuthenticityScore 0.3)
    - Implement recency weight (0.8–1.2) based on last 30 days vs full 90-day window
    - Calculate final rate: `RecommendedRate = BaseRate × EngagementMultiplier × AudienceQualityScore × RecencyWeight`
    - Calculate minimum rate: `MinimumRate = RecommendedRate × 0.7`
    - Exclude formats with fewer than 5 posts
    - Generate pricing factor explanations for each format
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 2.4_

  - [ ] 4.3 Seed niche benchmark data
    - Create `lib/benchmarks/data.ts` with seed benchmark data per niche × bracket
    - Include median engagement rates and pricing ranges from industry reports
    - Create `lib/benchmarks/service.ts` to query benchmarks by niche and follower bracket
    - Implement percentile ranking calculation for a creator's engagement within their benchmark group
    - _Requirements: 4.2, 4.3, 4.4_

  - [ ]* 4.4 Write property tests for pricing algorithm — Property 1: Rate range validity
    - **Property 1: Pricing algorithm produces valid rate ranges**
    - Use fast-check to generate arbitrary valid PricingInput (positive follower count, non-negative engagement rate, valid niche, at least one format with ≥5 posts)
    - Assert: for every format in output, minimum > 0 AND minimum ≤ recommended
    - Minimum 100 iterations
    - **Validates: Requirements 3.1, 3.4**

  - [ ]* 4.5 Write property tests for pricing algorithm — Property 2: Insufficient data exclusion
    - **Property 2: Insufficient data exclusion**
    - Use fast-check to generate inputs where some formats have <5 posts
    - Assert: output does NOT contain rates for formats with <5 posts
    - Minimum 100 iterations
    - **Validates: Requirements 2.4**

  - [ ]* 4.6 Write property tests for pricing algorithm — Property 3: Engagement multiplier bounds
    - **Property 3: Engagement multiplier is bounded**
    - Use fast-check to generate arbitrary engagement rates and niche medians
    - Assert: engagement multiplier is always between 0.6 and 2.5
    - Minimum 100 iterations
    - **Validates: Requirements 3.3**

  - [ ]* 4.7 Write property tests for pricing algorithm — Property 4: Explanation factor presence
    - **Property 4: Rate card contains explanation factors**
    - Use fast-check to generate valid inputs producing at least one format rate
    - Assert: each format in output has at least one PricingFactor with a named factorName
    - Minimum 100 iterations
    - **Validates: Requirements 3.5**

  - [ ]* 4.8 Write property tests for pricing algorithm — Property 5: Recency weighting monotonicity
    - **Property 5: Recency weighting monotonicity**
    - Use fast-check to generate metric sets where recent content (last 30 days) has higher engagement than older content (31–90 days)
    - Assert: recency-weighted score > unweighted average
    - Minimum 100 iterations
    - **Validates: Requirements 2.5**

  - [ ]* 4.9 Write property tests for benchmarks — Property 6: Percentile consistency
    - **Property 6: Niche benchmark percentile consistency**
    - Use fast-check to generate a benchmark dataset and a creator engagement rate
    - Assert: percentile ranking equals the sorted position of the creator's rate within the distribution
    - Minimum 100 iterations
    - **Validates: Requirements 4.3**

- [ ] 5. Checkpoint — Ensure pricing engine and property tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Rate card generation API
  - [ ] 6.1 Create rate card generation endpoint
    - Create `app/api/rate-card/generate/route.ts`
    - Orchestrate: fetch latest MetricSnapshot → run pricing engine → store RateCard, FormatRates, and PricingFactors in database
    - Set rate card status to "active", archive previous active card
    - Return generated rate card data
    - _Requirements: 3.1, 3.2, 3.4, 3.5_

  - [ ] 6.2 Implement rate card history and refresh
    - Create `app/api/rate-card/refresh/route.ts` for manual refresh (triggers sync + regeneration within 60 seconds)
    - Create `app/api/rate-card/history/route.ts` to return past rate cards
    - Implement significant change detection: if any format rate changes >15%, create notification record
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ]* 6.3 Write property test for significant change threshold — Property 8
    - **Property 8: Significant change notification threshold**
    - Use fast-check to generate old and new rate values
    - Assert: notification is generated if and only if absolute percentage change exceeds 15%
    - Minimum 100 iterations
    - **Validates: Requirements 6.3**

- [ ] 7. Media kit pages
  - [ ] 7.1 Implement media kit CRUD API
    - Create `app/api/media-kit/route.ts` for creating/updating media kit settings
    - Generate unique slug for each creator's media kit URL
    - Allow creator to select which content formats appear on their kit
    - Store customization options (visible formats, published state)
    - _Requirements: 5.1, 5.6_

  - [ ] 7.2 Build public media kit SSR page
    - Create `app/kit/[slug]/page.tsx` as a server-rendered page
    - Fetch creator profile, engagement highlights, audience demographics, and active rate card from database
    - Render: profile summary, engagement stats (aggregated only — no raw post data), audience demographics, rate card with format rates
    - Ensure responsive design for desktop and mobile
    - Target page load < 3 seconds
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 9.5_

  - [ ] 7.3 Implement media kit view tracking
    - Create `app/api/analytics/track/route.ts` to record view events
    - Capture: timestamp, referrer domain, country (from headers), user agent
    - Do NOT expose visitor identity to creator
    - _Requirements: 10.1, 10.3_

  - [ ] 7.4 Build analytics dashboard API
    - Create `app/api/analytics/views/route.ts` to return total views and view trends
    - Aggregate views by day/week for trend display
    - _Requirements: 10.2_

- [ ] 8. Creator dashboard UI
  - [ ] 8.1 Build onboarding flow
    - Create `app/(dashboard)/onboarding/page.tsx` with step-by-step flow
    - Steps: Welcome → Connect Instagram → Processing → View Rate Card
    - Auto-redirect to rate card view on completion
    - Target: complete onboarding within 5 minutes of account creation
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ] 8.2 Build rate card dashboard page
    - Create `app/(dashboard)/rate-card/page.tsx`
    - Display active rate card with per-format rates (minimum and recommended)
    - Show pricing factors that influenced each rate
    - Show niche and follower bracket assignment
    - Add manual refresh button
    - Show rate change history
    - _Requirements: 3.1, 3.4, 3.5, 6.4_

  - [ ] 8.3 Build media kit editor page
    - Create `app/(dashboard)/media-kit/page.tsx`
    - Allow creator to toggle which formats appear on public kit
    - Show preview of public media kit
    - Display shareable URL with copy button
    - Show publish/unpublish toggle
    - _Requirements: 5.6, 5.2_

  - [ ] 8.4 Build analytics page
    - Create `app/(dashboard)/analytics/page.tsx`
    - Display total media kit views and view trend chart
    - Show referrer domain breakdown (basic, no premium geo data for MVP)
    - _Requirements: 10.2_

  - [ ] 8.5 Build settings page with account management
    - Create `app/(dashboard)/settings/page.tsx`
    - Show connected Instagram account with disconnect option
    - Add account deletion with confirmation dialog
    - _Requirements: 1.5, 9.3_

- [ ] 9. Freemium access control and premium feature gating
  - [ ] 9.1 Implement tier-based feature gating middleware
    - Create `lib/auth/feature-gate.ts` with helper to check creator tier
    - For MVP: all users are free tier — gate premium features (niche benchmarks, custom branding, geo analytics) behind upgrade prompts
    - When free-tier creator accesses premium feature, return feature preview with upgrade prompt
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ]* 9.2 Write property test for free tier boundary — Property 9
    - **Property 9: Free tier feature boundary**
    - Use fast-check to generate arbitrary free-tier creator requests to premium endpoints
    - Assert: response always contains upgrade prompt, never premium data
    - Minimum 100 iterations
    - **Validates: Requirements 7.3, 7.4, 7.5**

- [ ] 10. Scheduled refresh (Vercel Cron)
  - [ ] 10.1 Implement weekly refresh cron job
    - Create `app/api/cron/refresh/route.ts` triggered by Vercel Cron (weekly)
    - For each creator with an active connection: fetch latest metrics, regenerate rate card
    - Detect >15% rate changes and store notification
    - Handle token refresh failures gracefully (mark connection as needing re-auth)
    - Configure `vercel.json` with cron schedule
    - _Requirements: 6.1, 6.2, 6.3_

- [ ] 11. Checkpoint — Ensure full application works end-to-end
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Error handling and data validation
  - [ ] 12.1 Implement global error handling
    - Create `lib/errors/app-error.ts` with AppError class matching the design's error format (code, message, action, retryable)
    - Create error boundary component for React error catching
    - Implement API route error handler middleware that returns consistent error responses
    - Handle: auth errors (token expired/revoked), API rate limits, insufficient data, network errors, data integrity issues
    - _Requirements: 1.4, 2.4_

  - [ ] 12.2 Implement input validation and data sanitization
    - Validate all Instagram API responses before storage (reject negative engagement values, impossible metrics)
    - Validate request inputs on all API routes
    - Ensure media kit pages expose only aggregated data, never raw post-level data
    - _Requirements: 9.5_

- [ ] 13. Final checkpoint — Ensure all tests pass and application is complete
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation throughout development
- Property tests validate the pricing engine's correctness guarantees using fast-check
- MVP scope: Instagram-only, free tier for all users, no Redis/Stripe/Resend
- Media kit pages are SSR (server-side rendered) directly from database — no caching layer for MVP
- All rates stored in cents (integer) to avoid floating-point issues
- OAuth tokens encrypted at rest with AES-256-GCM
