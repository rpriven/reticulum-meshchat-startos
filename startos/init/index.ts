import { sdk } from '../sdk'
import { setDependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { versionGraph } from '../versions'
import { actions } from '../actions'
import { restoreInit } from '../backups'

// No seed step: MeshChat generates its own RNS config and identity keypair on
// first run under /config. Seeding a hand-written RNS config risks a broken
// first boot; entry points are user-added via the app's Interfaces page
// (instructions.md points at directory.rns.recipes for current ones).
export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  setInterfaces,
  setDependencies,
  actions,
)

export const uninit = sdk.setupUninit(versionGraph)
