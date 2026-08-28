---
id: w1-estate-reconstruction
title: W1 Estate Reconstruction
sidebar_position: 5
---

# W1 Estate Reconstruction

**Inspection date:** 2026-08-28  
**Wave:** W1 — Estate reconstruction  
**Scope:** bounded first tranche of repositories central to current knowledge flows.

This pass reconstructs repository boundaries from repository-owned evidence. It does **not** change producer implementation or silently repair inconsistent metadata. Discrepancies become inputs to W2.

## Evidence rule

A repository is promoted from inventory signal to a current registry row only when its responsibility can be supported by one or more of:

- `SYSTEM.yaml` authority declaration;
- README or lifecycle declaration;
- `AGENTS.md` boundary/invariants;
- canonical Make/CLI surface;
- recent repository activity proving the capability is not merely archaeological.

A repository name is never treated as evidence by itself.

## First tranche

| Repository | Lifecycle / registry state | Evidence-backed responsibility | Public / proving surfaces | W2 reconciliation debt |
| --- | --- | --- | --- | --- |
| `kb-contracts` | active · shared authority | shared knowledge-artifact identity, schemas, integrity/provenance, compatibility profiles and machine-readable interoperability releases | `README.md` blob `d7c5de0`; `SYSTEM.yaml` blob `9c4cb16`; `npm run contract:validate`; current `kb-interop.v1-rc1` | `SYSTEM.yaml` still labels authority `proposed` although README/release surface is substantially stronger; reconcile command vocabulary and current RC semantics |
| `kb-artifacts` | active · producer | deterministic inspection/filtering/selection and reproducible evidence export; selection/promotion mechanics remain producer-owned | `README.md` blob `d2d8070`; `AGENTS.md` blob `5acd983`; `make test`, `make smoke`, `make contract-release-verify`; public `kb-artifact` CLI | `SYSTEM.yaml` blob `56bc3ee` has stale `repository.id: repo.gpt-digests` and stale/partial command surface (`kbctl compute/publish`) relative to the current public package |
| `knowledge-inspect` | active · producer | bounded inspection, summary/run-manifest and analysis-output production with explicit provenance and no hidden source mutation | `SYSTEM.yaml` blob `3a3c98d`; `AGENTS.md` blob `1ace2d2`; Makefile blob `f644529`; `make health`, `make smoke`, `make verify-run-evidence-demo` | no README front door; `SYSTEM.yaml` verification remains metadata-only and omits the now-explicit canonical bounded command surface |
| `paper-kb` | active · paper-corpus producer | paper ingestion/parsing, paper-oriented corpus/chunks, review exports and corpus API/operator surface | `SYSTEM.yaml` blob `486c2c0`; README blob `8cbe365`; operator Make targets such as `corpus-doctor`, `corpus-parse`, `corpus-validate`, `export-review`, `api-corpus` | `SYSTEM.yaml` has stale `repository.id: repo.knowledge-base-app`, empty canonical command list, and an older contract vocabulary that needs reconciliation against current producer outputs |
| `context-routing` | active · routing projection | safe published discovery projection and logical resource catalog over selected governed context sources; Google Sheet/internal registry remains producer control plane | `SYSTEM.yaml` blob `884b7ba`; README blob `0aa2be2`; deterministic fixture build via `scripts/build_context_routing.py`; Docusaurus build | `SYSTEM.yaml` has no canonical commands despite README-defined build paths; upstream aliases (`repo.gpt-digests`, `repo.context`) need identity reconciliation |
| `matias-context-mcp` | active · read-only gateway | bounded MCP resource gateway over explicit logical resources; source repositories remain authoritative; no arbitrary filesystem access or mutation | `SYSTEM.yaml` blob `e28f866`; README blob `7534ded`; `AGENTS.md` blob `8f0781c`; `python3 -m matias_context_mcp`; `mctx` client | `SYSTEM.yaml` canonical commands are empty; README config still maps `KB_ARTIFACTS_ROOT` to a `gpt-digests` checkout path; AGENTS P0 list and README “v0.1 CLOSED” need state reconciliation |
| `knowledge-flow` | superseded · historical | owner-held RAGFlow copy/experiment; explicitly not authority for the personal knowledge stack | `LIFECYCLE.md` blob `a6ed2ef`; upstream-style README blob `15293cb`; supersession merge `a8e318c` (2026-08-04) | archive prerequisites remain: determine unique owner patches/config/deployments before any archival action |
| `abstract-scroller` | active capability · non-canonical pending boundary declaration | immutable snapshot/review surface capable of consuming prepared records including `review_node` JSONL; useful capability but not established as current ecosystem authority | README blob `d0c2211`; merge `77bc68b` (2026-05-20) added `review_node` ingest; `make snapshot`, `make serve` | no `SYSTEM.yaml`; front door still says MVP; decide in W2 whether this remains an active downstream review product, historical evidence, or a producer-local utility |

## Current architecture after W1

The evidence supports this conservative current flow:

```text
producer-owned corpora / sources
        │
        ├──── paper-kb (paper-corpus producer)
        │
        ▼
kb-contracts
shared interoperability authority
        │
        ├───────────────┬────────────────────┐
        ▼               ▼                    ▼
knowledge-inspect   kb-artifacts       producer systems
inspection/evidence selection/export   using shared contracts
        │               │
        └───────┬───────┘
                ▼
          context-routing
       safe discovery projection
                │
                ▼
       matias-context-mcp
       read-only context gateway
                │
                ▼
          humans / agents

abstract-scroller
  = bounded review/snapshot capability, not yet promoted into this canonical path

knowledge-flow
  = superseded historical vendor-copy evidence
```

This diagram is a responsibility map, **not yet a proof of every producer-consumer edge**. W3 owns interface proof.

## Duplicate / stale authority claims discovered

W1 found enough drift to justify W2, but not enough to justify producer edits inside this wave:

1. **Repository identity drift.** `kb-artifacts` declares `repo.gpt-digests`; `paper-kb` declares `repo.knowledge-base-app`; `context-routing` uses `repo.context` as its repository ID. These may be historical aliases, but they should not silently govern current identity.
2. **Command-surface drift.** Several `SYSTEM.yaml` files have empty or stale canonical command lists while README/AGENTS/Makefile expose newer bounded commands.
3. **MCP source alias drift.** `matias-context-mcp` documents KB Artifacts as an integrated source while an example environment variable still points to `$HOME/repos/gpt-digests`.
4. **Lifecycle ambiguity.** `abstract-scroller` has recent 2026 work and real snapshot capability but lacks a current authority declaration.
5. **Verification-status lag.** Multiple system declarations remain `metadata-only` even where bounded command surfaces and tests now exist.

These are documentation/identity reconciliation candidates first. They are **not** permission to rewrite runtime semantics.

## Repositories intentionally left observed

The broader estate still contains knowledge-adjacent repositories such as `journal`, `gpt-digests`, `llm-flow-engine`, `awesome-automation-for-knowledge-work`, and domain-specific knowledge bases. W1 does not infer their current authority from names or historical links.

They should enter later tranches only when a current consumer path or an unresolved authority conflict makes them relevant.

## W1 completion statement

For the canonical first-tranche registry rows, responsibility is now supported by concrete repository evidence. Known disagreements are recorded rather than normalized away.

**W1 status: complete for the bounded central tranche.**

The next permitted wave is W2 repository reconciliation: make the high-value active repositories tell the same identity/boundary/command story using the smallest justified metadata and front-door edits.