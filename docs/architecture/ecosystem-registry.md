---
id: ecosystem-registry
title: Ecosystem Registry
sidebar_position: 3
---

# Ecosystem Registry

This is the current registry for the knowledge-management estate. Canonical rows are supported by repository-owned evidence rather than repository names. W1 reconstructed the bounded central estate, W2 reconciled repository boundaries, [W3 Interface Proofs](./w3-interface-proofs.md) established selected executable seams, and [Textflow Migration Lineage](./textflow-migration-lineage.md) records the final predecessor-to-current responsibility map.

## Ecosystem authorities

| Repository | Current responsibility | Lifecycle / authority state | Concrete evidence |
| --- | --- | --- | --- |
| `knowledge-ecosystem-docs` | ecosystem reference architecture, responsibility registry, lineage and integration roadmap | active · ecosystem architecture authority | repository `SYSTEM.yaml`; current reference architecture; W1–W6 evidence ledger |
| `kb-contracts` | shared knowledge artifact identity, provenance/integrity, compatibility and interoperability contracts when repeated cross-repo need justifies registration | active · shared interoperability authority | current released contract surface and offline contract validation |
| `knowledge-experiences` | governed collection membership, experience composition, reproducible releases and renderer-adapter handoffs | active · composition authority | repository `SYSTEM.yaml`; real-source experience census; proven Paper KB, LCD and Git vertical handoffs |

`knowledge-experiences` is a **composition** authority, not a semantic-inference or editorial-truth authority. Its presence does not fill the still-unassigned synthesis/publication frontier.

## Active producers and bounded consumers

| Repository | Evidence-backed boundary | Lifecycle / state | Reconciliation | Interface-proof state |
| --- | --- | --- | --- | --- |
| `kb-artifacts` | deterministic inspection/filtering/selection and reproducible JSONL/CSV/Markdown evidence export with provenance | active · selection/export capability | W2 boundary reconciled; Textflow W5 confirms it satisfies deterministic export | `knowledge-inspect ↛ kb-artifacts` is an accepted corrected non-edge; no mandatory direct handoff exists |
| `knowledge-inspect` | bounded semantic/analytical inspection, representation derivative state, run evidence and analysis outputs over approved governed inputs | active · inspection producer | W2 boundary reconciled; Textflow W3/W4 hardened semantic-runtime and ingestion ownership | `paper-kb → knowledge-inspect` accepted; W4 canonical governed-input seam accepted; no direct mandatory KB Artifacts edge |
| `paper-kb` | paper acquisition/parsing, governed paper corpus/chunks, producer-owned review records and corpus/API operator surface | active · paper-corpus producer | W2 boundary reconciled | `paper-kb → knowledge-inspect` accepted; `paper-kb → abstract-scroller` accepted; Paper KB records also feed proven Knowledge Experiences |
| `context-routing` | safe published discovery projection and logical resource catalog over selected governed context sources | active · routing projection | W2 boundary reconciled | `context-routing → matias-context-mcp` accepted executable proof; upstream publication choices remain producer-owned |
| `matias-context-mcp` | bounded read-only MCP resource gateway over explicit logical resources; source repositories remain authoritative | active · gateway | W2 boundary reconciled | routing-catalog consumer proof accepted on `main` |
| `abstract-scroller` | immutable snapshot/review surface over prepared review records | active · review-snapshot capability | W2 boundary reconciled | Paper KB review projection accepted; producer identity survives snapshot compilation |

## Superseded / historical systems

