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
- a diagram arrow is not an executable interface until W3-style proof exists.

## Wave 0 — Reference authority reseed

**Goal:** establish a trustworthy control surface before changing producers.

Required:

- repository `SYSTEM.yaml` authority declaration;
- current reference architecture;
- authority/precedence model;
- bootstrap ecosystem registry;
- knowledge lifecycle with future synthesis/publication seam;
- old blueprint retained as historical evidence;
- docs build/typecheck gate.

**DoD:** a new human or agent can identify where ecosystem truth, contract truth and producer truth live without opening every repo.

**Status:** complete and merged on 2026-08-28 through knowledge-ecosystem-docs PR #1.

## Wave 1 — Estate reconstruction

**Goal:** replace the bootstrap inventory with evidence-backed current boundaries.

For each knowledge-adjacent repository:

1. inspect README, `SYSTEM.yaml`, AGENTS/runbooks and canonical commands;
2. classify lifecycle: active, observed, historical, superseded or uncertain;
3. record `owns`, `does_not_own`, upstream, downstream and public surfaces;
4. identify duplicate or stale authority claims;
5. update the registry without changing implementation.

**DoD:** every canonical registry row has a concrete evidence pointer and no responsibility is assigned solely from a repo name.

**Status:** complete for the bounded central tranche. See [W1 Estate Reconstruction](../architecture/w1-estate-reconstruction.md).

## Wave 2 — Repository reconciliation

**Goal:** make active repositories tell the same architectural story.

Apply only the smallest justified updates:

- README boundary paragraph;
- `SYSTEM.yaml` role/authority declaration;
- canonical command and generated-path truth;
- upstream/downstream references;
- stale or legacy banners;
- explicit pointer to `kb-contracts` when a shared contract is consumed.

Do not redesign runtime behavior merely to match documentation.

**DoD:** high-value active producers and consumers agree with the reference architecture, or their disagreement is explicitly recorded as a blocker.

**Status:** central W2 tranche merged on 2026-08-28:

| Repository | Accepted W2 change |
| --- | --- |
| `kb-artifacts` | PR #10 |
| `paper-kb` | PR #12 |
| `knowledge-inspect` | PR #19 |
| `context-routing` | PR #4 |
| `matias-context-mcp` | PR #6 |
| `abstract-scroller` | PR #2 |

See [W2 Repository Reconciliation](../architecture/w2-repository-reconciliation.md). W3 may still correct W2 relationships when executable evidence disproves a declared edge; that is expected governance, not a failure of W2.

## Wave 3 — Interface proof

**Goal:** convert important arrows in the architecture into reproducible producer-consumer proofs.

For each priority edge, pin:

```text
producer
  ↓ exact artifact/API/CLI
contract or producer-owned schema
  ↓ validation
consumer
```

Add fixtures/smokes at the narrowest authority that owns them. Shared interoperability additions go to `kb-contracts`; producer-domain schemas remain local.

**DoD:** priority ecosystem edges are marked `proven` rather than merely `declared`, or an attempted proof produces an explicit corrected/non-edge result.

### Tranche 1 — 2026-08-28

See [W3 Interface Proofs](../architecture/w3-interface-proofs.md).

| Edge | Result |
| --- | --- |
| `paper-kb → knowledge-inspect` | **PROVEN** — real producer `chunk_set` accepted by real consumer validator; producer regression green |
| `context-routing → matias-context-mcp` | **PROVEN WITH BOUNDED FIX** — real generated public catalog crosses MCP with integrity/privacy checks; both suites green after current-schema codec repair |
| `knowledge-inspect → kb-artifacts` | **NOT PROVEN / CORRECTED** — no direct current handoff found; W3 removes the overstated metadata rather than creating a speculative adapter |

W3 implementation/review surfaces:

- paper-kb PR #13 — chunk-set cross-repo proof;
- Context Routing PR #5 — producer-side cross-repo routing→MCP proof;
- Matías Context MCP PR #8 — current public catalog compatibility repair + reusable tests;
- KB Artifacts PR #11 — correct direct Knowledge Inspect input claim;
- Knowledge Inspect PR #20 — correct direct KB Artifacts downstream claim.

### Remaining W3 frontier

Prefer the next proof only when it resolves a real architectural question:

1. **governed outputs → `context-routing`** — determine whether routing actually consumes producer artifacts or only publishes source descriptors/pointers.
2. **`paper-kb → abstract-scroller`** — first prove that a current producer `review_node` export exists; do not infer it from old contract prose.
3. **direct MCP manifest reads** from Knowledge Inspect and KB Artifacts — likely narrower real interfaces than a generalized routing ingestion claim.

A failed proof should narrow the architecture. Do not add adapters merely to increase the number of green arrows.

## Wave 4 — Operability and sensing

**Goal:** detect ecosystem drift cheaply without centralizing orchestration.

Candidates:

- contract compatibility checks;
- expected artifact/freshness probes;
- stale corpus detection;
- repository-boundary drift checks;
- scheduled docs/registry reconciliation report.

The successful W3 cross-repo checks are candidates for later cheap scheduled sensing only after their PRs are accepted. W4 should reuse proof machinery rather than invent a universal orchestrator.

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

The bundle succeeds when the estate is **legible and composable**. It fails if it becomes an excuse to refactor every knowledge repository, build a universal UI, automate editorial judgment before a repeated consumer need exists, or create integration code solely to make a diagram arrow true.
