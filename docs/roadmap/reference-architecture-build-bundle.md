---
id: reference-architecture-build-bundle
title: Reference Architecture Build Bundle
sidebar_position: 1
---

# Reference Architecture Build Bundle

## Mission

Turn the knowledge-management estate from individually useful repositories into a **legible, governed ecosystem** without merging repos or inventing a universal platform.

The operating sequence is: reconstruct truth → separate responsibilities → prove real interfaces → add cheap sensing → stop until real downstream use demands more.

## Hard invariants

- `knowledge-ecosystem-docs` owns ecosystem architecture, not shared schemas.
- `kb-contracts` remains the shared interoperability authority.
- producer-owned domain schemas remain producer-owned.
- repository names never imply authority.
- legacy systems remain inspectable; authority can move without deleting history.
- no broad repo consolidation merely to simplify the diagram.
- no synthesis/publication implementation is created without a real consumer need.

## Wave 0 — Reference authority reseed

**Status:** accepted and merged on 2026-08-28.

Established repository authority, current reference architecture, precedence model, ecosystem registry, knowledge lifecycle and documentation CI while retaining historical architecture evidence.

## Wave 1 — Estate reconstruction

**Status:** complete for the bounded central tranche.

Evidence-backed rows cover `kb-contracts`, `kb-artifacts`, `knowledge-inspect`, `paper-kb`, `context-routing`, `matias-context-mcp`, `abstract-scroller`, and `knowledge-flow` as superseded.

## Wave 2 — Repository reconciliation

**Status:** accepted and merged across the six active central repositories on 2026-08-28.

Repository identities, canonical commands and responsibility declarations were reconciled without changing runtime merely to match the docs.

## Wave 3 — Interface proof

**Status:** bounded core tranche accepted. See [W3 Interface Proofs](../architecture/w3-interface-proofs.md).

Accepted/corrected results:

- `context-routing → matias-context-mcp`: **accepted**; real public routing artifact crosses the MCP boundary and an authority-policy bug was repaired.
- `paper-kb → knowledge-inspect`: **accepted**; the real Paper KB chunk-set writer is validated by the real Knowledge Inspect consumer CLI.
- `paper-kb → abstract-scroller`: **accepted and strengthened**; initial CSV proof evolved to producer-owned `paper.review-record@1` feeding immutable snapshots while legacy formats remain compatibility surfaces.
- `knowledge-inspect ↛ kb-artifacts`: **corrected non-edge**; no current direct handoff exists, so both repositories removed overstated dependency metadata rather than inventing an adapter.

Paper KB additionally completed P0–P5 internal hardening: modular component boundaries, producer-owned review contract, canonical review projection, consumer proof, interface precedence and executable architecture/identity guards.

Remaining W3 frontier is intentionally narrow: prove governed outputs → `context-routing` only when a concrete publication/routing workflow makes that edge valuable.

## Wave 4 — Operability and sensing

**Status:** first bounded tranche implemented on 2026-08-29. See [W4 Operability and Sensing](../operations/w4-operability-and-sensing.md).

Delivered:

- checked-in manifest of six public active `SYSTEM.yaml` surfaces;
- dependency-free Python drift sensor for stable repository identity/lifecycle markers;
- weekly GitHub Actions schedule plus manual dispatch;
- private `context-routing` explicitly remains a manual surface rather than broadening credentials;
- first semantic reconciliation pass found and repaired high-value boundary drift in `kb-contracts` and `knowledge-inspect` metadata.

The sensor is deliberately not a central orchestrator. It makes disappearance or identity drift visible cheaply; semantic boundary changes still require evidence-aware review.

**W4 bounded DoD:** important public boundary deterioration can become visible without manually opening every repository and without cross-repository write credentials.

## Wave 5 — Downstream consumer handoff

**Status:** deliberately not started.

W5 prepares the future `knowledge → synthesis → publication → response` seam only after a real repeated consumer exists. Candidate concepts such as evidence references, insight candidates, claims, editorial artifacts, publications and responses remain design notes rather than shared contracts.

The current architecture work has reduced enough uncertainty that implementing W5 now would be speculative. The correct next regime is **integration → real use → observation → selective evolution**.

## Stop rule

The bundle succeeds when the estate is **legible, composable and cheaply testable at important seams**. It fails if it becomes an excuse to refactor every knowledge repository, build a universal UI/orchestrator, or automate editorial judgment before a repeated consumer need exists.

After W4's first sensor tranche, additional architecture work should be pulled by observed drift or concrete downstream use rather than by wave completion for its own sake.
