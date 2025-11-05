# Design Document

## Overview

This design document outlines the architecture, components, and implementation approach for the remaining frontend pages of the AI-ROS website. The design maintains visual and functional consistency with the existing home page, which features a dark, tech-focused aesthetic with cyan/teal gradient accents, smooth animations, and modern UI patterns.

The design follows a component-based architecture using React and Next.js, with reusable components that ensure consistency across all pages. All pages will integrate with the Laravel REST API backend for dynamic content delivery.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js Frontend                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    Pages Layer                         │  │
│  │  - About                - Projects (List & Detail)     │  │
│  │  - Solutions (3 pages)  - Blog (List & Article)       │  │
│  │  - Contact                                             │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                 Components Layer                       │  │
│  │  - Shared (Header, Footer, Navigation)                │  │
│  │  - Page-specific (TeamCard, ProjectCard, etc.)        │  │
│  │  - UI Components (Button, Card, Modal, etc.)          │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                   Hooks & Utils                        │  │
│  │  - useIntersectionObserver  - useScrollSpy            │  │
│  │  - useAnimation             - API client              │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│                    Laravel API Backend                       │
│  - /api/v1/team      - /api/v1/projects                     │
│  - /api/v1/posts     - /api/v1/contact                      │
└─────────────────────────────────────────────────────────────┘
```

### Design System Foundation

Based on the existing home page, the design system includes:

**Colors:**
- Background: `hsl(210, 40%, 8%)` - Deep dark blue
- Foreground: `hsl(0, 0%, 98%)` - Near white
- Secondary: `hsl(188, 95%, 42%)` - Cyan/Teal
- Accent: `hsl(188, 95%, 42%)` - Cyan (same as secondary)
- Muted: `hsl(210, 30%, 18%)` - Dark blue-gray
- Card: `hsl(210, 35%, 12%)` - Slightly lighter dark

**Typography:**
- Font family: System font stack (already configured)
- Base size: 16px
- Heading scale: 4xl to 7xl for heroes, 3xl to 5xl for sections
- Line height: 1.5 for body, 1.2 for headings

**Spacing:**
- Container: max-width with responsive padding (px-4 sm:px-6 lg:px-8)
- Section padding: py-20 to py-24
- Component gaps: gap-4 to gap-8

**Animation Principles:**
- Duration: 200-500ms for micro-interactions, 700-1000ms for page transitions
- Easing: cubic-bezier(0.4, 0, 0.2, 1) for smooth, natural motion
- Triggers: Intersection Observer for scroll-based animations
- Performance: Use transform and opacity for GPU acceleration

## Components and Interfaces

### Shared Components

#### 1. PageHero Component
Reusable hero section for all pages with consistent styling.

```typescript
interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  ctaButtons?: Array<{
    label: string;
    href: string;
    variant: 'primary' | 'secondary';
  }>;
  badge?: string;
  parallax?: boolean;
}
```

**Design:**
- Full-width section with dark gradient overlay
- Large, bold typography with gradient text effects
- Optional background image/video with parallax
- Responsive: Stack CTAs vertically on mobile
- Animation: Fade-in-up for title, staggered for CTAs

#### 2. SectionContainer Component
Wrapper for consistent section spacing and layout.

```typescript
interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  background?: 'default' | 'muted' | 'gradient';
  id?: string;
}
```

**Design:**
- Consistent padding (py-20 to py-24)
- Container with max-width and responsive padding
- Optional background variants (solid, gradient, pattern)
- Smooth scroll anchor support

#### 3. AnimatedCard Component
Base card component with hover effects and animations.

```typescript
interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: 'lift' | 'glow' | 'scale';
  animateOnScroll?: boolean;
  delay?: number;
}
```

**Design:**
- Rounded corners (rounded-2xl to rounded-3xl)
- Border with hover state (border-border hover:border-secondary/50)
- Shadow effects (hover:shadow-2xl hover:shadow-secondary/20)
- Transform on hover (hover:-translate-y-2 hover:scale-105)
- Backdrop blur for glass effect (backdrop-blur-sm)

### Page-Specific Components

#### About Page Components

**1. MissionVisionSection**
```typescript
interface MissionVisionSectionProps {
  mission: string;
  vision: string;
  values: Array<{
    icon: React.ComponentType;
    title: string;
    description: string;
  }>;
}
```

**Design:**
- Clean layout with icon-based value cards
- Staggered fade-in animations for each value
- Bright background with readable typography
- Download button for company one-pager

**2. TimelineSection**
```typescript
interface TimelineSectionProps {
  milestones: Array<{
    year: number;
    title: string;
    description: string;
    image?: string;
  }>;
}
```

**Design:**
- Vertical timeline on mobile, horizontal on desktop
- Interactive: Click to expand details (accordion)
- Slide-from-left/right animations on scroll
- Visual line connecting milestones with gradient

**3. TeamMemberCard**
```typescript
interface TeamMemberCardProps {
  member: {
    name: string;
    title: string;
    bio: string;
    avatar: string;
    linkedin_url?: string;
    twitter_url?: string;
  };
}
```

**Design:**
- Round avatar with gradient border
- Hover: Flip effect or modal popup for full bio
- Social links with icon buttons
- Grid layout: 2 columns on tablet, 3-4 on desktop

#### Solutions Page Components

**1. ProblemSolutionOutcome**
```typescript
interface ProblemSolutionOutcomeProps {
  problem: string;
  solution: string;
  outcome: string;
}
```

**Design:**
- Three horizontal cards or stacked rows
- Icon for each section (problem: alert, solution: lightbulb, outcome: check)
- Staggered fade-in animation
- Clean card design with subtle gradients

**2. FeatureGrid**
```typescript
interface FeatureGridProps {
  features: Array<{
    icon: React.ComponentType;
    title: string;
    description: string;
    demoVideo?: string;
  }>;
}
```

**Design:**
- Responsive grid (1 col mobile, 2 tablet, 3 desktop)
- Icon with background glow effect
- Hover: Lift animation
- Click: Open tooltip or modal with demo video
- Lazy-load demo videos

**3. DashboardPreview**
```typescript
interface DashboardPreviewProps {
  image: string;
  videoUrl?: string;
  title: string;
}
```

**Design:**
- Mockup image with play button overlay
- Fade-in on scroll
- Click: Expand to modal with lazy-loaded iframe
- Responsive: Full-width on mobile

**4. TechStackBadges**
```typescript
interface TechStackBadgesProps {
  technologies: string[];
}
```

**Design:**
- Chip/badge design with rounded corners
- Gradient background or border
- Bounce or stagger-in animation on appearance
- Wrap on multiple lines

#### Projects Page Components

**1. ProjectFilterBar**
```typescript
interface ProjectFilterBarProps {
  categories: Array<{ id: string; name: string; count: number }>;
  years: number[];
  tags: Array<{ id: string; name: string }>;
  onFilterChange: (filters: ProjectFilters) => void;
  onSearchChange: (query: string) => void;
}
```

**Design:**
- Sticky bar at top of page
- Pills with count badges for categories
- Dropdown for year selection
- Search input with icon
- Mobile: Collapsible drawer with filter button
- Smooth transitions when filters change

**2. ProjectCard**
```typescript
interface ProjectCardProps {
  project: {
    slug: string;
    title: string;
    excerpt: string;
    banner_image_url: string;
    categories: string[];
    year: number;
    location?: string;
  };
  animationDelay?: number;
}
```

**Design:**
- Image banner with gradient overlay
- Category badge in top-left corner
- Title, excerpt, and metadata
- "Read More" button
- Entry: Staggered fade-up animation
- Hover: Zoom image, slide up overlay, glowing border
- Click: Morph to detail page (Framer Motion shared layout)

**3. ProjectGrid**
```typescript
interface ProjectGridProps {
  projects: Project[];
  loading: boolean;
}
```

**Design:**
- Responsive grid (1 col mobile, 2 tablet, 3 desktop)
- Fade-out → reorder → fade-in on filter change
- Skeleton cards during loading
- Empty state with illustration

#### Project Detail Page Components

**1. ProjectBanner**
```typescript
interface ProjectBannerProps {
  title: string;
  categories: string[];
  image: string;
  video?: string;
}
```

**Design:**
- Full-width hero with parallax scrolling
- Gradient overlay for text readability
- Category chips with glass effect
- Responsive: Reduce height on mobile

**2. QuickFacts**
```typescript
interface QuickFactsProps {
  client?: string;
  year: number;
  location?: string;
  metrics: Record<string, string | number>;
}
```

**Design:**
- Sidebar on desktop, section on mobile
- Icon for each fact
- Animated counters for numeric metrics
- Card with subtle border and shadow

**3. MediaGallery**
```typescript
interface MediaGalleryProps {
  media: Array<{
    type: 'image' | 'video';
    url: string;
    caption?: string;
  }>;
}
```

**Design:**
- Swiper.js carousel with thumbnails
- Smooth slide transitions
- Click: Open lightbox for full-screen viewing
- Lazy-load images and videos
- Navigation arrows and pagination dots

**4. TechArchitectureDiagram**
```typescript
interface TechArchitectureDiagramProps {
  diagramSvg: string;
  nodes: Array<{
    id: string;
    label: string;
    description: string;
  }>;
}
```

**Design:**
- Interactive SVG diagram
- Hover: Highlight connected nodes with glow effect
- Click: Open modal with node details
- Responsive: Zoom and pan on mobile
- CSS transitions for smooth interactions

**5. ResultsSection**
```typescript
interface ResultsSectionProps {
  results: Array<{
    label: string;
    value: number;
    suffix: string;
  }>;
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
    company: string;
  }>;
}
```

**Design:**
- Grid layout for results with animated counters
- Carousel for testimonials with slide-in animation
- Quote icon and styling for testimonials
- Staggered animations for results

#### Blog Page Components

**1. ArticleCard**
```typescript
interface ArticleCardProps {
  article: {
    slug: string;
    title: string;
    excerpt: string;
    featured_image: string;
    tags: string[];
    reading_time: number;
    published_at: string;
    author: {
      name: string;
      avatar: string;
    };
  };
}
```

**Design:**
- Thumbnail with aspect ratio 16:9
- Tag badges at top
- Title, excerpt, and metadata
- Author avatar and name
- Reading time icon
- Hover: Lift thumbnail, add shadow
- Responsive: Full-width on mobile

**2. ArticleContent**
```typescript
interface ArticleContentProps {
  content: string;
  tableOfContents: Array<{
    id: string;
    title: string;
    level: number;
  }>;
}
```

**Design:**
- Clean typography with optimal line length (max-w-3xl)
- Sticky Table of Contents on desktop
- Scrollspy highlighting current section
- Embedded media with lazy loading
- Code blocks with syntax highlighting
- Pull quotes with special styling

**3. ShareBar**
```typescript
interface ShareBarProps {
  url: string;
  title: string;
}
```

**Design:**
- Sticky bar on desktop (left side)
- Bottom bar on mobile
- Social share buttons (Twitter, LinkedIn, Facebook, Copy Link)
- Icon-only buttons with tooltips
- Smooth fade-in on scroll

#### Contact Page Components

**1. ContactForm**
```typescript
interface ContactFormProps {
  prefilledSubject?: string;
  onSubmit: (data: ContactFormData) => Promise<void>;
}
```

**Design:**
- Clean layout with proper spacing
- Inline validation with error messages
- Required field indicators
- Submit button with loading spinner
- Success: Animated checkmark and reference ID display
- Error: Clear error messages without losing input
- reCAPTCHA v3 invisible integration

**2. OfficeMap**
```typescript
interface OfficeMapProps {
  address: string;
  coordinates: { lat: number; lng: number };
  phone: string;
  email: string;
  hours: string;
}
```

**Design:**
- Lazy-loaded Google Map with custom marker
- Contact information card overlay
- Fade-in animation on scroll
- Responsive: Full-width on mobile
- Fallback: Static map image if Maps API fails

## Data Models

### API Response Types

```typescript
// Team Member
interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  linkedin_url?: string;
  twitter_url?: string;
  order: number;
}

