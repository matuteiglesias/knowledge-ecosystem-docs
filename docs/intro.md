---
id: intro
title: Knowledge Ecosystem
sidebar_position: 1
---

# Knowledge Ecosystem

This documentation describes a small modular knowledge toolchain built from three main systems:

| Module | Role | Main output |
|---|---|---|
| `paper-kb` | Paper-content provider and paper product | `chunk_set.v1`, paper API, review CSV |
| `KB` | Knowledge-processing substrate and contract owner | validation, run records, manifests, summaries |
| `abstract-scroller` | Review snapshot surface | snapshot manifest, order file, compressed tiles |

The goal is not to merge these systems into one large application. The goal is to make each one independently useful and easy to integrate through explicit artifacts.

## End-to-end idea

```text
TEI/PDF papers
  ↓
paper-kb
  ↓ chunk_set.v1
KB
  ↓ validation / summaries / run evidence

paper-kb
  ↓ review CSV or review_node.v1
abstract-scroller
  ↓ static review snapshot
````

## What works today

The current working surfaces are:

* `paper-kb` can parse TEI files, emit `chunk_set` artifacts, and serve papers/chunks from those artifacts.
* `KB` can validate `chunk_set.v1` artifacts and run smoke ingest/analyze workflows.
* `abstract-scroller` can build static review snapshots from CSV or `review_node` JSONL.
* `paper-kb` can export review CSV for downstream review surfaces.

## What is still transitional

Some repo areas are useful but not stable public surfaces:

* legacy `store/chunks` and Chroma paths in `paper-kb`
* some stale scripts in `paper-kb`
* fragile embedding/vectorstore internals in `KB`
* future API/service stubs in `abstract-scroller`
* paper-kb frontend environment split between old and new API helpers

These should be documented, but not treated as primary operator paths.

## Design rule

Each module should be boring at its boundary.

Inside a module, implementation can evolve. Across modules, integration should happen through:

* versioned contracts
* artifacts
* documented CLIs
* stable HTTP APIs
* smoke tests

## Start here

Use the [Quickstart](./quickstart.md) to run the current working demos.