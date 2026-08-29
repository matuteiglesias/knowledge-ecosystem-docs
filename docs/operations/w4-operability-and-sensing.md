---
id: w4-operability-and-sensing
title: W4 Operability and Sensing
---

# W4 Operability and Sensing

**Started:** 2026-08-29  
**Status:** first bounded sensor implemented; semantic reconciliation remains review-driven.

W4 adds cheap drift visibility without creating a central orchestrator.

## Public SYSTEM surface sensor

The checked-in manifest `sensing/public-system-surfaces.json` lists the stable public boundary surfaces for:

- `kb-contracts`;
- `kb-artifacts`;
- `knowledge-inspect`;
- `paper-kb`;
- `matias-context-mcp`;
- `abstract-scroller`.

`scripts/check_public_system_surfaces.py` fetches only each repository's public `main/SYSTEM.yaml` and checks stable repository identity plus active lifecycle markers. `.github/workflows/ecosystem-drift-sensor.yml` runs it weekly and on manual dispatch.

The sensor intentionally does **not** infer architecture edges, validate every semantic claim, or acquire credentials for private repositories. `context-routing` remains a manual surface because the public documentation runner should not receive broader access merely for observability.

## Drift found while establishing W4

The first reconciliation pass found two authority drifts worth repairing before relying on sensing:

1. `kb-contracts/SYSTEM.yaml` still advertised historical repository aliases and conceptual contracts that are absent from the current machine-readable registry. W4 aligns the declaration to `kb-interop.v1-rc1` and its three registered schemas without changing contract runtime.
2. `knowledge-inspect/SYSTEM.yaml` still described `kb.chunk-set@1` as a shared `kb-contracts` contract. W3 proved the actual seam directly from Paper KB's producer-owned chunk-set artifact, so W4 removes the stale shared-contract claim while leaving the validator/runtime unchanged.

These findings illustrate the boundary of automation: stable surface identity can be sensed cheaply; semantic drift still needs evidence-aware reconciliation.

## Operating rule

A sensor failure means **inspect the boundary**, not automatically rewrite producer metadata. Repositories remain authoritative for their own runtime and producer-owned schemas; this documentation repository owns only the ecosystem-level interpretation.

## W4 DoD

The first tranche satisfies the bounded DoD when:

- the six public active SYSTEM surfaces are checked automatically on a schedule;
- failure is visible in GitHub Actions without manually opening each repository;
- no cross-repository write access or private-repo credential is introduced;
- W4 findings are reconciled through small repository-owned changes rather than a central rewrite.
