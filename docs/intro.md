---
id: intro
title: Knowledge Ecosystem
sidebar_position: 1
---

# Knowledge Ecosystem

This site is the **reference architecture and orientation surface** for the knowledge-management ecosystem.

The estate has grown beyond the original `paper-kb` → `KB` → review-snapshot model. Shared contracts, deterministic evidence selection, inspection producers, context interfaces, paper corpora, journals and other knowledge surfaces now exist as distinct responsibilities. The purpose of this site is to make that distributed system legible without collapsing it into one application.

## Current precedence

When documentation disagrees, use this order:

1. verified producer/runtime behavior for producer-owned semantics;
2. released `kb-contracts` artifacts for shared interoperability semantics;
3. the **Current Reference Architecture** in this repository for ecosystem-level responsibilities and relationships;
4. older module, integration and blueprint pages as migration/history evidence.

Repository names are not authority. A responsibility becomes part of the current architecture only after its owner and boundary are supported by repository evidence.

## Read the current architecture

Start with:

- [Current Reference Architecture](./architecture/current-reference-architecture.md)
- [Ecosystem Registry](./architecture/ecosystem-registry.md)
- [Authority Model](./architecture/authority-model.md)
- [Knowledge Lifecycle](./architecture/knowledge-lifecycle.md)

Then use the older module and integration pages when reconstructing a concrete historical interface.

## Architectural direction

The current knowledge estate is intentionally upstream of a newly recognized downstream frontier:

```text
sources / trails
      ↓
knowledge capture and governed artifacts
      ↓
inspection / retrieval / context
      ↓
knowledge use
      ↓
SYNTHESIS          future authority not yet assigned
      ↓
PUBLICATION        future authority not yet assigned
      ↓
circulation / response
      └──────────────→ knowledge
```

This documentation declares that seam so future work can build against it without pretending the synthesis or publication systems already exist.

## Build-up policy

The ecosystem should improve the same way a governed scientific system does: reconstruct truth first, reconcile responsibilities second, harden real interfaces third, and add sensing only after the map is trustworthy. See the [Reference Architecture Build Bundle](./roadmap/reference-architecture-build-bundle.md).
