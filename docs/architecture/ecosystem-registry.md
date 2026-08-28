---
id: ecosystem-registry
title: Ecosystem Registry
sidebar_position: 3
---

# Ecosystem Registry

This is the bootstrap registry for the current knowledge estate. It is intentionally conservative: **confirmed rows are supported by inspected front-door evidence; observed rows are inventory signals awaiting a repository-boundary pass.**

## Confirmed authorities and producers

| Repository | Current responsibility | State | Evidence / next proof |
| --- | --- | --- | --- |
| `knowledge-ecosystem-docs` | ecosystem reference architecture and integration roadmap | declared canonical | `SYSTEM.yaml` + this documentation build |
| `kb-contracts` | shared knowledge artifact identity, provenance, compatibility and interoperability | proven front-door boundary | released contract docs/fixtures; producer-owned schema gap remains explicit |
| `kb-artifacts` | deterministic inspection, filtering, selection and reproducible export of JSONL evidence collections | proven front-door boundary | CLI/API + provenance manifest documented |
| `knowledge-inspect` | bounded knowledge inspection/selection producer and run evidence | declared/proposed | repository `SYSTEM.yaml`; canonical runtime paths still need reconciliation |
| `paper-kb` | paper-corpus processing/operator capability | historical + active producer candidate | existing commands and corpus pipeline; boundary requires current reconciliation |
| `abstract-scroller` | review snapshot surface | historical/current candidate | old integration docs; re-verify current repository boundary before promotion |

## Observed estate requiring reconciliation

The GitHub estate also contains knowledge-adjacent systems whose exact current boundaries should be reconstructed rather than inferred:

- `knowledge-flow`
- `knowledge-inspect`
- `journal`
- `paper-kb`
- `matias-context-mcp`
- `context-routing`
- `llm-flow-engine`
- `kb-artifacts`
- `kb-contracts`
- `abstract-scroller`
- `awesome-automation-for-knowledge-work`

Their presence is evidence of capability, not enough evidence for a canonical ownership claim. Wave 1 of the build bundle converts this inventory into a verified registry.

## Deliberately unassigned frontier

| Capability | State | Constraint |
| --- | --- | --- |
| synthesis / insight candidate lifecycle | future | must consume governed knowledge/evidence rather than duplicate it |
| claim/evidence lifecycle | future | should preserve provenance and human editorial judgment |
| canonical editorial artifacts | future | not a knowledge-base responsibility by default |
| channel projections (blog, video, social, talks) | future | downstream renderers, not canonical knowledge authority |
| circulation / response capture | future | feedback should be able to return to knowledge without auto-promoting claims |

## Registry maintenance rule

Promote an observed system only after a boundary pass answers:

1. What does it own?
2. What does it explicitly not own?
3. What does it consume and produce?
4. Which interfaces are public?
5. Which contracts are shared versus producer-owned?
6. What command or fixture proves the claimed boundary?
