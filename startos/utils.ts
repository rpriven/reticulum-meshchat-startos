import { sdk } from './sdk'

// MeshChat web UI (and its HTTP API) — the single exposed port.
export const webPort = 8000

// ONE volume carries the WHOLE state surface, mounted at upstream's documented
// path: /config/.reticulum (RNS config + interface definitions) and
// /config/.meshchat (message DB + identity keypair). Splitting or re-scoping
// this volume gives the node a NEW identity on update — the single worst
// persistence failure for this service. Keep the path consistent with the
// Dockerfile comments and instructions.md.
export const mount = sdk.Mounts.of().mountVolume({
  volumeId: 'main',
  subpath: null,
  mountpoint: '/config',
  readonly: false,
})
