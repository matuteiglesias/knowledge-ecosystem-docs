---
id: reference-architecture-build-bundle
title: Reference Architecture Build Bundle
sidebar_position: 1
---

# Reference Architecture Build Bundle

## Mission

Turn the knowledge-management estate from a set of individually useful repositories into a **legible, governed ecosystem** without merging repos or inventing a universal platform.

The bundle follows the same principle that works in scientific-system recovery: reconstruct truth, separate responsibilities, prove real interfaces, then add low-cost sensing.

## Hard invariants

- `knowledge-ecosystem-docs` owns ecosystem architecture, not shared schemas.
- `kb-contracts` remains the shared interoperability authority.
- producer-owned domain schemas remain producer-owned.
- repository names never imply authority.
- legacy systems remain inspectable; authority can move without deleting history.
- no broad repo consolidation merely to simplify the diagram.
- no synthesis/publication implementation is created by this bundle.

## Wave 0 — Reference authority reseed

**Goal:** establish a trustworthy control surface before changing producers.

**Status:** accepted and merged on 2026-08-28 as part of `knowledge-ecosystem-docs#1`.

Delivered:

- repository authority declaration;
- current reference architecture above the historical three-module blueprint;
- authority/precedence model;
- ecosystem registry;
- knowledge lifecycle with future synthesis/publication seam;
- old blueprint retained as historical evidence;
- docs build/typecheck gate.

## Wave 1 — Estate reconstruction

**Goal:** replace bootstrap inventory with evidence-backed current boundaries.

**Status:** complete for the bounded central tranche on 2026-08-28. See [W1 Estate Reconstruction](../architecture/w1-estate-reconstruction.md).

Evidence-backed rows cover:

- `kb-contracts`;
- `kb-artifacts`;
- `knowledge-inspect`;
- `paper-kb`;
- `context-routing`;
- `matias-context-mcp`;
- `abstract-scroller`;
- `knowledge-flow` as explicitly superseded.

Broader systems such as `journal`, historical `gpt-digests`, `llm-flow-engine`, automation repos and domain knowledge bases remain observed until a real consumer path or authority conflict makes another tranche useful.

## Wave 2 — Repository reconciliation

**Goal:** make active repositories tell the same identity/boundary story using the smallest justified edits.

**Status:** accepted and merged across all six central repositories on 2026-08-28. See [W2 Repository Reconciliation](../architecture/w2-repository-reconciliation.md).

Accepted PRs:

| Repository | PR |
| --- | --- |
| `kb-artifacts` | [#10](https://github.com/matuteiglesias/kb-artifacts/pull/10) |
| `paper-kb` | [#12](https://github.com/matuteiglesias/paper-kb/pull/12) |
| `knowledge-inspect` | [#19](https://github.com/matuteiglesias/knowledge-inspect/pull/19) |
| `context-routing` | [#4](https://github.com/matuteiglesias/context-routing/pull/4) |
| `matias-context-mcp` | [#6](https://github.com/matuteiglesias/matias-context-mcp/pull/6) |
| `abstract-scroller` | [#2](https://github.com/matuteiglesias/abstract-scroller/pull/2) |

`knowledge-flow` remains superseded and was deliberately not revived.

## Wave 3 — Interface proof

**Goal:** convert important arrows in the architecture into reproducible producer-consumer proofs.

For a proven edge, pin:

```text
producer
  ↓ exact artifact / API / CLI
contract or producer-owned schema
  ↓ validation
consumer
  ↓ observable output / transport
proof
```

### First tranche

**Status:** two edges are CI-proven on draft consumer PRs; pending human acceptance/merge. See [W3 Interface Proofs](../architecture/w3-interface-proofs.md).

#### `context-routing → matias-context-mcp`

Proof PR: [`matias-context-mcp#7`](https://github.com/matuteiglesias/matias-context-mcp/pull/7)

W3 pinned `context_catalog@1`, the versioned producer artifact, exact provenance/SHA and the real `mctx` MCP-stdio read. The proof exposed and fixed a consumer authority-boundary bug: MCP was expecting private routing-registry fields and re-applying publication policy to an already-sanitized public artifact.

#### `paper-kb → abstract-scroller`

Proof PR: [`abstract-scroller#3`](https://github.com/matuteiglesias/abstract-scroller/pull/3)

W3 uses Paper KB's actual review-CSV export and feeds it directly into Abstract Scroller's snapshot builder. The proof exposed and fixed an optional-column ingestion defect in the consumer without changing the producer export.

### Remaining W3 frontier

Prefer independent bounded slices rather than one mega-integration:

1. **`paper-kb → knowledge-inspect`** — identify one exact current paper/chunk/review artifact accepted by inspection and prove validation without importing producer internals.
2. **`knowledge-inspect → kb-artifacts`** — identify the exact run/summary/evidence handoff actually consumed by selection; do not infer compatibility from historical naming.
3. **governed evidence → `context-routing`** — prove which `knowledge-inspect` / `kb-artifacts` outputs become routable published entries and which remain intentionally private.

Do not promote every producer-local interface into `kb-contracts`. Shared contracts should emerge only from repeated interoperability need.

## Wave 4 — Operability and sensing

**Goal:** detect ecosystem drift cheaply without centralizing orchestration.

Candidates:

- contract/interface compatibility checks;
- expected artifact/freshness probes;
- stale corpus detection;
- repository-boundary drift checks;
- scheduled docs/registry reconciliation report.

W3's executable edge proofs are natural future sensors: they can later detect producer-consumer drift without adding a universal orchestration layer.

**DoD:** important deterioration can become visible without manually opening every repository.

## Wave 5 — Downstream consumer handoff

**Goal:** prepare, but do not overbuild, the `knowledge → synthesis → publication` consumer seam.

Only after real synthesis work exists, define the minimum digital contracts needed for:

- evidence references;
- insight candidates;
- claims and confidence;
- canonical editorial artifacts;
- publications/projections;
- responses returning upstream.

This wave belongs in a separate thin contract/domain boundary unless evidence shows an existing repo already owns it.

## Stop rule

The bundle succeeds when the estate is **legible, composable and cheaply testable at important seams**. It fails if it becomes an excuse to refactor every knowledge repository, build a universal UI/orchestrator, or automate editorial judgment before a repeated consumer need exists.