| Repository / surface | Historical role | State | Evidence |
| --- | --- | --- | --- |
| `textflow-core` | earlier personal/team RAG pipeline combining JSONL ingest, node identity, embeddings, Chroma, retrieval, clustering, export, optional synthesis and run reports | **superseded · repository-visible migration closed**; not a current authority | Textflow capability ledger; W3–W5 successor closure; [Textflow Migration Lineage](./textflow-migration-lineage.md) |
| `knowledge-flow` | owner-held RAGFlow copy/experiment | superseded; not current knowledge-stack authority | repository `LIFECYCLE.md`; supersession decision 2026-08-04 |
| legacy three-module pages in this site | paper-centric `paper-kb → KB → abstract-scroller` reference model | historical architecture evidence | [Ecosystem Blueprint](./ecosystem-blueprint.md) and [Module Boundaries](./module-boundaries.md) |
| historical `gpt-digests` identity / alias | earlier knowledge/digest experiment identity | historical evidence only; **not** the Textflow successor and not a current canonical authority | predecessor history; replaced by the distributed responsibility map above |

## Current responsibility and proof graph

```text
                    source-owning producers
                             │
            ┌────────────────┼────────────────────┐
            │                │                    │
            ▼                ▼                    ▼
      paper-kb /        other governed      producer/public
      other producers      records            projections
            │                │                    │
            │                ▼                    │
            │       knowledge-experiences         │
            │       composition / releases        │
            │                │                    │
            │                ▼                    │
            │          renderer adapters          │
            │                                     │
            ├════ accepted ═══► knowledge-inspect │
            │                 inspection/run       │
            │                 evidence             │
            │                                     ▼
            └════ accepted ═══► abstract-scroller  context-routing
                              review snapshot          │
                                                       ║ accepted
                                                       ▼
                                                matias-context-mcp
                                                       │
                                                       ▼
                                                  humans / agents

kb-artifacts
  deterministic exploration / selection / export
  (orthogonal capability; no mandatory knowledge-inspect edge)
```

Marked accepted edges have executable consumer-side evidence recorded in [W3 Interface Proofs](./w3-interface-proofs.md) or the relevant repository's current proof surface. Unmarked relationships are responsibility or composition relationships and must not be read as end-to-end compatibility claims.

## Current identities

```text
repo.knowledge-ecosystem-docs
repo.kb-contracts
repo.paper-kb
repo.knowledge-inspect
repo.kb-artifacts
repo.knowledge-experiences
repo.context-routing
repo.matias-context-mcp
repo.abstract-scroller
```

Historical aliases such as `repo.context`, `repo.gpt-digests`, or `repo.knowledge-base-app` remain migration evidence only.

## Observed estate not yet promoted

The broader GitHub estate still contains knowledge-adjacent systems whose exact current boundaries are not canonical here, including:

- `journal` as a repository identity distinct from the proven working-memory-journal Knowledge Experience;
- `llm-flow-engine`;
- `awesome-automation-for-knowledge-work`;
- additional domain-specific knowledge bases beyond the currently proven producer/experience seams.

Their presence is evidence of capability, not enough evidence for a canonical role. Another tranche should be pulled only when a current consumer path or authority conflict makes one relevant.

## Deliberately unassigned frontier

| Capability | State | Constraint |
| --- | --- | --- |
| synthesis / insight candidate lifecycle | future | must consume governed knowledge/evidence rather than duplicate it |
| claim/evidence lifecycle | future | should preserve provenance and human editorial judgment |
| canonical editorial artifacts | future | not a knowledge-base or composition responsibility by default |
| channel projections (blog, video, social, talks) | future | downstream renderers, not canonical knowledge authority |
| circulation / response capture | future | feedback should be able to return to knowledge without auto-promoting claims |

Textflow's historical FAQ, digest, changelog and executive-summary ideas do not fill these rows. They remain latent product ideas until a real consumer creates an evidence-backed boundary.

## Registry maintenance rule

Promote or materially change a registry row only after a boundary pass answers:

1. What does it own?
2. What does it explicitly not own?
3. What does it consume and produce?
4. Which interfaces are public?
5. Which contracts are shared versus producer-owned?
6. What command, fixture or recent evidence supports the claimed boundary?

When repository prose disagrees, record and reconcile the disagreement rather than silently choosing a winner. When an edge matters, require executable interface evidence before marking it proven. A missing edge is a valid architectural result.