---
id: kb
title: KB
sidebar_position: 2
---

# KB

`KB` is the knowledge-processing substrate.

It owns versioned contracts, validation, run evidence, and canonical ingest/analyze seams.

## What works today

KB can:

* validate `chunk_set.v1` artifacts
* run smoke ingest from chat JSONL
* run analyze from latest chunk sets or fallback collection
* emit run records
* emit manifests
* emit observability latest files
* emit summaries and exports

## Validate a chunk_set

```bash
python -m kb.cli.kb_validate_chunk_set \
  artifacts/chunk_sets/<run_id>.chunk_set.json \
  --format json
```

Valid output:

```json
{
  "status": "valid",
  "path": "...",
  "chunk_count": 123
}
```

Invalid output:

```json
{
  "status": "invalid",
  "path": "...",
  "error": "..."
}
```

## Run smoke ingest

```bash
python -m kb.cli.kb_chat_ingest \
  --paths test_data/2025-06-16.jsonl \
  --smoke
```

Or:

```bash
make smoke
```

This proves:

* config loading works
* JSONL parsing works
* chunk_set generation works
* run_record, manifest, and observability latest are emitted
* no embedding provider keys are required in smoke mode

## Run analyze

```bash
python -m kb.cli.kb_chat_analyze \
  --export-name combined_notes.md
```

Expected outputs:

```text
artifacts/summaries/*.summary.json
artifacts/exports/combined_notes.md
artifacts/run_records/*.run_record.json
artifacts/manifests/*.manifest.json
artifacts/observability/*.latest.json
```

## Inspect run evidence

```bash
make inspect-last

cat artifacts/observability/kb.chat_ingest.latest.json
cat artifacts/run_records/<run_id>.run_record.json
cat artifacts/manifests/<run_id>.manifest.json
```

## Public contracts

| Contract             | Location                                  | Status                                      |
| -------------------- | ----------------------------------------- | ------------------------------------------- |
| `chunk_set.v1`       | `contracts/chunk_set.v1.schema.json`      | working                                     |
| run record           | `artifacts/run_records/*.run_record.json` | working                                     |
| manifest             | `artifacts/manifests/*.manifest.json`     | working                                     |
| observability latest | `artifacts/observability/*.latest.json`   | working                                     |
| summary artifact     | `artifacts/summaries/*.summary.json`      | produced, schema should be formalized later |
| export artifact      | `artifacts/exports/*`                     | working                                     |

## Integration with paper-kb

The intended boundary is:

```text
paper-kb emits chunk_set.v1
KB validates/processes chunk_set.v1
```

Example:

```bash
cd "$HOME/Documents/KB"

for f in "$HOME/Documents/paper-kb"/artifacts/chunk_sets/*.chunk_set.json; do
  python -m kb.cli.kb_validate_chunk_set "$f" --format json
done
```

Do not integrate by importing paper-kb internals into KB.

## Environment variables

| Variable            | Purpose                                   |
| ------------------- | ----------------------------------------- |
| `KB_ROOT`           | root for artifacts/cache/store resolution |
| `KB_CHAT_JSONL_DIR` | input corpus location                     |
| `KB_CACHE_DB`       | SQLite cache path                         |
| `KB_CHROMA_DIR`     | Chroma path                               |
| `KB_COLLECTION`     | Chroma collection name                    |
| `KB_EMBED_PROVIDER` | embedding provider                        |
| `KB_EMBED_MODEL`    | embedding model                           |
| `KB_EMBED_TASK`     | embedding task                            |
| `KB_EMBED_DIM`      | embedding dimension                       |
| `JINAAI_API_KEY`    | Jina provider key                         |
| `OPENAI_API_KEY`    | OpenAI provider key                       |

## Tests as documentation

```bash
PYTHONPATH=. pytest -q
```

Useful tests:

```text
tests/test_chunk_set_contract.py
tests/test_cli_validate_chunk_set.py
tests/test_chat_ingest_smoke.py
tests/test_chat_analyze_artifacts.py
tests/test_contract_compliance.py
```

## Private or risky internals

Do not treat these as public surfaces yet:

```text
kb.parsers.*
kb.storage.*
kb.vectorstore.*
kb.embedding.*
shared.* imports
backend.app.* imports
external grobid_ingest dependency
```

## Known next improvements

* make plain `pytest -q` work without `PYTHONPATH=.`
* enforce chunk_set validation at producer boundary
* formalize summary artifact schema
* quarantine ambiguous `shared.*` imports
* harden papers/GROBID seam or mark it clearly transitional
