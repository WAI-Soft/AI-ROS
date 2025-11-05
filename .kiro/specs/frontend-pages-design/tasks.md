# Implementation Plan

- [x] 1. Set up infrastructure and shared components



  - Create routing structure for new pages (About, Solutions, Projects, Blog, Contact)
  - Set up API client with Axios including interceptors for error handling and request/response transformation
  - Create custom hooks: useIntersectionObserver for scroll animations, useScrollSpy for TOC, useAnimation for reusable animation logic
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 9.1, 9.3, 10.7_

- [x] 1.1 Create shared layout components

  - Implement PageHero component with support for title, subtitle, background image/video, CTAs, badge, and parallax effect
  - Implement SectionContainer component with consistent padding and background variants
  - Implement AnimatedCard component with hover effects (lift, glow, scale) and scroll-based animations
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_


- [x] 1.2 Set up animation utilities

  - Configure GSAP and Framer Motion for complex animations
  - Create animation variants for common patterns (fade-in-up, stagger, morph)
  - Implement Intersection Observer wrapper for performance-optimized scroll animations
  - _Requirements: 7.3, 7.6, 9.1, 9.9_

- [x] 2. Implement About page



  - Create About page route at /about
  - Fetch team members data from GET /api/v1/team endpoint
  - Implement responsive layout with mobile-first approach
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 8.1, 10.1_


- [x] 2.1 Build Mission and Vision section

  - Create MissionVisionSection component with mission statement, vision statement, and core values
  - Implement icon-based value cards with staggered fade-in animations
  - Add download button for company one-pager PDF
  - Style with bright background and readable typography maintaining design system consistency
  - _Requirements: 1.1, 7.1, 7.2, 7.3_


- [x] 2.2 Build Timeline section

  - Create TimelineSection component with milestone data structure
  - Implement vertical timeline for mobile, horizontal for desktop
  - Add click-to-expand accordion functionality for milestone details
  - Implement slide-from-left/right animations when scrolled into view
  - Style with visual line connecting milestones using gradient
  - _Requirements: 1.2, 7.3, 8.1_

- [x] 2.3 Build Leadership Team section


  - Create TeamMemberCard component with avatar, name, title, bio, and social links
  - Implement grid layout (1 col mobile, 2 tablet, 3-4 desktop)
  - Add hover flip effect or modal popup to reveal full bio
  - Integrate social media links (LinkedIn, Twitter) with icon buttons
  - Add round avatar with gradient border effect
  - _Requirements: 1.3, 1.4, 7.1, 7.3, 8.2, 8.4, 10.1_

- [x] 3. Implement Solutions pages



  - Create solution page template at /solutions/[slug]
  - Create three solution pages: Smart Agriculture, Smart Cities, Industrial Automation
  - Implement responsive layout for all solution pages
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 8.1_


- [x] 3.1 Build Solutions page hero section

  - Implement hero with solution name, tagline, and CTA buttons
  - Add background illustration with parallax effect
  - Implement headline reveal animation on page load
  - _Requirements: 2.2, 7.3, 9.9_


- [x] 3.2 Build Problem-Solution-Outcome section

  - Create ProblemSolutionOutcome component with three cards/rows
  - Add icons for each section (problem: alert, solution: lightbulb, outcome: check)
  - Implement staggered fade-in animation
  - Style with clean card design and subtle gradients
  - _Requirements: 2.3, 7.1, 7.3_


- [x] 3.3 Build Features section


  - Create FeatureGrid component with responsive grid (1 col mobile, 2 tablet, 3 desktop)
  - Implement feature cards with icons, titles, and descriptions
  - Add hover lift animation and click interaction for tooltips/modals
  - Integrate demo video modals with lazy loading
  - Style icons with background glow effect
  - _Requirements: 2.4, 7.3, 9.2_


- [x] 3.4 Build Dashboard Preview section

  - Create DashboardPreview component with mockup image and play button overlay
  - Implement fade-in animation on scroll
  - Add modal with lazy-loaded iframe for demo content
  - Make responsive with full-width on mobile
  - _Requirements: 2.5, 9.2_


- [x] 3.5 Build Tech Stack section

  - Create TechStackBadges component with chip/badge design
  - Implement bounce or stagger-in animation when entering viewport
  - Style with gradient background or border and rounded corners
  - Make badges wrap on multiple lines responsively
  - _Requirements: 2.6, 7.3_

- [x] 4. Implement Projects list page




  - Create Projects page route at /projects
  - Integrate with GET /api/v1/projects endpoint with pagination, filtering, and search
  - Implement URL parameter management for shareable filtered views
  - Handle loading states with skeleton screens
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 9.1, 9.7, 10.2_




