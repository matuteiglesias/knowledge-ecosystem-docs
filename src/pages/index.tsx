import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Knowledge Ecosystem"
      description="Modular tools for paper processing, knowledge contracts, and review snapshots"
    >
      <main style={{ padding: '4rem 2rem', maxWidth: 960, margin: '0 auto' }}>
        <h1>Knowledge Ecosystem</h1>
        <p style={{ fontSize: '1.25rem', lineHeight: 1.6 }}>
          A small modular toolchain for turning papers and knowledge artifacts into
          validated contracts, APIs, and review snapshots.
        </p>

        <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
          <section>
            <h2>paper-kb</h2>
            <p>Paper processing, paper API, frontend, and review export.</p>
          </section>

          <section>
            <h2>KB</h2>
            <p>Knowledge contracts, validation, run records, manifests, and processing evidence.</p>
          </section>
        </div>
      </main>
    </Layout>
  );
}