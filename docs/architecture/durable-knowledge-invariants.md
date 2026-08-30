---
id: durable-knowledge-invariants
title: Durable Knowledge-Processing Invariants
sidebar_position: 2
---

# Durable Knowledge-Processing Invariants

This page records the durable knowledge-processing invariants recovered during the `textflow-core` supersession program. They are **architecture constraints**, not a new shared schema, service, or orchestration layer.

The predecessor is useful here as evidence: it demonstrated stable semantic-unit identifiers, idempotent ingestion, derivative embedding caches, persistent retrieval structures, and run evidence. The current estate keeps the useful invariants while rejecting the predecessor's monolithic JSONL → Markdown/LlamaIndex → Chroma/RAG architecture.

## Identity model

The estate must distinguish the identity of knowledge from the identity of representations and executions over that knowledge.

```text
source identity
    ↓
document / domain-entity identity
    ↓
chunk / knowledge-unit identity

chunk identity + representation kind + model + representation-relevant config
    ↓
representation identity

input artifact(s) + representation/query config + operation
    ↓
run / inspection identity
```

A vector database row, local file path, provider object ID, cache key, or embedding vector must not become the accidental canonical identity of a knowledge unit.

The exact domain identity remains producer-owned. A paper producer may have `paper_uid` and `chunk_id`; another producer may use different domain identities. `kb-contracts` should register a shared identity schema only when repeated interoperability requires one.

## Durable invariants and proof obligations

| ID | Invariant | Primary authority | Falsification / proof obligation | Current W2 state |
| --- | --- | --- | --- | --- |
| KI-1 | **Logical knowledge identity is independent of storage identity.** Moving a governed artifact or rebuilding storage must not change its logical entity/chunk identity. | source/domain producer | Materialize the same governed source into a fresh storage location and compare canonical identities. A changed identity caused solely by path/row/store location falsifies the invariant. | architecture-required; producer proofs are local |
| KI-2 | **Logical knowledge identity is independent of representation identity.** Changing embedding model or representation configuration creates a new representation of the same knowledge unit, not a new knowledge unit. | producer for knowledge identity; inspection/representation consumer for derivative identity | Represent one unchanged chunk under two materially different model/config tuples. `chunk_id` must remain fixed while representation identity differs. | architecture-required; representation identity hardening remains W3 work |
| KI-3 | **Representation identity includes representation-relevant configuration.** Cache reuse is valid only when the underlying knowledge identity and representation configuration are compatible. | `knowledge-inspect` for its semantic runtime | Same chunk + different model/config must not resolve to the same cache entry unless equivalence is explicitly proven. Same chunk + same config may reuse a cached representation. | open implementation proof; pulled into Textflow W3 |
| KI-4 | **Vector/search indexes are rebuildable derivatives, not knowledge authority.** Deleting an index must not destroy the governed corpus or its logical identity. | consumer owning the index | Build an index from a governed fixture, remove the index, rebuild from the same fixture/config, and prove equivalent logical membership and valid queryability. | architecture-required; W3 proof pending |
| KI-5 | **Producer reruns are logically idempotent.** Reprocessing unchanged governed inputs must not duplicate logical artifacts or silently mint new logical identities. | each source/domain producer | Run the same bounded producer fixture twice. Canonical logical identities and membership must remain stable; duplicate logical entities falsify the invariant. | architecture-required; producer-specific evidence |
| KI-6 | **Derived outputs identify governed inputs.** An inspection, summary, selection, or experience release must make the source artifact/run identities needed to trace its derivation observable. | repository producing the derivative | Inspect emitted run/artifact metadata. If the result cannot be traced to the governed input artifact(s), the invariant fails. | substantially present in current run/manifests; verify per interface |
| KI-7 | **Representation/query configuration relevant to a result is observable.** A nontrivial semantic result must record enough configuration to compare or reproduce the transformation. | `knowledge-inspect` or other semantic consumer | Run evidence must expose the material model/retrieval/filter/query parameters and warnings relevant to the result. Hidden material configuration falsifies the invariant. | partially satisfied; W3 coverage audit pending |
| KI-8 | **Source semantics remain source-owner responsibility.** Inspection, indexing, routing, and rendering consumers must not silently reinterpret source/domain identity or parsing semantics. | source/domain producer, enforced at integration seams | A consumer proof must preserve producer identity and consume an explicit artifact/interface rather than reconstructing source truth from private internals. | already consistent with current authority model |

These tests are intentionally **local to the owning repository or interface**. This page does not create a central runtime that executes them.

## What is deliberately not standardized

W2 does **not** define a universal `source_id`, `document_id`, `chunk_id`, `representation_id`, or `selection_id` wire schema.

Those names are useful conceptual roles, but turning them into shared contracts before repeated cross-repository demand would violate the authority model. Producer-owned semantics remain producer-owned; `kb-contracts` remains the place for genuinely shared interoperability only.

Likewise, W2 does not standardize:

- Chroma or any other vector-store implementation;
- one embedding provider or model;
- one chunking algorithm;
- one cache backend;
- one retrieval/reranking algorithm;
- one global ingestion pipeline;
- one run orchestrator.

## Rebuildability boundary

The mature authority direction is:

```text
governed source/domain artifact
        │
        ├── lexical/search derivative
        ├── embedding representation
        ├── vector index
        ├── graph/cluster projection
        └── semantic inspection run
```

The arrows do not reverse. A derivative may accelerate or enable inspection, but it does not become source truth merely because a runtime depends on it.

## Relation to `textflow-core`

The migration keeps **invariants, not implementations**.

Preserve conceptually:

- stable knowledge-unit identity;
- logically idempotent reprocessing;
- source-to-unit provenance;
- rebuildable semantic representations;
- observable run evidence;
- retrieval as a configurable, inspectable transformation.

Do not port merely for historical continuity:

- LlamaIndex compatibility glue;
- the old Chroma helpers/collection names;
- JSONL → Markdown as a universal ingestion path;
- filename-level `processed_files` state as a global contract;
- model/provider-specific exception handling;
- the monolithic RAG CLI;
- vendored RAPTOR code;
- historical digest/FAQ/polish presets without current consumer demand.

## W2 gate

Textflow migration W2 is complete when:

1. these invariants are accepted as part of the current reference architecture;
2. each invariant has an owning authority and a concrete falsification/proof shape;
3. implementation gaps are assigned to existing repositories rather than solved by a new central layer;
4. no new shared contract has been introduced without demonstrated interoperability pressure.

The first pulled implementation gap is **KI-3 representation-aware cache identity in `knowledge-inspect`**, followed by the KI-4/KI-7 rebuildability and run-evidence proofs. Those belong to the next implementation wave, not to this architecture extraction.