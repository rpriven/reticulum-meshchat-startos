# Reticulum MeshChat for StartOS
#
# Unlike headscale (raw binary download + checksum), MeshChat publishes an official
# multi-arch image (amd64+arm64) built from the repo's own Dockerfile
# (node:20 frontend build → python:3.11-bookworm runtime). We base on the pinned
# version tag rather than rebuilding the frontend toolchain ourselves.
#
# ⚠️ Upstream's image-publish workflow is MANUAL-trigger — verify the tag exists for
# any version bump before building (probe: ghcr.io/v2/liamcottle/reticulum-meshchat/tags/list).
# Fallback if a tag is ever missing: vendor upstream's Dockerfile and build from source.
ARG MESHCHAT_VERSION=2.4.0
FROM ghcr.io/liamcottle/reticulum-meshchat:v${MESHCHAT_VERSION}

# Upstream runtime (verified via docker inspect, v2.4.0):
#   WORKDIR /app, no ENTRYPOINT
#   CMD python meshchat.py --host=0.0.0.0 --reticulum-config-dir=/config/.reticulum \
#       --storage-dir=/config/.meshchat --headless
# StartOS main.ts supplies the command explicitly (with --port) — CMD here is a fallback.
#
# State surface (must persist across updates): /config
#   /config/.reticulum  — RNS config + interface definitions
#   /config/.meshchat   — SQLite message DB + identity keypair

EXPOSE 8000