// Project
interface Project {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  banner_image_url: string;
  client?: string;
  year: number;
  location?: string;
  key_metrics: Record<string, any>;
  tech_stack: string[];
  categories: Category[];
  tags: Tag[];
  media: Media[];
  status: 'published' | 'draft';
  featured: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

// Blog Post
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  reading_time: number;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  tags: Tag[];
  status: 'published' | 'draft';
  published_at: string;
  view_count: number;
  created_at: string;
  updated_at: string;
}

// Category
interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

// Tag
interface Tag {
  id: number;
  name: string;
  slug: string;
}

// Media
interface Media {
  id: number;
  type: 'image' | 'video';
  url: string;
  caption?: string;
  order: number;
}

// Contact Form Submission
interface ContactFormData {
  name: string;
  company?: string;
  email: string;
  subject: string;
  message: string;
  recaptcha_token: string;
}

interface ContactFormResponse {
  success: boolean;
  reference_id: string;
  message: string;
}
```

## Error Handling

### API Error Handling Strategy

**1. Network Errors**
- Display user-friendly message: "Unable to connect. Please check your internet connection."
- Provide retry button
- Log error to error tracking service (Sentry)

**2. 404 Not Found**
- Redirect to custom 404 page with navigation options
- Suggest related content
- Search functionality

**3. 500 Server Errors**
- Display: "Something went wrong on our end. Please try again later."
- Provide contact information
- Log error with full context

**4. Validation Errors (422)**
- Display inline error messages for each field
- Highlight invalid fields with red border
- Preserve user input
- Scroll to first error

**5. Rate Limiting (429)**
- Display: "Too many requests. Please wait a moment and try again."
- Show countdown timer
- Disable submit button temporarily

### Loading States

**1. Initial Page Load**
- Display skeleton screens matching page layout
- Fade in content when loaded
- Progressive enhancement: Show critical content first

**2. Filter/Search Updates**
- Show loading spinner in filter bar
- Fade out current results
- Fade in new results
- Maintain scroll position

**3. Form Submission**
- Disable form inputs
- Show spinner on submit button
- Prevent double submission
- Clear form on success

## Testing Strategy

### Unit Testing
- Test individual components in isolation
- Mock API responses
- Test animation triggers and cleanup
- Test form validation logic
- Tools: Jest, React Testing Library

### Integration Testing
- Test API integration with mock server
- Test navigation between pages
- Test filter and search functionality
- Test form submission flow
- Tools: Jest, MSW (Mock Service Worker)

### E2E Testing
- Test complete user flows
- Test responsive behavior
- Test accessibility with screen readers
- Test performance metrics
- Tools: Cypress or Playwright

### Visual Regression Testing
- Capture screenshots of all pages
- Compare against baseline
- Detect unintended visual changes
- Tools: Percy or Chromatic

### Performance Testing
- Measure Core Web Vitals (LCP, FID, CLS)
- Test with throttled network
- Test with slow CPU
- Optimize based on results
- Tools: Lighthouse, WebPageTest

### Accessibility Testing
- Automated testing with axe-core
- Manual testing with screen readers (NVDA, JAWS)
- Keyboard navigation testing
- Color contrast verification
- Tools: axe DevTools, WAVE

## Design Decisions and Rationales

### 1. Component-Based Architecture
**Decision:** Use a component-based architecture with reusable components.
**Rationale:** Ensures consistency, reduces code duplication, and makes maintenance easier. Components can be tested in isolation and reused across pages.

### 2. Animation Strategy
**Decision:** Use Intersection Observer for scroll-based animations with GSAP and Framer Motion for complex animations.
**Rationale:** Intersection Observer provides excellent performance by only animating elements when they're visible. GSAP and Framer Motion offer powerful animation capabilities with good developer experience.

### 3. Image Optimization
**Decision:** Use Next.js Image component with WebP format and lazy loading.
**Rationale:** Automatic optimization, responsive images, and lazy loading improve performance significantly. WebP provides better compression than JPEG/PNG.

### 4. State Management
**Decision:** Use React Context API for global state (theme, language) and local state for component-specific data.
**Rationale:** Avoids over-engineering with Redux for a content-focused website. Context API is sufficient for the limited global state needs.

### 5. API Client
**Decision:** Use Axios with interceptors for API communication.
**Rationale:** Axios provides a clean API, automatic JSON transformation, and interceptors for global error handling and authentication.

### 6. Form Handling
**Decision:** Use React Hook Form for form management.
**Rationale:** Excellent performance with minimal re-renders, built-in validation, and easy integration with UI libraries.

### 7. Styling Approach
**Decision:** Use Tailwind CSS with custom design tokens.
**Rationale:** Rapid development, consistent spacing/sizing, and easy customization. The utility-first approach works well with component-based architecture.

### 8. Responsive Strategy
**Decision:** Mobile-first responsive design with breakpoints at 640px, 768px, 1024px, and 1280px.
**Rationale:** Mobile-first ensures good mobile experience and progressive enhancement for larger screens. Breakpoints align with Tailwind's defaults.

### 9. Animation Performance
**Decision:** Use transform and opacity for animations, avoid animating layout properties.
**Rationale:** Transform and opacity are GPU-accelerated and don't trigger layout recalculation, resulting in smooth 60fps animations.

### 10. Accessibility First
**Decision:** Build accessibility into components from the start, not as an afterthought.
**Rationale:** Easier to build accessible components initially than to retrofit accessibility. Ensures WCAG 2.1 AA compliance and better user experience for all users.

## Implementation Phases

### Phase 1: Shared Components and Infrastructure
- Set up routing for new pages
- Create shared components (PageHero, SectionContainer, AnimatedCard)
- Implement API client with error handling
- Create custom hooks (useIntersectionObserver, useScrollSpy, useAnimation)
- Set up animation utilities

### Phase 2: About Page
- Implement MissionVisionSection
- Implement TimelineSection
- Implement TeamMemberCard and team grid
- Integrate with /api/v1/team endpoint
- Add animations and transitions

### Phase 3: Solutions Pages
- Create solution page template
- Implement ProblemSolutionOutcome component
- Implement FeatureGrid component
- Implement DashboardPreview component
- Implement TechStackBadges component
- Create three solution pages (Smart Agriculture, Smart Cities, Industrial Automation)

### Phase 4: Projects Pages
- Implement ProjectFilterBar
- Implement ProjectCard and ProjectGrid
- Implement pagination/load more
- Integrate with /api/v1/projects endpoint
- Implement ProjectBanner for detail page
- Implement QuickFacts component
- Implement MediaGallery component
- Implement TechArchitectureDiagram component
- Implement ResultsSection component
- Add page transitions

### Phase 5: Blog Pages
- Implement ArticleCard and article grid
- Implement topic filters
- Integrate with /api/v1/posts endpoint
- Implement ArticleContent component
- Implement Table of Contents with scrollspy
- Implement ShareBar component
- Add reading progress indicator

### Phase 6: Contact Page
- Implement ContactForm with validation
- Integrate reCAPTCHA v3
- Implement form submission to /api/v1/contact
- Implement success/error states
- Implement OfficeMap component
- Add contact information section

### Phase 7: Polish and Optimization
- Optimize images and assets
- Implement code splitting
- Add loading states and skeleton screens
- Refine animations and transitions
- Conduct accessibility audit
- Conduct performance audit
- Fix any issues found in testing

## Responsive Breakpoints

```css
/* Mobile First Approach */
/* Default: Mobile (< 640px) */

