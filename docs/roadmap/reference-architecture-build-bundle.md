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

Required:

- repository `SYSTEM.yaml` authority declaration;
- current reference architecture;
- authority/precedence model;
- bootstrap ecosystem registry;
- knowledge lifecycle with future synthesis/publication seam;
- old blueprint retained as historical evidence;
- docs build/typecheck gate.

**DoD:** a new human or agent can identify where ecosystem truth, contract truth and producer truth live without opening every repo.

**Status:** implemented on `docs/reference-architecture-reseed`; CI/build green; pending human acceptance/merge.

## Wave 1 — Estate reconstruction

**Goal:** replace the bootstrap inventory with evidence-backed current boundaries.

For each knowledge-adjacent repository:

1. inspect README, `SYSTEM.yaml`, AGENTS/runbooks and canonical commands;
2. classify lifecycle: active, observed, historical, superseded or uncertain;
3. record `owns`, `does_not_own`, upstream, downstream and public surfaces;
4. identify duplicate or stale authority claims;
5. update the registry without changing implementation.

Prefer a bounded first tranche of the repositories most central to actual current flows.

**DoD:** every canonical registry row has a concrete evidence pointer and no responsibility is assigned solely from a repo name.

**Status:** complete for the bounded central tranche on 2026-08-28. See [W1 Estate Reconstruction](../architecture/w1-estate-reconstruction.md).

W1 evidence-backed rows cover `kb-contracts`, `kb-artifacts`, `knowledge-inspect`, `paper-kb`, `context-routing`, `matias-context-mcp`, `knowledge-flow` as explicitly superseded, and `abstract-scroller` as a real review/snapshot capability.

W1 intentionally leaves `journal`, historical `gpt-digests`, `llm-flow-engine`, `awesome-automation-for-knowledge-work` and domain-specific knowledge bases observed until a current consumer path or authority conflict makes them relevant.

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

**Status:** W2 frontier addressed on 2026-08-28 as six bounded draft PRs; pending repository-level acceptance/merge. See [W2 Repository Reconciliation](../architecture/w2-repository-reconciliation.md).

| Repository | W2 proposal |
| --- | --- |
| `kb-artifacts` | [PR #10](https://github.com/matuteiglesias/kb-artifacts/pull/10) |
| `paper-kb` | [PR #12](https://github.com/matuteiglesias/paper-kb/pull/12) |
| `knowledge-inspect` | [PR #19](https://github.com/matuteiglesias/knowledge-inspect/pull/19) |
| `context-routing` | [PR #4](https://github.com/matuteiglesias/context-routing/pull/4) |
| `matias-context-mcp` | [PR #6](https://github.com/matuteiglesias/matias-context-mcp/pull/6) |
| `abstract-scroller` | [PR #2](https://github.com/matuteiglesias/abstract-scroller/pull/2) |

The changes normalize current repository identities, expose already-documented canonical command surfaces, repair visible checkout/link aliases where necessary, and give `abstract-scroller` a conservative system boundary. All producer verification statuses remain conservative because W2 did not execute runtime checks.

`knowledge-flow` remains superseded and was deliberately not touched.

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

**DoD:** priority ecosystem edges are marked `proven` rather than merely `declared`.

### W3 frontier created by W2

Prefer one or two vertical slices before broadening:

1. **`context-routing → matias-context-mcp`** — strongest low-risk candidate. Pin one generated catalog/source descriptor from the routing projection and prove it is consumed through the MCP gateway with stable logical identity, provenance and no physical-path leakage.
2. **`paper-kb → knowledge-inspect`** — pin one exact paper/review artifact and prove consumer validation without importing producer internals.
3. **`knowledge-inspect → kb-artifacts`** — identify the exact run/summary/evidence handoff actually selected downstream; do not infer compatibility from similarly named contracts.
4. **`kb-artifacts + knowledge-inspect → context-routing`** — prove which governed outputs become routable public/catalog entries and which remain intentionally private.
5. **`paper-kb → abstract-scroller`** — use the existing `review_node` path to prove a current producer artifact reaches a valid immutable snapshot; decide whether the snapshot schema remains producer-local.

Residual runtime-status ambiguity in `matias-context-mcp` can be resolved while proving edge 1, rather than becoming a separate platform-hardening project.

## Wave 4 — Operability and sensing

**Goal:** detect ecosystem drift cheaply without centralizing orchestration.

Candidates:

- contract compatibility checks;
- expected artifact/freshness probes;
- stale corpus detection;
- repository-boundary drift checks;
- scheduled docs/registry reconciliation report.

Checks should report actionable drift and avoid consequential automatic promotion.

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

The bundle succeeds when the estate is **legible and composable**. It fails if it becomes an excuse to refactor every knowledge repository, build a universal UI, or automate editorial judgment before a repeated consumer need exists.
