---
id: end-state
title: End State
sidebar_position: 2
---

# End State

The desired end state is a small modular knowledge toolchain.

## paper-kb

A reliable paper-content provider.

It can:

* ingest papers
* parse TEI/PDF-derived content
* manage a local paper corpus
* serve papers and chunks
* export review records
* emit `chunk_set.v1`

## KB

A reliable knowledge-processing substrate.

It can:

* validate artifacts
* produce run evidence
* analyze chunk sets
* summarize
* index
* provide auditable processing surfaces

## abstract-scroller

A reliable review snapshot surface.

It can:

* consume CSV or `review_node.v1`
* build static snapshots
* validate manifests and tiles
* support fast review/scanning

## Frontend

The `paper-kb` frontend remains a paper corpus UI.

It should not absorb the role of `abstract-scroller`.

## Integration rule

Modules integrate through:

```text
contracts
artifacts
CLIs
HTTP APIs
smoke tests
```

They do not integrate through private imports or hidden folder coupling.

## Mature shape

```text
paper-kb
  → chunk_set.v1
  → KB

paper-kb
  → review CSV / review_node.v1
  → abstract-scroller

paper-kb backend
  → paper-kb frontend
```

The system is mature when each module can be used alone and each integration can be battle-tested with one command sequence.
