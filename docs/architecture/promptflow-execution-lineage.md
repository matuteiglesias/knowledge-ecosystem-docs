---
id: promptflow-execution-lineage
title: PromptFlow-era Execution Lineage
sidebar_position: 12
---

# PromptFlow-era Execution Lineage

This page records the disposition of the owner-authored PromptFlow-era repositories
`llm-flow-engine` and `flowpower`. It is a migration and lineage record, not a new
workflow-engine specification.

## Decision

Both predecessors remain historical evidence. Their PromptFlow-specific runners,
APIs, UI, tracing internals and product roadmaps are retired rather than modernized.
Useful execution-design lessons are preserved in current owners where they already
have a real consumer boundary.

**Generic workflow execution remains deliberately unassigned.** A shared executor
should only be reconsidered if multiple independent active consumers converge on
the same execution contract. Historical code does not create that authority.

## Frozen predecessor baselines

| Repository | Frozen `main` baseline | Historical role |
| --- | --- | --- |
| `matuteiglesias/llm-flow-engine` | `3d09c2bf0c3a224c78441fc98ace8c53418702eb` | YAML/Prompty flow MVP with Python runner, FastAPI, Docker and Next.js editor |
| `matuteiglesias/flowpower` | `055fe16740008fb6e095aa89624dc945183a13ba` | PromptFlow CLI/runner/tracing experiment |

Repository-visible code search found no downstream references to either predecessor
name or `PromptFlowRunner` at the W0 census. This is not proof about machine-local
services, editable installs, aliases, Docker state, environment files, external flow
definitions or scheduled scripts; those remain archive-gate checks in the predecessor
repositories.

## Durable execution invariants

These invariants are intentionally narrower than a universal DSL or orchestrator.
They are proof obligations for the repository that actually owns an executable
capability.

### EI-1 — Declared recipe authority

When a repository uses a declarative recipe or prompt configuration, executed
behavior must derive from that declaration. Hidden defaults or environment overrides
must not silently redefine material execution semantics.

**Falsification:** change a material declared field while execution remains
observably unchanged because the runtime ignores the field.

### EI-2 — Capability declaration

A stable executable capability should expose enough metadata to identify its
execution boundary:

- capability identity/version;
- accepted input contract;
- produced output contract;
- behavior-relevant configuration where applicable;
- side-effect or mutation class;
- failure behavior;
- evidence surface.

This metadata stays producer-owned unless repeated interoperability pressure proves
a shared contract is necessary.

### EI-3 — Prompt/template identity covers material execution configuration

Where prompts are governed runtime inputs, prompt identity must include the material
configuration needed to distinguish meaningfully different executions. The exact
fields are owned by the inference-producing repository, not prescribed globally.

A strong proof is that equivalent prompt/config material has stable identity while a
change to any material field produces a distinct identity.

### EI-4 — Step/run evidence is explicit

For consequential multi-stage execution, evidence should make observable what ran,
what it consumed, its material configuration, status/timing where relevant, outputs,
and warnings/errors. Provider-specific tracing internals are implementation details,
not the durable contract.

### EI-5 — Recipes select bounded capabilities

Declarative recipes or user-supplied configuration must not gain arbitrary execution
authority merely by naming inline code, arbitrary imports or unbounded filesystem
writes. Runtime owners define and enforce the allowlisted capability boundary.

### EI-6 — Generated recipes are drafts, not execution authority

An LLM may propose a recipe or configuration. The proposal becomes executable only
after the owning repository's validation, review and safety gates. Generation does
not confer authority.

## Current-owner proof map

The migration deliberately avoids creating a single successor.

| Historical lesson | Current disposition | Evidence / owner |
| --- | --- | --- |
| prompt/tool capability metadata | **MIGRATED, repo-local** | `office-auto-lab` Repo Health plugin boundary exposes capability identity, IO contracts, side-effect class, failure behavior and evidence; discovery validates before execution |
| prompt/template identity | **SATISFIED + regression-pinned** | `evaluar-app` immutable tutoring `PromptVersion` identity covers instructions, response schema, model policy, temperature and output-token ceiling; production derives execution config from the pinned version |
| per-step traces | **SATISFIED / EVOLVED** | `knowledge-inspect` run-record v2 stages carry pending/running/success/error state, timestamps/details, warnings/errors and artifact evidence; adversarial characterization tests pin evidence behavior |
| declarative composition recipes | **SATISFIED where domain-appropriate** | `knowledge-experiences` owns collection/experience specs and reproducible releases, not generic execution |
| domain/business workflows | **DOMAIN OWNED** | e.g. `accounting-workflows`, Office runtime and other producers keep execution semantics with the domain that can validate them |
| generic flow engine / DAG runtime | **UNASSIGNED** | no demonstrated shared consumer contract |
| PromptFlow private executor/tracing APIs | **RETIRED** | predecessor implementation detail |
| arbitrary Python/inline `exec` blocks | **RETIRED** | violates the bounded capability principle |
| generic FastAPI/Next.js flow studio | **RETIRED** | no current consumer or authority |
| batch/resume/marketplace/open-core roadmap claims | **RETIRED AS PLANNED INTENT** | not migrated merely because predecessor roadmaps mentioned them |

## Why simplification does not lose capability

The current estate has separated concerns that the predecessors bundled together:

```text
validated domain recipe/config
          ↓
domain-owning capability/runtime
          ↓
explicit run/artifact evidence
```

That pattern is intentionally preferred over routing unrelated domains through one
universal flow DSL. Prompt identity belongs with the inference producer, capability
metadata belongs with the executable capability owner, and run evidence belongs with
the runtime that can explain its own stages.

The decommission therefore removes duplicate product surfaces while retaining the
three durable ideas that had proved useful: explicit capability boundaries, governed
prompt identity, and observable execution evidence.

## What was not migrated

No current repository receives:

- PromptFlow as a dependency merely for lineage;
- a generic YAML flow schema;
- a shared prompt registry;
- a new cross-repository execution library;
- a generic FastAPI orchestration service;
- a flow editor UI;
- arbitrary Python block execution;
- roadmap features that were never implemented and validated.

`kb-contracts` remains outside this migration because it explicitly does not own
universal orchestration or producer run records. The architecture repository likewise
documents these invariants without owning producer runtime implementation.

## Archive gate

The predecessor repositories may be archived after their local ledgers show:

- repository-visible active dependencies: zero;
- machine-local/deployment execution hooks: zero;
- unique live flow/prompt definitions: zero or rescued;
- unclassified capabilities: zero;
- current owners or explicit retirement documented;
- generic workflow execution explicitly unassigned;
- no remaining archive blockers.

After archival, any future shared execution kernel must be pulled by new current
consumer evidence rather than by reopening these predecessors wholesale.
