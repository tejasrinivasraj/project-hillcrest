# Implementation Plan: Company Web Application

## Overview

Build the Project Hillcrest company web application as a React + Vite SPA deployed to GitHub Pages. Implementation follows six milestones: architecture initialization, deployment configuration, core layout, service layer, page components, and styling. The app uses HashRouter for GitHub Pages compatibility, Zustand for state management, CSS Modules for scoped styling, and a mock service layer for data.

## Tasks

- [x] 1. Initialize Architecture
  - [x] 1.1 Scaffold Vite + React project and install dependencies
    - Run `npm create vite@latest . -- --template react` (or initialize in current directory)
    - Install dependencies: `react-router-dom`, `zustand`
    - Install dev dependencies: `gh-pages`
    - Remove boilerplate files (App.css, logo SVG, default counter code)
    - _Requirements: 12.1, 12.2_

  - [x] 1.2 Set up directory structure and path aliases
    - Create directories: `src/components`, `src/pages`, `src/layouts`, `src/hooks`, `src/services`, `src/store`, `src/utils`, `src/data`, `src/assets/styles`
    - Configure Vite path aliases (`@`, `@components`, `@hooks`, `@services`, `@store`, `@utils`, `@layouts`, `@pages`, `@assets`)
    - _Requirements: 12.1_

- [x] 2. Configure Deployment
  - [x] 2.1 Configure Vite for GitHub Pages
    - Set `base: '/project-hillcrest/'` in `vite.config.js`
    - Configure `build.outDir` to `dist`
    - Add manual chunks for vendor splitting (react, react-dom, react-router-dom) and state (zustand)
    - _Requirements: 12.1, 12.2_

  - [x] 2.2 Configure package.json for deployment
    - Set `"homepage": "https://tejasrinivasraj.github.io/project-hillcrest/"`
    - Add scripts: `"predeploy": "npm run build"`, `"deploy": "gh-pages -d dist"`
    - _Requirements: 12.2, 12.3_

- [x] 3. Establish Core Layout
  - [x] 3.1 Create MainLayout component with semantic HTML landmarks
    - Create `src/layouts/MainLayout.jsx` with `<nav>`, `<main>`, and `<footer>` elements
    - Use `<Outlet />` from react-router-dom for nested route rendering
    - Create `MainLayout.module.css` for layout styling
    - _Requirements: 7.1, 7.2, 7.4_

  - [x] 3.2 Create Navbar component with navigation links
    - Create `src/components/Navbar.jsx` with links to Home, About, Products, Team, Contact
    - Use `NavLink` from react-router-dom for active state indication
    - Implement responsive mobile menu toggle
    - Create `Navbar.module.css`
    - _Requirements: 6.1, 6.6, 7.3_

  - [x] 3.3 Create Footer component
    - Create `src/components/Footer.jsx` with company name and copyright
    - Use semantic `<footer>` element
    - Create `Footer.module.css`
    - _Requirements: 7.1, 7.2_

  - [x] 3.4 Set up HashRouter and route configuration in App.jsx
    - Configure `HashRouter` with all routes: `/` (Home), `/about`, `/products`, `/team`, `/contact`
    - Add wildcard `*` route for Not Found page
    - Wrap all routes in `MainLayout`
    - _Requirements: 6.2, 6.3, 6.4, 6.5_

- [x] 4. Checkpoint - Verify core layout renders
  - Ensure the app builds successfully with `npm run build`, ask the user if questions arise.

- [x] 5. Build Service Layer
  - [x] 5.1 Create API client with normalized response shape
    - Create `src/services/apiClient.js` implementing `createApiClient(baseURL, defaultHeaders)`
    - Implement `get`, `post`, `put`, `del` methods returning `{ data, ok, status, error }`
    - Add timeout handling with AbortController
    - Ensure the client never throws — always returns a normalized response
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [x] 5.2 Create mock data JSON files
    - Create `src/data/products.json` with placeholder AI product/solution entries (name, description, id)
    - Create `src/data/team.json` with team member entries (name, role, description)
    - _Requirements: 9.5, 9.6_

  - [x] 5.3 Create mock service with simulated latency
    - Create `src/services/mockData.js` implementing `mockFetch(dataPath)`
    - Add simulated delay (300ms) before returning data
    - Return responses matching `ApiResponse` shape (`{ data, ok, status, error }`)
    - _Requirements: 9.5, 9.6_

  - [x] 5.4 Create Zustand store
    - Create `src/store/appStore.js` with state: `user`, `isLoading`, `error`, `features`
    - Implement actions: `setLoading`, `setError`, `setUser`, `setFeatureState`, `reset`
    - Ensure `setFeatureState` updates only the specified key without mutating others
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

  - [x] 5.5 Create useFetch custom hook
    - Create `src/hooks/useFetch.js` with `{ data, loading, error, execute, setData }` return
    - Support `immediate` option for auto-fetch on mount
    - Handle loading/success/error state transitions deterministically
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

  - [ ]* 5.6 Write property tests for API client and store
    - **Property 1: API Client Response Shape Normalization** — verify all responses contain exactly `data`, `ok`, `status`, `error` fields
    - **Property 3: Zustand Store Feature State Isolation** — verify `setFeatureState` updates only the target key
    - **Property 4: Zustand Store Reset Idempotence** — verify `reset()` returns to initial state
    - **Property 6: Mock Service Interface Equivalence** — verify mock responses match API client shape
    - **Validates: Requirements 9.1, 8.2, 8.3, 9.5**

