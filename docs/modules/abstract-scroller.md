---
id: abstract-scroller
title: abstract-scroller
sidebar_position: 3
---

# abstract-scroller

`abstract-scroller` is the review snapshot surface.

It turns prepared CSV or `review_node.v1` JSONL records into static artifacts:

```text
manifest.json
order/ORDER.bin
tiles/*.json.br
tiles/index.sha256
```

It is currently useful as a snapshot publisher. It is not yet a complete backend API service or finished frontend product.

## What works today

`abstract-scroller` can:

* build a snapshot from CSV
* build a snapshot from `review_node.v1` JSONL
* validate manifest and tile schemas
* serve snapshot files locally with Brotli headers
* render snapshots through static HTML demo pages

## Build snapshot from CSV

```bash
python -m backend.jobs.mvp_snapshot \
  --input data/sample.csv \
  --format csv \
  --out data/snapshots/vdemo_csv
```

Expected output:

```text
snapshot ready: data/snapshots/vdemo_csv docs: 5 tiles: 1
```

## Build snapshot from review_node JSONL

```bash
python -m backend.jobs.mvp_snapshot \
  --input data/review_nodes.sample.jsonl \
  --format review_node_jsonl \
  --out data/snapshots/vdemo_jsonl
```

Expected output:

```text
snapshot ready: data/snapshots/vdemo_jsonl docs: 3 tiles: 1
```

## Inspect manifest

```bash
cat data/snapshots/vdemo_csv/manifest.json
```

The manifest points to order, tiles, bitsets, and nodes.

## Inspect first tile

```bash
python - <<'PY'
import brotli, pathlib
p = pathlib.Path("data/snapshots/vdemo_csv/tiles/tile_00000.json.br")
print(brotli.decompress(p.read_bytes()).decode("utf-8"))
PY
```

## Serve snapshot

```bash
python -m backend.devserver --root data --port 8000
```

Open:

```text
http://127.0.0.1:8000/snapshots/vdemo_csv/manifest.json
```

Static demo pages:

```text
frontend/index.html
frontend/md-scroll.html
```

## Validate snapshot

```bash
python -m backend.publish.manifest data/snapshots/vdemo_csv
pytest -q backend/tests/test_snapshot_contracts.py
```

Expected:

```text
manifest OK
6 passed
```

## Public snapshot contract

| Artifact               | Purpose                           | Status      |
| ---------------------- | --------------------------------- | ----------- |
| `manifest.json`        | root pointer/index object         | working     |
| `order/ORDER.bin`      | uint32 little-endian order vector | working     |
| `tiles/tile_*.json.br` | Brotli-compressed display tiles   | working     |
| `tiles/index.sha256`   | tile checksum index               | working     |
| `bitsets/index.json`   | future filter index               | placeholder |
| `nodes/tree.json.br`   | future node tree                  | placeholder |
| `nodes/summaries/`     | future summary files              | placeholder |

## Schemas

| Schema                                         | Status      |
| ---------------------------------------------- | ----------- |
| `contracts/schemas/manifest.schema.json`       | usable      |
| `contracts/schemas/tile.schema.json`           | usable      |
| `contracts/schemas/review_node.v1.schema.json` | usable      |
| `contracts/schemas/mask-index.schema.json`     | placeholder |
| `contracts/schemas/node-summary.schema.json`   | placeholder |

## Integration with paper-kb

The current recommended integration is:

```text
paper-kb exports review CSV
abstract-scroller builds snapshot from that CSV
```

Example:

```bash
cd "$HOME/repos/abstract-scroller"

python -m backend.jobs.mvp_snapshot \
  --input "$HOME/Documents/paper-kb/exports/review/papers.csv" \
  --format csv \
  --out data/snapshots/paper_kb_demo
```

Later, prefer:

```text
paper-kb or KB emits review_node.v1 JSONL
abstract-scroller builds snapshot from review_node_jsonl
```

`abstract-scroller` should not read paper-kb storage internals or KB private internals directly.

## Placeholder or future surfaces

These are not current operator surfaces:

```text
services/iterator
services/summary
mask/search/next/export API paths in contracts/api.md
real bitsets
real node summaries
frontend/src React app
```

## Known next improvements

* add stronger docs for snapshot contract
* add CSV v1 input contract docs
* add review_node v1 integration docs
* add frontend smoke over generated snapshots
* implement real bitsets/nodes only after snapshot basics stay stable
