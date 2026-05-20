---
id: chunk-set-v1
title: chunk_set.v1
sidebar_position: 1
---

# chunk_set.v1

`chunk_set.v1` is the primary content artifact between `paper-kb` and `KB`.

## Owner

`KB`

## Producers

* `paper-kb`
* `KB` ingest seams

## Consumers

* `KB`
* `paper-kb` backend, temporarily
* future processing tools

## Typical path

```text
artifacts/chunk_sets/*.chunk_set.json
```

## Required top-level fields

```text
artifact_family
artifact_kind
schema_version
run_id
producer
entrypoint
source_items
chunk_count
chunks
```

## Required chunk fields

```text
chunk_id
paper_id or document_id
chunk_index
char_len
text
metadata
```

Optional but useful:

```text
source_file
header_path
pages
```

## Validate

```bash
python -m kb.cli.kb_validate_chunk_set path/to/file.chunk_set.json --format json
```

Valid output:

```json
{
  "status": "valid",
  "path": "...",
  "chunk_count": 123
}
```

## Common validation failures

* missing `chunk_id`
* missing `text`
* missing `chunk_index`
* missing both `paper_id` and `document_id`
* wrong top-level `artifact_family`
* chunk count mismatch
