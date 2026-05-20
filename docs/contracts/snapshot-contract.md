---
id: snapshot-contract
title: Snapshot Contract
sidebar_position: 4
---

# Snapshot Contract

The snapshot contract is owned by `abstract-scroller`.

A snapshot is a static file layout for fast review.

## Typical path

```text
data/snapshots/<snapshot_id>/
```

## Files

| Artifact               | Purpose                           | Status      |
| ---------------------- | --------------------------------- | ----------- |
| `manifest.json`        | root pointer/index                | working     |
| `order/ORDER.bin`      | uint32 little-endian order vector | working     |
| `tiles/tile_*.json.br` | Brotli-compressed display tiles   | working     |
| `tiles/index.sha256`   | tile checksum index               | working     |
| `bitsets/index.json`   | future filter index               | placeholder |
| `nodes/tree.json.br`   | future node tree                  | placeholder |
| `nodes/summaries/`     | future summary files              | placeholder |

## Build snapshot

```bash
python -m backend.jobs.mvp_snapshot \
  --input data/sample.csv \
  --format csv \
  --out data/snapshots/vdemo_csv
```

## Validate

```bash
python -m backend.publish.manifest data/snapshots/vdemo_csv
pytest -q backend/tests/test_snapshot_contracts.py
```

## Inspect tile

```bash
python - <<'PY'
import brotli, pathlib
p = pathlib.Path("data/snapshots/vdemo_csv/tiles/tile_00000.json.br")
print(brotli.decompress(p.read_bytes()).decode("utf-8"))
PY
```