- [ ] 4.1 Build Project filter bar
  - Create ProjectFilterBar component with sticky positioning
  - Implement category filters with pills and count badges
  - Add year dropdown and tag filters
  - Implement search input with icon
  - Add mobile collapsible drawer for filters
  - Implement instant AJAX filtering without page reload
  - Update URL parameters when filters change

  - _Requirements: 3.1, 3.2, 3.7, 8.1_

- [ ] 4.2 Build Project card and grid
  - Create ProjectCard component with image banner, gradient overlay, category badge, title, excerpt, and metadata
  - Implement ProjectGrid with responsive layout (1 col mobile, 2 tablet, 3 desktop)
  - Add staggered fade-up animation on entry
  - Implement hover effects: zoom image, slide up overlay, glowing border
  - Add click handler for navigation to detail page

  - Implement lazy loading for images with WebP format and srcset
  - _Requirements: 3.3, 3.4, 7.3, 8.2, 8.4, 9.2_

- [x] 4.3 Implement pagination and filtering animations



  - Add Load More button for pagination
  - Implement fade-out → reorder → fade-in animation on filter change using GSAP Flip
  - Add smooth scroll adjustment when loading more items
  - Display empty state with illustration when no results found
  - _Requirements: 3.6, 7.3_



- [ ] 5. Implement Project detail page
  - Create Project detail page route at /projects/[slug]
  - Integrate with GET /api/v1/projects/{slug} endpoint
  - Implement page transition from card to detail (morph animation)
  - Increment view count via background API call
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 10.3_


- [ ] 5.1 Build Project banner and hero
  - Create ProjectBanner component with full-width image/video
  - Add gradient overlay for text readability
  - Implement parallax scrolling effect on background
  - Display title and category chips with glass effect
  - Make responsive with reduced height on mobile

  - _Requirements: 4.2, 7.3, 9.9_

- [ ] 5.2 Build Quick Facts section
  - Create QuickFacts component displaying client, year, location, and key metrics
  - Implement as sidebar on desktop, section on mobile
  - Add icons for each fact
  - Implement animated counters for numeric metrics using CountUp.js

  - Style as card with subtle border and shadow
  - _Requirements: 4.3, 7.3_

- [ ] 5.3 Build Project description section
  - Render rich text content with proper typography
  - Implement zoom-in animation for embedded visuals
  - Add fade animation for paragraphs on scroll

  - Support embedded images, videos, and charts
  - Add download link for full case study PDF
  - _Requirements: 4.3, 9.2_

- [ ] 5.4 Build Media Gallery
  - Create MediaGallery component using Swiper.js
  - Implement carousel with thumbnails and navigation

  - Add lightbox functionality for full-screen viewing
  - Implement lazy loading for all images and videos
  - Add smooth slide transitions
  - _Requirements: 4.4, 7.3, 9.2_

- [x] 5.5 Build Tech Architecture Diagram

  - Create TechArchitectureDiagram component with interactive SVG
  - Implement hover effects to highlight connected nodes with glow
  - Add click interaction to open modal with node details
  - Make responsive with zoom and pan on mobile

  - Use CSS transitions for smooth interactions
  - _Requirements: 4.5, 7.3_

- [ ] 5.6 Build Results and Testimonials section
  - Create ResultsSection component with grid layout for results
  - Implement animated counters with staggered animations

  - Add testimonials carousel with slide-in animation

  - Style testimonials with quote icon and proper formatting
  - _Requirements: 4.6, 7.3_

- [ ] 5.7 Build Project CTA section
  - Implement sticky CTA button for mobile
  - Add CTA section at bottom for desktop
  - Implement subtle pulse animation after user scrolls past key metrics
  - Pre-fill contact form subject when CTA is clicked
  - _Requirements: 4.6, 7.3_

- [x] 6. Implement Blog/Insights pages


  - Create Blog list page route at /blog
  - Create Article detail page route at /blog/[slug]
  - Integrate with GET /api/v1/posts endpoint for list
  - Integrate with GET /api/v1/posts/{slug} endpoint for detail
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 10.4, 10.5_



- [ ] 6.1 Build Blog list page
  - Create ArticleCard component with thumbnail, tags, title, excerpt, author, and reading time
  - Implement responsive grid layout (1 col mobile, 2 tablet, 3 desktop)
  - Add fade-up animation on scroll
  - Implement hover effect: lift thumbnail and add shadow
  - Add topic filters and tag search functionality

  - _Requirements: 5.1, 5.3, 7.3, 8.1_

