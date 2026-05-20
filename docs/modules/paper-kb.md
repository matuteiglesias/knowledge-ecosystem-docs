---
id: paper-kb
title: paper-kb
sidebar_position: 1
---

# paper-kb

`paper-kb` is the paper-content provider.

It turns TEI/PDF-derived paper inputs into:

* a local paper corpus
* `chunk_set` artifacts
* a FastAPI paper/chunk API
* a frontend paper UI
* review CSV exports for downstream review surfaces

## What works today

`paper-kb` can:

* parse TEI XML files
* write legacy chunk files
* emit `chunk_set` artifacts
* serve papers and chunks from `chunk_set`
* smoke-test the chunk-set API
* export review CSV

## Generate chunk_set artifacts

From the repo root:

```bash
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

Preferred public output:

```text
artifacts/chunk_sets/*.chunk_set.json
```

Compatibility output:

```text
store/chunks/*_chunks.jsonl
```

## Serve API from chunk_set

```bash
PAPER_KB_CHUNK_SETS_DIR=artifacts/chunk_sets \
STORAGE_BACKEND=chunk_set \
uvicorn backend.app.main:app --reload --port 9000
```

Or:

```bash
make api-chunk-set
```

Check health:

```bash
curl -s http://127.0.0.1:9000/api/_admin/papers_health | jq
```

Expected shape:

```json
{
  "cache_ready": true,
  "storage_backend": "chunk-set",
  "storage_persisted": false,
  "n_papers": 4,
  "n_chunks": 1014
}
```

Counts vary by local data.

## Smoke test API

```bash
BASE_URL=http://127.0.0.1:9000 \
./scripts/poke_api_chunk_set.sh
```

This checks:

* `GET /`
* `GET /api/_admin/papers_health`
* `GET /api/papers`
* one paper chunk endpoint if papers exist

Smoke output is written to:

```text
api_test_results/chunk_set_*
```

## Active API endpoints

| Endpoint                                       | Purpose                     | Status              |
| ---------------------------------------------- | --------------------------- | ------------------- |
| `GET /`                                        | liveness                    | public health       |
| `GET /api/_admin/papers_health`                | adapter/cache/counts        | operator            |
| `GET /api/papers`                              | list paper metadata         | public demo surface |
| `GET /api/papers/{paper_id}`                   | paginated chunks            | public demo surface |
| `GET /api/papers/{paper_id}/chunks`            | paginated/filterable chunks | public demo surface |
| `GET /api/papers/{paper_id}/chunks/{chunk_id}` | single chunk                | public demo surface |
| `POST /_dev/seed`                              | fixture/dev data            | internal/dev        |

## Export review CSV

```bash
python -m backend.exports.export_review_csv \
  --out exports/review/papers.csv
```

Expected output:

```text
exports/review/papers.csv
```

Fields:

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

This CSV can be consumed by `abstract-scroller`.

## Frontend demo

Start the backend first:

```bash
make api-chunk-set
```

Then:

```bash
cd frontend

NEXT_PUBLIC_API_BASE=http://127.0.0.1:9000 \
NEXT_PUBLIC_API_URL=http://127.0.0.1:9000 \
npm run dev
```

The frontend is a paper corpus UI. It should not be treated as the generic review scroller.

## Environment variables

| Variable                      | Default                 | Purpose                                           |
| ----------------------------- | ----------------------- | ------------------------------------------------- |
| `STORAGE_BACKEND`             | `jsonl` fallback        | set to `chunk_set` for canonical artifact backend |
| `PAPER_KB_CHUNK_SETS_DIR`     | `artifacts/chunk_sets`  | source directory for chunk-set backend            |
| `KB_CHUNK_SET_VALIDATOR_CMD`  | `kb-chunk-set-validate` | optional chunk-set validation command             |
| `VALIDATE_CHUNK_SET`          | false                   | enable validation during TEI run                  |
| `STRICT_CHUNK_SET_VALIDATION` | false                   | fail run on validation failure                    |
| `CHROMA_DIR`                  | `store/chroma`          | legacy/vector path                                |
| `CHROMA_COLLECTION`           | `chunks`                | legacy/vector collection                          |
| `NEXT_PUBLIC_API_BASE`        | varies                  | frontend typed API client base                    |
| `NEXT_PUBLIC_API_URL`         | varies                  | legacy/simple frontend API helper base            |

## Tests as documentation

```bash
pytest tests/test_chunk_set_writer_contract.py
pytest tests/test_chunk_set_storage_adapter.py
pytest tests/test_tei_runner_chunk_set_validation.py
pytest tests/test_export_review_csv.py
```

These prove:

* writer emits contract fields
* chunk-set adapter serves papers/chunks
* duplicate chunks are deduplicated
* validation warning/strict modes work
* review CSV export works

## Public surfaces

Use these:

```text
python -m pipeline.producer.tei_runner ...
artifacts/chunk_sets/*.chunk_set.json
uvicorn backend.app.main:app ...
scripts/poke_api_chunk_set.sh
python -m backend.exports.export_review_csv ...
```

## Compatibility surfaces

These are still useful but not preferred integration paths:

```text
store/chunks
store/chroma
store/chroma_fallback
fixture
```

## Stale or legacy surfaces

Avoid these as primary demos unless repaired:

```text
scripts/poke_api.sh
scripts/reset_and_ingest.sh
scripts/dev.sh
make smoke
make run_all
make run
```

## Known next improvements

* improve paper metadata so API returns human-readable titles/authors/source files
* keep `chunk_set` backend deduplication tested
* document frontend API base variable strategy
* continue moving generic processing concerns toward KB
* keep review export decoupled from abstract-scroller internals
