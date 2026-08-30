---
id: textflow-w2-status
title: Textflow W2 — Durable Invariants Extraction
sidebar_position: 8
---

# Textflow W2 — Durable Invariants Extraction

This bounded migration wave extracts the durable invariants worth preserving from `textflow-core` and assigns them to the current estate without porting the predecessor runtime.

## Baseline

The predecessor capability census was frozen at `textflow-core@edc3108510500beb70b78f746287b914169f4640` and adjudicated in Textflow PR #2.

W2 promotes no Textflow implementation as current authority. The canonical invariant definitions are in [Durable Knowledge-Processing Invariants](./durable-knowledge-invariants.md).

## Decisions

- knowledge/domain identity remains producer-owned;
- representation identity is derivative and must include representation-relevant configuration;
- vector/search indexes are rebuildable derivatives rather than corpus authority;
- producer reruns should be logically idempotent;
- derived outputs must identify governed inputs;
- material semantic/query configuration must be observable in run evidence;
- source semantics remain source-owner responsibility;
- no universal identity schema is added to `kb-contracts` in this wave.

## Pulled implementation work

The census exposed one concrete current-estate gap with enough evidence to justify implementation work:

1. `knowledge-inspect`: prove and, if needed, harden representation-aware embedding/cache identity (KI-3).
2. `knowledge-inspect`: prove vector-index rebuildability from governed corpus artifacts (KI-4).
3. `knowledge-inspect`: audit semantic result/run evidence for material representation and query configuration (KI-7).

These are W3 implementation concerns. Clustering, reranking, RAPTOR-style hierarchy, and historical digest presets remain latent unless a real consumer pulls them.

## Gate result

**W2: PASS once merged into the current architecture surface.**

The invariants are documented, each has an owner and a falsification/proof obligation, implementation gaps are routed to existing authorities, and no new meta-service or shared interoperability schema has been created.