import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.4.0:0',
  releaseNotes: {
    en_US: 'Initial Reticulum MeshChat release for StartOS.',
    es_ES: 'Versión inicial de Reticulum MeshChat para StartOS.',
    de_DE: 'Erste Reticulum-MeshChat-Veröffentlichung für StartOS.',
    pl_PL: 'Pierwsze wydanie Reticulum MeshChat dla StartOS.',
    fr_FR: 'Première version de Reticulum MeshChat pour StartOS.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
