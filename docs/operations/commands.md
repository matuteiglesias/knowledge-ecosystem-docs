---
id: commands
title: Commands
sidebar_position: 1
---

# Commands

This page collects the current known-good operator commands.

## paper-kb

Generate chunks and chunk sets:

```bash
python -m pipeline.producer.tei_runner \
  downloads/data/xmls \
  store/chunks \
  --min-len 50 \
  --chunk-set-dir artifacts/chunk_sets
```

Start API from chunk sets:

```bash
make api-chunk-set
```

Smoke API:

```bash
BASE_URL=http://127.0.0.1:9000 ./scripts/poke_api_chunk_set.sh
```

Export review CSV:

```bash
python -m backend.exports.export_review_csv \
  --out exports/review/papers.csv
```

## KB

Validate chunk set:

```bash
python -m kb.cli.kb_validate_chunk_set path/to/file.chunk_set.json --format json
```

Run smoke ingest:

```bash
make smoke
```

Run analyze:

```bash
python -m kb.cli.kb_chat_analyze --export-name combined_notes.md
```

Run tests:

```bash
PYTHONPATH=. pytest -q
```

## abstract-scroller

Build CSV snapshot:

```bash
python -m backend.jobs.mvp_snapshot \
  --input data/sample.csv \
  --format csv \
  --out data/snapshots/vdemo_csv
```

Build JSONL snapshot:

```bash
python -m backend.jobs.mvp_snapshot \
  --input data/review_nodes.sample.jsonl \
  --format review_node_jsonl \
  --out data/snapshots/vdemo_jsonl
```

Validate snapshot:

```bash
python -m backend.publish.manifest data/snapshots/vdemo_csv
pytest -q backend/tests/test_snapshot_contracts.py
```

Serve snapshot:

```bash
python -m backend.devserver --root data --port 8000
```

