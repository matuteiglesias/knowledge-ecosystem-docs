---
id: w3-interface-proofs
title: W3 Interface Proofs
sidebar_position: 7
---

# W3 Interface Proofs

**Execution:** 2026-08-28 to 2026-08-29  
**Status:** bounded core tranche accepted; remaining arrows are explicitly declared, corrected, or deferred.

W3 changed the ecosystem standard from plausible responsibility arrows to executable producer-consumer evidence.

## Proof state vocabulary

- **declared** — repository boundaries say a relationship should exist.
- **CI-proven** — real producer/interface bytes cross into the real consumer and observable assertions pass.
- **accepted** — the proof/fix is merged to the relevant repository `main`.
- **corrected non-edge** — inspection found no current direct seam; metadata is changed rather than inventing an adapter.

## Accepted edge — `context-routing → matias-context-mcp`

**Consumer acceptance:** `matias-context-mcp#7`, merged as `18a11c02c9f5040ca966b99959afb7167645d9dd`.  
**Producer-side cross proof:** `context-routing#5`, merged.

The proof moved the versioned public `context_catalog@1` projection through the real MCP read path. It exposed an authority-boundary bug: the consumer attempted to re-apply private publication policy to an already-sanitized public artifact. The accepted fix validates and exposes the producer-owned public contract without reconstructing private routing decisions.

The public consumer proof deliberately uses only public projected bytes/provenance. No broad private-repository credential was added merely to make CI green.

## Accepted edge — `paper-kb → knowledge-inspect`

**Proof:** `paper-kb#13`, merged.

Paper KB's real chunk-set writer emits the producer-owned paper chunk artifact; the exact generated artifact is validated through Knowledge Inspect's real public validator CLI. Producer identity, counts and contract behavior are asserted, followed by producer regression tests.

W3 therefore does **not** require `kb-contracts` to own the paper chunk-set schema. The interoperability need is currently satisfied by a producer-owned artifact plus an explicit consumer validation boundary.

## Accepted review edge — `paper-kb → abstract-scroller`

W3 first proved the historical review CSV through `abstract-scroller#3`, exposing and fixing an optional-column ingestion defect in the consumer.

P0–P4 then strengthened the seam:

```text
Paper KB governed chunk_set
        ↓
producer-owned paper.review-record@1
        ↓
Abstract Scroller compatibility adapter
        ↓
immutable review snapshot
```

`paper.review-record@1` is owned by Paper KB. Abstract Scroller validates only the compatibility surface it needs and does not vendor the producer schema. `paper_uid` survives as snapshot identity. CSV and the local `review_node_jsonl` experiment remain compatibility surfaces rather than machine-preferred authority.

## Corrected non-edge — `knowledge-inspect ↛ kb-artifacts`

W3 inspected both real implementations and could not prove the previously implied direct handoff.

Knowledge Inspect currently emits its producer-owned analysis/run artifacts. KB Artifacts consumes producer-agnostic JSONL evidence collections. No exact current adapter connects those surfaces.

Accepted metadata corrections in `knowledge-inspect#20` and `kb-artifacts#11` remove the false direct edge. A future adapter should exist only when a concrete workflow requires one.

This is a successful W3 result: removing an invented arrow improves architecture truth.

## Relationship discovered between Knowledge Inspect and KB Artifacts

The two repositories are better understood as orthogonal capabilities:

- **Knowledge Inspect** — semantic/analytical inspection; produces evidence-bearing derived artifacts and run-level provenance; does not own evidence promotion.
- **KB Artifacts** — deterministic corpus exploration and governed evidence selection/promotion mechanics; does not own semantic interpretation.

They may participate in future loops (deterministic narrowing before inspection, or governed promotion after inspection) without requiring a direct mandatory pipeline today.

## Remaining frontier

The highest-value unproven relationship is now narrower:

- governed producer/evidence outputs → `context-routing`: prove which outputs become published routable entries and which remain private.

Direct MCP reads of specific producer manifests can be proven independently when a real consumer workflow requires them.

W3 is not blocked on proving every historical or optional arrow. Its core purpose — distinguish real seams from inferred ones and make important deterioration testable — is complete enough to proceed to W4 sensing.
