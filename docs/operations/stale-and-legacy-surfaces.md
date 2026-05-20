---
id: stale-and-legacy-surfaces
title: Stale and Legacy Surfaces
sidebar_position: 3
---

# Stale and Legacy Surfaces

This page prevents future operators and agents from treating old paths as supported demos.

## paper-kb stale or legacy surfaces

Avoid as primary demos:

```text
scripts/poke_api.sh
scripts/reset_and_ingest.sh
scripts/dev.sh
make smoke
make run_all
make run
```

Use instead:

```text
make api-chunk-set
make smoke-chunk-set
scripts/poke_api_chunk_set.sh
```

Compatibility paths:

```text
store/chunks
store/chroma
store/chroma_fallback
fixture
```

These may be useful internally, but they are not preferred integration surfaces.

## KB risky internals

Do not depend on:

```text
kb.parsers.*
kb.storage.*
kb.vectorstore.*
kb.embedding.*
shared.* imports
backend.app.* imports
external grobid_ingest dependency
```

Use instead:

```text
contracts/chunk_set.v1.schema.json
python -m kb.cli.kb_validate_chunk_set
python -m kb.cli.kb_chat_ingest
python -m kb.cli.kb_chat_analyze
artifacts/run_records
artifacts/manifests
artifacts/observability
```

## abstract-scroller placeholders

Do not treat these as finished product surfaces:

```text
services/iterator
services/summary
contracts/api.md future endpoints
bitsets beyond placeholder
nodes beyond placeholder
frontend/src React app
```

Use instead:

```text
python -m backend.jobs.mvp_snapshot
manifest.json
order/ORDER.bin
tiles/*.json.br
frontend/index.html
frontend/md-scroll.html
```

