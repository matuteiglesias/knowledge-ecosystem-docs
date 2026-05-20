---
id: backend-to-frontend
title: Backend to Frontend
sidebar_position: 3
---

# Backend to Frontend

This integration connects the `paper-kb` backend API to the `paper-kb` frontend.

```text
paper-kb backend
  ↓ /api/papers
paper-kb frontend
```

## Start backend

```bash
cd "$HOME/Documents/paper-kb"

make api-chunk-set
```

Or:

```bash
PAPER_KB_CHUNK_SETS_DIR=artifacts/chunk_sets \
STORAGE_BACKEND=chunk_set \
uvicorn backend.app.main:app --reload --port 9000
```

## Check backend

```bash
curl -s http://127.0.0.1:9000/api/_admin/papers_health | jq
curl -s http://127.0.0.1:9000/api/papers | jq
```

## Start frontend

```bash
cd "$HOME/Documents/paper-kb/frontend"

NEXT_PUBLIC_API_BASE=http://127.0.0.1:9000 \
NEXT_PUBLIC_API_URL=http://127.0.0.1:9000 \
npm run dev
```

## What this proves

This proves that the frontend can consume the chunk-set-backed backend API.

## Current caveat

Two frontend API base env vars are in use:

```text
NEXT_PUBLIC_API_BASE
NEXT_PUBLIC_API_URL
```

For demos, set both.

The target is to make one canonical and one compatibility-only.
