---
id: ecosystem-blueprint
title: Ecosystem Blueprint
sidebar_position: 1
---

# Ecosystem Blueprint

The knowledge ecosystem is built from three primary modules and one frontend submodule.

```text
paper-kb
  Paper-content provider

KB
  Knowledge-processing substrate

abstract-scroller
  Review snapshot surface

paper-kb/frontend
  Paper corpus UI
```

## Why these are separate

Each module answers a different question.

| Question                                       | Module              |
| ---------------------------------------------- | ------------------- |
| How do I parse and manage papers?              | `paper-kb`          |
| How do I validate/process knowledge artifacts? | `KB`                |
| How do I review prepared records quickly?      | `abstract-scroller` |
| How do I inspect a paper corpus in a UI?       | `paper-kb/frontend` |

The modules should compose, but they should not depend on each other’s private internals.

## Main flow

```text
TEI/PDF
  ↓
paper-kb pipeline
  ↓
chunk_set.v1
  ↓
KB validation / processing / run evidence

paper-kb backend
  ↓
paper-kb frontend

paper-kb export
  ↓
review CSV or review_node.v1
  ↓
abstract-scroller snapshot
```

## Module promises

### paper-kb

`paper-kb` turns paper inputs into a local paper corpus.

It can:

* parse TEI files
* write compatibility chunk files
* emit `chunk_set.v1` artifacts
* serve `/api/papers` and `/api/papers/{paper_id}/chunks`
* export review CSV

### KB

`KB` owns knowledge contracts and processing evidence.

It can:

* validate `chunk_set.v1`
* run smoke ingest
* run analyze
* emit run records
* emit manifests
* emit observability latest files
* emit summaries and exports

### abstract-scroller

`abstract-scroller` turns prepared records into a review snapshot.

It can:

* read CSV
* read `review_node.v1` JSONL
* build a manifest
* build an order vector
* build compressed tiles
* serve the snapshot locally

### paper-kb frontend

The frontend is the paper corpus UI.

It can:

* fetch papers
* fetch paper chunks
* normalize API responses
* render paper-oriented views

It is not the generic review surface. That role belongs to `abstract-scroller`.

## Public integration artifacts

| Artifact                              | Producer            | Consumer                  | Status                                                           |
| ------------------------------------- | ------------------- | ------------------------- | ---------------------------------------------------------------- |
| `chunk_set.v1`                        | `paper-kb`, `KB`    | `KB`, paper-kb backend    | Working                                                          |
| `review CSV v1`                       | `paper-kb`          | `abstract-scroller`       | Working                                                          |
| `review_node.v1`                      | `paper-kb` or `KB`  | `abstract-scroller`       | Working in abstract-scroller ingest, still emerging in ecosystem |
| snapshot manifest/order/tiles         | `abstract-scroller` | static viewer / human     | Working                                                          |
| run record / manifest / observability | `KB`                | operators / orchestrators | Working                                                          |

## Non-goals

For the current phase, do not:

* merge the repos
* build one universal frontend
* make `abstract-scroller` read `chunk_set` directly
* make `KB` import `paper-kb`
* treat Chroma internals as a public integration surface
* build microservices before the file/artifact interfaces are stable

## Design principle

Each module should be independently useful.

Each integration should be testable with one file or one command.

If a future agent cannot tell whether a path is public or private, the documentation has failed.
