import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Knowledge Ecosystem',
  tagline: 'Reference architecture for governed knowledge systems',
  favicon: 'img/favicon.ico',

  future: {v4: true},

  url: 'https://knowledge-ecosystem-docs.vercel.app',
  baseUrl: '/',
  organizationName: 'matuteiglesias',
  projectName: 'knowledge-ecosystem-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {customCss: './src/css/custom.css'},
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    metadata: [
      {
        name: 'description',
        content: 'Reference architecture, authority map and integration roadmap for a governed knowledge-management ecosystem.',
      },
    ],
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Knowledge Ecosystem',
      logo: {alt: 'Knowledge Ecosystem Logo', src: 'img/logo.svg'},
      items: [
        {type: 'docSidebar', sidebarId: 'docs', position: 'left', label: 'Docs'},
        {to: '/docs/architecture/current-reference-architecture', label: 'Architecture', position: 'left'},
        {to: '/docs/architecture/ecosystem-registry', label: 'Registry', position: 'left'},
        {to: '/docs/roadmap/reference-architecture-build-bundle', label: 'Build Bundle', position: 'left'},
        {href: 'https://github.com/matuteiglesias/knowledge-ecosystem-docs', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Current Truth',
          items: [
            {label: 'Reference Architecture', to: '/docs/architecture/current-reference-architecture'},
            {label: 'Ecosystem Registry', to: '/docs/architecture/ecosystem-registry'},
            {label: 'Authority Model', to: '/docs/architecture/authority-model'},
          ],
        },
        {
          title: 'Build-up',
          items: [
            {label: 'Reference Architecture Bundle', to: '/docs/roadmap/reference-architecture-build-bundle'},
            {label: 'Knowledge Lifecycle', to: '/docs/architecture/knowledge-lifecycle'},
          ],
        },
        {
          title: 'Historical Context',
          items: [
            {label: 'Original Ecosystem Blueprint', to: '/docs/architecture/ecosystem-blueprint'},
            {label: 'Legacy Module Boundaries', to: '/docs/architecture/module-boundaries'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Matías Iglesias. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript', 'python'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
