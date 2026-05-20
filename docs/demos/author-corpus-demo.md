---
id: author-corpus-demo
title: Author Corpus Demo
sidebar_position: 1
---

# Author Corpus Demo

This demo documents the reusable pattern for building a small corpus around one scholar and pushing it through the ecosystem.

Example corpus:

```text
eric_mvukiyehe
```

The goal is not full automation. The goal is a controlled vertical slice:

```text
PDFs
  → GROBID TEI
  → chunks
  → chunk_set
  → KB validation
  → paper-kb API/frontend
  → review CSV
  → abstract-scroller snapshot
```

## What this demo proves

This demo proves that the systems can support a real author-centered workflow:

| Stage                       | Workdir                                                                   | Owner               |
| --------------------------- | ------------------------------------------------------------------------- | ------------------- |
| PDF to TEI                  | `~/Documents/paper-kb`                                                    | `paper-kb`          |
| TEI to chunks and chunk_set | `~/Documents/paper-kb`                                                    | `paper-kb`          |
| chunk_set validation        | `~/Documents/KB`                                                          | `KB`                |
| API and frontend browsing   | `~/Documents/paper-kb` and `~/Documents/paper-kb/frontend`                | `paper-kb`          |
| review CSV export           | `~/Documents/paper-kb`                                                    | `paper-kb`          |
| snapshot build              | `~/repos/knowledge-ecosystem-docs` wrapper or `~/repos/abstract-scroller` | `abstract-scroller` |

## Preconditions

GROBID must be running on `localhost:8070`.

Start it with Docker:

```bash
docker run --rm --name grobid \
  -p 8070:8070 \
  lfoppiano/grobid:0.8.0
```

In another terminal, check:

```bash
curl -s http://localhost:8070/api/isalive
```

If the endpoint does not respond, wait a bit. GROBID can take time to load models.

## Corpus layout

Target layout:

```text
~/Documents/paper-kb/corpora/eric_mvukiyehe/
  pdfs/
  xmls/
  chunks/
  chunk_sets/
  review/
```

If named corpus support is not implemented yet, use explicit directories:

```text
~/Documents/research_corpora/eric_mvukiyehe/sources/pdfs
~/Documents/research_corpora/eric_mvukiyehe/sources/xmls
~/Documents/paper-kb/store/chunks_eric
~/Documents/paper-kb/artifacts/chunk_sets_eric
```

## Step 1: PDF to TEI

Workdir:

```bash
cd ~/Documents/paper-kb
```

Current explicit-path command:

```bash
python3 -m pipeline.adapter.manager grobid \
  ~/Documents/research_corpora/eric_mvukiyehe/sources/pdfs \
  ~/Documents/research_corpora/eric_mvukiyehe/sources/xmls \
  --recursive \
  --max-files 1 \
  --timeout 180 \
  --max-retries 1
```

Expected output:

```text
n_success: 1
n_failures: 0
```

Expected files:

```bash
find ~/Documents/research_corpora/eric_mvukiyehe/sources/xmls \
  -type f \
  -name "*.tei.xml" \
  -print
```

Future named-corpus command:

```bash
python3 -m pipeline.adapter.manager grobid \
  --corpus eric_mvukiyehe \
  --recursive \
  --max-files 1
```

## Step 2: TEI to chunks and chunk_set

Workdir:

```bash
cd ~/Documents/paper-kb
```

Current explicit-path command:

```bash
rm -rf artifacts/chunk_sets_eric store/chunks_eric
mkdir -p artifacts/chunk_sets_eric store/chunks_eric

python3 -m pipeline.adapter.manager parse \
  ~/Documents/research_corpora/eric_mvukiyehe/sources/xmls \
  store/chunks_eric \
  --min-len 50 \
  --force \
  --chunk-set-dir artifacts/chunk_sets_eric
```

Expected outputs:

```text
store/chunks_eric/
artifacts/chunk_sets_eric/*.chunk_set.json
```

Future named-corpus command:

```bash
python3 -m pipeline.adapter.manager parse \
  --corpus eric_mvukiyehe \
  --min-len 50 \
  --force
```

## Step 3: Validate chunk_set with KB

Workdir:

