---
id: battle-tests
title: Battle Tests
sidebar_position: 4
---

# Battle Tests

Battle tests prove useful abilities across modules.

They should be small, repeatable, and based on public surfaces.

## Test 1: paper-kb alone

Goal:

```text
TEI → chunk_set → API
```

Commands:

```bash
cd "$HOME/Documents/paper-kb"

python -m pipeline.producer.tei_runner \
  downloads/data/xmls \
  store/chunks \
  --chunk-set-dir artifacts/chunk_sets

make api-chunk-set
BASE_URL=http://127.0.0.1:9000 ./scripts/poke_api_chunk_set.sh
```

Passes if:

* chunk_set artifacts exist
* health reports `storage_backend: chunk-set`
* `/api/papers` returns papers
* one paper chunk endpoint responds

## Test 2: paper-kb to KB

Goal:

```text
paper-kb chunk_set validates under KB
```

Command:

```bash
cd "$HOME/Documents/KB"

for f in "$HOME/Documents/paper-kb"/artifacts/chunk_sets/*.chunk_set.json; do
  python -m kb.cli.kb_validate_chunk_set "$f" --format json
done
```

Passes if every artifact is valid.

## Test 3: abstract-scroller alone

Goal:

```text
CSV/JSONL → snapshot
```

Commands:

```bash
cd "$HOME/repos/abstract-scroller"

python -m backend.jobs.mvp_snapshot \
  --input data/sample.csv \
  --format csv \
  --out data/snapshots/vdemo_csv

python -m backend.publish.manifest data/snapshots/vdemo_csv
pytest -q backend/tests/test_snapshot_contracts.py
```

Passes if manifest validates and tests pass.

## Test 4: paper-kb to abstract-scroller

Goal:

```text
paper corpus → review CSV → review snapshot
```

Commands:

```bash
cd "$HOME/Documents/paper-kb"

python -m backend.exports.export_review_csv \
  --out exports/review/papers.csv

cd "$HOME/repos/abstract-scroller"

python -m backend.jobs.mvp_snapshot \
  --input "$HOME/Documents/paper-kb/exports/review/papers.csv" \
  --format csv \
  --out data/snapshots/paper_kb_demo
```

Passes if snapshot artifacts exist.

## Test 5: backend to frontend

Goal:

```text
paper-kb backend → paper-kb frontend
```

Commands:

```bash
cd "$HOME/Documents/paper-kb"
make api-chunk-set
```

Then:

```bash
cd "$HOME/Documents/paper-kb/frontend"

NEXT_PUBLIC_API_BASE=http://127.0.0.1:9000 \
NEXT_PUBLIC_API_URL=http://127.0.0.1:9000 \
npm run dev
```

Passes if the frontend loads papers/chunks from the backend.
