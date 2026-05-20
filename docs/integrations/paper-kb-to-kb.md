---
id: paper-kb-to-kb
title: paper-kb to KB
sidebar_position: 1
---

# paper-kb to KB

This integration connects the paper-content provider to the knowledge-processing substrate.

```text
paper-kb
  ↓ chunk_set.v1
KB
  ↓ validation / processing / evidence
```

## Producer

`paper-kb`

## Artifact

```text
artifacts/chunk_sets/*.chunk_set.json
```

## Consumer

`KB`

## Generate artifacts

```bash
cd "$HOME/Documents/paper-kb"

python -m pipeline.producer.tei_runner \
  downloads/data/xmls \
  store/chunks \
  --min-len 50 \
  --chunk-set-dir artifacts/chunk_sets
```

## Validate with KB

```bash
cd "$HOME/Documents/KB"

for f in "$HOME/Documents/paper-kb"/artifacts/chunk_sets/*.chunk_set.json; do
  python -m kb.cli.kb_validate_chunk_set "$f" --format json
done
```

## What this proves

This proves that `paper-kb` can emit a public knowledge artifact and `KB` can validate it without importing paper-kb internals.

## Boundary rule

```text
paper-kb may emit artifacts for KB.
KB must not import paper-kb internals.
```

## Good integration

```text
file artifact + schema + validation CLI
```

## Bad integration

```text
KB importing paper-kb parsers
KB reading paper-kb storage internals
KB depending on paper-kb Chroma folders
```

## Expected valid output

```json
{
  "status": "valid",
  "path": "/home/matias/Documents/paper-kb/artifacts/chunk_sets/example.chunk_set.json",
  "chunk_count": 123
}
```

## Troubleshooting

If validation fails:

1. Inspect the artifact:

```bash
jq '{artifact_family, artifact_kind, schema_version, chunk_count, first_chunk: .chunks[0]}' path/to/file.chunk_set.json
```

2. Check required fields:

```text
chunk_id
paper_id or document_id
chunk_index
char_len
text
metadata
```

3. Regenerate from `paper-kb`.

If no artifacts exist:

```bash
find "$HOME/Documents/paper-kb/artifacts/chunk_sets" -type f
```

