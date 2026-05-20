import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Knowledge Ecosystem',
  tagline: 'Paper processing, knowledge contracts, and review snapshots',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // Change this later if you attach a custom domain.
  // For Vercel/Netlify root deployments, keep baseUrl as '/'.
  url: 'https://knowledge-ecosystem-docs.vercel.app',
  baseUrl: '/',

  organizationName: 'matuteiglesias',
  projectName: 'knowledge-ecosystem-docs',

  // Do not let broken links block production deploys.
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

        // Disable template blog for now. This site is an operator/docs surface.
        blog: false,

        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',

    metadata: [
      {
        name: 'description',
        content:
          'A modular knowledge toolchain for paper processing, knowledge contracts, and review snapshots.',
      },
    ],

    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },

    navbar: {
      title: 'Knowledge Ecosystem',
      logo: {
        alt: 'Knowledge Ecosystem Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/quickstart',
          label: 'Quickstart',
          position: 'left',
        },
        {
          to: '/docs/architecture/ecosystem-blueprint',
          label: 'Blueprint',
          position: 'left',
        },
        {
          href: 'https://github.com/matuteiglesias',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Start',
          items: [
            {
              label: 'Intro',
              to: '/docs/intro',
            },
            {
              label: 'Quickstart',
              to: '/docs/quickstart',
            },
            {
              label: 'Ecosystem Blueprint',
              to: '/docs/architecture/ecosystem-blueprint',
            },
          ],
        },
        {
          title: 'Modules',
          items: [
            {
              label: 'paper-kb',
              to: '/docs/modules/paper-kb',
            },
            {
              label: 'KB',
              to: '/docs/modules/kb',
            },
            {
              label: 'abstract-scroller',
              to: '/docs/modules/abstract-scroller',
            },
          ],
        },
        {
          title: 'Operations',
          items: [
            {
              label: 'Commands',
              to: '/docs/operations/commands',
            },
            {
              label: 'Troubleshooting',
              to: '/docs/operations/troubleshooting',
            },
            {
              label: 'Stale and Legacy Surfaces',
              to: '/docs/operations/stale-and-legacy-surfaces',
            },
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
