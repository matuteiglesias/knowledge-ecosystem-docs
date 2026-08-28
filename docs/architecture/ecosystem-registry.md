---
id: ecosystem-registry
title: Ecosystem Registry
sidebar_position: 3
---

# Ecosystem Registry

This is the current registry for the knowledge-management estate. Canonical rows are supported by repository-owned evidence rather than repository names. The bounded W1 reconstruction and its evidence ledger are recorded in [W1 Estate Reconstruction](./w1-estate-reconstruction.md).

## Ecosystem authorities

| Repository | Current responsibility | Lifecycle / authority state | Concrete evidence |
| --- | --- | --- | --- |
| `knowledge-ecosystem-docs` | ecosystem reference architecture, responsibility registry and integration roadmap | active · ecosystem architecture authority | repository `SYSTEM.yaml`; this docs build and W0/W1 bundle |
| `kb-contracts` | shared knowledge artifact identity, provenance/integrity, compatibility and interoperability contracts | active · shared interoperability authority | `README.md` blob `d7c5de0`; `SYSTEM.yaml` blob `9c4cb16`; `kb-interop.v1-rc1`; offline `npm run contract:validate` |

## Active producers and bounded consumers

| Repository | Evidence-backed boundary | Lifecycle / state | Concrete evidence | Reconciliation status |
| --- | --- | --- | --- | --- |
| `kb-artifacts` | deterministic inspection/filtering/selection and reproducible evidence export; producer-owned selection/promotion mechanics | active · producer | README `d2d8070`; AGENTS `5acd983`; `make test`, `make smoke`, `make contract-release-verify` | W2 needed: stale repository ID and command metadata |
| `knowledge-inspect` | bounded inspection, summary/run-manifest and analysis-output production without hidden source mutation | active · producer | SYSTEM `3a3c98d`; AGENTS `1ace2d2`; Makefile `f644529`; `make health`, `make smoke`, `make verify-run-evidence-demo` | W2 needed: no README and metadata-only command declaration |
| `paper-kb` | paper ingestion/parsing, paper corpus/chunks, review exports and corpus/API operator surface | active · paper-corpus producer | SYSTEM `486c2c0`; README `8cbe365`; current `corpus-*`, `export-review`, `api-corpus` Make targets | W2 needed: stale repository ID and empty canonical commands |
| `context-routing` | safe published discovery projection and logical resource catalog over selected governed context sources | active · routing projection | SYSTEM `884b7ba`; README `0aa2be2`; fixture/internal-registry generator + Docusaurus build | W2 needed: alias IDs and empty canonical commands |
| `matias-context-mcp` | bounded read-only MCP resource gateway over explicit logical resources; source repositories remain authoritative | active · gateway | SYSTEM `e28f866`; README `7534ded`; AGENTS `8f0781c`; `python3 -m matias_context_mcp`, `mctx` | W2 needed: stale source-path alias, empty canonical commands, status prose reconciliation |
| `abstract-scroller` | immutable snapshot/review capability including prepared CSV / `review_node` ingest | active capability · non-canonical boundary pending | README `d0c2211`; 2026-05-20 merge `77bc68b`; `make snapshot`, `make serve` | W2 decision needed: active downstream product vs producer-local utility; no `SYSTEM.yaml` |

## Superseded / historical systems

| Repository | Historical role | State | Evidence |
| --- | --- | --- | --- |
| `knowledge-flow` | owner-held RAGFlow copy/experiment | superseded; not current knowledge-stack authority | `LIFECYCLE.md` blob `a6ed2ef`; upstream-style README `15293cb`; supersession merge `a8e318c` |
| legacy three-module pages in this site | paper-centric `paper-kb → KB → abstract-scroller` reference model | historical architecture evidence | [Ecosystem Blueprint](./ecosystem-blueprint.md) and [Module Boundaries](./module-boundaries.md) |

## Conservative current path

```text
producer-owned sources / corpora
        │
        ├── paper-kb
        │
        ▼
    kb-contracts
(shared interoperability)
        │
   ┌────┴───────────────┐
   ▼                    ▼
knowledge-inspect   kb-artifacts
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

This is an evidence-backed **responsibility path**, not a claim that every arrow has already passed an end-to-end interface proof. W3 owns that stronger claim.

`abstract-scroller` remains adjacent until W2 establishes its current architectural status. `knowledge-flow` is explicitly outside the current path.

## Observed estate not yet promoted

The broader GitHub estate still contains knowledge-adjacent systems whose exact current boundaries have not been reconstructed in W1:

- `journal`
- `gpt-digests`
- `llm-flow-engine`
- `awesome-automation-for-knowledge-work`
- domain-specific knowledge bases such as `lcd-UBA-knowledgebase`

Historical aliases to `repo.context`, `repo.gpt-digests`, or `repo.knowledge-base-app` may appear inside active repository metadata. W1 treats those aliases as **reconciliation evidence**, not proof that the aliased repositories remain current authorities.

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

When repository prose disagrees, record the disagreement and route it to W2 rather than silently choosing a winner.