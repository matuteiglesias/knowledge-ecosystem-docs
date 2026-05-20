
id: paper-kb-to-abstract-scroller
title: paper-kb to abstract-scroller
sidebar_position: 2
-------------------

# paper-kb to abstract-scroller

This integration turns a paper corpus into a review snapshot.

```text
paper-kb
  ↓ review CSV
abstract-scroller
  ↓ manifest / order / tiles
```

## Why this needs a wrapper

The snapshot publisher belongs to:

```text
~/repos/abstract-scroller
```

The review CSV is produced by:

```text
~/Documents/paper-kb
```

Operators can easily make path mistakes by trying to run abstract-scroller commands from the `paper-kb` repo.

The ecosystem docs repo provides a cross-repo wrapper:

```text
scripts/build_review_snapshot.sh
```

This wrapper does not move functionality into `paper-kb`. It simply makes the handoff safer.

## Producer

`paper-kb`

## Artifact

```text
exports/review/papers.csv
```

or for the Eric demo:

```text
exports/review/eric_mvukiyehe_papers.csv
```

## Consumer

`abstract-scroller`

## Export review CSV from paper-kb

Workdir:

```bash
cd ~/Documents/paper-kb
```

Current explicit-env command:

```bash
mkdir -p exports/review

PAPER_KB_CHUNK_SETS_DIR=artifacts/chunk_sets_eric \
STORAGE_BACKEND=chunk_set \
python3 -m backend.exports.export_review_csv \
  --out exports/review/eric_mvukiyehe_papers.csv
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

Future named-corpus command:

```bash
python3 -m backend.exports.export_review_csv \
  --corpus eric_mvukiyehe
```

## Build snapshot with wrapper

Workdir:

```bash
cd ~/repos/knowledge-ecosystem-docs
```

Command:

```bash
bash scripts/build_review_snapshot.sh \
  --input ~/Documents/paper-kb/exports/review/eric_mvukiyehe_papers.csv \
  --snapshot eric_mvukiyehe_demo \
  --abstract-scroller-root ~/repos/abstract-scroller
```

The wrapper does this:

```text
1. Validate input CSV exists.
2. cd into abstract-scroller root.
3. Run backend.jobs.mvp_snapshot.
4. Run backend.publish.manifest.
5. Print the manifest path and suggested devserver command.
```

Expected outputs:

```text
~/repos/abstract-scroller/data/snapshots/eric_mvukiyehe_demo/manifest.json
~/repos/abstract-scroller/data/snapshots/eric_mvukiyehe_demo/tiles/tile_00000.json.br
```

## Manual equivalent

Workdir:

```bash
cd ~/repos/abstract-scroller
```

Command:

```bash
python3 -m backend.jobs.mvp_snapshot \
  --input ~/Documents/paper-kb/exports/review/eric_mvukiyehe_papers.csv \
  --format csv \
  --out data/snapshots/eric_mvukiyehe_demo

python3 -m backend.publish.manifest data/snapshots/eric_mvukiyehe_demo
```

## Serve snapshot

Workdir:

```bash
cd ~/repos/abstract-scroller
```

Command:

```bash
python3 -m backend.devserver --root data --port 8000
```

Open:

```text
http://127.0.0.1:8000/snapshots/eric_mvukiyehe_demo/manifest.json
```

## What this proves

This proves that `paper-kb` can feed a generic review surface without `abstract-scroller` reading paper-kb internals.

## Boundary rule

```text
abstract-scroller consumes review records.
abstract-scroller does not read paper-kb storage folders.
```

## Non-goals

* Do not import abstract-scroller Python code into paper-kb.
* Do not move abstract-scroller into paper-kb.
* Do not deploy anything as part of this handoff.
* Do not make abstract-scroller read `chunk_set` directly.

## Future path

The current low-friction bridge is CSV.

The stronger future bridge is:

```text
review_node.v1 JSONL
```

`abstract-scroller` already supports:

```bash
python3 -m backend.jobs.mvp_snapshot \
  --input data/review_nodes.sample.jsonl \
  --format review_node_jsonl \
  --out data/snapshots/vdemo_jsonl
```

