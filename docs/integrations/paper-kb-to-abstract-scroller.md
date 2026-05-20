---
id: paper-kb-to-abstract-scroller
title: paper-kb to abstract-scroller
sidebar_position: 2
---

# paper-kb to abstract-scroller

This integration turns a paper corpus into a review snapshot.

```text
paper-kb
  ↓ review CSV
abstract-scroller
  ↓ manifest / order / tiles
```

## Producer

`paper-kb`

## Artifact

```text
exports/review/papers.csv
```

## Consumer

`abstract-scroller`

## Export review CSV

```bash
cd "$HOME/Documents/paper-kb"

python -m backend.exports.export_review_csv \
  --out exports/review/papers.csv
```

Expected columns:

```text
doc_id
title
abstract
date
year
venue
tags
badges
source_url
paper_id
```

## Build snapshot

```bash
cd "$HOME/repos/abstract-scroller"

python -m backend.jobs.mvp_snapshot \
  --input "$HOME/Documents/paper-kb/exports/review/papers.csv" \
  --format csv \
  --out data/snapshots/paper_kb_demo
```

## Validate snapshot

```bash
python -m backend.publish.manifest data/snapshots/paper_kb_demo
pytest -q backend/tests/test_snapshot_contracts.py
```

## Serve snapshot

```bash
python -m backend.devserver --root data --port 8000
```

Open:

```text
http://127.0.0.1:8000/snapshots/paper_kb_demo/manifest.json
```

## What this proves

This proves that `paper-kb` can feed a generic review surface without `abstract-scroller` reading paper-kb internals.

## Boundary rule

```text
abstract-scroller consumes review records.
abstract-scroller does not read paper-kb storage folders.
```

## Future path

The current low-friction bridge is CSV.

The stronger future bridge is:

```text
review_node.v1 JSONL
```

`abstract-scroller` already supports `--format review_node_jsonl`.
