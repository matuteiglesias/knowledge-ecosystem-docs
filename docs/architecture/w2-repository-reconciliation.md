---
id: w2-repository-reconciliation
title: W2 Repository Reconciliation
sidebar_position: 6
---

# W2 Repository Reconciliation

**Execution date:** 2026-08-28  
**Wave:** W2 — Repository reconciliation  
**Status:** implemented as bounded draft PRs; pending repository-level acceptance/merge.

W2 takes the discrepancies discovered by W1 and proposes the smallest repository-owned documentation/metadata changes required for the active systems to tell the same architectural story.

It does **not** change runtime behavior, shared contract semantics, selection policy, publication policy, or producer data.

## Reconciliation set

| Repository | Draft PR | W2 change | Runtime semantics changed? |
| --- | --- | --- | --- |
| `kb-artifacts` | [#10](https://github.com/matuteiglesias/kb-artifacts/pull/10) | replace historical `repo.gpt-digests` identity; point routing to `repo.context-routing`; record current public CLI and bounded Make surfaces | no |
| `paper-kb` | [#12](https://github.com/matuteiglesias/paper-kb/pull/12) | replace historical `repo.knowledge-base-app`; record current corpus operator commands | no |
| `knowledge-inspect` | [#19](https://github.com/matuteiglesias/knowledge-inspect/pull/19) | replace old repository aliases; make promotion/routing/MCP exclusions explicit; record health/smoke/run-evidence command surface | no |
| `context-routing` | [#4](https://github.com/matuteiglesias/context-routing/pull/4) | replace `repo.context`/`repo.gpt-digests` aliases; record deterministic fixture generator, Docusaurus build and current generated paths | no |
| `matias-context-mcp` | [#6](https://github.com/matuteiglesias/matias-context-mcp/pull/6) | replace upstream aliases; record server/client/test/probe commands; repair README checkout examples and KB Artifacts link | no |
| `abstract-scroller` | [#2](https://github.com/matuteiglesias/abstract-scroller/pull/2) | add first `SYSTEM.yaml`; declare active review-snapshot boundary and explicit non-authorities | no |

`knowledge-flow` was deliberately not modified. Its own lifecycle declaration already marks it superseded; W2 has no reason to revive or normalize a vendor-copy repository.

## Identity map after W2

The proposed current repository identities are:

```text
repo.kb-contracts
repo.paper-kb
repo.knowledge-inspect
repo.kb-artifacts
repo.context-routing
repo.matias-context-mcp
repo.abstract-scroller
```

Historical aliases such as `repo.gpt-digests`, `repo.context`, and `repo.knowledge-base-app` should no longer be used to describe these current repositories after their W2 PRs merge.

This does not forbid a historical repository from remaining inspectable under its own identity. It only prevents an old alias from silently standing in for a current authority.

## Current responsibility graph

```text
paper-kb
paper-corpus producer
      │
      ├──────────────► abstract-scroller
      │                 review/snapshot surface
      │                 (edge still unproven)
      ▼
kb-contracts
shared interoperability authority
      │
      ├──────────────┐
      ▼              ▼
knowledge-inspect   kb-artifacts
inspection/run      selection/export
 evidence              evidence
      │              │
      └──────┬───────┘
             ▼
       context-routing
       published discovery
             │
             ▼
      matias-context-mcp
       bounded read gateway
             │
             ▼
        humans / agents
```

The diagram is still a **responsibility graph**, not proof that each arrow accepts the exact current artifact emitted by its upstream producer. W3 owns that stronger statement.

## Reconciliation principles applied

### Current identity wins over historical aliasing

A current repository's `repository.id` should name the current repository role rather than a predecessor or historical checkout name. The old names remain useful migration evidence, but no longer define architecture.

### Commands are documentation, not verification evidence

W2 records commands already present in README/AGENTS/Make surfaces. It does not claim those commands were executed during this wave. Producer `verification.status` therefore remains conservative (`metadata-only`) unless the producer already owns stronger evidence.

### Shared versus producer-local authority remains separated

No W2 PR copies contracts into another repository. `kb-contracts` remains shared interoperability authority. Producer-specific runtime and output schemas remain local unless W3 proves a repeated shared boundary that justifies a contract change.

### Abstract Scroller is a bounded capability, not a new center

The May 2026 `review_node` ingest work plus its current Make surface are enough to declare `abstract-scroller` as an active review/snapshot capability. They are not enough to make it the canonical reviewer for every knowledge flow.

## Residual discrepancies intentionally left open

W2 does not erase uncertainty it cannot prove:

1. **MCP runtime-status prose.** The MCP README says the resource-only v0.1 MVP is closed while older AGENTS material still records P0/P1 items. W2 aligns architecture and identities but leaves runtime truth to an executable verification pass.
2. **Exact producer-consumer compatibility.** `paper-kb → knowledge-inspect`, `knowledge-inspect → kb-artifacts`, `kb-artifacts/knowledge-inspect → context-routing`, routing → MCP, and `paper-kb → abstract-scroller` remain responsibility arrows until W3 pins exact artifacts/contracts and validators.
3. **Verification metadata.** Several systems now expose canonical checks but retain metadata-only status because W2 intentionally did not execute them.
4. **Broader estate.** `journal`, `llm-flow-engine`, old `gpt-digests`, automation repos and domain knowledge bases remain outside the canonical graph until a current consumer or authority conflict requires another bounded tranche.

## W2 completion rule

W2 is complete as an **implementation proposal** when:

- each central drift has a small repository-owned PR;
- the reference docs record the intended current identity and boundary;
- no runtime semantics were changed to make the diagram look cleaner;
- unresolved interface truth is handed to W3 rather than guessed.

Repository-level W2 becomes accepted when the six draft PRs are reviewed/merged or an explicit disagreement is recorded.

## W3 frontier

The first interface-proof candidates are now much clearer:

1. `paper-kb → knowledge-inspect`: pin one exact paper/review artifact and prove consumer validation.
2. `knowledge-inspect → kb-artifacts`: pin the exact run/summary/evidence handoff actually consumed by selection.
3. `kb-artifacts + knowledge-inspect → context-routing`: prove which governed outputs become routable catalog entries and which remain private.
4. `context-routing → matias-context-mcp`: prove a generated catalog/source descriptor can be consumed through the MCP gateway without path or authority drift.
5. `paper-kb → abstract-scroller`: prove one current `review_node` fixture/export reaches a valid immutable snapshot without copying shared contract authority locally.

Prefer proving one or two high-value edges end-to-end before broadening W3.
