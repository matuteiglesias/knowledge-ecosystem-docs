---
id: review-node-v1
title: review_node.v1
sidebar_position: 3
---

# review_node.v1

`review_node.v1` is the generic review-record contract for `abstract-scroller`.

## Producer

* `paper-kb`, later
* `KB`, later

## Consumer

`abstract-scroller`

## Format

JSONL, one record per line.

## Purpose

Represent a generic item that can be displayed in a review/scroller interface.

## Minimal fields

```text
version
node_id
title
```

Recommended fields:

```text
source_type
subtitle
preview_300
body_markdown
date
year
tags
badges
links
metadata
```

## Consume

```bash
python -m backend.jobs.mvp_snapshot \
  --input data/review_nodes.sample.jsonl \
  --format review_node_jsonl \
  --out data/snapshots/vdemo_jsonl
```

## Boundary rule

`abstract-scroller` should consume `review_node.v1` records. It should not read `paper-kb` or `KB` private internals directly.
