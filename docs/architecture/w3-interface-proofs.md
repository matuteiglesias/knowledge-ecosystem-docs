---
id: w3-interface-proofs
title: W3 Interface Proofs
sidebar_position: 7
---

# W3 Interface Proofs

**Execution date:** 2026-08-28  
**Wave:** W3 — interface proof  
**Tranche:** 1 — two executable edges plus one audited non-edge

W3 changes the meaning of an architecture arrow. A repository relationship is not `proven` because two README files use similar nouns. It is `proven` only when an exact producer output crosses an explicit boundary and the intended consumer accepts it under reproducible validation.

## Tranche result

| Edge | W3 status | Evidence | Result |
| --- | --- | --- | --- |
| `paper-kb → knowledge-inspect` | **PROVEN** | paper-kb [PR #13](https://github.com/matuteiglesias/paper-kb/pull/13); workflow head `3ec4ccef`; Knowledge Inspect pinned at `45668d53` | real `chunk_set` writer output accepted by real Knowledge Inspect validator; producer contract regression green |
| `context-routing → matias-context-mcp` | **PROVEN WITH BOUNDED COMPATIBILITY FIX** | Context Routing [PR #5](https://github.com/matuteiglesias/context-routing/pull/5); MCP [PR #8](https://github.com/matuteiglesias/matias-context-mcp/pull/8) | real generated public catalog crosses MCP with exact integrity/projection/privacy checks; both regression suites green after codec repair |
| `knowledge-inspect → kb-artifacts` | **NOT PROVEN; DIRECT EDGE CORRECTED** | KB Artifacts [PR #11](https://github.com/matuteiglesias/kb-artifacts/pull/11); Knowledge Inspect [PR #20](https://github.com/matuteiglesias/knowledge-inspect/pull/20) | current KI primary outputs are JSON summary/run evidence; current KB Artifacts boundary is producer-agnostic JSONL evidence. No direct current adapter/export seam was found. |

The third result is not a failure of W3. Removing an invented edge is as valuable as proving a real one.

## Proof 1 — `paper-kb → knowledge-inspect`

### Exact producer

`paper-kb` already owns `pipeline.writers.chunk_set_writer.write_chunk_set_artifact`. The W3 workflow generates a bounded artifact with:

```text
artifact_family = chunk_bus
artifact_kind   = chunk_set
schema_version  = 1
producer        = paper-kb
run_id          = w3-paper-kb-demo
chunk_count     = 2
```

The proof deliberately avoids GROBID, network access, model calls and persistent corpus state. The interface under test is the writer output, not the whole paper pipeline.

### Exact consumer

The workflow checks out Knowledge Inspect at exact commit `45668d539d9975fe2a507f98e688d14179dc0dfd` and invokes its existing validator:

```text
python -m kb.cli.kb_validate_chunk_set <producer-artifact> --format text
```

The exact producer file is validated without importing producer internals into the consumer. The workflow then checks producer identity, run identity, count and chunk IDs and runs `tests/test_chunk_set_writer_contract.py`.

### W3 conclusion

This edge is now an executable producer-consumer boundary. No new adapter or shared schema was invented.

## Proof 2 — `context-routing → matias-context-mcp`

### Exact producer

Context Routing generates its real public surface using:

```text
scripts/build_context_routing.py
  --fixture tests/fixtures/context_routing/registry-valid.json
  --generated-at 2026-08-28T00:00:00+00:00
```

The interface artifact is:

```text
static/context-data/sources.json
```

The fixture contains one eligible public source plus hidden/sensitive rows and sentinel values that must not leak into the public projection.

### Exact consumer

The MCP gateway already declares the logical resource:

```text
matias-context://source/context-routing/document/published-source-catalog
```

The W3 test reads that real generated file through the actual `ResourceKernel` and checks:

- resource/source/logical identity;
- exact producer-file SHA-256 and byte size propagated through the response;
- public catalog schema/projection identity;
- expected public-source count;
- hidden, sensitive and internal sentinels absent;
- physical producer root absent from the response.

The producer-side workflow then runs the complete MCP consumer test suite and the Context Routing regression suite.

### Contract drift discovered

The first real proof crossed the file successfully but returned zero projected sources.

The cause was architectural rather than incidental: Context Routing correctly performs publication/exposure filtering before it emits its public `context_source@1` objects. Those public objects intentionally no longer contain internal control-plane fields such as `publish_status` and `exposure_level`. The MCP codec was trying to apply a second filter using those removed fields.

### Bounded repair

MCP PR #8 makes the codec recognize the explicit current `context_source@1` public schema and map its public field vocabulary into the existing MCP normalized projection. The older control-plane-shaped catalog path remains supported and retains gateway-side publication/exposure filtering.

Characterization tests cover both forms.

This does **not** broaden publication policy. It makes the consumer compatible with the producer's already-filtered public contract while preserving legacy behavior.

### Credential topology

The cross-repo CI runs from the private Context Routing repository. A token in the public MCP repository cannot clone a private sibling; the private producer runner can access its own checkout and clone the public consumer. The execution location follows least privilege rather than forcing cross-repo credentials into the consumer.

## Audit 3 — `knowledge-inspect → kb-artifacts`

W2 metadata suggested a direct edge. W3 inspected the concrete current surfaces instead of creating a proof around the metadata.

Knowledge Inspect currently emits, among other outputs, JSON run evidence and a JSON `summary_bus` analysis artifact. KB Artifacts currently reads producer-agnostic JSONL evidence collections through its `jsonl_bus` reader and `--chunk-glob` / `--summary-glob` surfaces.

Those concepts are compatible at a higher level, but **there is no direct current producer-consumer seam to prove** without adding a conversion/export adapter.

W3 therefore does not add one. The repository declarations are corrected instead:

- KB Artifacts PR #11 removes the specific Knowledge Inspect run-manifest/summary-bus input claim and records its actual JSONL input boundary.
- Knowledge Inspect PR #20 removes KB Artifacts from its direct downstream list and explicitly does not claim downstream JSONL adaptation.

A direct edge can be reintroduced later if a concrete workflow needs it and an exact artifact/export is then governed and proven.

## Current edge graph after tranche 1

```text
paper-kb
   ║
   ║ PROVEN: chunk_set@1
   ▼
knowledge-inspect
   │
   │ no direct current edge
   │
   └─────────────X────────────► kb-artifacts

knowledge-inspect       kb-artifacts
        │                    │
        └──── declared ──────┴────► context-routing
                                      ║
                                      ║ PROVEN WITH FIX:
                                      ║ public context catalog
                                      ▼
                               matias-context-mcp
                                      │
                                      ▼
                                humans / agents

paper-kb ── declared/unproven ──► abstract-scroller
```

`declared` still means responsibility/intended-consumer evidence only. It must not be read as executable compatibility.

## Remaining W3 frontier

The next high-value candidates are now:

1. **governed outputs → `context-routing`** — determine what the routing control plane actually references versus what is merely a source descriptor; do not assume it ingests producer artifacts.
2. **`paper-kb → abstract-scroller`** — prove whether a current `review_node` export actually exists on the producer side before using Abstract Scroller's known ingest path.
3. **direct MCP manifest reads** from Knowledge Inspect / KB Artifacts — these may be more concrete than routing ingestion and can be proven independently.

Stop before inventing new adapters merely to increase the number of green arrows.

## Tranche completion statement

W3 tranche 1 is complete when the proof PRs remain green/mergeable and the architecture authority records the distinction among proven edges, corrected non-edges and still-declared relationships.

The main outcome is not the number of integrations. It is that the ecosystem now has a repeatable standard for deciding whether an integration actually exists.