/* Small tablets and large phones */
@media (min-width: 640px) { /* sm */ }

/* Tablets */
@media (min-width: 768px) { /* md */ }

/* Small laptops */
@media (min-width: 1024px) { /* lg */ }

/* Desktops */
@media (min-width: 1280px) { /* xl */ }

/* Large desktops */
@media (min-width: 1536px) { /* 2xl */ }
```

## Accessibility Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible and clear
- [ ] ARIA labels and roles are properly implemented
- [ ] Alt text provided for all images
- [ ] Form labels properly associated with inputs
- [ ] Color contrast meets WCAG AA standards (4.5:1 for normal text)
- [ ] Heading hierarchy is logical (H1 → H2 → H3)
- [ ] Skip links provided for main content
- [ ] Screen reader announcements for dynamic content
- [ ] No keyboard traps
- [ ] Sufficient touch target sizes (minimum 44x44px)
- [ ] Error messages are descriptive and helpful
- [ ] Time-based content can be paused or extended
- [ ] No content flashes more than 3 times per second

## Performance Targets

- Google PageSpeed Insights score: > 90 (mobile and desktop)
- Largest Contentful Paint (LCP): < 2.5 seconds
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1
- Time to First Byte (TTFB): < 200ms
- Total page size: < 2MB (including images)
- JavaScript bundle size: < 300KB (gzipped)
- Number of HTTP requests: < 50

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 13+)
- Chrome Mobile (Android 8+)

## Conclusion

This design provides a comprehensive blueprint for implementing the remaining frontend pages while maintaining consistency with the existing home page theme. The component-based architecture ensures reusability and maintainability, while the focus on performance and accessibility ensures a high-quality user experience across all devices and user needs.
