# Knowledge Ecosystem Reference Architecture

This repository is the **ecosystem-level architecture authority** for the knowledge-management estate.

It answers a different question from the implementation repositories: not *how does one tool work?*, but *what systems exist, what does each one own, what moves between them, and where should the next capability belong?*

## Authority boundary

This repository owns the current reference architecture, repository/authority registry, producer-consumer map, lifecycle documentation, migration context, and integration roadmap.

It does **not** own shared machine-readable interoperability contracts. That authority remains in [`kb-contracts`](https://github.com/matuteiglesias/kb-contracts). Producer-owned schemas and runtime behavior remain with their producers.

The original paper/KB/review documentation is retained as useful historical and integration evidence. The current architecture pages take precedence when the old blueprint and the present estate differ.

## Start here

- `docs/intro.md` — orientation and precedence
- `docs/architecture/current-reference-architecture.md` — current system map
- `docs/architecture/ecosystem-registry.md` — current and observed systems
- `docs/architecture/authority-model.md` — ownership and precedence rules
- `docs/architecture/knowledge-lifecycle.md` — end-to-end knowledge flow
- `docs/roadmap/reference-architecture-build-bundle.md` — governed build-up waves

## Local verification

```bash
npm ci
npm run typecheck
npm run build
```

The site is configured for `https://knowledge-ecosystem-docs.vercel.app` and is intended to remain a lightweight documentation/control surface rather than an execution platform.
