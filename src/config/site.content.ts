import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Independent reading platform',
  },
  footer: {
    tagline: 'Editorial articles and long-form reading',
  },
  hero: {
    badge: 'Editorial desk',
    title: ['A magazine home for', 'careful writing and ideas.'],
    description:
      'Read essays, reporting, and explainers in a calm layout built for focus—clear type, generous spacing, and a single editorial thread.',
    primaryCta: {
      label: 'Open latest articles',
      href: '/articles',
    },
    secondaryCta: {
      label: 'Search the archive',
      href: '/search',
    },
    searchPlaceholder: 'Search headlines, topics, and excerpts…',
    advancedSearchLabel: 'Advanced search',
    advancedSearchHref: '/search',
    focusLabel: 'Read',
    featureCardBadge: 'cover story',
    featureCardTitle: 'The lead story sets the tone for this edition.',
    featureCardDescription:
      'Featured pieces rotate on the cover while the rest of the issue stays easy to scan and read.',
  },
  home: {
    metadata: {
      title: 'Editorial articles and long-form reading',
      description:
        'Essays, guides, and reporting in a reading-first layout—clear hierarchy, comfortable measure, and fast loading.',
      openGraphTitle: 'Editorial articles and long-form reading',
      openGraphDescription:
        'Discover thoughtful articles and long-form posts in a calm, magazine-style reading experience.',
      keywords: ['articles', 'editorial', 'long-form', 'magazine', 'reading'],
    },
    introBadge: 'Letter from the editor',
    introTitle: 'One publication. One reading line. Articles first.',
    introParagraphs: [
      'This site is tuned for editorial reading: strong headlines, readable body copy, and sections that feel like a print magazine brought online.',
      'Everything in the shell points to articles—so visitors always know where to go for the latest issue and how to move deeper into the archive.',
      'The layout keeps friction low: fewer competing surfaces, more room for typography, spacing, and the story itself.',
    ],
    sideBadge: 'In this issue',
    sidePoints: [
      'Magazine-style rhythm with serif display titles and a restrained accent palette.',
      'Homepage sections mirror an editorial front page: lead, features, and browse-all.',
      'Cards and detail pages tuned for long reading sessions on phone, tablet, and desktop.',
      'Lightweight motion and CSS-first decoration so pages stay fast.',
    ],
    primaryLink: {
      label: 'Browse articles',
      href: '/articles',
    },
    secondaryLink: {
      label: 'Search archive',
      href: '/search',
    },
  },
  cta: {
    badge: 'Join the readers',
    title: 'Save your spot in the next edition.',
    description:
      'Create an account to follow writers, save pieces for later, and get updates when new articles ship—without changing how the publication works.',
    primaryCta: {
      label: 'Get Started Free',
      href: '/register',
    },
    secondaryCta: {
      label: 'Contact Sales',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and stories',
    description: 'Read articles, stories, guides, and long-form posts across topics and interests.',
  },
  listing: {
    title: 'Archive',
    description: 'This site focuses on articles and long-form reading. Browse the article library or search the archive.',
  },
  classified: {
    title: 'Archive',
    description: 'This site focuses on articles and long-form reading. Browse the article library or search the archive.',
  },
  image: {
    title: 'Archive',
    description: 'This site focuses on articles and long-form reading. Browse the article library or search the archive.',
  },
  profile: {
    title: 'Archive',
    description: 'This site focuses on articles and long-form reading. Browse the article library or search the archive.',
  },
  sbm: {
    title: 'Archive',
    description: 'This site focuses on articles and long-form reading. Browse the article library or search the archive.',
  },
  pdf: {
    title: 'Archive',
    description: 'This site focuses on articles and long-form reading. Browse the article library or search the archive.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Article-first reading',
    paragraphs: [
      'The public site is built around editorial articles—long-form stories, essays, and explainers with a calm reading layout.',
      'Other post types may exist for platform compatibility, but navigation and discovery here point to the article library.',
      'Use search to find topics, or start from the home page for the latest pieces.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Search archive', href: '/search' },
      { label: 'Home', href: '/' },
    ],
  },
  article: {
    title: 'Articles, stories, and long-form reading',
    paragraphs: [
      'This section is built for stories, explainers, guides, and long-form reading across topics and interests.',
      'Every piece is presented with editorial typography: clear hierarchy, comfortable line length, and space to breathe.',
      'Browse the latest, filter by category when you need focus, and open any story for a full reading view.',
    ],
    links: [
      { label: 'Search the archive', href: '/search' },
      { label: 'Back to home', href: '/' },
    ],
  },
  classified: {
    title: 'Article-first reading',
    paragraphs: [
      'The public site is built around editorial articles—long-form stories, essays, and explainers with a calm reading layout.',
      'Other post types may exist for platform compatibility, but navigation and discovery here point to the article library.',
      'Use search to find topics, or start from the home page for the latest pieces.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Search archive', href: '/search' },
      { label: 'Home', href: '/' },
    ],
  },
  image: {
    title: 'Article-first reading',
    paragraphs: [
      'The public site is built around editorial articles—long-form stories, essays, and explainers with a calm reading layout.',
      'Other post types may exist for platform compatibility, but navigation and discovery here point to the article library.',
      'Use search to find topics, or start from the home page for the latest pieces.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Search archive', href: '/search' },
      { label: 'Home', href: '/' },
    ],
  },
  profile: {
    title: 'Article-first reading',
    paragraphs: [
      'The public site is built around editorial articles—long-form stories, essays, and explainers with a calm reading layout.',
      'Other post types may exist for platform compatibility, but navigation and discovery here point to the article library.',
      'Use search to find topics, or start from the home page for the latest pieces.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Search archive', href: '/search' },
      { label: 'Home', href: '/' },
    ],
  },
  sbm: {
    title: 'Article-first reading',
    paragraphs: [
      'The public site is built around editorial articles—long-form stories, essays, and explainers with a calm reading layout.',
      'Other post types may exist for platform compatibility, but navigation and discovery here point to the article library.',
      'Use search to find topics, or start from the home page for the latest pieces.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Search archive', href: '/search' },
      { label: 'Home', href: '/' },
    ],
  },
  pdf: {
    title: 'Article-first reading',
    paragraphs: [
      'The public site is built around editorial articles—long-form stories, essays, and explainers with a calm reading layout.',
      'Other post types may exist for platform compatibility, but navigation and discovery here point to the article library.',
      'Use search to find topics, or start from the home page for the latest pieces.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Search archive', href: '/search' },
      { label: 'Home', href: '/' },
    ],
  },
  social: {
    title: 'Article-first reading',
    paragraphs: [
      'The public site is built around editorial articles—long-form stories, essays, and explainers with a calm reading layout.',
      'Other post types may exist for platform compatibility, but navigation and discovery here point to the article library.',
      'Use search to find topics, or start from the home page for the latest pieces.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Search archive', href: '/search' },
      { label: 'Home', href: '/' },
    ],
  },
  comment: {
    title: 'Article-first reading',
    paragraphs: [
      'The public site is built around editorial articles—long-form stories, essays, and explainers with a calm reading layout.',
      'Other post types may exist for platform compatibility, but navigation and discovery here point to the article library.',
      'Use search to find topics, or start from the home page for the latest pieces.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Search archive', href: '/search' },
      { label: 'Home', href: '/' },
    ],
  },
  org: {
    title: 'Article-first reading',
    paragraphs: [
      'The public site is built around editorial articles—long-form stories, essays, and explainers with a calm reading layout.',
      'Other post types may exist for platform compatibility, but navigation and discovery here point to the article library.',
      'Use search to find topics, or start from the home page for the latest pieces.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Search archive', href: '/search' },
      { label: 'Home', href: '/' },
    ],
  },
}
