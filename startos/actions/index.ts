import { sdk } from '../sdk'
import { resetInterfaces } from './resetInterfaces'

// v1 ships ONE action — a recovery escape hatch, not a config surface.
// MeshChat's own web UI owns display name, identity display, and interface
// editing (dogfood-proven 2026-07-14); duplicating those here would make two
// writers for one RNS config file. But when a misconfigured interface
// crash-loops the service, that UI is unreachable — resetInterfaces is the
// way back in without reinstalling (VM-proven failure, 2026-07-17).
export const actions = sdk.Actions.of().addAction(resetInterfaces)
