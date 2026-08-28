---
id: ecosystem-registry
title: Ecosystem Registry
sidebar_position: 3
---

# Ecosystem Registry

This is the current registry for the knowledge-management estate. Canonical rows are supported by repository-owned evidence rather than repository names. The bounded W1 reconstruction is recorded in [W1 Estate Reconstruction](./w1-estate-reconstruction.md); the repository-owned reconciliation proposals are recorded in [W2 Repository Reconciliation](./w2-repository-reconciliation.md).

## Ecosystem authorities

| Repository | Current responsibility | Lifecycle / authority state | Concrete evidence |
| --- | --- | --- | --- |
| `knowledge-ecosystem-docs` | ecosystem reference architecture, responsibility registry and integration roadmap | active · ecosystem architecture authority | repository `SYSTEM.yaml`; this docs build and W0–W2 bundle |
| `kb-contracts` | shared knowledge artifact identity, provenance/integrity, compatibility and interoperability contracts | active · shared interoperability authority | `README.md` blob `d7c5de0`; `SYSTEM.yaml` blob `9c4cb16`; `kb-interop.v1-rc1`; offline `npm run contract:validate` |

## Active producers and bounded consumers

| Repository | Evidence-backed boundary | Lifecycle / state | Concrete evidence | Reconciliation status |
| --- | --- | --- | --- | --- |
| `kb-artifacts` | deterministic inspection/filtering/selection and reproducible evidence export; producer-owned selection/promotion mechanics | active · producer | README `d2d8070`; AGENTS `5acd983`; current `kb-artifact` CLI and bounded Make surfaces | W2 proposed in [PR #10](https://github.com/matuteiglesias/kb-artifacts/pull/10): current identity `repo.kb-artifacts`, routing alias and command surface reconciled |
| `knowledge-inspect` | bounded inspection, summary/run-manifest and analysis-output production without hidden source mutation | active · producer | SYSTEM `3a3c98d`; AGENTS `1ace2d2`; Makefile `f644529`; `make health`, `make smoke`, `make verify-run-evidence-demo` | W2 proposed in [PR #19](https://github.com/matuteiglesias/knowledge-inspect/pull/19): current upstream/downstream identities, exclusions and command surface reconciled |
| `paper-kb` | paper ingestion/parsing, paper corpus/chunks, review exports and corpus/API operator surface | active · paper-corpus producer | SYSTEM `486c2c0`; README `8cbe365`; current `corpus-*`, `export-review`, `api-corpus` Make targets | W2 proposed in [PR #12](https://github.com/matuteiglesias/paper-kb/pull/12): current identity `repo.paper-kb` and operator command surface reconciled |
| `context-routing` | safe published discovery projection and logical resource catalog over selected governed context sources | active · routing projection | SYSTEM `884b7ba`; README `0aa2be2`; deterministic fixture/internal-registry generator + Docusaurus build | W2 proposed in [PR #4](https://github.com/matuteiglesias/context-routing/pull/4): current identity `repo.context-routing`, upstream aliases, commands and generated paths reconciled |
| `matias-context-mcp` | bounded read-only MCP resource gateway over explicit logical resources; source repositories remain authoritative | active · gateway | SYSTEM `e28f866`; README `7534ded`; AGENTS `8f0781c`; server/client/probe surfaces | W2 proposed in [PR #6](https://github.com/matuteiglesias/matias-context-mcp/pull/6): current upstream identities, command surface, checkout examples and links reconciled; runtime-status prose remains verification debt |
| `abstract-scroller` | immutable snapshot/review surface over prepared CSV / `review_node` records | active · review-snapshot capability | README `d0c2211`; Makefile `3dd7b0b`; 2026-05-20 `review_node` ingest commit `c1bad9b` | W2 boundary declaration proposed in [PR #2](https://github.com/matuteiglesias/abstract-scroller/pull/2); exact producer-consumer edge remains W3 work |

## Superseded / historical systems

| Repository | Historical role | State | Evidence |
| --- | --- | --- | --- |
| `knowledge-flow` | owner-held RAGFlow copy/experiment | superseded; not current knowledge-stack authority | `LIFECYCLE.md` blob `a6ed2ef`; upstream-style README `15293cb`; supersession merge `a8e318c` |
| legacy three-module pages in this site | paper-centric `paper-kb → KB → abstract-scroller` reference model | historical architecture evidence | [Ecosystem Blueprint](./ecosystem-blueprint.md) and [Module Boundaries](./module-boundaries.md) |

## Conservative current responsibility graph

```text
paper-kb
paper-corpus producer
      │
      ├──────────────► abstract-scroller
      │                 review/snapshot surface
      │                 (edge unproven)
      ▼
  kb-contracts
(shared interoperability)
      │
 ┌────┴───────────────┐
 ▼                    ▼
knowledge-inspect   kb-artifacts
 inspection/run      selection/export
 evidence              evidence
 │                    │
 └────────┬───────────┘
          ▼
    context-routing
          │
          ▼
  matias-context-mcp
          │
          ▼
     humans / agents
```

This is an evidence-backed **responsibility graph**, not a claim that every arrow has passed an end-to-end interface proof. W3 owns that stronger claim.

`abstract-scroller` is now a declared bounded capability rather than an unresolved repo, but it is not an obligatory hub or shared authority. `knowledge-flow` remains explicitly outside the current graph.

## Identity normalization

After the W2 proposals merge, current repository identities should be expressed as:

```text
repo.kb-contracts
repo.paper-kb
repo.knowledge-inspect
repo.kb-artifacts
repo.context-routing
repo.matias-context-mcp
repo.abstract-scroller
```

Historical aliases such as `repo.context`, `repo.gpt-digests`, or `repo.knowledge-base-app` remain migration evidence. They should not silently stand in for the current repositories in active architecture metadata.

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

When repository prose disagrees, record the disagreement and route it to repository reconciliation rather than silently choosing a winner. When an edge is important, route it to W3 interface proof rather than treating a diagram arrow as executable evidence.
