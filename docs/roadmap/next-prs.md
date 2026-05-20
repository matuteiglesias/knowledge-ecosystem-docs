---
id: next-prs
title: Next PRs
sidebar_position: 1
---

# Next PRs

This roadmap prioritizes small PRs that harden useful surfaces.

## 1. paper-kb metadata floor

Goal:

```text
/api/papers returns human-readable titles, source files, and authors when available.
```

Acceptance:

* titles are not just `paper_f1d89af9`
* source_file is populated when known
* authors is always an array
* tests cover reconstruction

## 2. frontend demo docs

Goal:

```text
A human can start backend + frontend and see papers/chunks.
```

Files:

```text
frontend/DEMO.md
frontend/README.md
```

Acceptance:

* backend command documented
* frontend command documented
* API env vars documented

## 3. abstract-scroller snapshot docs

Goal:

```text
Snapshot artifacts and CSV/review_node inputs are clearly documented.
```

Files:

```text
DEMO.md
docs/snapshot-contract.md
docs/input-csv-v1.md
docs/review-node-v1.md
```

## 4. KB contract docs

Goal:

```text
KB public surfaces are obvious and internals are marked private.
```

Files:

```text
DEMO.md
docs/contracts.md
docs/operator-manual.md
docs/integration-with-paper-kb.md
```

## 5. ecosystem battle-test script

Goal:

```text
One script runs the public demos across repos.
```

Non-goal:

```text
No orchestration framework yet.
```

A shell script is enough.
