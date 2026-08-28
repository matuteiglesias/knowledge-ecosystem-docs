import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Current Architecture',
      items: [
        'architecture/current-reference-architecture',
        'architecture/authority-model',
        'architecture/ecosystem-registry',
        'architecture/knowledge-lifecycle',
        'architecture/w1-estate-reconstruction',
        'architecture/w2-repository-reconciliation',
        'architecture/w3-interface-proofs',
        'architecture/public-vs-private-surfaces',
        'architecture/battle-tests',
      ],
    },
    {
      type: 'category',
      label: 'Build-up Roadmap',
      items: [
        'roadmap/reference-architecture-build-bundle',
        'roadmap/next-prs',
        'roadmap/end-state',
      ],
    },
    {
      type: 'category',
      label: 'Historical Blueprint',
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'quickstart',
          label: 'Historical runnable path',
        },
        'architecture/ecosystem-blueprint',
        'architecture/module-boundaries',
      ],
    },
    {
      type: 'category',
      label: 'Demos',
      collapsed: true,
      items: ['demos/author-corpus-demo'],
    },
    {
      type: 'category',
      label: 'Legacy / Producer Modules',
      collapsed: true,
      items: [
        'modules/paper-kb',
        'modules/paper-kb-frontend',
        'modules/kb',
        'modules/abstract-scroller',
      ],
    },
    {
      type: 'category',
      label: 'Historical Integrations',
      collapsed: true,
      items: [
        'integrations/paper-kb-to-kb',
        'integrations/paper-kb-to-abstract-scroller',
        'integrations/backend-to-frontend',
      ],
    },
    {
      type: 'category',
      label: 'Historical Contracts',
      collapsed: true,
      items: [
        'contracts/chunk-set-v1',
        'contracts/review-csv-v1',
        'contracts/review-node-v1',
        'contracts/snapshot-contract',
      ],
    },
    {
      type: 'category',
      label: 'Operations',
      collapsed: true,
      items: [
        'operations/commands',
        'operations/troubleshooting',
        'operations/stale-and-legacy-surfaces',
      ],
    },
  ],
};

export default sidebars;
