#!/usr/bin/env python3
"""Cheap W4 sensor for public knowledge-ecosystem SYSTEM.yaml surfaces.

This intentionally checks only stable public identity/boundary markers. It does
not parse ownership semantics or infer architecture edges; those remain review
work in knowledge-ecosystem-docs.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "sensing" / "public-system-surfaces.json"


def fetch_text(repository: str, path: str) -> str:
    url = f"https://raw.githubusercontent.com/{repository}/main/{path}"
    request = Request(url, headers={"User-Agent": "knowledge-ecosystem-w4-sensor/1"})
    try:
        with urlopen(request, timeout=20) as response:  # noqa: S310 - fixed GitHub host from checked-in manifest
            return response.read().decode("utf-8")
    except (HTTPError, URLError, UnicodeDecodeError) as exc:
        raise RuntimeError(f"unable to read {repository}/{path}: {exc}") from exc


def main() -> int:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    failures: list[str] = []
    rows: list[tuple[str, str]] = []

    print("# Knowledge ecosystem public-surface drift sensor")
    print()
    print("| repository | result |")
    print("| --- | --- |")

    for surface in manifest["surfaces"]:
        repository = surface["repository"]
        path = surface["path"]
        try:
            text = fetch_text(repository, path)
        except RuntimeError as exc:
            failures.append(str(exc))
            rows.append((repository, "FAIL: unreadable surface"))
            continue

        missing = [marker for marker in surface["required_markers"] if marker not in text]
        if missing:
            failures.append(f"{repository}/{path}: missing markers {missing!r}")
            rows.append((repository, "FAIL: identity drift"))
        else:
            rows.append((repository, "OK"))

    for repository, result in rows:
        print(f"| `{repository}` | {result} |")

    print()
    for manual in manifest.get("manual_surfaces", []):
        print(f"Manual surface: `{manual['repository']}` — {manual['reason']}")

    if failures:
        print("\n## Failures", file=sys.stderr)
        for failure in failures:
            print(f"- {failure}", file=sys.stderr)
        return 1

    print("\nAll automatically sensed public SYSTEM surfaces retain their stable identity markers.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
