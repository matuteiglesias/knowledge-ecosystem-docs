---
id: authority-model
title: Authority Model
sidebar_position: 2
---

# Authority Model

The ecosystem uses **distributed authority with explicit precedence**. The objective is not to centralize implementation; it is to make responsibility inspectable.

## Precedence rules

### Producer truth

A producer owns its runtime behavior and domain semantics. If a producer owns a schema, this repository links to it rather than copying it.

### Shared interoperability truth

`kb-contracts` owns shared artifact identity, knowledge interoperability profiles, compatibility rules, integrity/provenance fields, fixtures and machine-readable releases.

Its contract authority does not make it an orchestration engine or universal knowledge application.

### Ecosystem architecture truth

`knowledge-ecosystem-docs` owns the answer to:

- which systems are considered part of the current ecosystem;
- which responsibility belongs where;
- which relationships are current, historical, proposed or unknown;
- which shared contract governs a cross-repository edge;
- which capability is intentionally unassigned.

## Relationship states

Every cross-repository relationship should eventually be classified as one of:

| State | Meaning |
| --- | --- |
| `proven` | exact producer, consumer, interface and validation path are known |
| `declared` | responsibility is intentionally assigned but full integration proof is pending |
| `observed` | repository/capability exists; ecosystem boundary still needs reconciliation |
| `historical` | useful evidence from an older architecture; no longer assumed current |
| `superseded` | a newer authority has explicitly replaced this responsibility |
| `future` | desired seam with no implementation authority yet |

## Change rule

Architecture changes should follow evidence, not aspiration.

A new repo should not enter the canonical registry merely because it exists. A repo should enter when there is enough evidence to state its responsibility and authority boundary without guessing.

Likewise, retiring a repo from current authority does not require erasing it. Historical systems can remain inspectable while their authority is moved elsewhere.
