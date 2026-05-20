---
id: review-csv-v1
title: Review CSV v1
sidebar_position: 2
---

# Review CSV v1

Review CSV v1 is the low-friction bridge from `paper-kb` to `abstract-scroller`.

## Producer

`paper-kb`

## Consumer

`abstract-scroller`

## Typical path

```text
exports/review/papers.csv
```

## Generate

```bash
cd "$HOME/Documents/paper-kb"

python -m backend.exports.export_review_csv \
  --out exports/review/papers.csv
```

## Consume

```bash
cd "$HOME/repos/abstract-scroller"

python -m backend.jobs.mvp_snapshot \
  --input "$HOME/Documents/paper-kb/exports/review/papers.csv" \
  --format csv \
  --out data/snapshots/paper_kb_demo
```

## Columns

```text
doc_id
title
abstract
date
year
venue
tags
badges
source_url
paper_id
```

## Notes

* one row per paper
* `abstract` may fall back to paper preview or first useful chunk
* `tags` and `badges` may be blank initially
* this is a bridge artifact, not paper-kb internal storage
