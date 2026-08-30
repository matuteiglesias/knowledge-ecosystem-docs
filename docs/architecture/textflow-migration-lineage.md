---
id: textflow-migration-lineage
title: Textflow Migration Lineage
sidebar_position: 9
---

# Textflow Migration Lineage

**Status:** migration and repository closure complete through W7 on 2026-08-30.  
**Predecessor:** `matuteiglesias/textflow-core`  
**Lifecycle:** superseded · archive-ready; GitHub Archive/read-only toggle pending.

Textflow is useful predecessor evidence, not a system to preserve as a single successor runtime. Its historical responsibilities were decomposed into the authorities that now own the corresponding concerns.

## Why there is no single successor

The earlier runtime combined source interpretation, normalization, stable node identity, embedding/cache state, Chroma persistence, retrieval, clustering, Markdown export, optional synthesis and run reporting in one pipeline.

The mature estate deliberately separates those responsibilities:

| Historical Textflow concern | Current disposition | Current authority / boundary |
| --- | --- | --- |
| source acquisition / source-specific parsing | producer-owned | source-owning producers such as `paper-kb`; no universal ingest authority |
| logical knowledge identity and provenance | producer-owned, shared only when interoperability requires it | producer contracts; `kb-contracts` only for registered cross-repo semantics |
| representation identity / embedding derivative state | migrated as invariant | `knowledge-inspect` semantic runtime |
| Chroma / vector persistence | rebuildable derivative | `knowledge-inspect`; never corpus truth |
| semantic inspection / analysis | current bounded capability | `knowledge-inspect` |
| deterministic filtering / selection / readable export | current bounded capability | `kb-artifacts` |
| collection and experience composition | current composition authority | `knowledge-experiences` |
| review snapshot projection | current renderer/consumer capability | `abstract-scroller` |
| published context projection and bounded access | current routing/gateway capability | `context-routing` → `matias-context-mcp` |
| FAQ / digest / changelog / executive-summary presets | latent product ideas only | no authority until a concrete consumer pulls one |
| RAPTOR / generic hierarchy / generic reranking | latent or retired predecessor implementation | no current authority claim |

Historical aliases such as `gpt-digests` are therefore **not** the Textflow successor. They remain historical evidence only. The successor is a distributed responsibility map.

## W0/W1 — predecessor census

`textflow-core/docs/CAPABILITY_LEDGER.md` froze the historical inventory and adjudicated each capability as satisfied, migrate, latent or retire.

Repository-visible searches found no downstream code dependency on `textflow-core`, `snippetflow`, the historical `gpt_logs` collection or ignored local Chroma/SQLite state. That result justified migration by capability rather than preservation of a universal runtime.

## W2 — durable invariant extraction

W2 extracted only the semantics worth keeping:

- logical knowledge identity must remain distinct from representation identity;
- representation caches/indexes must be configuration-aware and rebuildable;
- producer reruns should be idempotent;
- derived outputs must identify governed inputs;
- material semantic configuration and result identity must be observable;
- source semantics remain source-owner responsibility.

See [Durable Knowledge-Processing Invariants](./durable-knowledge-invariants.md).

## W3 — semantic-runtime proof

W3 hardened `knowledge-inspect` directly instead of porting Textflow code.

Accepted evidence established:

- representation-aware cache, processed-state and physical vector-collection identity;
- stable logical chunk identity across representation changes;
- target vector-state rebuildability from governed inputs;
- preservation of unrelated vector state during a target reset;
- truthful run evidence when vector/retrieval/clustering behavior was or was not used.

No Textflow runtime dependency, RAPTOR subsystem, generic reranker or universal retrieval CLI was introduced.

## W4 — ingestion ownership

W4 resolved the source boundary with the mature pattern:

```text
raw source
    ↓
source-owning producer
    ↓
governed producer artifact
    ↓
consumer
```

Knowledge Inspect PR `#27` moved its canonical smoke path to a producer-owned governed `chunk_set` and marked the retained raw-chat parser/ingest path as `legacy_compatibility_non_authoritative`.

No repository-visible current consumer justified a new chat/day-file producer. The correct result was therefore a **missing authority**, not a fabricated `chat-kb` service.

## W5 — output and synthesis disposition

W5 found no missing current runtime that justified a port:

- deterministic selection and readable Markdown export are already supplied by `kb-artifacts`;
- governed collection/experience composition is supplied by `knowledge-experiences`;
- generic clustered Markdown, label stubs and basic polish/concatenation are retired as Textflow pipeline products;
- FAQ, daily digest, changelog, executive summary and generic polished-answer products remain latent until a real consumer defines purpose, governed inputs, evidence boundary and editorial responsibility.

Textflow PR `#6` records the final W3–W5 disposition ledger.

## W6 — architecture reconciliation

W6 updated the canonical architecture authority to describe merged implementation truth rather than the old predecessor shape. It merged as `knowledge-ecosystem-docs@847759e2a44fb360ac387e603f1b5b9c91e293ad` with docs CI green.

Important consequences:

1. `textflow-core` appears only under historical/superseded systems.
2. `gpt-digests` is not named as a successor.
3. `knowledge-experiences` is recognized as the active composition authority supported by real-source experience evidence.
4. `knowledge-inspect ↛ kb-artifacts` remains a corrected non-edge.
5. producer artifacts may flow directly to Knowledge Inspect **or** Knowledge Experiences when the consumer contract requires it.
6. no Textflow capability fans out into every subsystem merely because it once lived in one repository.
7. no new `kb-contracts` schema was justified by the migration.

## W7 — predecessor repository closure

W7 merged in Textflow at `e3c94cc64ad37801a82ad9e8defce3a24def8f81`.

It changed only:

- `README.md` — prominent superseded/archive-ready banner and historical-use framing;
- `LIFECYCLE.md` — exact migration baseline/final migration commit, W6 architecture evidence, owner closure and archive gate;
- `docs/CAPABILITY_LEDGER.md` — final W3–W7 evidence pointers and resolved dispositions.

Historical runtime code, demos, requirements and the vendored/reference RAPTOR subtree were intentionally left untouched.

The owner authorized archival closure and stated that machine-local Textflow data/stores were demo material with no valuable unique data requiring rescue. GitHub cannot independently inspect local cron/systemd/aliases, so the W7 record does not fabricate such a scan; it records the owner decision that no operational Textflow runtime or local truth needs preservation.

The repository is therefore **archive-ready**. The only remaining action is GitHub's repository Archive/read-only setting, which is not exposed by the connected tool used for this work.

## Evidence-backed successor graph

```text
source-owning producers
        │
        ├── governed artifacts ──► Knowledge Inspect
        │                         semantic inspection / run evidence
        │
        ├── governed records ────► Knowledge Experiences
        │                         collection/experience composition
        │                               │
        │                               ▼
        │                         renderer adapters
        │                               │
        │                               ▼
        │                         human experiences
        │
        └── producer projections ─► other bounded consumers

KB Artifacts
  deterministic exploration / governed selection / export
  (orthogonal capability; no mandatory Knowledge Inspect edge)

selected governed/public projections
        │
        ▼
 context-routing → matias-context-mcp → humans / agents
```

This graph intentionally contains missing edges. A consumer-driven seam is evidence; visual symmetry is not.

## Closure rule

No further Textflow migration or repository-development wave is implied by historical code remaining inspectable. Future work must be pulled by a concrete current consumer and implemented in the authority that owns the relevant source, inspection, selection, composition, routing or rendering responsibility.

Textflow is now predecessor evidence awaiting only the administrative GitHub Archive toggle.