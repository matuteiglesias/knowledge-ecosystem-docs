---
id: ecosystem-registry
title: Ecosystem Registry
sidebar_position: 3
---

# Ecosystem Registry

This is the current registry for the knowledge-management estate. Canonical rows are supported by repository-owned evidence rather than repository names. W1 reconstructed boundaries, W2 reconciled repository declarations, and [W3 Interface Proofs](./w3-interface-proofs.md) distinguishes executable edges from merely declared relationships.

## Ecosystem authorities

| Repository | Current responsibility | Lifecycle / authority state | Concrete evidence |
| --- | --- | --- | --- |
| `knowledge-ecosystem-docs` | ecosystem reference architecture, responsibility registry and integration roadmap | active · ecosystem architecture authority | repository `SYSTEM.yaml`; W0–W3 documentation and docs build |
| `kb-contracts` | shared knowledge artifact identity, provenance/integrity, compatibility and interoperability contracts | active · shared interoperability authority | current release surface, `SYSTEM.yaml`, `kb-interop.v1-rc1`, offline contract validation |

## Active producers and bounded consumers

| Repository | Evidence-backed boundary | Lifecycle / state | Current reconciliation / proof status |
| --- | --- | --- | --- |
| `kb-artifacts` | deterministic inspection/filtering/selection and reproducible export from producer-agnostic JSONL evidence collections; producer-owned selection/promotion mechanics | active · producer | W2 #10 merged; W3 #11 corrects an unproven direct Knowledge Inspect input claim |
| `knowledge-inspect` | bounded inspection, summary/run-manifest and analysis-output production without hidden source mutation; validates `chunk_set@1` inputs | active · producer/consumer | W2 #19 merged; `paper-kb → knowledge-inspect` PROVEN in W3; W3 #20 removes an unproven direct KB Artifacts downstream claim |
| `paper-kb` | paper ingestion/parsing, paper corpus/chunks, review exports and corpus/API operator surface | active · paper-corpus producer | W2 #12 merged; `paper-kb → knowledge-inspect` PROVEN by W3 #13 |
| `context-routing` | safe published discovery projection and logical resource catalog over selected governed context sources | active · routing projection | W2 #4 merged; `context-routing → matias-context-mcp` PROVEN WITH BOUNDED FIX by W3 #5/#8 |
| `matias-context-mcp` | bounded read-only MCP resource gateway over explicit logical resources; source repositories remain authoritative | active · gateway | W2 #6 merged; Context Routing public catalog compatibility proven with W3 codec repair in #8 |
| `abstract-scroller` | immutable snapshot/review surface over prepared CSV / `review_node` records | active · review-snapshot capability | W2 #2 merged; producer edge still unproven |

## Superseded / historical systems

| Repository | Historical role | State | Evidence |
| --- | --- | --- | --- |
| `knowledge-flow` | owner-held RAGFlow copy/experiment | superseded; not current knowledge-stack authority | lifecycle declaration + supersession merge |
| legacy three-module pages in this site | paper-centric `paper-kb → KB → abstract-scroller` reference model | historical architecture evidence | [Ecosystem Blueprint](./ecosystem-blueprint.md) and [Module Boundaries](./module-boundaries.md) |

## Current proof-aware graph

```text
paper-kb
   ║
   ║ PROVEN: chunk_set@1
   ▼
knowledge-inspect

knowledge-inspect       kb-artifacts
        │                    │
        │ declared           │ declared
        └─────────┬──────────┘
                  ▼
            context-routing
                  ║
                  ║ PROVEN WITH FIX:
                  ║ generated public catalog
                  ▼
          matias-context-mcp
                  │
                  ▼
             humans / agents

knowledge-inspect ─────X─────► kb-artifacts
                    no direct current seam proven;
                    W3 corrects the metadata

paper-kb ── declared/unproven ──► abstract-scroller
```

Legend:

- **PROVEN**: an exact producer artifact crosses the boundary and is accepted under executable consumer validation.
- **PROVEN WITH FIX**: the proof found real drift; a bounded compatibility repair plus regression evidence establishes the edge.
- **declared**: architecture/responsibility evidence exists, but executable producer-consumer compatibility has not yet been demonstrated.
- **X / corrected**: W3 inspected a previously claimed direct edge and found no current concrete handoff.

## Proven edge registry

| Producer | Interface | Consumer | Status | Proof |
| --- | --- | --- | --- | --- |
| `paper-kb` | `chunk_bus / chunk_set / schema_version=1` emitted by the existing chunk-set writer | `knowledge-inspect` chunk-set validator CLI | PROVEN | paper-kb PR #13; exact producer output + consumer validator + writer regression |
| `context-routing` | generated `static/context-data/sources.json`, public `context_source@1` projections | MCP logical resource `published-source-catalog` | PROVEN WITH FIX | Context Routing PR #5 + MCP PR #8; exact SHA/size + privacy/projection checks + both regression suites |

## Corrected non-edge registry

### `knowledge-inspect → kb-artifacts`

W2 metadata described a direct relationship, but W3 could not find a direct current handoff.

Knowledge Inspect's current primary analysis surfaces include JSON summary/run evidence. KB Artifacts' current ingestion surface is producer-agnostic JSONL evidence collections. That means a useful future conversion may be possible, but the direct edge does not exist merely because both systems work with evidence.

W3 therefore proposes metadata corrections rather than a speculative adapter:

- KB Artifacts PR #11: actual JSONL input boundary; no direct Knowledge Inspect upstream claim.
- Knowledge Inspect PR #20: no direct KB Artifacts downstream claim; JSONL adaptation remains outside its owned boundary.

## Identity normalization

Current repository identities are:

```text
repo.kb-contracts
repo.paper-kb
repo.knowledge-inspect
repo.kb-artifacts
repo.context-routing
repo.matias-context-mcp
repo.abstract-scroller
```

Historical aliases such as `repo.context`, `repo.gpt-digests`, or `repo.knowledge-base-app` remain migration evidence. They should not silently stand in for current repositories in active architecture metadata.

## Observed estate not yet promoted

The broader GitHub estate still contains knowledge-adjacent systems whose exact current boundaries have not been reconstructed in the canonical tranche:

- `journal`
- historical `gpt-digests`
- `llm-flow-engine`
- `awesome-automation-for-knowledge-work`
- domain-specific knowledge bases such as `lcd-UBA-knowledgebase`

Their presence is evidence of capability, not enough evidence for a canonical role. Another tranche should be pulled only when a current consumer path or authority conflict makes one relevant.

## Deliberately unassigned frontier

| Capability | State | Constraint |
| --- | --- | --- |
| synthesis / insight candidate lifecycle | future | must consume governed knowledge/evidence rather than duplicate it |
| claim/evidence lifecycle | future | should preserve provenance and human editorial judgment |
| canonical editorial artifacts | future | not a knowledge-base responsibility by default |
| channel projections (blog, video, social, talks) | future | downstream renderers, not canonical knowledge authority |
| circulation / response capture | future | feedback should be able to return to knowledge without auto-promoting claims |

## Registry maintenance rule

Promote or materially change a registry row only after a boundary pass answers:

1. What does it own?
2. What does it explicitly not own?
3. What does it consume and produce?
4. Which interfaces are public?
5. Which contracts are shared versus producer-owned?
6. What command, fixture or recent evidence supports the claimed boundary?

An important edge becomes `proven` only after an exact producer artifact/API/CLI and consumer validation path execute successfully. A failed proof may justify a bounded compatibility fix or removal of the arrow; it is never permission to invent an adapter merely to preserve the diagram.
