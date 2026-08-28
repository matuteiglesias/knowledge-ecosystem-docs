---
id: current-reference-architecture
title: Current Reference Architecture
sidebar_position: 1
---

# Current Reference Architecture

This page is the **current ecosystem-level architecture authority**. It supersedes the older three-module blueprint when the two disagree.

The ecosystem is not one knowledge application. It is a set of independently useful authorities connected through explicit artifacts, contracts, APIs or bounded context interfaces.

## Reference layers

```text
┌─────────────────────────────────────────────────────┐
│ SOURCES AND TRAILS                                  │
│ papers · notes · files · journals · project trails │
└────────────────────────┬────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│ CAPTURE / CORPUS / PRODUCER SYSTEMS                 │
│ producer-owned parsing, normalization and storage  │
└────────────────────────┬────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│ SHARED KNOWLEDGE ARTIFACT BOUNDARY                 │
│ identity · provenance · interoperability contracts │
│ shared authority: kb-contracts                     │
└────────────────────────┬────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│ SELECTION / INSPECTION / RETRIEVAL / CONTEXT       │
│ bounded consumers and evidence-producing tools     │
└────────────────────────┬────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│ KNOWLEDGE USE                                       │
│ humans · agents · research · operations            │
└────────────────────────┬────────────────────────────┘
                         ↓
          FUTURE DOWNSTREAM FRONTIER
                         ↓
        SYNTHESIS → PUBLICATION → RESPONSE
                         └──────────────→ KNOWLEDGE
```

## Authority split

Three authority classes matter:

| Authority | Owns | Must not absorb |
| --- | --- | --- |
| `knowledge-ecosystem-docs` | ecosystem architecture, responsibility map, integration roadmap | shared schemas, producer runtime |
| `kb-contracts` | shared knowledge artifact identity, compatibility, provenance and interoperability contracts | universal execution architecture, producer domain schemas |
| producer/consumer repositories | their runtime behavior, domain semantics and producer-owned schemas | ecosystem-wide authority by implication |

A fourth class is deliberately **unassigned**: future synthesis/publication authorities. Their seam is documented, but no current repository should claim them accidentally.

## Architectural invariants

1. **No repo name implies authority.** Authority must be declared and supported by evidence.
2. **Shared contracts stay separate from ecosystem prose.** Machine-readable interoperability belongs in `kb-contracts`.
3. **Producer semantics remain producer-owned.** Do not copy schemas centrally merely to make the diagram simpler.
4. **Integrations cross explicit seams.** Prefer files, manifests, contracts, APIs or CLIs over imports of private internals.
5. **Historical capability is evidence, not automatic current authority.** Legacy pages remain useful but must not silently govern the current estate.
6. **Future capability stays future.** Document missing synthesis/publication seams without manufacturing implementation claims.
7. **Every important edge should eventually be provable.** A producer-consumer arrow should acquire an exact artifact/API/contract and a validation path.

## Current versus historical documentation

The original [Ecosystem Blueprint](./ecosystem-blueprint.md) and [Module Boundaries](./module-boundaries.md) remain valuable records of an earlier paper-centric architecture. They are no longer sufficient as the global system map.

The migration strategy is additive: preserve their concrete interface evidence, reconcile it against the current registry, and only retire statements when a newer authority has been proven.
