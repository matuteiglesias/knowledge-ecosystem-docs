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

W1 evidence-backed rows now cover:

- `kb-contracts`;
- `kb-artifacts`;
- `knowledge-inspect`;
- `paper-kb`;
- `context-routing`;
- `matias-context-mcp`;
- `knowledge-flow` as explicitly superseded;
- `abstract-scroller` as an active capability with non-canonical boundary pending reconciliation.

W1 intentionally leaves `journal`, `gpt-digests`, `llm-flow-engine`, `awesome-automation-for-knowledge-work` and domain-specific knowledge bases observed until a current consumer path or authority conflict makes them relevant.

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

### W2 frontier created by W1

Prioritize metadata/front-door discrepancies with concrete evidence:

1. `kb-artifacts`: fix stale `repository.id: repo.gpt-digests`; reconcile `kbctl` metadata with current `kb-artifact`/Make surfaces.
2. `paper-kb`: fix stale `repository.id: repo.knowledge-base-app`; record current operator Make targets.
3. `knowledge-inspect`: add/repair front-door boundary and record the bounded health/smoke/verification commands already governed in `AGENTS.md`/Makefile.
4. `context-routing`: reconcile historical alias IDs and record the fixture/internal-registry generator + Docusaurus verification surface.
5. `matias-context-mcp`: reconcile source aliases, current commands and the mismatch between README `v0.1 CLOSED` and older AGENTS P0 prose without changing runtime behavior.
6. `abstract-scroller`: decide and declare its present lifecycle/role before promoting it into the canonical path.
7. `knowledge-flow`: do not revive; only finish archive-prerequisite inspection if a concrete need arises.

**DoD:** high-value active producers and consumers agree with the reference architecture, or their disagreement is explicitly recorded as a blocker.

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
