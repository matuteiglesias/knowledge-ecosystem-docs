import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home(): React.JSX.Element {
  return (
    <Layout
      title="Knowledge Ecosystem"
      description="Reference architecture for governed knowledge systems"
    >
      <main style={{ padding: '4rem 2rem', maxWidth: 960, margin: '0 auto' }}>
        <h1>Knowledge Ecosystem</h1>
        <p style={{ fontSize: '1.25rem', lineHeight: 1.6 }}>
          The reference architecture, authority map, and build-up roadmap for a
          distributed knowledge-management estate.
        </p>

        <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
          <section>
            <h2>Current architecture</h2>
            <p>
              See which systems exist, what each one owns, and how producer truth,
              shared interoperability contracts, and ecosystem-level architecture
              fit together.
            </p>
            <Link to="/docs/architecture/current-reference-architecture">
              Open the reference architecture →
            </Link>
          </section>

          <section>
            <h2>Ecosystem registry</h2>
            <p>
              Distinguish confirmed authorities from observed, historical, and
              deliberately future capabilities.
            </p>
            <Link to="/docs/architecture/ecosystem-registry">
              Inspect the registry →
            </Link>
          </section>

          <section>
            <h2>Continuous build-up</h2>
            <p>
              Pull bounded waves for estate reconstruction, repository reconciliation,
              interface proof, and low-cost sensing without building a universal platform.
            </p>
            <Link to="/docs/roadmap/reference-architecture-build-bundle">
              Open the build bundle →
            </Link>
          </section>
        </div>
      </main>
    </Layout>
  );
}
