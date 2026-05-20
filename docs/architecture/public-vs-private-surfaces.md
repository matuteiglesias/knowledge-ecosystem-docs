---
id: public-vs-private-surfaces
title: Public vs Private Surfaces
sidebar_position: 3
---

# Public vs Private Surfaces

A public surface is something another human, agent, or system can safely depend on.

## Public surface criteria

A path or command can be public only if:

* it has a documented command or file path
* it has a known producer
* it has a known consumer
* it has a test, smoke command, or validation path
* stale alternatives are clearly marked

## Public surfaces

| Module            | Public surfaces                                                                    |
| ----------------- | ---------------------------------------------------------------------------------- |
| paper-kb          | `artifacts/chunk_sets`, `/api/papers*`, review CSV export, chunk-set smoke script  |
| KB                | schemas, validator CLI, ingest/analyze CLIs, run records, manifests, observability |
| abstract-scroller | snapshot build command, manifest, order, tiles, schema tests                       |
| paper-kb frontend | typed API client, hooks, paper UI demo                                             |

## Private surfaces

Private surfaces can change without warning.

Examples:

```text
pipeline parser internals
storage adapter internals
Chroma helper internals
frontend component stories
dev fixtures
logs
cache files
```

## Compatibility surfaces

Compatibility surfaces are allowed to exist, but should not be used for new integrations.

Examples:

```text
paper-kb/store/chunks
paper-kb/store/chroma
paper-kb/store/chroma_fallback
paper-kb fixture JSONL adapter
```

## Placeholder surfaces

Placeholder surfaces are documented as future or incomplete.

Examples:

```text
abstract-scroller bitsets
abstract-scroller nodes
abstract-scroller service stubs
old paper-kb orchestration scripts
```

## Rule for agents

Before using a path, ask:

```text
Is this public, compatibility, private, or placeholder?
```

If the answer is unclear, do not build on it until the docs are updated.
