---
id: module-boundaries
title: Module Boundaries
sidebar_position: 2
---

# Module Boundaries

This page defines what each module owns, what it consumes, and what it must not own.

## Boundary summary

| Module              | Owns                                                      | Consumes                     | Must not own                                              |
| ------------------- | --------------------------------------------------------- | ---------------------------- | --------------------------------------------------------- |
| `paper-kb`          | paper parsing, paper API, paper frontend, review export   | KB contracts, TEI/PDF inputs | generic KB processing, review snapshot UI                 |
| `KB`                | contracts, validators, run evidence, ingest/analyze seams | valid knowledge artifacts    | paper product UI, paper metadata UX, abstract-scroller UI |
| `abstract-scroller` | snapshot publishing, manifest/order/tiles, review UI      | CSV or review_node JSONL     | paper parsing, KB internals, Chroma                       |
| `paper-kb/frontend` | paper corpus UI                                           | paper-kb API                 | generic review UI, KB admin UI                            |

## paper-kb boundary

`paper-kb` is the paper-content provider.

It owns:

* TEI/GROBID adapter behavior
* paper ID policy
* paper metadata extraction
* paper API
* paper frontend
* `chunk_set` emission
* review CSV export

It may consume:

* KB `chunk_set.v1` schema
* KB validator CLI
* local TEI/PDF inputs

It should not expose as public contracts:

* `store/chunks`
* `store/chroma`
* `store/chroma_fallback`
* parser internals
* storage adapter internals
* stale scripts

Public surfaces:

* `artifacts/chunk_sets/*.chunk_set.json`
* `/api/papers`
* `/api/papers/{paper_id}`
* `/api/papers/{paper_id}/chunks`
* `exports/review/papers.csv`
* `scripts/poke_api_chunk_set.sh`

## KB boundary

`KB` is the knowledge-processing substrate.

It owns:

* `chunk_set.v1`
* validation CLI/API
* run records
* manifests
* observability latest
* summary and export artifacts
* smoke ingest/analyze seams

It may consume:

* `chunk_set.v1`
* chat JSONL test/input files
* provider credentials for real embedding runs

It should not depend on:

* `paper-kb` internals
* `abstract-scroller` internals
* `openalex-gui` internals
* ambiguous `shared.*` imports as public surface

Public surfaces:

* `contracts/chunk_set.v1.schema.json`
* `python -m kb.cli.kb_validate_chunk_set`
* `python -m kb.cli.kb_chat_ingest`
* `python -m kb.cli.kb_chat_analyze`
* `artifacts/run_records`
* `artifacts/manifests`
* `artifacts/observability`

## abstract-scroller boundary

`abstract-scroller` is the review snapshot surface.

It owns:

* snapshot build command
* manifest contract
* order contract
* tile contract
* static serving demo
* review-node ingest

It may consume:

* CSV review exports
* `review_node.v1` JSONL

It should not consume:

* `paper-kb` storage folders
* `KB` private internals
* Chroma stores
* raw paper parser outputs
* `chunk_set` directly, unless mediated by a review export adapter

Public surfaces:

* `python -m backend.jobs.mvp_snapshot`
* `manifest.json`
* `order/ORDER.bin`
* `tiles/*.json.br`
* `contracts/schemas/manifest.schema.json`
* `contracts/schemas/tile.schema.json`
* `contracts/schemas/review_node.v1.schema.json`

## paper-kb frontend boundary

The frontend is part of the paper-kb product.

It owns:

* paper list UI
* paper chunk UI
* frontend normalization
* React Query hooks
* typed API client

It consumes:

* `paper-kb` backend API

It should not become:

* the generic review scroller
* the KB admin dashboard
* a general OpenAlex discovery UI
* a replacement for `abstract-scroller`

Current env vars:

```text
NEXT_PUBLIC_API_BASE
NEXT_PUBLIC_API_URL
```

The target is to make one canonical and one compatibility-only.

## Dependency rules

Use these rules when reviewing PRs:

```text
KB must not import paper-kb.

abstract-scroller must not import paper-kb.

abstract-scroller must not import KB.

paper-kb may validate against KB contracts.

paper-kb frontend may call paper-kb backend.

paper-kb may export review records to abstract-scroller.

Integration should happen through files, contracts, APIs, or CLIs.
```

## Public surface checklist

A path can be documented as public only if:

* it has a command or file path
* it has a known producer
* it has a known consumer
* it has a smoke test or validation path
* stale alternatives are clearly marked as stale

If not, mark it as private, compatibility, placeholder, or future.
