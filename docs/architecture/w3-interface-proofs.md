---
id: w3-interface-proofs
title: W3 Interface Proofs
sidebar_position: 7
---

# W3 Interface Proofs

**Execution date:** 2026-08-28  
**Wave:** W3 — Interface proof  
**Status:** first bounded tranche implemented and green in CI; consumer PRs pending human acceptance/merge.

W3 upgrades selected arrows from an architectural responsibility claim to executable evidence:

```text
producer
  ↓ exact artifact / command
producer-owned or shared contract boundary
  ↓ consumer validation
consumer
  ↓ observable downstream artifact / transport
proof
```

The first tranche deliberately proves only two edges. It does not attempt to turn the whole estate into one integration test.

## Proof state vocabulary

- **declared** — repository boundaries say the relationship should exist.
- **CI-proven** — an executable proof pins the producer/interface and passes on a reviewable consumer PR.
- **accepted** — the proof/fix has been reviewed and merged to the consumer's `main`.

A green draft PR is not silently recorded as accepted production truth.

## Edge A — `context-routing → matias-context-mcp`

**Proof PR:** [`matias-context-mcp#7`](https://github.com/matuteiglesias/matias-context-mcp/pull/7)  
**State:** CI-proven; pending merge.

### Pinned interface

| Item | Identity |
| --- | --- |
| producer | `matuteiglesias/context-routing` |
| accepted producer parent on `main` | `2b5050522b86967c77699daf0c7a751468496831` |
| producer artifact | `static/context-data/v1/sources.json` |
| producer Git blob SHA-1 | `8017318abe428626d71df17b711489dd9746b712` |
| artifact SHA-256 | `0f3b9830087edf8bc93105523c843161f96bb580a06663f82d6c2bdb4c47a31c` |
| contract identity | `context_catalog@1` |
| consumer logical URI | `matias-context://source/context-routing/document/published-source-catalog` |
| consumer transport | real MCP `stdio` through `mctx` |

### Defect exposed by the proof

The producer's current public catalog is already a sanitized allow-list. It intentionally omits private control-plane fields such as `publish_status` and `exposure_level`.

The MCP consumer still expected an older/private registry representation and attempted to re-apply publication policy using those absent fields. The JSON file was readable, but the real current public catalog could normalize to zero sources.

This was an authority-boundary error:

```text
context-routing
  owns publication eligibility
          ↓
  safe public projection
          ↓
matias-context-mcp
  owns bounded exposure/read transport
```

The consumer must validate and expose the producer's public contract; it must not reconstruct the producer's private publication decision.

### Consumer fix

The W3 PR:

- pins the versioned `static/context-data/v1/sources.json` path rather than the compatibility alias;
- validates `context_catalog@1` and its public source identities/counts;
- preserves the producer's safe public allow-list while applying a final consumer field allow-list;
- rejects the obsolete private-registry shape rather than guessing;
- adds regression tests for path, contract identity, count and field behavior.

### Evidence boundary for a private producer

`context-routing` is private. The MCP repository's ordinary GitHub Actions token cannot read a sibling private repository. W3 deliberately does not add a PAT or broaden repository credentials merely to make an integration test green.

Instead the consumer freezes **only the exact bytes of the already-public projection**, with provenance recording producer repository, accepted commit, artifact path, Git blob, byte size and SHA-256. No private control-plane registry data is copied.

CI then proves those exact bytes through a real `mctx` MCP session and requires the gateway payload and SHA-256 to match the pinned evidence.

This is a bounded evidence capsule, not a second authority for Context Routing.

## Edge B — `paper-kb → abstract-scroller`

**Proof PR:** [`abstract-scroller#3`](https://github.com/matuteiglesias/abstract-scroller/pull/3)  
**State:** CI-proven; pending merge.

### Pinned interface

| Item | Identity |
| --- | --- |
| producer | `matuteiglesias/paper-kb` |
| producer commit | `d65a6f9bd6fff3e2f25768785753856cd9adcb6a` |
| producer surface | `backend.exports.export_review_csv` / `make export-review` |
| interface | review CSV |
| CSV fields | `doc_id,title,abstract,date,year,venue,tags,badges,source_url,paper_id` |
| consumer | `matuteiglesias/abstract-scroller` |
| consumer surface | `backend.jobs.mvp_snapshot --format csv` |
| downstream evidence | snapshot manifest + Brotli tile |

W3 follows the executable interface that exists today. It does not force the older `review_node` framing merely because historical architecture pages discussed it.

### End-to-end proof

The cross-repository workflow:

1. checks out the exact public Paper KB producer commit;
2. creates bounded chunk-set artifacts;
3. uses Paper KB's real `ChunkSetStorageAdapter` and `export_review_csv` implementation;
4. validates the exact current CSV header and document identities/content;
5. feeds that CSV directly to the real Abstract Scroller snapshot job;
6. verifies the snapshot manifest document count;
7. decompresses the first tile and proves `doc_id`, title and abstract survive the boundary.

No hand-written adapter sits between producer and consumer.

### Defect exposed by the proof

Paper KB's valid review CSV does not include the optional `has_code` field.

Abstract Scroller intended missing optional fields to receive defaults, but the implementation used:

```text
df.get("has_code", 0)
```

When the column was absent, that returned scalar `0`; the normalizer then attempted `.fillna()` on the scalar and failed before snapshot construction.

The fix remains consumer-local: absent optional columns are materialized as row-aligned default Series before type normalization. Paper KB's export is unchanged.

The repository's ordinary CI and the dedicated W3 cross-repository proof both pass on the current PR head.

## What W3 did not centralize

Neither proof justified a new shared platform:

- `context_catalog@1` remains owned by the routing producer; MCP consumes it.
- the Paper KB review CSV remains a producer/consumer interface rather than being prematurely promoted into `kb-contracts`.

A shared contract should emerge from repeated interoperability need, not from a desire to make every arrow look symmetric.

## Architectural lessons from the first tranche

### Executable evidence is stronger than naming similarity

Both edges looked plausible in the responsibility graph. Both contained hidden incompatibilities. W3 found them only by moving a real artifact across the seam.

### Producer policy and consumer policy must remain distinct

A public projection should not require a consumer to know or reproduce the private decision process that created it.

### Optional-field behavior is part of compatibility

A consumer that claims fields are optional must test the absent-field case against a real producer, not only fixtures that happen to contain the field.

### Pin the boundary, not the whole universe

The proof pins exactly the producer commit/artifact/surface needed to establish the relationship. It does not create a universal integration environment or synchronize every repository.

## Remaining W3 frontier

After these two proofs, the higher-value unproven core is:

1. **`paper-kb → knowledge-inspect`** — identify one exact current paper/chunk/review artifact accepted by the inspection producer and prove validation without importing producer internals.
2. **`knowledge-inspect → kb-artifacts`** — prove the exact run/summary/evidence handoff consumed by selection; do not infer it from similarly named historical contracts.
3. **governed evidence → `context-routing`** — prove which `knowledge-inspect` / `kb-artifacts` outputs become routable published entries and which remain intentionally private.

Those edges should be pulled as independent bounded slices. W3 does not require proving every historical or optional arrow before moving on.
