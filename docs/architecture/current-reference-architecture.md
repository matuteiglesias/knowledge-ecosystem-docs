---
id: current-reference-architecture
title: Current Reference Architecture
sidebar_position: 1
---

# Current Reference Architecture

This page is the **current ecosystem-level architecture authority**. It supersedes the older three-module blueprint when the two disagree.

The ecosystem is not one knowledge application. It is a set of independently useful authorities connected through explicit artifacts, producer-owned contracts, shared interoperability contracts, APIs or bounded context interfaces.

## Current core topology

```text
                         SOURCES / TRAILS
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
          PAPER KB      other producers   local knowledge
       governed corpus
              │
       chunk_set artifacts
          ┌───┴───────────────┐
          │                   │
          ▼                   ▼
 KNOWLEDGE INSPECT      REVIEW PROJECTION
 semantic inspection          │
 run evidence                  ▼
 derived outputs       paper.review-record@1
                              │
                              ▼
                       ABSTRACT SCROLLER
                       immutable snapshots

 KB ARTIFACTS
 deterministic exploration / governed evidence selection
 (orthogonal capability; no mandatory direct Knowledge Inspect edge)

 governed/public projections
              │
              ▼
       CONTEXT ROUTING
              │ context_catalog@1
              ▼
      MATIAS CONTEXT MCP
              │
              ▼
        humans / agents
```

The important distinction is between **capabilities** and **mandatory pipelines**. Knowledge Inspect and KB Artifacts can participate in future loops without being forced into a direct edge that does not exist today.

## Authority split

| Authority | Owns | Must not absorb |
| --- | --- | --- |
| `knowledge-ecosystem-docs` | ecosystem architecture, responsibility map, proof state, integration roadmap | shared schemas, producer runtime |
| `kb-contracts` | registered shared knowledge-artifact identity, compatibility, provenance and interoperability contracts/profiles | universal execution architecture, producer domain schemas |
| producer/consumer repositories | runtime behavior, domain semantics and producer-owned schemas | ecosystem-wide authority by implication |

A fourth class is deliberately **unassigned**: future synthesis/publication authorities. Their seam is documented, but no current repository should claim them accidentally.

## Proven and corrected relationships

- `context-routing → matias-context-mcp`: accepted executable proof; publication policy stays producer-owned while MCP owns bounded exposure/read transport.
- `paper-kb → knowledge-inspect`: accepted producer-writer → real consumer-validator proof.
- `paper-kb → abstract-scroller`: accepted review projection; `paper.review-record@1` is producer-owned by Paper KB and `paper_uid` survives snapshot compilation.
- `knowledge-inspect ↛ kb-artifacts`: corrected non-edge. Their current real interfaces do not form a mandatory direct handoff.

See [W3 Interface Proofs](./w3-interface-proofs.md) for the evidence ledger.

## Paper KB internal boundary

Paper KB remains one repository but is now an explicitly governed modular monorepo:

```text
paper sources
    ↓
corpus core ── chunk_set ──┬── read service → workbench
                           ├── paper-specific derivations
                           ├── Knowledge Inspect
                           └── review projection → Abstract Scroller
```

Corpus identity/production is the durable center. API, derivations and review surfaces consume or project corpus artifacts rather than redefining corpus truth.

## Architectural invariants

1. **No repo name implies authority.** Authority must be declared and supported by evidence.
2. **Shared contracts stay separate from ecosystem prose.** Only actually registered interoperability belongs in `kb-contracts`.
3. **Producer semantics remain producer-owned.** Do not copy schemas centrally merely to simplify diagrams.
4. **Integrations cross explicit seams.** Prefer artifacts, manifests, APIs or CLIs over imports of private internals.
5. **A missing edge may be the correct result.** Do not create adapters merely to make responsibility graphs symmetric.
6. **Historical capability is evidence, not automatic current authority.** Legacy pages remain useful but must not silently govern current behavior.
7. **Future capability stays future.** Synthesis/publication remains unassigned until repeated use creates a real consumer boundary.
8. **Important edges should be observable.** W4 adds cheap drift sensing without central orchestration.

## Operating regime after W4

The ecosystem is sufficiently legible and composable that further architecture work should be pulled by real use or detected drift.

```text
integration → real use → observation → selective evolution
```

The original [Ecosystem Blueprint](./ecosystem-blueprint.md) and [Module Boundaries](./module-boundaries.md) remain historical design evidence, not current global authority.
