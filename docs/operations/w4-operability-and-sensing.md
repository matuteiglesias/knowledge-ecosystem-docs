---
id: w4-operability-and-sensing
title: W4 Operability and Sensing
---

# W4 Operability and Sensing

**Started:** 2026-08-29  
**October 26, 2026 disposition:** the original scheduled public identity sensor was retired; semantic reconciliation remains review-driven.

## Original bounded experiment (historical)

The August W4 experiment monitored six public `main/SYSTEM.yaml` surfaces: `kb-contracts`, `kb-artifacts`, `knowledge-inspect`, `paper-kb`, `matias-context-mcp`, and `abstract-scroller`. It used a JSON manifest, a dependency-free Python string-marker checker and a Monday GitHub Actions schedule. Private `context-routing` was deliberately kept out rather than introducing extra credentials.

The first reconciliation work also corrected substantive metadata in `kb-contracts` and `knowledge-inspect`. This was valid, bounded proof that architecture discrepancies could be made visible without central write authority.

## October 2026 outcome: retire the duplicate watcher

Repository activity last changed on 2026-08-30. The scheduled checker succeeded five Mondays (2026-08-31 through 2026-09-28), then failed four Mondays (2026-10-05 through 2026-10-26). The final [failed run](https://github.com/matuteiglesias/knowledge-ecosystem-docs/actions/runs/40368079300) reported missing rename-derived identifiers for exactly two public sources:

| Current GitHub name | Actual stable `repository.id` | Incorrect expected `repository.id` |
| --- | --- | --- |
| `kb-artifacts` | `repo.gpt-digests` | `repo.kb-artifacts` |
| `paper-kb` | `repo.knowledge-base-app` | `repo.paper-kb` |

These **are not producer identity defects**. The [October 18 estate registry](https://github.com/matuteiglesias/projects/blob/main/estate/repository-identities.yaml) binds stable IDs to GitHub numeric repository identities; renames do not regenerate IDs. The sensor's name-derived checks were wrong. Patching the producers to silence it would propagate incorrect identity.

The six-repo GitHub Actions sensor, its Python script and its checked-in manifest have now been **retired from this repository**. They provided no canonical estate-wide status, did not validate semantic relationships, and duplicated a narrower piece of the `projects` estate responsibility.

## Current ownership and safe replacement

- **`projects`** owns stable repository IDs, rename mappings, remote estate observations, health/readiness vocabulary and freshness, under [Repository Health Authority](https://github.com/matuteiglesias/projects/blob/main/docs/github-estate/repository-health-authority.md). Its current `SYSTEM.yaml` explicitly warns that authenticated sensing is operator-invoked and that the committed readiness observation may be stale. Retirement here **does not imply** a replacement recurring monitor is already operating.
- **`knowledge-ecosystem-docs`** still owns canonical knowledge-system responsibilities, proof state and topology interpretation. Changes follow verified producer/consumer evidence, not simply source-name strings.
- **`kb-contracts`** owns registered shared interoperability contracts; each producing repository owns runtime/domain semantics.
- **Office / Control Tower** owns operational fronts and carry posture, not repository IDs.

If fresh repo-health evidence is required, invoke and reconcile the bounded estate sensing path on demand; do not create another scheduled six-repository job in this docs repo. For knowledge interface changes, run the repository-owned consumer proof and update the architecture evidence here.

## Remaining actionable discrepancies (not reasons to revive the watcher)

The October verified [Knowledge Inspect → KB Artifacts JSONL fixture proof](https://github.com/matuteiglesias/kb-artifacts/pull/13) adds a **bounded optional** edge, not the mandatory pipeline rejected in W3. This is recorded in the current reference architecture and registry.

Other estate graph claims must be checked against current producer evidence before promotion. In particular, historical Textflow successor claims should not silently override the distributed W7 lineage decision. Do not generate a new monitoring platform or issue queue merely to reconcile prose.

## Operating rule

An observation mismatch requires an authority check, not an automatic producer rewrite. A repository's technical identity, a knowledge architecture edge and an Office front are different objects with different owners.

**Current gate:** no duplicate scheduled sensor; producer IDs remain stable; estate freshness is explicitly observed rather than presumed; consequential knowledge edges have pinned consumer-side proof.