```bash
cd ~/Documents/KB
```

Current explicit-path command:

```bash
for f in ~/Documents/paper-kb/artifacts/chunk_sets_eric/*.chunk_set.json; do
  python3 -m kb.cli.kb_validate_chunk_set "$f" --format json
done
```

Expected result:

```json
{"status": "valid"}
```

Future named-corpus path:

```bash
for f in ~/Documents/paper-kb/corpora/eric_mvukiyehe/chunk_sets/*.chunk_set.json; do
  python3 -m kb.cli.kb_validate_chunk_set "$f" --format json
done
```

## Step 4: Serve corpus through paper-kb API

Workdir:

```bash
cd ~/Documents/paper-kb
```

Current explicit-path command:

```bash
PAPER_KB_CHUNK_SETS_DIR=artifacts/chunk_sets_eric \
STORAGE_BACKEND=chunk_set \
uvicorn backend.app.main:app --reload --port 9001
```

Check in another terminal:

```bash
curl -s http://127.0.0.1:9001/api/_admin/papers_health | jq
curl -s http://127.0.0.1:9001/api/papers | jq
```

Expected shape for a one-paper demo:

```json
{
  "storage_backend": "chunk-set",
  "n_papers": 1,
  "n_chunks": 65
}
```

## Step 5: Browse in paper-kb frontend

Workdir:

```bash
cd ~/Documents/paper-kb/frontend
```

Start frontend:

```bash
NEXT_PUBLIC_API_BASE=http://127.0.0.1:9001 \
NEXT_PUBLIC_API_URL=http://127.0.0.1:9001 \
npm run dev
```

Expected behavior:

```text
The frontend should load the paper list from the paper-kb backend.
```

Known caveat:

```text
The frontend currently has two API base environment variables.
For demos, set both.
```

## Step 6: Export review CSV

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

Expected output:

```text
exports/review/eric_mvukiyehe_papers.csv
```

Future named-corpus command:

```bash
python3 -m backend.exports.export_review_csv \
  --corpus eric_mvukiyehe
```

or:

```bash
python3 -m backend.exports.export_review_csv \
  --chunk-set-dir corpora/eric_mvukiyehe/chunk_sets \
  --out corpora/eric_mvukiyehe/review/papers.csv
```

## Step 7: Build abstract-scroller snapshot with wrapper

Workdir:

```bash
cd ~/repos/knowledge-ecosystem-docs
```

Use the cross-repo wrapper:

```bash
bash scripts/build_review_snapshot.sh \
  --input ~/Documents/paper-kb/exports/review/eric_mvukiyehe_papers.csv \
  --snapshot eric_mvukiyehe_demo \
  --abstract-scroller-root ~/repos/abstract-scroller
```

Expected outputs inside `abstract-scroller`:

```text
~/repos/abstract-scroller/data/snapshots/eric_mvukiyehe_demo/manifest.json
~/repos/abstract-scroller/data/snapshots/eric_mvukiyehe_demo/tiles/tile_00000.json.br
```

Serve the snapshot:

```bash
cd ~/repos/abstract-scroller

python3 -m backend.devserver --root data --port 8000
```

Open:

```text
http://127.0.0.1:8000/snapshots/eric_mvukiyehe_demo/manifest.json
```

## Known issues

### GROBID must be running

If you see:

```text
ConnectionRefusedError
HTTPConnectionPool(host='localhost', port=8070)
```

GROBID is not running or not ready.

### Metadata quality depends on TEI extraction

The pipeline may initially show paper IDs as titles. The target improvement is to preserve GROBID title metadata through:

```text
TEI
  → chunk_set
  → /api/papers
  → frontend
  → review CSV
  → snapshot
```

### abstract-scroller does not read paper-kb internals

This is intentional.

Good integration:

```text
paper-kb review CSV → abstract-scroller snapshot
```

Bad integration:

```text
abstract-scroller reading paper-kb store/chunks or Chroma internals
```

## Non-goals

This demo does not claim:

* all papers are ingested automatically
* abstract-scroller is part of paper-kb
* paper metadata is perfect
* every stale script is supported
* Chroma/vector search is part of the public flow

The value is a controlled author-corpus vertical slice.
