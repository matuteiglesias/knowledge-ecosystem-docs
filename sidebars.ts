import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
docs: [
'intro',
'quickstart',
{
type: 'category',
label: 'Architecture',
items: [
'architecture/ecosystem-blueprint',
'architecture/module-boundaries',
'architecture/public-vs-private-surfaces',
'architecture/battle-tests',
],
},
{
type: 'category',
label: 'Modules',
items: [
'modules/paper-kb',
'modules/paper-kb-frontend',
'modules/kb',
'modules/abstract-scroller',
],
},
{
type: 'category',
label: 'Integrations',
items: [
'integrations/paper-kb-to-kb',
'integrations/paper-kb-to-abstract-scroller',
'integrations/backend-to-frontend',
],
},
{
type: 'category',
label: 'Contracts',
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
items: [
'operations/commands',
'operations/troubleshooting',
'operations/stale-and-legacy-surfaces',
],
},
{
type: 'category',
label: 'Roadmap',
items: [
'roadmap/next-prs',
'roadmap/end-state',
],
},
],
};

export default sidebars;