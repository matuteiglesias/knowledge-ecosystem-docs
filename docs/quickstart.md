---
id: quickstart
title: Quickstart
sidebar_position: 2
---

# Quickstart

This page gives the shortest working paths through the ecosystem.

The commands assume the following local paths:

```bash
export PAPER_KB="$HOME/Documents/paper-kb"
export KB="$HOME/Documents/KB"
export ABSTRACT_SCROLLER="$HOME/repos/abstract-scroller"
```

## 1. Generate `chunk_set` artifacts with paper-kb

```bash
cd "$PAPER_KB"

python -m pipeline.producer.tei_runner \
  downloads/data/xmls \
  store/chunks \
  --min-len 50 \
  --chunk-set-dir artifacts/chunk_sets
```

Expected outputs:

```text
artifacts/chunk_sets/*.chunk_set.json
store/chunks/*_chunks.jsonl
```

The preferred integration artifact is:

```text
artifacts/chunk_sets/*.chunk_set.json
```

`store/chunks` is a compatibility output.

## 2. Serve paper-kb API from `chunk_set`

```bash
cd "$PAPER_KB"

PAPER_KB_CHUNK_SETS_DIR=artifacts/chunk_sets \
STORAGE_BACKEND=chunk_set \
uvicorn backend.app.main:app --reload --port 9000
```

Or use:

```bash
make api-chunk-set
```

Check the backend:

```bash
curl -s http://127.0.0.1:9000/api/_admin/papers_health | jq
curl -s http://127.0.0.1:9000/api/papers | jq
```

Expected health shape:

```json
{
  "cache_ready": true,
  "storage_backend": "chunk-set",
  "n_papers": 4,
  "n_chunks": 1014
}
```

Counts will vary by local artifacts.

## 3. Smoke test the paper-kb API

In another shell:

```bash
cd "$PAPER_KB"

BASE_URL=http://127.0.0.1:9000 \
./scripts/poke_api_chunk_set.sh
```

This writes smoke outputs under:

```text
api_test_results/chunk_set_*
```

## 4. Validate `chunk_set` artifacts with KB

```bash
cd "$KB"

for f in "$PAPER_KB"/artifacts/chunk_sets/*.chunk_set.json; do
  python -m kb.cli.kb_validate_chunk_set "$f" --format json
done
```

A valid artifact returns:

```json
{
  "status": "valid",
  "path": "...",
  "chunk_count": 123
}
```

## 5. Run KB smoke ingest

```bash
cd "$KB"

PYTHONPATH=. pytest -q
make smoke
```

`make smoke` runs the chat ingest seam in smoke mode and emits contract artifacts without requiring embedding provider keys.

## 6. Export paper-kb review CSV

```bash
cd "$PAPER_KB"

python -m backend.exports.export_review_csv \
  --out exports/review/papers.csv
```

Expected output:

```text
exports/review/papers.csv
```

This file is meant to feed review surfaces such as `abstract-scroller`.

## 7. Build abstract-scroller snapshot from CSV

```bash
cd "$ABSTRACT_SCROLLER"

python -m backend.jobs.mvp_snapshot \
  --input "$PAPER_KB/exports/review/papers.csv" \
  --format csv \
  --out data/snapshots/paper_kb_demo
```

Expected output:

```text
data/snapshots/paper_kb_demo/manifest.json
data/snapshots/paper_kb_demo/order/ORDER.bin
data/snapshots/paper_kb_demo/tiles/tile_00000.json.br
data/snapshots/paper_kb_demo/tiles/index.sha256
```

Validate:

```bash
python -m backend.publish.manifest data/snapshots/paper_kb_demo
pytest -q backend/tests/test_snapshot_contracts.py
```

## 8. Serve abstract-scroller snapshot

```bash
cd "$ABSTRACT_SCROLLER"

python -m backend.devserver --root data --port 8000
```

Open:

```text
http://127.0.0.1:8000/snapshots/paper_kb_demo/manifest.json
```

## If something fails

Go to [Troubleshooting](./operations/troubleshooting.md).

Common causes:

* API was started before chunk_set artifacts existed.
* `STORAGE_BACKEND` is not set to `chunk_set`.
* `PYTHONPATH` is missing when running KB tests locally.
* stale paper-kb scripts were used instead of canonical chunk-set scripts.
