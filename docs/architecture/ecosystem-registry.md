---
id: ecosystem-registry
title: Ecosystem Registry
sidebar_position: 3
---

# Ecosystem Registry

This is the current registry for the knowledge-management estate. Canonical rows are supported by repository-owned evidence rather than repository names. W1 reconstructed the bounded central estate, W2 reconciled repository boundaries, and [W3 Interface Proofs](./w3-interface-proofs.md) records executable evidence for selected edges.

## Ecosystem authorities

| Repository | Current responsibility | Lifecycle / authority state | Concrete evidence |
| --- | --- | --- | --- |
| `knowledge-ecosystem-docs` | ecosystem reference architecture, responsibility registry and integration roadmap | active · ecosystem architecture authority | repository `SYSTEM.yaml`; W0–W2 merged docs authority; W3 evidence ledger |
| `kb-contracts` | shared knowledge artifact identity, provenance/integrity, compatibility and interoperability contracts | active · shared interoperability authority | current release surface and `kb-interop.v1-rc1`; offline `npm run contract:validate` |

## Active producers and bounded consumers

| Repository | Evidence-backed boundary | Lifecycle / state | Reconciliation | Interface-proof state |
| --- | --- | --- | --- | --- |
| `kb-artifacts` | deterministic inspection/filtering/selection and reproducible evidence export; producer-owned selection/promotion mechanics | active · producer | W2 merged in [#10](https://github.com/matuteiglesias/kb-artifacts/pull/10) | core inbound/outbound edges remain declared |
| `knowledge-inspect` | bounded inspection, summary/run-manifest and analysis-output production without hidden source mutation | active · producer | W2 merged in [#19](https://github.com/matuteiglesias/knowledge-inspect/pull/19) | `paper-kb → knowledge-inspect` and `knowledge-inspect → kb-artifacts` remain declared |
| `paper-kb` | paper ingestion/parsing, paper corpus/chunks, review exports and corpus/API operator surface | active · paper-corpus producer | W2 merged in [#12](https://github.com/matuteiglesias/paper-kb/pull/12) | `paper-kb → abstract-scroller` CI-proven in `abstract-scroller#3`; inspection edge still declared |
| `context-routing` | safe published discovery projection and logical resource catalog over selected governed context sources | active · routing projection | W2 merged in [#4](https://github.com/matuteiglesias/context-routing/pull/4) | `context-routing → matias-context-mcp` CI-proven in `matias-context-mcp#7`; governed-evidence inputs remain declared |
| `matias-context-mcp` | bounded read-only MCP resource gateway over explicit logical resources; source repositories remain authoritative | active · gateway | W2 merged in [#6](https://github.com/matuteiglesias/matias-context-mcp/pull/6) | routing catalog edge CI-proven; proof/fix pending merge in [#7](https://github.com/matuteiglesias/matias-context-mcp/pull/7) |
| `abstract-scroller` | immutable snapshot/review surface over prepared CSV / `review_node` records | active · review-snapshot capability | W2 merged in [#2](https://github.com/matuteiglesias/abstract-scroller/pull/2) | Paper KB review-CSV edge CI-proven; proof/fix pending merge in [#3](https://github.com/matuteiglesias/abstract-scroller/pull/3) |

## Superseded / historical systems

| Repository | Historical role | State | Evidence |
| --- | --- | --- | --- |
| `knowledge-flow` | owner-held RAGFlow copy/experiment | superseded; not current knowledge-stack authority | repository `LIFECYCLE.md`; upstream-style README; supersession decision 2026-08-04 |
| legacy three-module pages in this site | paper-centric `paper-kb → KB → abstract-scroller` reference model | historical architecture evidence | [Ecosystem Blueprint](./ecosystem-blueprint.md) and [Module Boundaries](./module-boundaries.md) |

## Current responsibility and proof graph

```text
paper-kb
paper-corpus producer
      │
      ├════ CI-PROVEN ═══► abstract-scroller
      │                    review/snapshot surface
      │                    proof PR #3 pending merge
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
          ║ CI-PROVEN
          ▼
  matias-context-mcp
  proof PR #7 pending merge
          │
          ▼
     humans / agents
```

`CI-PROVEN` means an executable proof is green on a reviewable consumer PR. It does **not** mean the proof/fix is accepted on `main` until that PR is merged.

All unmarked arrows remain architectural responsibility relationships rather than end-to-end compatibility claims.

## Current identities

```text
repo.kb-contracts
repo.paper-kb
repo.knowledge-inspect
repo.kb-artifacts
repo.context-routing
repo.matias-context-mcp
repo.abstract-scroller
```

Historical aliases such as `repo.context`, `repo.gpt-digests`, or `repo.knowledge-base-app` remain migration evidence only.

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

When repository prose disagrees, record the disagreement rather than silently choosing a winner. When an edge matters, require executable interface evidence before marking it proven.
