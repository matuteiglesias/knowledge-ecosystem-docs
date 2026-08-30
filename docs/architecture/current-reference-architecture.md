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
       governed artifacts / records
      ┌───────┼──────────────────────────┐
      │       │                          │
      ▼       ▼                          ▼
KNOWLEDGE   REVIEW                 KNOWLEDGE EXPERIENCES
 INSPECT   PROJECTION              collection / experience
 semantic      │                    composition / releases
inspection     ▼                          │
run evidence paper.review-record@1        ▼
              │                     renderer adapters
              ▼                          │
       ABSTRACT SCROLLER                 ▼
       immutable snapshots        human experiences

 KB ARTIFACTS
 deterministic exploration / governed evidence selection / export
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

The important distinction is between **capabilities** and **mandatory pipelines**. Knowledge Inspect, KB Artifacts and Knowledge Experiences solve different problems and must not be forced through each other when the real producer/consumer seam is direct.

## Authority split

| Authority | Owns | Must not absorb |
| --- | --- | --- |
| `knowledge-ecosystem-docs` | ecosystem architecture, responsibility map, proof state, integration/lineage roadmap | shared schemas, producer runtime |
| `kb-contracts` | registered shared knowledge-artifact identity, compatibility, provenance and interoperability contracts/profiles | universal execution architecture, producer domain schemas |
| `knowledge-experiences` | collection/experience composition recipes, reproducible releases, renderer-adapter handoffs | producer truth, semantic inference, evidence promotion, editorial judgment |
| producer/consumer repositories | runtime behavior, domain semantics and producer-owned schemas | ecosystem-wide authority by implication |

A further class remains deliberately **unassigned**: semantic synthesis, claim/editorial lifecycle and publication authorities beyond composition/rendering. Historical Textflow digest/FAQ ideas do not assign that frontier.

## Proven and corrected relationships

- `context-routing → matias-context-mcp`: accepted executable proof; publication policy stays producer-owned while MCP owns bounded exposure/read transport.
- `paper-kb → knowledge-inspect`: accepted producer-writer → real consumer-validator proof.
- `paper-kb → abstract-scroller`: accepted review projection; `paper.review-record@1` is producer-owned by Paper KB and `paper_uid` survives snapshot compilation.
- `knowledge-inspect ↛ kb-artifacts`: corrected non-edge. Their current real interfaces do not form a mandatory direct handoff.
- producer surfaces → `knowledge-experiences`: multiple real-source composition seams are proven in the Knowledge Experiences estate, including Paper KB and other governed producer inputs; these do not imply a Knowledge Inspect intermediary.

See [W3 Interface Proofs](./w3-interface-proofs.md) for the core producer-consumer evidence ledger and [Textflow Migration Lineage](./textflow-migration-lineage.md) for the predecessor-to-current responsibility map.

## Paper KB internal boundary

Paper KB remains one repository but is now an explicitly governed modular monorepo:

```text
paper sources
    ↓
corpus core ── governed artifacts ──┬── read service → workbench
                                   ├── paper-specific derivations
                                   ├── Knowledge Inspect
                                   ├── Knowledge Experiences
                                   └── review projection → Abstract Scroller
```

Corpus identity/production is the durable center. API, derivations, inspection, composition and review surfaces consume or project corpus artifacts rather than redefining corpus truth.

## Textflow lineage

`textflow-core` is a superseded, **archive-ready** predecessor, not a live node in the topology above. Its useful capabilities were decomposed rather than replaced by one successor:

```text
Textflow predecessor
   ├── semantic-runtime invariants ──► Knowledge Inspect
   ├── deterministic selection/export ► KB Artifacts
   ├── experience composition ────────► Knowledge Experiences
   ├── source parsing semantics ──────► source-owning producers
   ├── bounded exposure ──────────────► routing / gateway systems
   └── speculative digest/FAQ ideas ─► latent until consumer-pulled
```

Historical `gpt-digests` naming is not a canonical successor relation. Textflow W7 merged at `e3c94cc64ad37801a82ad9e8defce3a24def8f81`; the GitHub Archive/read-only repository setting remains an administrative toggle outside the connected tool. See [Textflow Migration Lineage](./textflow-migration-lineage.md).

## Architectural invariants

1. **No repo name implies authority.** Authority must be declared and supported by evidence.
2. **Shared contracts stay separate from ecosystem prose.** Only actually registered interoperability belongs in `kb-contracts`.
3. **Producer semantics remain producer-owned.** Do not copy schemas centrally merely to simplify diagrams.
4. **Integrations cross explicit seams.** Prefer artifacts, manifests, APIs or CLIs over imports of private internals.
5. **A missing edge may be the correct result.** Do not create adapters merely to make responsibility graphs symmetric.
6. **Historical capability is evidence, not automatic current authority.** Legacy pages and repositories may remain useful without governing current behavior.
7. **Future capability stays future.** Synthesis/publication remains unassigned until repeated use creates a real consumer boundary.
8. **Important edges should be observable.** Cheap drift sensing is preferable to central orchestration.
9. **Composition is not synthesis.** Reproducibly assembling governed knowledge into an experience does not grant authority over evidence truth or editorial claims.

These ecosystem invariants have a narrower companion for knowledge-processing semantics: [Durable Knowledge-Processing Invariants](./durable-knowledge-invariants.md). That page separates knowledge identity from representation and run identity, requires semantic indexes to remain rebuildable derivatives, and assigns proof obligations to the repositories that actually own the relevant runtime. It was extracted from the useful predecessor lessons in `textflow-core` without making that repository—or a new meta-layer—current authority.

## Operating regime after W7

The ecosystem is sufficiently legible and composable that further architecture work should be pulled by real use or detected drift.

```text
integration → real use → observation → selective evolution
```

Textflow migration and repository-closure work no longer create an architecture backlog. The predecessor is archive-ready; only the GitHub repository Archive toggle remains administrative. Future Textflow-derived ideas must be pulled by a concrete current consumer rather than by the existence of historical code.

The original [Ecosystem Blueprint](./ecosystem-blueprint.md) and [Module Boundaries](./module-boundaries.md) remain historical design evidence, not current global authority.