- [x] 6. Checkpoint - Verify service layer works
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Build Pages
  - [x] 7.1 Create Home page
    - Create `src/pages/HomePage.jsx` with hero section displaying "Project Hillcrest" and tagline "Vibe solutions for everyday life"
    - Add call-to-action linking to Products page
    - Use semantic heading hierarchy with `aria-labelledby`
    - Create `HomePage.module.css`
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [x] 7.2 Create About page
    - Create `src/pages/AboutPage.jsx` with company mission and vision content
    - Describe AI-driven solutions for everyday life
    - Create `AboutPage.module.css`
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 7.3 Create Products/Solutions page with data fetching
    - Create `src/pages/ProductsPage.jsx` using `useFetch` hook to load product data from mock service
    - Render loading indicator with `role="status"` and `aria-label`
    - Render error state with `role="alert"`
    - Render product cards showing name and description on success
    - Create `ProductsPage.module.css`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [x] 7.4 Create Team page
    - Create `src/pages/TeamPage.jsx` fetching team data from mock service
    - Display team members in card layout with name, role, and description
    - Create `TeamPage.module.css`
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 7.5 Create Contact page with form validation
    - Create `src/pages/ContactPage.jsx` with form fields: name, email, message
    - Implement client-side validation preventing submission of empty required fields
    - Display validation errors indicating which fields need attention
    - Show success confirmation on valid submission
    - Preserve user input on submission failure
    - Create `ContactPage.module.css`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [x] 7.6 Create Not Found page
    - Create `src/pages/NotFoundPage.jsx` with helpful message and link back to Home
    - _Requirements: 6.4_

  - [ ]* 7.7 Write property tests for page components
    - **Property 10: Product Card Rendering Completeness** — verify one card per product with name and description
    - **Property 11: Loading State ARIA Communication** — verify loading states include `role="status"` or `aria-busy`
    - **Property 12: Error State ARIA Communication** — verify errors include `role="alert"`
    - **Property 13: Contact Form Validation Rejects Empty Fields** — verify empty fields prevent submission
    - **Property 14: Contact Form Error Preserves Input** — verify input preserved on failure
    - **Validates: Requirements 5.6, 5.4, 5.5, 3.4, 3.5**

- [x] 8. Checkpoint - Verify all pages render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Build Shared UI Components
  - [x] 9.1 Create Button component
    - Create `src/components/Button.jsx` with props: `label`, `variant`, `size`, `disabled`, `loading`, `onClick`
    - Show spinner and set `aria-busy="true"` when loading
    - Disable click interaction when loading or disabled
    - Create `Button.module.css`
    - _Requirements: 13.4, 11.2_

  - [x] 9.2 Create Card component
    - Create `src/components/Card.jsx` with props: `title`, `children`, `className`, `onClick`
    - Apply rounded borders for warm/approachable feel
    - Create `Card.module.css`
    - _Requirements: 13.2, 4.3, 5.2_

  - [ ]* 9.3 Write property tests for shared components
    - **Property 15: Button Loading State Behavior** — verify spinner, aria-busy, and click prevention
    - **Validates: Requirements 13.4, 11.2**

- [x] 10. Style the Application
  - [x] 10.1 Create CSS design system with warm color palette
    - Create `src/assets/styles/variables.css` with CSS custom properties for warm colors, spacing, border-radius, typography
    - Define primary, secondary, accent colors with friendly/approachable tones
    - Set rounded border-radius values for cards, buttons, containers
    - _Requirements: 13.1, 13.2, 1.3_

  - [x] 10.2 Create global styles and reset
    - Create `src/assets/styles/global.css` importing variables
    - Add CSS reset/normalize
    - Set base typography, focus indicators for accessibility
    - Ensure visible focus indicators on all interactive elements
    - _Requirements: 11.5, 13.1_

  - [x] 10.3 Apply responsive layout styles
    - Add media queries to MainLayout, Navbar, and page components
    - Ensure no horizontal scrolling on mobile viewports
    - Adapt grid layouts for mobile, tablet, and desktop
    - _Requirements: 1.4, 7.3_

  - [x] 10.4 Wire up CSS Modules across all components
    - Ensure all components import their respective `.module.css` files
    - Verify no global style conflicts
    - Apply consistent spacing and visual hierarchy
    - _Requirements: 13.3, 7.4_

- [x] 11. Final Integration and Wiring
  - [x] 11.1 Wire entry point and verify full application flow
    - Update `src/main.jsx` to import global styles and render `<App />`
    - Verify all routes render correct pages within MainLayout
    - Verify navigation between pages works without full reload
    - _Requirements: 6.2, 6.3, 6.5, 7.1_

  - [ ]* 11.2 Write integration tests for routing and navigation
    - **Property 2: HashRouter Route Preservation** — verify refresh preserves route
    - **Property 7: Route Exhaustiveness** — verify unknown routes show Not Found
    - **Property 8: Navigation Without Reload** — verify SPA navigation
    - **Property 9: Layout Semantic Landmarks** — verify nav, main, footer on all pages
    - **Property 17: Active Navigation Indicator** — verify active link styling
    - **Validates: Requirements 6.2, 6.3, 6.4, 6.5, 6.6, 7.1, 7.2**

- [x] 12. Final Checkpoint - Production build verification
  - Run `npm run build` and verify production bundle builds without errors
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- The stack is React + Vite with JavaScript (JSX), HashRouter, Zustand, and CSS Modules
- GitHub username: `tejasrinivasraj`, repo: `project-hillcrest`
- Deployment URL: `https://tejasrinivasraj.github.io/project-hillcrest/`
- Property tests validate universal correctness properties from the design document
- Unit/integration tests validate specific examples and edge cases
