---
id: paper-kb-frontend
title: paper-kb Frontend
sidebar_position: 4
---

# paper-kb Frontend

The `paper-kb` frontend is the paper corpus UI.

It is part of the `paper-kb` product, not a separate ecosystem module yet.

## What it is useful for

The frontend can demonstrate:

* paper list retrieval
* paper chunk retrieval
* typed API client usage
* React Query hooks
* frontend normalization of backend payloads
* basic paper-oriented UI flow

## Start backend first

From `paper-kb` root:

```bash
make api-chunk-set
```

Or:

```bash
PAPER_KB_CHUNK_SETS_DIR=artifacts/chunk_sets \
STORAGE_BACKEND=chunk_set \
uvicorn backend.app.main:app --reload --port 9000
```

## Start frontend

```bash
cd frontend

NEXT_PUBLIC_API_BASE=http://127.0.0.1:9000 \
NEXT_PUBLIC_API_URL=http://127.0.0.1:9000 \
npm run dev
```

## Current API flow

```text
page/component
  ↓
usePapers / usePaperChunks
  ↓
src/api/papers.ts
  ↓
paper-kb backend
  ↓
normalizers
  ↓
UI
```

## API compatibility

Currently consumed endpoints include:

```text
GET /api/papers
GET /api/papers/{paper_id}
```

The function `fetchPaperChunks` may call `/api/papers/{paper_id}` rather than `/api/papers/{paper_id}/chunks`. This matches current backend behavior but should be documented as a compatibility shape.

## Environment variables

| Variable               | Status           | Purpose                  |
| ---------------------- | ---------------- | ------------------------ |
| `NEXT_PUBLIC_API_BASE` | target canonical | typed API client base    |
| `NEXT_PUBLIC_API_URL`  | compatibility    | older/simple helper base |

For demos, set both.

## Public frontend surfaces

```text
frontend/src/api/papers.ts
frontend/src/hooks/usePapers.ts
frontend/src/hooks/usePaperChunks.ts
frontend/src/lib/normalizers.ts
frontend/src/providers/query_provider.tsx
frontend/src/app/page.tsx
```

## Private/dev surfaces

```text
frontend/src/stories
frontend/src/components/__stories__
frontend/public/dev-data
frontend/src/app/test
frontend/ARCHITECTURE
```

Architecture diagrams are useful for onboarding, but they are not runtime contracts.

## Known next improvements

* replace generic Next README with paper-kb frontend README
* document live backend mode vs fixture mode
* choose one canonical API base env var
* add frontend smoke checks against chunk-set backend
* keep frontend scoped to paper corpus UI, not generic review UI