- [ ] 6.2 Build Article detail page
  - Create ArticleContent component with clean typography and optimal line length
  - Implement large hero image with article title and metadata
  - Display author avatar, name, publication date, and reading time
  - Render rich text content with proper formatting
  - Support embedded media with lazy loading
  - Style code blocks with syntax highlighting

  - Add special styling for pull quotes
  - _Requirements: 5.4, 5.5, 9.2_

- [ ] 6.3 Build Table of Contents and Share Bar
  - Implement sticky Table of Contents on desktop
  - Add scrollspy to highlight current section
  - Create ShareBar component with social share buttons (Twitter, LinkedIn, Facebook, Copy Link)
  - Make share bar sticky on desktop (left side) and bottom bar on mobile

  - Add smooth fade-in animation on scroll
  - Implement icon-only buttons with tooltips
  - _Requirements: 5.6, 7.3_


- [ ] 6.4 Add reading progress indicator
  - Implement reading progress bar at top of article page
  - Calculate progress based on scroll position
  - Style with gradient matching design system
  - _Requirements: 5.6_

- [x] 7. Implement Contact page

  - Create Contact page route at /contact
  - Integrate with POST /api/v1/contact endpoint
  - Implement reCAPTCHA v3 invisible protection
  - Handle pre-filled subject from project detail pages
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 10.6_

- [ ] 7.1 Build Contact form
  - Create ContactForm component with fields: name, company, email, subject, message

  - Implement React Hook Form for form management
  - Add inline validation with real-time error messages
  - Display required field indicators
  - Implement submit button with loading spinner state
  - Add reCAPTCHA v3 token generation on submit
  - _Requirements: 6.1, 6.2, 6.8, 8.4_

- [x] 7.2 Implement form submission and states

  - Handle form submission to POST /api/v1/contact endpoint
  - Implement success state with animated checkmark and reference ID display
  - Implement error state with clear messages without losing user input
  - Add form validation error handling (422 responses)
  - Prevent double submission
  - Clear form on successful submission
  - _Requirements: 6.3, 6.4, 6.5, 6.6, 10.6, 10.7_


- [ ] 7.3 Build Office Map and contact info
  - Create OfficeMap component with lazy-loaded Google Map
  - Add custom marker for office location
  - Implement contact information card overlay with address, phone, email, and hours
  - Add fade-in animation on scroll
  - Make responsive with full-width on mobile
  - Implement fallback to static map image if Maps API fails
  - _Requirements: 6.7_


- [ ] 8. Implement responsive design and accessibility
  - Ensure all pages are fully responsive across mobile, tablet, and desktop
  - Implement full keyboard navigation with visible focus indicators
  - Add ARIA labels and roles to all interactive components
  - Provide alt text for all images
  - Ensure proper form label associations

  - Verify color contrast ratios meet WCAG AA standards
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

- [ ] 8.1 Add bilingual support
  - Implement language switcher in header
  - Add support for English LTR and Arabic RTL layouts
  - Use i18n library (next-i18next) for managing translations
  - Ensure all UI elements are translatable
  - Mirror layouts properly for RTL
  - Save language preference in cookie
  - _Requirements: 8.7_


- [ ] 9. Optimize performance
  - Implement image optimization with Next.js Image component and WebP format
  - Add lazy loading for all images and heavy components
  - Implement code splitting for each page


  - Inline critical CSS and defer non-critical JavaScript
  - Set up CDN for static assets
  - Implement prefetching for linked pages
  - Add skeleton screens for loading states
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

- [ ] 9.1 Conduct performance audit
  - Run Google PageSpeed Insights on all key pages
  - Measure Core Web Vitals (LCP, FID, CLS)
  - Test with throttled network and slow CPU

  - Optimize based on audit results
  - Verify all pages achieve score > 90
  - _Requirements: 9.1_

- [ ] 10. Polish and final touches
  - Review all animations for smoothness and consistency
  - Verify all API integrations are working correctly

  - Test error handling for all API endpoints
  - Ensure loading states are displayed appropriately
  - Verify all links and navigation work correctly
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 10.7_

- [ ] 10.1 Conduct accessibility audit
  - Run automated accessibility tests with axe-core
  - Perform manual testing with screen readers (NVDA, JAWS)
  - Test full keyboard navigation
  - Verify color contrast with tools
  - Fix any accessibility issues found
  - _Requirements: 8.2, 8.3, 8.4, 8.5, 8.6_

- [ ] 10.2 Cross-browser testing
  - Test on Chrome, Firefox, Safari, and Edge (last 2 versions)
  - Test on mobile browsers (Safari iOS 13+, Chrome Android 8+)
  - Fix any browser-specific issues
  - Verify responsive behavior on various screen sizes
  - _Requirements: 8.1_
