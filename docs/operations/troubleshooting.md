---
id: troubleshooting
title: Troubleshooting
sidebar_position: 2
---

# Troubleshooting

## `/api/papers` returns an empty list

Likely causes:

* no `chunk_set` artifacts exist
* API started before artifacts were generated
* `STORAGE_BACKEND` is not set to `chunk_set`
* `PAPER_KB_CHUNK_SETS_DIR` points to wrong directory

Check:

```bash
find artifacts/chunk_sets -type f -name "*.chunk_set.json"
curl -s http://127.0.0.1:9000/api/_admin/papers_health | jq
```

Fix:

```bash
python -m pipeline.producer.tei_runner \
  downloads/data/xmls \
  store/chunks \
  --chunk-set-dir artifacts/chunk_sets
```

Then restart API.

## `ModuleNotFoundError: No module named kb`

Likely cause:

KB is not installed as a package and local tests need `PYTHONPATH`.

Fix from KB repo:

```bash
PYTHONPATH=. pytest -q
```

For cross-repo local runs:

```bash
export PYTHONPATH="$HOME/Documents/KB:$HOME/Documents/paper-kb:$PYTHONPATH"
```

## `ModuleNotFoundError: shared.chroma_client`

Likely cause:

A parse-only path imported Chroma/embedding modules too early, or ambiguous `shared.*` imports are resolving incorrectly.

Fix:

* ensure parse-only commands do not request embedding/upsert
* keep embedding imports lazy
* avoid treating `shared.*` imports as stable public surfaces

## Duplicate chunks in paper API

Likely cause:

Multiple chunk-set artifacts contain the same `(paper_id, chunk_id)`.

Expected behavior:

* chunk-set adapter should deduplicate
* latest artifact should win by documented policy

Check:

```bash
jq -r '.chunks[].chunk_id' artifacts/chunk_sets/*.chunk_set.json \
  | sort \
  | uniq -c \
  | sort -nr \
  | head
```

## KB chunk_set validation fails

Inspect the artifact:

```bash
jq '{artifact_family, artifact_kind, schema_version, chunk_count, first_chunk: .chunks[0]}' path/to/file.chunk_set.json
```

Required fields:

```text
chunk_id
paper_id or document_id
chunk_index
char_len
text
metadata
```

## abstract-scroller snapshot has no tiles

Check input:

```bash
head data/sample.csv
```

Run:

```bash
python -m backend.jobs.mvp_snapshot \
  --input data/sample.csv \
  --format csv \
  --out data/snapshots/vdemo_csv
```

Inspect:

```bash
find data/snapshots/vdemo_csv -maxdepth 3 -type f | sort
```

## Browser cannot read `.json.br` tiles

Use the dev server:

```bash
python -m backend.devserver --root data --port 8000
```

It sets the correct Brotli headers.
